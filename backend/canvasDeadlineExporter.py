import requests
import csv
import time
from urllib.parse import urlparse, urljoin
from datetime import datetime

# NOTE: For the ICS export function to work, you must install the icalendar library:
# pip install icalendar
try:
    from icalendar import Calendar, Event
except ImportError:
    print("Warning: 'icalendar' library not found. ICS export will be skipped.")
    Calendar = None
    Event = None

def fetch_all_assignments(base_url, access_token, course_id, max_retries=5):
    """
    Fetches all assignments for a given course ID from the Canvas API, 
    handling pagination and using exponential backoff for retries.
    """
    # 1. Prepare initial URL and headers
    api_path = f"/api/v1/courses/{course_id}/assignments"
    # Request 'all_dates' to include assignment overrides if they exist
    params = {
        'per_page': 100, 
        'include[]': ['all_dates', 'submission'] 
    }
    
    # Ensure the base URL is clean and includes the scheme
    if not base_url.startswith(('http://', 'https://')):
        base_url = 'https://' + base_url 

    url = urljoin(base_url, api_path)
    all_assignments = []
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json',
    }
    
    print(f"Starting fetch for Course ID: {course_id}...")

    # 2. Main loop for fetching and handling pagination
    while url:
        response = None
        current_retries = 0

        # Implement exponential backoff for robust API calls
        while current_retries < max_retries:
            try:
                # Add query parameters only on the first request (subsequent URLs from headers already contain them)
                if '?' not in url:
                    response = requests.get(url, headers=headers, params=params)
                else:
                    response = requests.get(url, headers=headers)

                response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
                break # Exit retry loop on success
            except requests.exceptions.RequestException as e:
                current_retries += 1
                if current_retries >= max_retries:
                    print(f"\nFATAL: Failed after {max_retries} attempts. Error: {e}")
                    raise
                
                delay = 2 ** current_retries # 2, 4, 8, 16, 32 seconds
                print(f"Warning: Request failed (Status: {response.status_code if response else 'N/A'}). Retrying in {delay}s...")
                time.sleep(delay)

        # Process the successful response
        data = response.json()
        all_assignments.extend(data)
        
        # 3. Handle pagination via the Link header
        url = None
        link_header = response.headers.get('Link')
        if link_header:
            links = {rel: href for href, rel in requests.utils.parse_header_links(link_header)}
            if 'next' in links:
                url = links['next']
                print(f"Fetched {len(data)} assignments. Moving to next page...")
            else:
                print(f"Fetched {len(data)} assignments. No more pages found.")
        else:
             print(f"Fetched {len(data)} assignments. No Link header, assuming single page.")

    return all_assignments

def export_to_csv(assignments, filename="canvas_due_dates.csv"):
    """
    Processes the list of assignment data and writes it to a CSV file.
    """
    # Define the fields for the CSV file
    fieldnames = [
        'Assignment ID', 
        'Assignment Name', 
        'Points Possible', 
        'Primary Due Date (UTC)', 
        'Unlock Date (UTC)', 
        'Lock Date (UTC)', 
        'Is Published',
        'Submission Type'
    ]
    
    # Process data and filter out assignments without a name or that aren't visible
    processed_data = []
    for assignment in assignments:
        # Check if it's a valid, named assignment object (filters out occasional module junk)
        if assignment.get('name'):
            processed_data.append({
                'Assignment ID': assignment.get('id'),
                'Assignment Name': assignment.get('name', 'N/A'),
                'Points Possible': assignment.get('points_possible', 0),
                'Primary Due Date (UTC)': assignment.get('due_at', ''),
                'Unlock Date (UTC)': assignment.get('unlock_at', ''),
                'Lock Date (UTC)': assignment.get('lock_at', ''),
                'Is Published': assignment.get('published', False),
                'Submission Type': ', '.join(assignment.get('submission_types', ['N/A']))
            })

    if not processed_data:
        print("No valid assignments found to export to CSV.")
        return

    # Write the data to the CSV file
    try:
        with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(processed_data)
        print(f"✅ Successfully exported {len(processed_data)} assignments to {filename}")
    except Exception as e:
        print(f"Error writing CSV file: {e}")


def export_to_ics(assignments, filename="canvas_due_dates.ics"):
    """
    Processes the list of assignment data and writes it to an iCalendar (.ics) file.
    Requires: pip install icalendar
    """
    if Calendar is None:
        return
        
    cal = Calendar()
    # A unique identifier for the calendar
    cal.add('prodid', '-//Canvas Assignment Due Date Exporter//')
    cal.add('version', '2.0')

    count = 0
    for assignment in assignments:
        due_at = assignment.get('due_at')
        assignment_id = assignment.get('id')
        assignment_name = assignment.get('name')
        
        # Skip if no due date or name
        if not due_at or not assignment_name:
            continue

        try:
            dt_due = datetime.fromisoformat(due_at.replace('Z', '+00:00'))
            
            event = Event()
            event.add('summary', f"Assignment Due: {assignment_name}")
            
            # Use the exact due date/time as the start and end of the event (a deadline marker)
            event.add('dtstart', dt_due)
            event.add('dtend', dt_due) 
            
            # UID for unique event identification
            event.add('uid', f'CANVAS-{assignment_id}-{dt_due.timestamp()}@exporter.app')
            
            # Simple description
            event.add('description', (
                f"Course Assignment\n"
                f"Points: {assignment.get('points_possible', 0)}\n"
                f"Unlock: {assignment.get('unlock_at', 'N/A')}\n"
                f"Lock: {assignment.get('lock_at', 'N/A')}"
            ))
            
            cal.add_component(event)
            count += 1
        
        except ValueError:
            # Handle cases where the due_at format is invalid
            continue

    if count == 0:
        print("No valid assignment dates found to export to ICS.")
        return

    # Write the calendar file
    try:
        with open(filename, 'wb') as f:
            f.write(cal.to_ical())
        print(f"✅ Successfully exported {count} events to {filename}")
    except Exception as e:
        print(f"Error writing ICS file: {e}")


if __name__ == '__main__':
    # 0. Get required inputs from the user
    print("--- Canvas Due Date Exporter ---")
    print("Please enter the required information below.")
    
    # Example: canvas.instructure.com or your-school.instructure.com
    base_url = input("1. Enter your Canvas Base URL (e.g., myschool.instructure.com): ").strip()
    
    # Example: 1234567890abcdef...
    access_token = input("2. Enter your Canvas Personal Access Token: ").strip()
    
    # Example: 12345
    course_id = input("3. Enter the Course ID (the number in the course URL): ").strip()
    
    if not all([base_url, access_token, course_id]):
        print("\nAll fields are required. Exiting.")
    else:
        try:
            assignments = fetch_all_assignments(base_url, access_token, course_id)
            
            # Export to both CSV and ICS
            export_to_csv(assignments)
            export_to_ics(assignments)
            
        except Exception:
            # Catch the raised error from fetch_all_assignments
            print(f"\nOperation stopped due to a critical error. Please check your inputs and token permissions.")
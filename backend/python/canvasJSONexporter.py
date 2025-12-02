import requests
import time
import json 
from urllib.parse import urlparse, urljoin
from datetime import datetime

def fetch_all_assignments(base_url, access_token, course_id, max_retries=5):
    """
    Fetches all assignments for a given course ID from the Canvas API, 
    handling pagination and using exponential backoff for retries.
    """
    api_path = f"/api/v1/courses/{course_id}/assignments"
    params = {
        'per_page': 100, 
        'include[]': ['all_dates', 'submission'] 
    }
    
    if not base_url.startswith(('http://', 'https://')):
        base_url = 'https://' + base_url 

    url = urljoin(base_url, api_path)
    all_assignments = []
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json',
    }
    
    print(f"Starting fetch for Course ID: {course_id}...")

    while url:
        response = None
        current_retries = 0

        while current_retries < max_retries:
            try:
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

        data = response.json()
        all_assignments.extend(data)
        
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

def export_to_json(assignments, filename="canvas_assignments.json"):
    """
    Writes the full list of assignment data to a JSON file.
    """
    export_data = [a for a in assignments if a.get('name')]

    if not export_data:
        print("No valid assignments found to export to JSON.")
        return

    try:
        with open(filename, 'w', encoding='utf-8') as jsonfile:
            json.dump(export_data, jsonfile, indent=4)
        print(f"✅ Successfully exported {len(export_data)} assignments to {filename}")
    except Exception as e:
        print(f"Error writing JSON file: {e}")


if __name__ == '__main__':
    print("Please enter the required information below.")
    base_url = input("1. Enter your Canvas Base URL (e.g., myschool.instructure.com): ").strip()
    access_token = input("2. Enter your Canvas Personal Access Token: ").strip()
    course_id = input("3. Enter the Course ID (the number in the course URL): ").strip()
    
    if not all([base_url, access_token, course_id]):
        print("\nAll fields are required. Exiting.")
    else:
        try:
            assignments = fetch_all_assignments(base_url, access_token, course_id)
            export_to_json(assignments)
            
        except Exception:
            print(f"\nOperation stopped due to a critical error. Please check your inputs and token permissions.")
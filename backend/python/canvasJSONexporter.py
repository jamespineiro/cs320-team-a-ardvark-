import requests
import time
import json
import sys
from urllib.parse import urlparse, urljoin
from datetime import datetime

def fetch_all_assignments(base_url, access_token, course_id, max_retries=5):
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

                response.raise_for_status()
                break
            except requests.exceptions.RequestException as e:
                current_retries += 1
                if current_retries >= max_retries:
                    print(f"\nFATAL: Failed after {max_retries} attempts. Error: {e}")
                    raise

                delay = 2 ** current_retries
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


def print_json(assignments):
    """Print JSON to stdout instead of writing to a file."""
    export_data = [a for a in assignments if a.get('name')]
    print(json.dumps(export_data, indent=4))
    return export_data


if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("PYTHON ERROR: Expected 3 arguments: base_url access_token course_id")
        sys.exit(1)

    base_url = sys.argv[1]
    access_token = sys.argv[2]
    course_id = sys.argv[3]

    try:
        assignments = fetch_all_assignments(base_url, access_token, course_id)
    except Exception as e:
        print(f"PYTHON FATAL: {e}")
        sys.exit(1)
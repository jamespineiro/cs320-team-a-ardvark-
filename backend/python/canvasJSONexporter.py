import requests
import sys
import json

def fetch_canvas_assignments(base_url, access_token, course_id):
    """
    Fetch all assignments from a Canvas course.
    Debug messages go to stderr, JSON output goes to stdout.
    """

    # Construct the API URL
    url = f"https://{base_url}/api/v1/courses/{course_id}/assignments"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    params = {
        "per_page": 100,
        "include[]": ["submission"]  # Include submission status
    }

    all_assignments = []

    # Debug output goes to stderr
    print(f"Starting fetch for Course ID: {course_id}...", file=sys.stderr)

    try:
        while url:
            response = requests.get(url, headers=headers, params=params)

            if response.status_code != 200:
                print(f"Error: HTTP {response.status_code}", file=sys.stderr)
                print(f"Response: {response.text}", file=sys.stderr)
                sys.exit(1)

            assignments = response.json()
            all_assignments.extend(assignments)

            # Check for pagination
            if 'next' in response.links:
                url = response.links['next']['url']
                params = {}  # Clear params since URL includes them
            else:
                url = None

        print(f"Fetched {len(all_assignments)} assignments. No more pages found.", file=sys.stderr)

        # ONLY print JSON to stdout
        print(json.dumps(all_assignments, indent=2))

    except Exception as e:
        print(f"Exception occurred: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python canvasJSONexporter.py <base_url> <access_token> <course_id>", file=sys.stderr)
        sys.exit(1)

    base_url = sys.argv[1]
    access_token = sys.argv[2]
    course_id = sys.argv[3]

    fetch_canvas_assignments(base_url, access_token, course_id)
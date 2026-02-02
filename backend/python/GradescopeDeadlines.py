import sys, json, requests
from bs4 import BeautifulSoup

# 1. Get Credentials
"""
if len(sys.argv) < 3:
    print(json.dumps({"error": "Missing credentials"}))
    sys.exit(1)

email, password = sys.argv[1], sys.argv[2]
session = requests.Session()
"""

BASE = "https://www.gradescope.com"

def login(session, email, password):
    # 2. Login
    login_page = session.get(BASE + "/login")
    soup = BeautifulSoup(login_page.text, 'html.parser')

    token_field = soup.find('input', {'name': 'authenticity_token'})
    if not token_field:
        raise Exception("Failed to load Login page")
        # print(json.dumps({"error": "Could not load login page properly"}))
        # sys.exit(1)

    response = session.post(BASE + "/login", data={
        'authenticity_token': token_field['value'],
        'session[email]': email,
        'session[password]': password,
        'commit': 'Log In',
        'session[remember_me]': 0
    })

    # Check for failure or any 2 factor authentication
    if 'account' not in response.url:
        raise Exception("Login failed")
        # print(json.dumps({"error": "Login failed - check credentials"}))
        # sys.exit(1)
    
    return session


def scrape_courses_and_assignments(email, password):
    # create session
    session = requests.Session()
    login(session, email, password)

    # 3. Scrape Courses & Assignments
    final_data = []
    soup = BeautifulSoup(session.get(BASE).text, 'html.parser')

    # Loop through every course box
    for box in soup.select('.courseBox'):
        short_elem = box.find(class_='courseBox--shortname')
        name_elem = box.find(class_='courseBox--name')

        if not short_elem or not name_elem: continue

        course_title = f"{short_elem.text.strip()} - {name_elem.text.strip()}"
        course_url = BASE + box['href']

        # Go into each course to find assignments
        a_soup = BeautifulSoup(session.get(course_url).text, 'html.parser')

        for row in a_soup.select('#assignments-student-table tbody tr'):
            # Skip rows that aren't assignments
            header = row.find('th', class_='table--primaryLink')
            if not header: continue

            # Check status for completion
            status = "Submitted" if 'submissionStatus-complete' in str(row) else "Pending"

            # Get Due Date
            due_tag = row.find(class_='submissionTimeChart--dueDate')
            due_date = due_tag['datetime'] if due_tag else None
            final_data.append({
                "course": course_title,
                "assignment": header.text.strip(),
                "status": status,
                "due_date": due_date
            })
    return final_data


    # print(json.dumps(final_data))

if __name__ == "__main__":
    import sys, json
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing credentials"}))
        sys.exit(1)
    email, password = sys.argv[1], sys.argv[2]
    try:
        final_data = scrape_courses_and_assignments(email, password)
        # data = main(sys.argv[1], sys.argv[2])
        print(json.dumps(final_data))
    except Exception as e:
        # Return the actual error message
        print(json.dumps({"error": f"Script Error: {str(e)}"}))
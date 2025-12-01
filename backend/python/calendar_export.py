from ics import Calendar, Event


def convert_deadlines(deadlines, filename="deadlines.ics"):
    c = Calendar()
    for d in deadlines:
        event = Event()
        event.name = f"{d['course']} - {d['assignment']}"
        event.begin = d['due_date']
        c.events.add(event)
    with open(filename, 'w') as my_file:
        my_file.writelines(c.serialize_iter())
    return filename

deadlines = [
    {
        "course": "CS 320",
        "assignment": "Lab 5",
        "due_date": "2025-11-15T23:59:00"
    },
    {
        "course": "CS 320",
        "assignment": "Project Report",
        "due_date": "2025-11-20T23:59:00"
    }
]

convert_deadlines(deadlines)
print("ICS file created successfully!")
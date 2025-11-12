from ics import Calendar, Event


def convert_deadlines(deadlines, filename="deadlines.ics"):
    c = Calendar()
    for d in deadlines:
        event = Event()
        event.name = f"{d['course']} - {d['assignment']}"
        event.begin = d['due_date']
        c.events.add(event)
    # [<Event 'My cool event' begin:2014-01-01 00:00:00 end:2014-01-01 00:00:01>]
    with open(filename, 'w') as my_file:
        my_file.writelines(c.serialize_iter())
    # and it's done !
    return filename

"""
c = Calendar()
e = Event()
e.name = "My cool event"
e.begin = '2014-01-01 00:00:00'
c.events.add(e)
c.events
# [<Event 'My cool event' begin:2014-01-01 00:00:00 end:2014-01-01 00:00:01>]
# with open('my.ics', 'w') as my_file:
#     my_file.writelines(c.serialize_iter())
print(c.serialize_iter())
# and it's done !
"""

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
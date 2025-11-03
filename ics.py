from ics import Calendar, Event

def convert_deadlines(deadlines, filename="deadlines.ics"):
    c = Calendar()
    for d in deadlines:
        event = Event()
        event.name = f"{d['course']} - {d['assignment']}"
        event.begin = d['due_date']
        c.events.add(e)
    # [<Event 'My cool event' begin:2014-01-01 00:00:00 end:2014-01-01 00:00:01>]
    with open(filename, 'w') as my_file:
        my_file.writelines(c.serialize_iter())
    # and it's done !
    return filename
import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap5";

// Import Bootstrap CSS (you'll need to install bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Calendar() {
  const externalEventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerEl = externalEventsRef.current;
    if (containerEl) {
      // Use the Draggable from @fullcalendar/interaction
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.getAttribute('title') || eventEl.innerText,
            duration: '01:00'
          };
        }
      });
    }
  }, []);

  const events = [
    { title: "All Day Event", start: "2025-10-01" },
    { title: "Long Event", start: "2025-10-06", end: "2025-10-09" },
    { groupId: "999", title: "Repeating Event", start: "2025-10-08T16:00:00" },
    { groupId: "999", title: "Repeating Event", start: "2025-10-15T16:00:00" },
    { title: "Conference", start: "2025-10-22", end: "2025-10-24" },
    { title: "Meeting", start: "2025-10-24T10:30:00", end: "2025-10-24T12:30:00" },
    { title: "Lunch", start: "2025-10-24T12:00:00" },
    { title: "Meeting", start: "2025-10-24T14:30:00" },
    { title: "Birthday Party", start: "2025-10-24T07:00:00" },
    { title: "Click for Google", url: "http://google.com/", start: "2025-10-28" },
  ];

  return (
    <div className="demo-app d-flex">
      {/* Sidebar: External events */}
      <div
        className="demo-app-sidebar p-3 bg-light border-end"
        ref={externalEventsRef}
        style={{ width: "250px" }}
      >
        <h5>Drag-n-Drop Events</h5>
        <div>
          <div className="fc-event p-2 bg-primary text-white mb-2 rounded" title="Event 1">
            Event 1
          </div>
          <div className="fc-event p-2 bg-success text-white mb-2 rounded" title="Event 2">
            Event 2
          </div>
        </div>
        <p>
          Drag these onto the calendar:
        </p>
      </div>

      {/* Calendar */}
      <div className="flex-grow-1 p-3">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            bootstrapPlugin,
          ]}
          themeSystem="bootstrap5"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialView="dayGridMonth"
          editable={true}
          droppable={true}
          selectable={true}
          events={events}
          eventClick={(info) => {
            info.jsEvent.preventDefault();
            if (info.event.url) window.open(info.event.url);
          }}
          eventAdd={(e) => console.log("Event added:", e.event.title)}
          dateClick={(info) => alert(`Clicked on date: ${info.dateStr}`)}
        />
      </div>
    </div>
  );
}
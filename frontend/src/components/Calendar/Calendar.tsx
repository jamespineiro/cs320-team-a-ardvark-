import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap5";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import vanilla-extract styles
import * as styles from "./Calendar.css";
import {useEffect, useState} from "react";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const BACKEND = 'http://localhost:4000/mock-events';
  console.log("Calendar component mounted");
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(BACKEND);
        console.log("response status:", res.status);
        const data = await res.json();
        console.log("DATA:", data);
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }

    loadEvents();
  }, []);

/*
  const events = [
    { title: "All Day Event", start: "2025-12-01" },
    { title: "Long Event", start: "2025-12-06", end: "2025-12-09" },
    { groupId: "999", title: "Repeating Event", start: "2025-12-08T16:00:00" },
    { groupId: "999", title: "Repeating Event", start: "2025-12-15T16:00:00" },
    { title: "Conference", start: "2025-12-22", end: "2025-12-24" },
    { title: "Meeting", start: "2025-10-24T10:30:00", end: "2025-10-24T12:30:00" },
    { title: "Lunch", start: "2025-10-24T12:00:00" },
    { title: "Meeting", start: "2025-10-24T14:30:00" },
    { title: "Birthday Party", start: "2025-10-24T07:00:00" },
    { title: "Click for Google", url: "http://google.com/", start: "2025-10-28" },
  ];
 */

  return (
    <div className={`${styles.calendarWrapper} flex-grow-1 p-3`}>
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
        buttonIcons={false} // disables default icons
        buttonText={{
          prev: "<",
          next: ">",
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
        initialView="dayGridMonth"
        editable={true}
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
  );
}
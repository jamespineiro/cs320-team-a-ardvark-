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
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const { sessionId } = useAuth();
  const BACKEND = 'http://localhost:4000';

  // Get user_id from localStorage (set during login)
  const userId = localStorage.getItem("user_id");

  console.log("Calendar component mounted");

  useEffect(() => {
    async function loadEvents() {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        };

        // Load mock events
        const mockRes = await fetch(`${BACKEND}/mock-events`, { headers });
        const mockData = await mockRes.json();
        console.log("Mock events:", mockData);

        // Load Gradescope events if user_id is available
        let gradescopeData = [];
        if (userId) {
          const gradescopeRes = await fetch(
              `${BACKEND}/gradescope-events?user_id=${userId}`,
              { headers }
          );
          if (gradescopeRes.ok) {
            gradescopeData = await gradescopeRes.json();
            console.log("Gradescope events:", gradescopeData);
          }
        }

        // Combine both event sources
        const allEvents = [...mockData, ...gradescopeData];
        setEvents(allEvents);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    }

    if (sessionId) {
      loadEvents();
    }
  }, [sessionId, userId]);

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
            buttonIcons={false}
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

              // Display event details
              const { status, course } = info.event.extendedProps || {};
              if (status || course) {
                alert(`${info.event.title}\nCourse: ${course || 'N/A'}\nStatus: ${status || 'N/A'}`);
              }

              if (info.event.url) window.open(info.event.url);
            }}
            eventAdd={(e) => console.log("Event added:", e.event.title)}
            dateClick={(info) => alert(`Clicked on date: ${info.dateStr}`)}
        />
      </div>
  );
}
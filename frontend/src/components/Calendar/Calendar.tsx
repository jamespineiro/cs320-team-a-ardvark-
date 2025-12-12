import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap5";
import type { EventInput } from "@fullcalendar/core";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import vanilla-extract styles
import * as styles from "./Calendar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

// Define the event type
interface CalendarEvent extends EventInput {
  title: string;
  start: string;
  extendedProps?: {
    course?: string;
    status?: string;
    originalDueDate?: string;
    source?: string; // Track which service the event came from
  };
  url?: string;
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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

        const allEvents: CalendarEvent[] = [];

        // Load Gradescope events if user_id is available
        if (userId) {
          try {
            const gradescopeRes = await fetch(
                `${BACKEND}/gradescope-events?user_id=${userId}`,
                { headers }
            );
            if (gradescopeRes.ok) {
              const gradescopeData: CalendarEvent[] = await gradescopeRes.json();
              // Add source identifier to each event
              const gradescopeEvents = gradescopeData.map(event => ({
                ...event,
                extendedProps: {
                  ...event.extendedProps,
                  source: 'Gradescope'
                }
              }));
              allEvents.push(...gradescopeEvents);
              console.log("Gradescope events:", gradescopeEvents);
            }
          } catch (err) {
            console.error("Failed to load Gradescope events:", err);
          }

          // Load Canvas events
          try {
            const canvasRes = await fetch(
                `${BACKEND}/canvas-events?user_id=${userId}`,
                { headers }
            );
            if (canvasRes.ok) {
              const canvasData: CalendarEvent[] = await canvasRes.json();
              // Add source identifier to each event
              console.log("### Raw Canvas JSON:", canvasData);
              console.log("&&& Canvas event count:", canvasData.length);
              console.log("&&& First Canvas event:", canvasData[0]);


              const canvasEvents = canvasData.map(event => ({
                ...event,
                extendedProps: {
                  ...event.extendedProps,
                  source: 'Canvas'
                }
              }));
              allEvents.push(...canvasEvents);
              console.log("Canvas events:", canvasEvents);
            }
          } catch (err) {
            console.error("Failed to load Canvas events:", err);
          }
        }

        setEvents(allEvents);
        console.log("Total events loaded:", allEvents.length);
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
              right: "dayGridMonth,listWeek",
            }}
            buttonIcons={false}
            buttonText={{
              prev: "<",
              next: ">",
              today: "Today",
              month: "Month",
              list: "List",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            eventClick={(info) => {
              info.jsEvent.preventDefault();

              // Display event details
              const { status, course, source } = info.event.extendedProps || {};
              const details = [
                `${info.event.title}`,
                source ? `Source: ${source}` : '',
                course ? `Course: ${course}` : '',
                status ? `Status: ${status}` : ''
              ].filter(Boolean).join('\n');

              alert(details);

              if (info.event.url) window.open(info.event.url);
            }}
            eventAdd={(e) => console.log("Event added:", e.event.title)}
            dateClick={(info) => alert(`Clicked on date: ${info.dateStr}`)}
        />
      </div>
  );
}
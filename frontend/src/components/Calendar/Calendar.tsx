import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  const [events, setEvents] = useState([
    { title: 'Sample Event', date: '2025-10-30' },
    { title: 'Another Event', date: '2025-11-01' },
  ]);

  return (
    <div>
      <h2>My Calendar</h2>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}
import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css'; // adjust path if needed

// Wrapper around the calendar
export const calendarWrapper = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.radii.md,
  padding: vars.spacing.md,
});

// FullCalendar header buttons
globalStyle('.fc .fc-toolbar button', {
  backgroundColor: vars.color.quietStorm,
  color: vars.color.white,
  border: 'none',
  borderRadius: vars.radii.sm,
  padding: '0.25rem 0.5rem',
  margin: '0 0.25rem',
  cursor: 'pointer',
});

globalStyle('.fc .fc-toolbar button:hover', {
  backgroundColor: vars.color.thunder,
});

// Calendar grid and day cells
globalStyle('.fc .fc-daygrid-day', {
  backgroundColor: vars.color.antiFlash,
  border: `1px solid ${vars.color.grey}`,
});

// FullCalendar events
globalStyle('.fc-event', {
  backgroundColor: vars.color.quietStorm,
  color: vars.color.white,
  borderRadius: vars.radii.sm,
  padding: '0.25rem 0.5rem',
  fontWeight: 500,
});
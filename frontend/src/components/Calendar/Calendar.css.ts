// Calendar.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css'; // adjust path as needed

export const calendarContainer = style({
  backgroundColor: vars.color.antiFlash,
  color: vars.color.black,
  borderRadius: vars.radii.md,
  padding: vars.spacing.md,
  boxShadow: `0 2px 8px ${vars.color.grey}`,
});

export const calendarHeader = style({
  backgroundColor: vars.color.quietStorm,
  color: vars.color.white,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  padding: vars.spacing.sm,
  borderRadius: `${vars.radii.sm} ${vars.radii.sm} 0 0`,
});

export const calendarDay = style({
  border: `1px solid ${vars.color.grey}`,
  padding: vars.spacing.sm,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: vars.color.thunder,
    color: vars.color.white,
  },
});
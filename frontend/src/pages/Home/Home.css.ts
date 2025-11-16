import { style } from "@vanilla-extract/css";
import { rem } from '../../styles/utils';

export const container = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
});

export const calendarContainer = style({
    width: "100%",
    maxWidth: rem(880),
    maxHeight: rem(714),
    overflow: "hidden",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: rem(2),
});

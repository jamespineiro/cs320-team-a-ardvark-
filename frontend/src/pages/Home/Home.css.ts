import { style } from "@vanilla-extract/css";
import { rem } from '../../styles/utils';
// import { vars } from "../../styles/theme.css";

export const container = style({
    display: "block",
    width: "100%",
});


const paddingRightLeft = rem(200)
export const calendarContainer = style({
    padding: `${rem(2)} ${paddingRightLeft} ${rem(32)} ${paddingRightLeft}`,
    boxSizing: "border-box",
});
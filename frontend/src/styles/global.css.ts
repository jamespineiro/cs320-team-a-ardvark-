import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

/* Make sizing predictable */
globalStyle("*, *::before, *::after", {
    boxSizing: "border-box",
});

/* Remove the default 8px margin and any padding */
globalStyle("html, body, #root", {
    height: "100%",
    margin: 0,
    padding: 0,
});

/* Base body rules */
globalStyle("body", {
    fontFamily: vars.typography.fontFamily,
    background: vars.color.white,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
});
import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const spin = keyframes({
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
});

export const loaderContainer = style({
    display: "inline-block",
    lineHeight: 0,
    position: "relative",
});

export const loader = style({
    borderRadius: "50%",
    boxSizing: "border-box",
    border: `12px solid ${vars.color.antiFlash}`,
    borderTop: `12px solid ${vars.color.quietStorm}`,
    animationName: spin,
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
});

export const srOnly = style({
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
});

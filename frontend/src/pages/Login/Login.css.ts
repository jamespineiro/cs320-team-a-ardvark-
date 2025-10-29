import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { rem } from "../../styles/utils";

export const container = style({
    display: "flex",
    height: "100vh",
    width: "100%",
});

export const imageSection = style({
    flex: "0 0 42%",
    maxWidth: "42%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    display: "block",
});

export const image = style({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
});

export const formSection = style({
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: vars.color.white,
    height: "100%",
    boxSizing: "border-box",
    padding: vars.spacing.lg,
    "@media": {
        [`(min-width: ${rem(1280)})`]: {
            padding: rem(64),
        },
    },
});

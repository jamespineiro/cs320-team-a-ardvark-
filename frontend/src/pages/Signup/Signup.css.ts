import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { rem } from '../../styles/utils';

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
    '@media': {
        [`(min-width: ${rem(1280)})`]: {
            padding: rem(64),
        },
    },
});

export const card = style({
    width: "80%",
    maxWidth: rem(400),
    '@media': {
        [`(min-width: ${rem(1280)})`]: {
            width: rem(490),
            maxWidth: "none",
            height: rem(579),
        },
    },
});

export const title = style({
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
});

export const subtitle = style({
    color: vars.color.grey,
    marginBottom: "2rem",
});

export const form = style({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
});

export const loginText = style({
    marginTop: "1rem",
    textAlign: "center",
});

export const loginLink = style({
    color: vars.color.quietStorm,
    textDecoration: "none",
    ":hover": {
        textDecoration: "underline",
    },
});

export const loaderContainer = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
});
import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: vars.color.white,
    fontFamily: vars.typography.fontFamily,
});

export const card = style({
    width: "100%",
    maxWidth: "400px",
    padding: vars.spacing.lg,
    textAlign: "center",
});

export const title = style({
    fontSize: vars.typography.fontSize.xl,
    fontWeight: vars.typography.fontWeight.bold,
    color: vars.color.black,
    marginBottom: vars.spacing.sm,
});

export const subtitle = style({
    fontSize: vars.typography.fontSize.base,
    color: vars.color.thunder,
    marginBottom: vars.spacing.lg,
    lineHeight: 1.4,
});

export const form = style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.md,
    marginBottom: vars.spacing.lg,
});

export const loginText = style({
    fontSize: vars.typography.fontSize.sm,
    color: vars.color.grey,
});

export const loginLink = style({
    color: vars.color.quietStorm,
    textDecoration: "none",
    fontWeight: vars.typography.fontWeight.bold,
    ":hover": {
        textDecoration: "underline",
    },
});

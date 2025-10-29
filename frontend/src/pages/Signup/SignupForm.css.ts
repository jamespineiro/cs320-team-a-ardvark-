import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";
import { rem } from '../../styles/utils';

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
    maxWidth: rem(400),
    padding: vars.spacing.lg,
    textAlign: "center",
    boxSizing: "border-box",
    '@media': {
        [`(min-width: ${rem(1280)})`]: {
            width: rem(490),
            maxWidth: "none",
            height: rem(579),
            padding: rem(32),
        },
    },
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
    flex: 1,
    overflowY: "auto",
});

export const loginText = style({
    fontSize: vars.typography.fontSize.sm,
    color: vars.color.grey,
});

export const loginLink = style({
    color: vars.color.quietStorm,
    textDecoration: "none",
    fontWeight: vars.typography.fontWeight.regular,
    ":hover": {
        textDecoration: "underline",
    },
});

export const buttonWrapper = style({
    width: "100%",
    display: "block",
    boxSizing: "border-box",
    padding: `${rem(32)} 0 ${rem(24)} 0`,
});

export const buttonFull = style({
    width: "100%",
    boxSizing: "border-box",
});
import { style } from "@vanilla-extract/css";
import { vars } from '../../../styles/theme.css';

export const container = style({
    display: "flex",
    flexDirection: "column",
    width: "430px",
    gap: vars.spacing.xs,
});

export const label = style({
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.sm,
    fontWeight: vars.typography.fontWeight.bold,
    color: vars.color.black,
});

export const inputWrapper = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: vars.color.antiFlash,
    borderRadius: vars.radii.lg,
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
});

export const input = style({
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.regular,
    color: vars.color.black,
    "::placeholder": {
        color: vars.color.grey,
    },
});

export const iconButton = style({
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
});

export const icon = style({
    color: vars.color.thunder,
});

export const iconImage = style({
    width: "18px",
    height: "18px",
    objectFit: "contain",
});

import { style } from "@vanilla-extract/css";
import { vars } from '../../../styles/theme.css';
import { rem } from '../../../styles/utils.ts';

export const container = style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "430px",
    gap: vars.spacing.xs,
    boxSizing: "border-box",
});

export const label = style({
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.sm,
    fontWeight: vars.typography.fontWeight.regular,
    color: vars.color.black,

    display: "block",
    width: "100%",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: vars.spacing.sm,
    paddingLeft: vars.spacing.md,
    paddingRight: vars.spacing.md,
});

export const inputWrapper = style({
    display: "flex",
    width: "100%",
    padding: `${vars.spacing.sm} ${vars.spacing.sm} ${vars.spacing.sm} ${vars.spacing.md}`,
    justifyContent: "space-between",
    alignItems: "center",
    background: vars.color.antiFlash,
    borderRadius: rem(6),
    boxSizing: "border-box",
    gap: vars.spacing.sm,
});

export const input = style({
    minWidth: 0,
    flex: 1,
    boxSizing: "border-box",
    padding: `${vars.spacing.sm} 0`,
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
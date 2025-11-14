import { style } from "@vanilla-extract/css";
import { rem } from '../../../styles/utils';
import { vars } from "../../../styles/theme.css";


export const container = style({
    display: "flex",
    alignItems: "center",
    //justifyContent: "flex-end",
    width: "100%",
    padding: `${rem(16)} ${rem(32)}`,
    boxSizing: "border-box",
})

export const logo = style({
    color: vars.color.quietStorm,
})

export const leftGroup = style({
    display: "flex",
    alignItems: "center",
    gap: rem(12),
    marginRight: rem(24),
})

export const button = style({
    marginLeft: "auto",
})

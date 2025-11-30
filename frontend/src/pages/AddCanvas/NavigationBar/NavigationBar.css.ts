import { style } from "@vanilla-extract/css";
import { rem } from '../../../styles/utils';
import { vars } from "../../../styles/theme.css";


export const container = style({
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${rem(2)} ${rem(32)}`,
    boxSizing: "border-box",
})

const logoSize = rem(50)
export const logo = style({
    color: vars.color.quietStorm,
    width: logoSize,
    height: logoSize,
})

export const leftGroup = style({
    display: "flex",
    alignItems: "center",
    gap: rem(4),
    marginRight: rem(24),
})

export const title = style({
    paddingTop: rem(10),
    fontSize: vars.typography.fontSize.xl,
    fontWeight: "bold",
    color: vars.color.black
})

export const button = style({
    marginLeft: "auto",
})
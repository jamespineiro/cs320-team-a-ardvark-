import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const button = style({
    backgroundColor: vars.color.quietStorm,
    color: vars.color.white,
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.base,
    fontWeight: vars.typography.fontWeight.bold,
    border: 'none',
    borderRadius: vars.radii.md,
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.carbon,
    },
});

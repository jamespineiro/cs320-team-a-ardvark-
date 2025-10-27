import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';
import { rem } from '../../../styles/utils';

export const button = style({
    backgroundColor: vars.color.quietStorm,
    color: vars.color.white,

    fontFamily: vars.typography.fontFamily,
    fontSize: rem(15),
    fontStyle: 'normal',
    fontWeight: vars.typography.fontWeight.bold,
    lineHeight: rem(20),
    letterSpacing: '0.3px',

    border: 'none',
    borderRadius: vars.radii.md,
    padding: `${vars.spacing.sm} ${vars.spacing.md}`,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    ':hover': {
        backgroundColor: vars.color.carbon,
    },
});
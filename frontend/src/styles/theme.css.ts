import { createGlobalTheme } from '@vanilla-extract/css'
import { rem } from './utils';


export const vars = createGlobalTheme(':root', {
    color: {
        white: '#ffffff',
        black: '#1A1A1A',
        thunder: '#4D4D4D',
        carbon: '#333333',
        grey: '#808080',
        quietStorm: '#2D5A6C',
    },

    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: {
            sm: rem(14),
            base: rem(16),
            lg: rem(20),
            xl: rem(24),
        },
        fontWeight: {
            regular: '400',
            bold: '700',
        },
    },

    radii: {
        sm: rem(4),
        md: rem(8),
        lg: rem(12),
    },

    spacing: {
        xs: rem(4),
        sm: rem(8),
        md: rem(16),
        lg: rem(32),
        xl: rem(64),
    },
})



/**
 * Converts pixel values to rems.
 * Usage: rem(16) -> "1rem"
 * Default base is 16px, so rem(2) = 0.125rem
 */
export const rem = (px: number, base = 16): string => {
    return `${px / base}rem`;
};
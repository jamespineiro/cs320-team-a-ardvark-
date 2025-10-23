/**
 * Converts pixel values to rems.
 * Usage: rem(32) -> "2rem"
 * Default base is 16px, so rem(2) = 0.125rem (input is in pixels)
 */
export const rem = (px: number, base = 16): string => {
    return `${px / base}rem`;
};
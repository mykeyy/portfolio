// Text on a design plate: near-black on light plates, white on dark ones, decided by the plate's relative
// luminance (WCAG formula), so captions and frames stay readable on whatever color a piece brings.
export function plateInk(hex: string): string {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  // Above ~0.18 luminance, near-black text has more contrast than white
  return luminance > 0.18 ? "#0b0b0b" : "#ffffff";
}

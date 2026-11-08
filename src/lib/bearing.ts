// How far each capital's ink starts after its box's left edge in Geist Mono Black (900), in em. A big title set
// flush left still shows this sliver of space before its first letter, so it looks indented from the column next
// to rules and body text. Pulling the title left by its first letter's bearing puts the ink exactly on the edge.
// Measured with canvas measureText (actualBoundingBoxLeft) at 1000px in the self-hosted font.
const BEARING: Record<string, number> = {
  A: 0.0156, B: 0.0469, C: 0.0156, D: 0.0469, E: 0.0781, F: 0.0781, G: 0.0156, H: 0.0313, I: 0.0625,
  J: 0.0313, K: 0.0313, L: 0.0781, M: 0.0313, N: 0.0469, O: 0.0156, P: 0.0625, Q: 0.0156, R: 0.0469,
  S: 0.0313, T: 0.0313, U: 0.0469, V: 0.0156, W: 0.0156, X: 0.0156, Y: 0.0156, Z: 0.0313,
  "0": 0.0313, "1": 0.0313, "2": 0.0313, "3": 0.0313, "4": 0.0156, "5": 0.0313, "6": 0.0313, "7": 0.0469,
  "8": 0.0313, "9": 0.0313,
};

/** The left side bearing of a title's first letter, in em (titles are set in capitals) */
export const bearing = (title: string) => BEARING[title.trim().charAt(0).toUpperCase()] ?? 0.03;

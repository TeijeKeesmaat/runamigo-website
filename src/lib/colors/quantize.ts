import type { RGBColor } from "color-diff";
import { mapPixelToSubset, getPaletteArray, PALETTE } from "./pixelhobby-palette";

/**
 * Reduce a color-mapped pattern grid to use at most `maxColors` Pixelhobby colors.
 * Uses frequency-based selection: keeps the most-used colors, remaps the rest.
 */
export function quantizePattern(
  grid: number[][],
  maxColors: number
): number[][] {
  // Count frequency of each color
  const freq = new Map<string, number>();
  for (const row of grid) {
    for (const colorNum of row) {
      const key = String(colorNum);
      freq.set(key, (freq.get(key) || 0) + 1);
    }
  }

  // If already within limit, return as-is
  if (freq.size <= maxColors) return grid;

  // Sort by frequency, keep top N
  const sorted = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);
  const keepColors = new Set(sorted.slice(0, maxColors).map(([k]) => k));

  // Build subset palette for remapping
  const paletteArr = getPaletteArray();
  const subsetPalette = paletteArr.filter((c) => keepColors.has(c.number));

  // Remap colors not in the keep set
  const remapCache = new Map<string, string>();

  return grid.map((row) =>
    row.map((colorNum) => {
      const key = String(colorNum);
      if (keepColors.has(key)) return colorNum;

      if (!remapCache.has(key)) {
        const color = PALETTE.get(key);
        if (color) {
          remapCache.set(
            key,
            mapPixelToSubset(color.r, color.g, color.b, subsetPalette)
          );
        } else {
          remapCache.set(key, sorted[0][0]); // fallback to most common
        }
      }
      return Number(remapCache.get(key)!);
    })
  );
}

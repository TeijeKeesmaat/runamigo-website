import colorsData from "@/data/pixelhobby-colors.json";
import type { PixelhobbyColor } from "@/types/pattern";
import { closest, type RGBColor } from "color-diff";

// Type the imported JSON
const rawColors = colorsData as Record<
  string,
  { hex: string; r: number; g: number; b: number; name?: string }
>;

// Build typed palette
export const PALETTE: Map<string, PixelhobbyColor> = new Map();
const paletteArray: (RGBColor & { number: string })[] = [];

for (const [num, color] of Object.entries(rawColors)) {
  PALETTE.set(num, {
    number: num,
    hex: color.hex,
    r: color.r,
    g: color.g,
    b: color.b,
    name: color.name,
  });
  paletteArray.push({ R: color.r, G: color.g, B: color.b, number: num });
}

/**
 * Map a single RGB pixel to the nearest Pixelhobby color using CIEDE2000.
 */
export function mapPixelToColor(r: number, g: number, b: number): string {
  const target: RGBColor = { R: r, G: g, B: b };
  const match = closest(target, paletteArray) as RGBColor & { number: string };
  return match.number;
}

/**
 * Map a single RGB pixel to the nearest color from a given subset palette.
 */
export function mapPixelToSubset(
  r: number,
  g: number,
  b: number,
  subset: (RGBColor & { number: string })[]
): string {
  const target: RGBColor = { R: r, G: g, B: b };
  const match = closest(target, subset) as RGBColor & { number: string };
  return match.number;
}

/**
 * Get the full palette as an array for color-diff operations.
 */
export function getPaletteArray() {
  return paletteArray;
}

export function getColor(number: string): PixelhobbyColor | undefined {
  return PALETTE.get(number);
}

export function getAllColors(): PixelhobbyColor[] {
  return Array.from(PALETTE.values());
}

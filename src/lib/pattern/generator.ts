import { mapPixelToColor } from "@/lib/colors/pixelhobby-palette";
import { quantizePattern } from "@/lib/colors/quantize";
import { calculateMaterials } from "./materials";
import type { PatternData, MaterialsList } from "@/types/pattern";

/**
 * Convert raw RGBA image data into a Pixelhobby pattern.
 * @param imageData - Flat array of RGBA values (r,g,b,a,r,g,b,a,...)
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @param maxColors - Maximum number of Pixelhobby colors to use
 */
export function imageToPattern(
  imageData: Uint8Array | number[],
  width: number,
  height: number,
  maxColors?: number
): { pattern: PatternData; materials: MaterialsList } {
  // Step 1: Map each pixel to nearest Pixelhobby color
  const grid: number[][] = [];

  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = imageData[idx];
      const g = imageData[idx + 1];
      const b = imageData[idx + 2];
      // Skip alpha - treat as opaque
      const colorNum = mapPixelToColor(r, g, b);
      row.push(Number(colorNum));
    }
    grid.push(row);
  }

  // Step 2: Quantize if maxColors is set
  const finalGrid = maxColors ? quantizePattern(grid, maxColors) : grid;

  // Step 3: Calculate materials
  const pattern: PatternData = { grid: finalGrid, width, height };
  const materials = calculateMaterials(finalGrid);

  return { pattern, materials };
}

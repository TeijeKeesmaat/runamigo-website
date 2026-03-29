import { PALETTE } from "@/lib/colors/pixelhobby-palette";
import { PIXELS_PER_SQUARE, PRICE_PER_SQUARE } from "./formats";
import type { MaterialsList, MaterialItem } from "@/types/pattern";

/**
 * Calculate the materials list from a pattern grid.
 */
export function calculateMaterials(grid: number[][]): MaterialsList {
  const counts = new Map<string, number>();

  for (const row of grid) {
    for (const colorNum of row) {
      const key = String(colorNum);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }

  const items: MaterialItem[] = [];
  let totalSquares = 0;

  for (const [colorNumber, pixelCount] of Array.from(counts.entries())) {
    const color = PALETTE.get(colorNumber);
    const squaresNeeded = Math.ceil(pixelCount / PIXELS_PER_SQUARE);
    totalSquares += squaresNeeded;

    items.push({
      colorNumber,
      hex: color?.hex || "#000000",
      pixelCount,
      squaresNeeded,
      estimatedPrice: Number((squaresNeeded * PRICE_PER_SQUARE).toFixed(2)),
    });
  }

  // Sort by pixel count descending
  items.sort((a, b) => b.pixelCount - a.pixelCount);

  return {
    items,
    totalSquares,
    totalEstimatedPrice: Number(
      (totalSquares * PRICE_PER_SQUARE).toFixed(2)
    ),
  };
}

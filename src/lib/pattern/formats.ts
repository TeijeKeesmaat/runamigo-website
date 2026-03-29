import formatsData from "@/data/formats.json";
import type { Format } from "@/types/pattern";

export const FORMATS: Format[] = formatsData;

export function getFormat(key: string): Format | undefined {
  return FORMATS.find((f) => f.key === key);
}

export const FREE_FORMATS = FORMATS.filter(
  (f) => f.baseplatesH * f.baseplatesV <= 1
);

export const PIXELS_PER_SQUARE = 140;
export const PRICE_PER_SQUARE = 0.34;
export const BASEPLATE_WIDTH = 50;
export const BASEPLATE_HEIGHT = 40;

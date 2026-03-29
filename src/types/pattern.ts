export interface PixelhobbyColor {
  number: string;
  hex: string;
  r: number;
  g: number;
  b: number;
  name?: string;
}

export interface Format {
  key: string;
  name: string;
  baseplatesH: number;
  baseplatesV: number;
  width: number;
  height: number;
  totalPixels: number;
}

export type Style = "cute" | "retro" | "realistic" | "abstract" | "minimal";

export interface PatternData {
  grid: number[][]; // 2D array of color numbers [row][col]
  width: number;
  height: number;
}

export interface MaterialItem {
  colorNumber: string;
  hex: string;
  pixelCount: number;
  squaresNeeded: number;
  estimatedPrice: number;
}

export interface MaterialsList {
  items: MaterialItem[];
  totalSquares: number;
  totalEstimatedPrice: number;
}

export interface Pattern {
  id: string;
  title: string;
  prompt?: string;
  sourceType: "ai" | "photo" | "gallery";
  formatKey: string;
  width: number;
  height: number;
  baseplatesH: number;
  baseplatesV: number;
  colorCount: number;
  patternData: PatternData;
  materials: MaterialsList;
  previewUrl?: string;
  createdAt: string;
}

export interface GenerateRequest {
  prompt: string;
  format: string;
  style: Style;
  maxColors: number;
}

export interface ConvertRequest {
  format: string;
  maxColors: number;
}

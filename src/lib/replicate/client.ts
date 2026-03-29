import Replicate from "replicate";
import type { Style } from "@/types/pattern";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const STYLE_MODIFIERS: Record<Style, string> = {
  cute: "kawaii style, cute, rounded shapes, soft colors, adorable",
  retro: "retro 8-bit style, classic video game aesthetic, bold colors",
  realistic: "detailed pixel art, realistic proportions, shading",
  abstract: "abstract geometric pixel art, bold patterns, vibrant",
  minimal: "minimalist pixel art, simple shapes, limited palette, clean",
};

export function enhancePrompt(userPrompt: string, style: Style): string {
  return `${userPrompt}, ${STYLE_MODIFIERS[style]}, pixel art, clean pixel grid, no anti-aliasing, crisp edges, on solid background`;
}

export async function generatePixelArt(
  prompt: string,
  width: number,
  height: number,
  style: Style
): Promise<string> {
  const enhancedPrompt = enhancePrompt(prompt, style);

  const output = await replicate.run("retro-diffusion/rd-plus", {
    input: {
      prompt: enhancedPrompt,
      width,
      height,
      num_inference_steps: 25,
      guidance_scale: 7.5,
    },
  });

  // Replicate returns either a string URL or array of URLs
  if (Array.isArray(output)) {
    return String(output[0]);
  }
  return String(output);
}

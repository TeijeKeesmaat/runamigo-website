import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { generatePixelArt } from "@/lib/replicate/client";
import { imageToPattern } from "@/lib/pattern/generator";
import { getFormat } from "@/lib/pattern/formats";
import { checkGenerationLimit, incrementGenerations } from "@/lib/auth";
import sharp from "sharp";
import type { Style } from "@/types/pattern";

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, format: formatKey, style, maxColors } = body;

    if (!prompt || !formatKey || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check usage limits
    const { allowed, remaining } = await checkGenerationLimit();
    if (!allowed) {
      return NextResponse.json(
        {
          error: "Daily generation limit reached. Upgrade to Pro for unlimited.",
          remaining: 0,
        },
        { status: 429 }
      );
    }

    // Get format dimensions
    const fmt = getFormat(formatKey);
    if (!fmt) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    // Generate pixel art via Replicate
    const imageUrl = await generatePixelArt(
      prompt,
      fmt.width,
      fmt.height,
      style as Style
    );

    // Download the generated image and extract pixel data
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Resize to exact format dimensions and extract raw RGBA pixels
    const { data: rawPixels, info } = await sharp(imageBuffer)
      .resize(fmt.width, fmt.height, { fit: "fill" })
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Convert to Pixelhobby pattern
    const { pattern, materials } = imageToPattern(
      rawPixels,
      info.width,
      info.height,
      maxColors || undefined
    );

    // Save pattern to database
    const title = prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt;
    const { data: patternRow, error: dbError } = await supabase
      .from("patterns")
      .insert({
        user_id: user.id,
        title,
        prompt,
        source_type: "ai",
        format_key: formatKey,
        width_pixels: fmt.width,
        height_pixels: fmt.height,
        baseplates_h: fmt.baseplatesH,
        baseplates_v: fmt.baseplatesV,
        color_count: materials.items.length,
        pattern_data: { grid: pattern.grid },
        materials_list: Object.fromEntries(
          materials.items.map((m) => [m.colorNumber, m.pixelCount])
        ),
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        { error: "Failed to save pattern" },
        { status: 500 }
      );
    }

    // Increment usage counter
    await incrementGenerations();

    return NextResponse.json({
      patternId: patternRow.id,
      width: fmt.width,
      height: fmt.height,
      colorCount: materials.items.length,
      pattern: pattern.grid,
      materials,
      remaining: remaining - 1,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}

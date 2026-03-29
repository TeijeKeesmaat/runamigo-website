import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { imageToPattern } from "@/lib/pattern/generator";
import { getFormat } from "@/lib/pattern/formats";
import { checkGenerationLimit, incrementGenerations } from "@/lib/auth";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;
    const formatKey = formData.get("format") as string;
    const maxColors = Number(formData.get("maxColors")) || undefined;

    if (!file || !formatKey) {
      return NextResponse.json(
        { error: "Missing image or format" },
        { status: 400 }
      );
    }

    // Check usage limits
    const { allowed, remaining } = await checkGenerationLimit();
    if (!allowed) {
      return NextResponse.json(
        { error: "Daily limit reached. Upgrade to Pro for unlimited.", remaining: 0 },
        { status: 429 }
      );
    }

    const fmt = getFormat(formatKey);
    if (!fmt) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    // Process uploaded image
    const buffer = Buffer.from(await file.arrayBuffer());
    const { data: rawPixels, info } = await sharp(buffer)
      .resize(fmt.width, fmt.height, { fit: "cover" })
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Convert to Pixelhobby pattern
    const { pattern, materials } = imageToPattern(
      rawPixels,
      info.width,
      info.height,
      maxColors
    );

    // Save to database
    const title = file.name.replace(/\.[^.]+$/, "").substring(0, 50);
    const { data: patternRow, error: dbError } = await supabase
      .from("patterns")
      .insert({
        user_id: user.id,
        title,
        source_type: "photo",
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
    console.error("Convert error:", error);
    return NextResponse.json(
      { error: "Conversion failed. Please try again." },
      { status: 500 }
    );
  }
}

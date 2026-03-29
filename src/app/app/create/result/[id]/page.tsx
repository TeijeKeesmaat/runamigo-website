"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PatternCanvas from "@/components/pattern/PatternCanvas";
import MaterialsList from "@/components/pattern/MaterialsList";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ArrowLeft, Download, FileText, Share2 } from "lucide-react";
import Link from "next/link";
import type { MaterialsList as MaterialsListType } from "@/types/pattern";
import { createClient } from "@/lib/supabase/client";
import { calculateMaterials } from "@/lib/pattern/materials";
import { getFormat } from "@/lib/pattern/formats";

interface PatternState {
  title: string;
  grid: number[][];
  width: number;
  height: number;
  formatKey: string;
  materials: MaterialsListType;
  baseplatesH: number;
  baseplatesV: number;
  colorCount: number;
}

export default function PatternResultPage() {
  const { id } = useParams();
  const [pattern, setPattern] = useState<PatternState | null>(null);
  const [loading, setLoading] = useState(true);
  const [highlightColor, setHighlightColor] = useState<string | null>(null);

  useEffect(() => {
    async function loadPattern() {
      const supabase = createClient();
      const { data } = await supabase
        .from("patterns")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        const grid = data.pattern_data.grid;
        const materials = calculateMaterials(grid);
        const fmt = getFormat(data.format_key);

        setPattern({
          title: data.title,
          grid,
          width: data.width_pixels,
          height: data.height_pixels,
          formatKey: data.format_key,
          materials,
          baseplatesH: data.baseplates_h,
          baseplatesV: data.baseplates_v,
          colorCount: data.color_count,
        });
      }
      setLoading(false);
    }

    loadPattern();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="text-center py-20">
        <p className="text-secondary-400">Pattern not found</p>
        <Link href="/app/create" className="mt-4 inline-block">
          <Button variant="outline">Create a new pattern</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link
            href="/app"
            className="mb-2 inline-flex items-center gap-1 text-sm text-secondary-400 hover:text-secondary"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <h1 className="font-heading text-2xl font-bold text-secondary">
            {pattern.title}
          </h1>
          <p className="mt-1 text-sm text-secondary-400">
            {pattern.width}x{pattern.height} &middot;{" "}
            {pattern.baseplatesH}x{pattern.baseplatesV} baseplates &middot;{" "}
            {pattern.colorCount} colors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 size={14} className="mr-1.5" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-1.5" />
            PNG
          </Button>
          <Button size="sm">
            <FileText size={14} className="mr-1.5" />
            PDF (Pro)
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Canvas */}
        <Card className="h-[600px] p-2">
          <PatternCanvas
            grid={pattern.grid}
            width={pattern.width}
            height={pattern.height}
            onHoverColor={setHighlightColor}
            highlightColor={highlightColor}
          />
        </Card>

        {/* Materials sidebar */}
        <Card className="p-4 h-[600px] overflow-hidden flex flex-col">
          <MaterialsList
            materials={pattern.materials}
            highlightColor={highlightColor}
            onColorClick={(c) =>
              setHighlightColor(c === highlightColor ? null : c)
            }
          />
        </Card>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { Style } from "@/types/pattern";
import { Heart, Gamepad2, Camera, Shapes, Minus } from "lucide-react";

const STYLES: { key: Style; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: "cute", label: "Cute", icon: <Heart size={20} />, desc: "Kawaii & adorable" },
  { key: "retro", label: "Retro", icon: <Gamepad2 size={20} />, desc: "8-bit classic" },
  { key: "realistic", label: "Realistic", icon: <Camera size={20} />, desc: "Detailed" },
  { key: "abstract", label: "Abstract", icon: <Shapes size={20} />, desc: "Geometric" },
  { key: "minimal", label: "Minimal", icon: <Minus size={20} />, desc: "Simple & clean" },
];

interface StyleSelectorProps {
  value: Style;
  onChange: (style: Style) => void;
}

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {STYLES.map((style) => (
        <button
          key={style.key}
          type="button"
          onClick={() => onChange(style.key)}
          className={cn(
            "flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 transition-all",
            value === style.key
              ? "border-primary bg-primary/5 text-primary"
              : "border-secondary/10 text-secondary-500 hover:border-secondary/20"
          )}
        >
          {style.icon}
          <div className="text-left">
            <div className="text-sm font-medium">{style.label}</div>
            <div className="text-[10px] opacity-60">{style.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

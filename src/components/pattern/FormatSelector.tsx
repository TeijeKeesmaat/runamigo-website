"use client";

import { FORMATS } from "@/lib/pattern/formats";
import { cn } from "@/lib/utils";
import type { Format } from "@/types/pattern";

interface FormatSelectorProps {
  value: string;
  onChange: (key: string) => void;
  proOnly?: boolean;
}

export default function FormatSelector({
  value,
  onChange,
  proOnly = false,
}: FormatSelectorProps) {
  const isFreeFormat = (f: Format) => f.baseplatesH * f.baseplatesV <= 1;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {FORMATS.map((format) => {
        const disabled = !proOnly && !isFreeFormat(format);
        return (
          <button
            key={format.key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(format.key)}
            className={cn(
              "relative flex flex-col items-center rounded-xl border-2 p-3 text-center transition-all",
              value === format.key
                ? "border-primary bg-primary/5"
                : "border-secondary/10 hover:border-secondary/20",
              disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {/* Visual representation of baseplate grid */}
            <div
              className="mb-2 grid gap-0.5"
              style={{
                gridTemplateColumns: `repeat(${format.baseplatesH}, 1fr)`,
              }}
            >
              {Array.from({
                length: format.baseplatesH * format.baseplatesV,
              }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-3 w-4 rounded-sm",
                    value === format.key ? "bg-primary/30" : "bg-secondary/10"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-secondary">
              {format.name}
            </span>
            <span className="text-[10px] text-secondary-400">
              {format.width}x{format.height}
            </span>
            {disabled && (
              <span className="absolute -top-1 -right-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                PRO
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

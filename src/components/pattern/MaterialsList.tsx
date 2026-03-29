"use client";

import type { MaterialsList as MaterialsListType } from "@/types/pattern";
import { cn } from "@/lib/utils";

interface MaterialsListProps {
  materials: MaterialsListType;
  highlightColor?: string | null;
  onColorClick?: (colorNumber: string) => void;
}

export default function MaterialsList({
  materials,
  highlightColor,
  onColorClick,
}: MaterialsListProps) {
  return (
    <div className="flex flex-col">
      <h3 className="font-heading text-lg font-semibold text-secondary mb-3">
        Materials
      </h3>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary/10 text-left text-xs text-secondary-400">
              <th className="pb-2 font-medium">Color</th>
              <th className="pb-2 font-medium text-right">Pixels</th>
              <th className="pb-2 font-medium text-right">Squares</th>
              <th className="pb-2 font-medium text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {materials.items.map((item) => (
              <tr
                key={item.colorNumber}
                onClick={() => onColorClick?.(item.colorNumber)}
                className={cn(
                  "cursor-pointer border-b border-secondary/5 transition-colors hover:bg-primary/5",
                  highlightColor === item.colorNumber && "bg-primary/10"
                )}
              >
                <td className="py-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-5 w-5 rounded border border-secondary/10 flex-shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="font-mono text-xs text-secondary-600">
                      #{item.colorNumber}
                    </span>
                  </div>
                </td>
                <td className="py-1.5 text-right font-mono text-secondary-500">
                  {item.pixelCount}
                </td>
                <td className="py-1.5 text-right font-mono text-secondary-500">
                  {item.squaresNeeded}
                </td>
                <td className="py-1.5 text-right font-mono text-secondary-500">
                  &euro;{item.estimatedPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-3 border-t border-secondary/10 pt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Colors used</span>
          <span className="font-medium text-secondary">
            {materials.items.length}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-secondary-500">Total squares</span>
          <span className="font-medium text-secondary">
            {materials.totalSquares}
          </span>
        </div>
        <div className="flex justify-between text-sm font-medium">
          <span className="text-secondary">Estimated cost</span>
          <span className="text-primary">
            &euro;{materials.totalEstimatedPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PALETTE } from "@/lib/colors/pixelhobby-palette";
import { BASEPLATE_WIDTH, BASEPLATE_HEIGHT } from "@/lib/pattern/formats";

interface PatternCanvasProps {
  grid: number[][];
  width: number;
  height: number;
  onHoverColor?: (colorNumber: string | null) => void;
  highlightColor?: string | null;
}

const CELL_SIZE = 12;
const GRID_COLOR = "rgba(0,0,0,0.08)";
const THICK_GRID_COLOR = "rgba(0,0,0,0.2)";
const BASEPLATE_COLOR = "rgba(255,107,53,0.4)";

export default function PatternCanvas({
  grid,
  width,
  height,
  onHoverColor,
  highlightColor,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    color: string;
    hex: string;
  } | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    const cellSize = CELL_SIZE;

    // Draw pixels
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const colorNum = String(grid[y]?.[x] || 0);
        const color = PALETTE.get(colorNum);
        const hex = color?.hex || "#000000";

        if (highlightColor && colorNum !== highlightColor) {
          ctx.fillStyle = hex + "40"; // dimmed
        } else {
          ctx.fillStyle = hex;
        }
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    // Grid lines
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, height * cellSize);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(width * cellSize, y * cellSize);
      ctx.stroke();
    }

    // Thick grid every 10 pixels
    ctx.strokeStyle = THICK_GRID_COLOR;
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x * cellSize, 0);
      ctx.lineTo(x * cellSize, height * cellSize);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y * cellSize);
      ctx.lineTo(width * cellSize, y * cellSize);
      ctx.stroke();
    }

    // Baseplate boundaries (dashed)
    ctx.strokeStyle = BASEPLATE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    for (let bx = BASEPLATE_WIDTH; bx < width; bx += BASEPLATE_WIDTH) {
      ctx.beginPath();
      ctx.moveTo(bx * cellSize, 0);
      ctx.lineTo(bx * cellSize, height * cellSize);
      ctx.stroke();
    }
    for (let by = BASEPLATE_HEIGHT; by < height; by += BASEPLATE_HEIGHT) {
      ctx.beginPath();
      ctx.moveTo(0, by * cellSize);
      ctx.lineTo(width * cellSize, by * cellSize);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.restore();
  }, [grid, width, height, zoom, offset, highlightColor]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Fit canvas to container on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fitZoom = Math.min(
      container.clientWidth / (width * CELL_SIZE),
      container.clientHeight / (height * CELL_SIZE),
      2
    );
    setZoom(Math.max(0.5, fitZoom));
  }, [width, height]);

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.min(Math.max(z * delta, 0.2), 8));
  }

  function handleMouseDown(e: React.MouseEvent) {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (dragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      return;
    }

    // Hover detection
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - offset.x) / zoom;
    const my = (e.clientY - rect.top - offset.y) / zoom;
    const px = Math.floor(mx / CELL_SIZE);
    const py = Math.floor(my / CELL_SIZE);

    if (px >= 0 && px < width && py >= 0 && py < height) {
      const colorNum = String(grid[py]?.[px] || 0);
      const color = PALETTE.get(colorNum);
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color: colorNum,
        hex: color?.hex || "#000",
      });
      onHoverColor?.(colorNum);
    } else {
      setTooltip(null);
      onHoverColor?.(null);
    }
  }

  function handleMouseUp() {
    setDragging(false);
  }

  function handleMouseLeave() {
    setDragging(false);
    setTooltip(null);
    onHoverColor?.(null);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-xl border border-secondary/10 bg-white cursor-grab active:cursor-grabbing"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 flex items-center gap-2 rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-white shadow-lg"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 10,
          }}
        >
          <div
            className="h-3 w-3 rounded-sm border border-white/30"
            style={{ backgroundColor: tooltip.hex }}
          />
          <span className="font-mono font-medium">#{tooltip.color}</span>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 shadow-sm border border-secondary/10">
        <button
          onClick={() => setZoom((z) => Math.max(z * 0.8, 0.2))}
          className="px-1.5 py-0.5 text-secondary-500 hover:text-secondary"
        >
          -
        </button>
        <span className="text-xs font-mono text-secondary-400 min-w-[3rem] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.2, 8))}
          className="px-1.5 py-0.5 text-secondary-500 hover:text-secondary"
        >
          +
        </button>
      </div>
    </div>
  );
}

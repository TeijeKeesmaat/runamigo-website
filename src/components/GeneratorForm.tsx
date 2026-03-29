"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import FormatSelector from "@/components/pattern/FormatSelector";
import StyleSelector from "@/components/pattern/StyleSelector";
import { Sparkles, Upload, Loader2 } from "lucide-react";
import type { Style } from "@/types/pattern";

export default function GeneratorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "photo" ? "photo" : "ai";

  const [tab, setTab] = useState<"ai" | "photo">(initialTab);
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("small_landscape");
  const [style, setStyle] = useState<Style>("cute");
  const [maxColors, setMaxColors] = useState("32");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAIGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          format,
          style,
          maxColors: Number(maxColors),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push(`/app/create/result/${data.patternId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handlePhotoConvert(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("format", format);
      formData.append("maxColors", maxColors);

      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push(`/app/create/result/${data.patternId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-heading text-3xl font-bold text-secondary">
        Create Pattern
      </h1>
      <p className="mt-2 text-secondary-400">
        Generate a Pixelhobby pattern using AI or upload a photo.
      </p>

      {/* Tab switcher */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setTab("ai")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            tab === "ai"
              ? "bg-primary text-white"
              : "bg-secondary/5 text-secondary-500 hover:bg-secondary/10"
          }`}
        >
          <Sparkles size={16} />
          AI Generator
        </button>
        <button
          onClick={() => setTab("photo")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
            tab === "photo"
              ? "bg-primary text-white"
              : "bg-secondary/5 text-secondary-500 hover:bg-secondary/10"
          }`}
        >
          <Upload size={16} />
          Photo Upload
        </button>
      </div>

      <Card className="mt-4 p-6">
        <form onSubmit={tab === "ai" ? handleAIGenerate : handlePhotoConvert}>
          {/* AI prompt input */}
          {tab === "ai" && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-secondary">
                Describe your pattern
              </label>
              <Input
                placeholder="e.g., a cute orange cat sitting on a windowsill"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
          )}

          {/* Photo upload */}
          {tab === "photo" && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-secondary">
                Upload a photo
              </label>
              <div
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-secondary/20 p-8 text-center hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() =>
                  document.getElementById("photo-input")?.click()
                }
              >
                <Upload
                  size={32}
                  className="mb-2 text-secondary-300"
                />
                {file ? (
                  <p className="text-sm text-secondary">{file.name}</p>
                ) : (
                  <p className="text-sm text-secondary-400">
                    Click or drag a photo here
                  </p>
                )}
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          )}

          {/* Style selector (AI only) */}
          {tab === "ai" && (
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-secondary">
                Style
              </label>
              <StyleSelector value={style} onChange={setStyle} />
            </div>
          )}

          {/* Format selector */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-secondary">
              Frame format
            </label>
            <FormatSelector value={format} onChange={setFormat} />
          </div>

          {/* Max colors */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-secondary">
              Maximum colors
            </label>
            <Select
              value={maxColors}
              onChange={(e) => setMaxColors(e.target.value)}
            >
              <option value="8">8 colors</option>
              <option value="16">16 colors</option>
              <option value="32">32 colors</option>
              <option value="64">64 colors (Pro)</option>
              <option value="144">144 colors (Pro)</option>
            </Select>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading || (tab === "ai" && !prompt) || (tab === "photo" && !file)}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                {tab === "ai" ? "Generating..." : "Converting..."}
              </>
            ) : (
              <>
                <Sparkles size={20} className="mr-2" />
                {tab === "ai" ? "Generate Pattern" : "Convert to Pattern"}
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

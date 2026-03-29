"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Sparkles, Trash2 } from "lucide-react";
import type { PatternRow } from "@/types/database";

export default function MyPatternsPage() {
  const [patterns, setPatterns] = useState<PatternRow[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("patterns")
        .select("*")
        .order("created_at", { ascending: false });
      setPatterns(data || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading text-3xl font-bold text-secondary">My Patterns</h1>
      <p className="mt-2 text-secondary-400">
        All your generated and converted patterns.
      </p>

      {patterns.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-secondary/10 p-12 text-center">
          <p className="text-secondary-300">No patterns yet</p>
          <Link href="/app/create" className="mt-3 inline-block">
            <Button size="sm" variant="outline">
              <Sparkles size={14} className="mr-1.5" />
              Create your first pattern
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((p) => (
            <Link key={p.id} href={`/app/create/result/${p.id}`}>
              <Card hover className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-secondary-400 capitalize">
                    {p.source_type}
                  </span>
                  <span className="text-xs text-secondary-300">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-secondary truncate">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-secondary-400">
                  {p.width_pixels}x{p.height_pixels} &middot; {p.color_count} colors
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

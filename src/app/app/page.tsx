import Link from "next/link";
import { Sparkles, Image, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading text-3xl font-bold text-secondary">
        Welcome to PixelCraft AI
      </h1>
      <p className="mt-2 text-secondary-400">
        Create beautiful Pixelhobby patterns with AI or from your photos.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card hover className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="text-primary" size={24} />
          </div>
          <h2 className="font-heading text-xl font-semibold text-secondary">
            AI Generator
          </h2>
          <p className="mt-2 text-sm text-secondary-400">
            Describe what you want and AI creates a pixel art pattern mapped to
            Pixelhobby colors.
          </p>
          <Link href="/app/create" className="mt-4 inline-block">
            <Button size="sm">
              Start creating
              <ArrowRight size={16} className="ml-1.5" />
            </Button>
          </Link>
        </Card>

        <Card hover className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <Image className="text-accent" size={24} />
          </div>
          <h2 className="font-heading text-xl font-semibold text-secondary">
            Photo Converter
          </h2>
          <p className="mt-2 text-sm text-secondary-400">
            Upload any photo and convert it into a Pixelhobby pattern with a
            materials list.
          </p>
          <Link href="/app/create?tab=photo" className="mt-4 inline-block">
            <Button size="sm" variant="outline">
              Upload photo
              <ArrowRight size={16} className="ml-1.5" />
            </Button>
          </Link>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-xl font-semibold text-secondary">
          Recent Patterns
        </h2>
        <p className="mt-2 text-sm text-secondary-400">
          Your generated patterns will appear here.
        </p>
        <div className="mt-4 rounded-2xl border-2 border-dashed border-secondary/10 p-12 text-center">
          <p className="text-secondary-300">No patterns yet</p>
          <Link href="/app/create" className="mt-3 inline-block">
            <Button size="sm" variant="outline">
              Create your first pattern
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Card from "@/components/ui/Card";
import { Image } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-heading text-3xl font-bold text-secondary">Gallery</h1>
      <p className="mt-2 text-secondary-400">
        Browse pre-made Pixelhobby patterns ready to use.
      </p>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-secondary/10 p-16 text-center">
        <Image size={48} className="mx-auto mb-4 text-secondary-200" />
        <h2 className="font-heading text-xl font-semibold text-secondary-400">
          Coming soon
        </h2>
        <p className="mt-2 text-sm text-secondary-300">
          A curated collection of pixel art patterns will be available here.
        </p>
      </div>
    </div>
  );
}

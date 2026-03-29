import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-secondary/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Sparkles size={16} />
              </div>
              <span className="font-heading text-lg font-semibold text-secondary">
                PixelCraft AI
              </span>
            </div>
            <p className="text-sm text-secondary-400 max-w-sm">
              Create beautiful Pixelhobby patterns from text prompts or photos
              using AI. Get color-mapped patterns and materials lists instantly.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-medium text-secondary mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-secondary-400">
              <li>
                <Link href="/app/create" className="hover:text-secondary transition-colors">
                  AI Generator
                </Link>
              </li>
              <li>
                <Link href="/app/gallery" className="hover:text-secondary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-secondary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-medium text-secondary mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary-400">
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary/10 pt-8 text-center text-xs text-secondary-300">
          <p>
            PixelCraft AI is an independent tool and is not affiliated with,
            endorsed by, or connected to Pixelhobby B.V. &quot;Pixelhobby&quot; is a
            registered trademark of Pixelhobby B.V. This tool helps hobbyists
            design patterns compatible with Pixelhobby products.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} PixelCraft AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

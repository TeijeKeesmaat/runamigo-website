"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "./ui/Button";

interface NavbarProps {
  isApp?: boolean;
}

export default function Navbar({ isApp = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-secondary/10 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Sparkles size={20} />
          </div>
          <span className="font-heading text-xl font-semibold text-secondary">
            PixelCraft <span className="text-primary">AI</span>
          </span>
        </Link>

        {!isApp && (
          <>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/#features"
                className="text-sm text-secondary-600 hover:text-secondary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-secondary-600 hover:text-secondary transition-colors"
              >
                Pricing
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/app/create">
                <Button size="sm">Start creating</Button>
              </Link>
            </div>

            <button
              className="md:hidden text-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}

        {isApp && (
          <div className="flex items-center gap-4">
            <Link href="/app/create">
              <Button size="sm">
                <Sparkles size={16} className="mr-1.5" />
                Create
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && !isApp && (
        <div className="border-t border-secondary/10 bg-white p-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/#features" className="py-2 text-secondary-600">
              Features
            </Link>
            <Link href="/pricing" className="py-2 text-secondary-600">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/app/create">
              <Button className="w-full">Start creating</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check, X } from "lucide-react";

const FEATURES = [
  { name: "AI generations", free: "3/day", pro: "Unlimited" },
  { name: "Photo conversions", free: "3/day", pro: "Unlimited" },
  { name: "Maximum colors", free: "32", pro: "144 (all)" },
  { name: "Maximum format", free: "1 baseplate", pro: "Unlimited" },
  { name: "PDF export", free: false, pro: true },
  { name: "High-res PNG", free: false, pro: true },
  { name: "Gallery downloads", free: false, pro: true },
  { name: "Watermark-free", free: false, pro: true },
];

export default function PricingPage() {
  async function handleCheckout(plan: "monthly" | "yearly") {
    const priceId =
      plan === "monthly"
        ? process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
        : process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID;

    // This would be a real API call — shown as placeholder
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <>
      <Navbar />
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold text-secondary">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-lg text-secondary-400">
            Start free, upgrade when you need more.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Free tier */}
          <Card className="p-8">
            <h3 className="font-heading text-xl font-semibold text-secondary">
              Free
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-secondary">&euro;0</span>
              <span className="text-secondary-400">/month</span>
            </div>
            <p className="mt-2 text-sm text-secondary-400">
              Perfect for trying out PixelCraft AI.
            </p>
            <Button variant="outline" className="mt-6 w-full">
              Get started free
            </Button>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  {f.free === false ? (
                    <X size={16} className="text-secondary-200" />
                  ) : (
                    <Check size={16} className="text-accent" />
                  )}
                  <span className="text-secondary-600">{f.name}</span>
                  {typeof f.free === "string" && (
                    <span className="ml-auto text-xs text-secondary-400">
                      {f.free}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          {/* Pro tier */}
          <Card className="relative border-2 border-primary p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white">
              MOST POPULAR
            </div>
            <h3 className="font-heading text-xl font-semibold text-secondary">
              Pro
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-secondary">
                &euro;4.99
              </span>
              <span className="text-secondary-400">/month</span>
            </div>
            <p className="mt-1 text-xs text-secondary-400">
              or &euro;39.99/year (save 33%)
            </p>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1" onClick={() => handleCheckout("monthly")}>
                Monthly
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleCheckout("yearly")}
              >
                Yearly
              </Button>
            </div>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((f) => (
                <li key={f.name} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-accent" />
                  <span className="text-secondary-600">{f.name}</span>
                  {typeof f.pro === "string" && (
                    <span className="ml-auto text-xs font-medium text-primary">
                      {f.pro}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

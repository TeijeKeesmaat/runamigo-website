"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { LogOut, CreditCard, Crown } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  async function handleManageSubscription() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // ignore
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-3xl font-bold text-secondary">Settings</h1>

      <Card className="mt-8 p-6">
        <h2 className="font-heading text-lg font-semibold text-secondary mb-4">
          Subscription
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="primary">
            <Crown size={12} className="mr-1" />
            Free Plan
          </Badge>
          <span className="text-sm text-secondary-400">
            3 generations per day
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleManageSubscription}
            disabled={loading}
          >
            <CreditCard size={14} className="mr-1.5" />
            Manage subscription
          </Button>
        </div>
      </Card>

      <Card className="mt-4 p-6">
        <h2 className="font-heading text-lg font-semibold text-secondary mb-4">
          Account
        </h2>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut size={14} className="mr-1.5" />
          Sign out
        </Button>
      </Card>
    </div>
  );
}

import { createServerSupabase } from "./supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/types/database";

export async function getUser() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createServerSupabase();
  const user = await getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as Profile | null;
}

export async function isPro(): Promise<boolean> {
  const profile = await getProfile();
  return profile?.subscription_status === "pro";
}

export async function checkGenerationLimit(): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  const profile = await getProfile();
  if (!profile) return { allowed: false, remaining: 0 };

  if (profile.subscription_status === "pro") {
    return { allowed: true, remaining: Infinity };
  }

  const today = new Date().toISOString().split("T")[0];
  const supabase = createServerSupabase();

  // Reset counter if new day
  if (profile.generations_reset_at !== today) {
    await supabase
      .from("profiles")
      .update({ generations_today: 0, generations_reset_at: today })
      .eq("id", profile.id);
    return { allowed: true, remaining: 3 };
  }

  const remaining = Math.max(0, 3 - profile.generations_today);
  return { allowed: remaining > 0, remaining };
}

export async function incrementGenerations() {
  const supabase = createServerSupabase();
  const user = await getUser();
  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("generations_today")
    .eq("id", user.id)
    .single();

  await supabase
    .from("profiles")
    .update({ generations_today: (profile?.generations_today || 0) + 1 })
    .eq("id", user.id);
}

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a mock client during build/prerender when env vars aren't available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Proxy({} as any, {
      get() {
        return () => ({ data: null, error: { message: "Supabase not configured" } });
      },
    }) as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(url, key);
}

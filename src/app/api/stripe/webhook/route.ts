import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (userId && session.subscription) {
        const subResponse = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = subResponse as any;
        await supabase
          .from("profiles")
          .update({
            subscription_status: "pro",
            subscription_id: sub.id,
            subscription_price_id:
              sub.items?.data?.[0]?.price?.id || null,
            subscription_current_period_end: sub.current_period_end
              ? new Date(sub.current_period_end * 1000).toISOString()
              : null,
          })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.updated": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = event.data.object as any;
      const customerId = sub.customer as string;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (profile) {
        const isActive = ["active", "trialing"].includes(sub.status);
        await supabase
          .from("profiles")
          .update({
            subscription_status: isActive ? "pro" : "cancelled",
            subscription_current_period_end: sub.current_period_end
              ? new Date(sub.current_period_end * 1000).toISOString()
              : null,
          })
          .eq("id", profile.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sub = event.data.object as any;
      const customerId = sub.customer as string;

      await supabase
        .from("profiles")
        .update({
          subscription_status: "free",
          subscription_id: null,
          subscription_price_id: null,
          subscription_current_period_end: null,
        })
        .eq("stripe_customer_id", customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

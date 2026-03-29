export interface Profile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  subscription_status: "free" | "pro" | "cancelled";
  subscription_id: string | null;
  subscription_price_id: string | null;
  subscription_current_period_end: string | null;
  generations_today: number;
  generations_reset_at: string;
  created_at: string;
  updated_at: string;
}

export interface PatternRow {
  id: string;
  user_id: string;
  title: string;
  prompt: string | null;
  source_type: "ai" | "photo" | "gallery";
  format_key: string;
  width_pixels: number;
  height_pixels: number;
  baseplates_h: number;
  baseplates_v: number;
  color_count: number;
  pattern_data: { grid: number[][] };
  materials_list: Record<string, number>;
  preview_url: string | null;
  pattern_pdf_url: string | null;
  is_public: boolean;
  is_gallery: boolean;
  category: string | null;
  tags: string[] | null;
  created_at: string;
}

export type ZincCameType =
  | "h_channel_standard"
  | "u_channel_border"
  | "round_profile_soft"
  | "flat_profile_modern"
  | "reinforced_bar_strong";

const specs: Record<ZincCameType, {
  holdStrength: number; solderEase: number; flexibility: number;
  widthRange: number; cost: number; forBorder: boolean; reinforced: boolean;
  cameProfile: string; use: string;
}> = {
  h_channel_standard: {
    holdStrength: 85, solderEase: 88, flexibility: 82,
    widthRange: 85, cost: 6, forBorder: false, reinforced: false,
    cameProfile: "h_shaped_channel", use: "general_panel_assembly",
  },
  u_channel_border: {
    holdStrength: 88, solderEase: 85, flexibility: 78,
    widthRange: 80, cost: 7, forBorder: true, reinforced: false,
    cameProfile: "u_shaped_edge", use: "panel_border_frame",
  },
  round_profile_soft: {
    holdStrength: 80, solderEase: 82, flexibility: 90,
    widthRange: 78, cost: 5, forBorder: false, reinforced: false,
    cameProfile: "round_face_channel", use: "curved_organic_design",
  },
  flat_profile_modern: {
    holdStrength: 82, solderEase: 85, flexibility: 85,
    widthRange: 82, cost: 6, forBorder: false, reinforced: false,
    cameProfile: "flat_face_channel", use: "clean_modern_line",
  },
  reinforced_bar_strong: {
    holdStrength: 95, solderEase: 78, flexibility: 70,
    widthRange: 75, cost: 9, forBorder: false, reinforced: true,
    cameProfile: "steel_core_channel", use: "large_panel_support",
  },
};

export function holdStrength(t: ZincCameType): number { return specs[t].holdStrength; }
export function solderEase(t: ZincCameType): number { return specs[t].solderEase; }
export function flexibility(t: ZincCameType): number { return specs[t].flexibility; }
export function widthRange(t: ZincCameType): number { return specs[t].widthRange; }
export function cameCost(t: ZincCameType): number { return specs[t].cost; }
export function forBorder(t: ZincCameType): boolean { return specs[t].forBorder; }
export function reinforced(t: ZincCameType): boolean { return specs[t].reinforced; }
export function cameProfile(t: ZincCameType): string { return specs[t].cameProfile; }
export function bestUse(t: ZincCameType): string { return specs[t].use; }
export function zincCames(): ZincCameType[] { return Object.keys(specs) as ZincCameType[]; }

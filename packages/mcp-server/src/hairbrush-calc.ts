export type HairbrushType = "paddle_flat_detangle" | "round_blow_dry_volume" | "boar_bristle_shine" | "wide_tooth_comb_wet" | "vent_quick_dry_style";

export function detangling(t: HairbrushType): number {
  const m: Record<HairbrushType, number> = {
    paddle_flat_detangle: 10, round_blow_dry_volume: 5, boar_bristle_shine: 4, wide_tooth_comb_wet: 9, vent_quick_dry_style: 6,
  };
  return m[t];
}

export function volumeAdd(t: HairbrushType): number {
  const m: Record<HairbrushType, number> = {
    paddle_flat_detangle: 3, round_blow_dry_volume: 10, boar_bristle_shine: 5, wide_tooth_comb_wet: 2, vent_quick_dry_style: 7,
  };
  return m[t];
}

export function shineResult(t: HairbrushType): number {
  const m: Record<HairbrushType, number> = {
    paddle_flat_detangle: 6, round_blow_dry_volume: 7, boar_bristle_shine: 10, wide_tooth_comb_wet: 4, vent_quick_dry_style: 5,
  };
  return m[t];
}

export function gentleness(t: HairbrushType): number {
  const m: Record<HairbrushType, number> = {
    paddle_flat_detangle: 7, round_blow_dry_volume: 5, boar_bristle_shine: 8, wide_tooth_comb_wet: 10, vent_quick_dry_style: 6,
  };
  return m[t];
}

export function brushCost(t: HairbrushType): number {
  const m: Record<HairbrushType, number> = {
    paddle_flat_detangle: 2, round_blow_dry_volume: 4, boar_bristle_shine: 6, wide_tooth_comb_wet: 1, vent_quick_dry_style: 3,
  };
  return m[t];
}

export function heatSafe(t: HairbrushType): boolean {
  const m: Record<HairbrushType, boolean> = {
    paddle_flat_detangle: false, round_blow_dry_volume: true, boar_bristle_shine: false, wide_tooth_comb_wet: false, vent_quick_dry_style: true,
  };
  return m[t];
}

export function wetHairSafe(t: HairbrushType): boolean {
  const m: Record<HairbrushType, boolean> = {
    paddle_flat_detangle: true, round_blow_dry_volume: false, boar_bristle_shine: false, wide_tooth_comb_wet: true, vent_quick_dry_style: true,
  };
  return m[t];
}

export function bristleType(t: HairbrushType): string {
  const m: Record<HairbrushType, string> = {
    paddle_flat_detangle: "nylon_flex_ball_tip",
    round_blow_dry_volume: "ceramic_barrel_nylon",
    boar_bristle_shine: "natural_boar_bristle",
    wide_tooth_comb_wet: "seamless_plastic_wide",
    vent_quick_dry_style: "nylon_pin_open_vent",
  };
  return m[t];
}

export function bestHair(t: HairbrushType): string {
  const m: Record<HairbrushType, string> = {
    paddle_flat_detangle: "long_thick_tangled",
    round_blow_dry_volume: "blow_dry_style_volume",
    boar_bristle_shine: "fine_straight_shine",
    wide_tooth_comb_wet: "curly_wet_fragile",
    vent_quick_dry_style: "quick_dry_everyday",
  };
  return m[t];
}

export function hairbrushes(): HairbrushType[] {
  return ["paddle_flat_detangle", "round_blow_dry_volume", "boar_bristle_shine", "wide_tooth_comb_wet", "vent_quick_dry_style"];
}

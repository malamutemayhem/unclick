export type HairBrushType = "paddle_flat_smooth" | "round_blow_dry" | "boar_bristle_natural" | "vent_quick_dry" | "detangle_wet_flex";

export function smoothing(t: HairBrushType): number {
  const m: Record<HairBrushType, number> = {
    paddle_flat_smooth: 10, round_blow_dry: 7, boar_bristle_natural: 9, vent_quick_dry: 5, detangle_wet_flex: 6,
  };
  return m[t];
}

export function volumeBoost(t: HairBrushType): number {
  const m: Record<HairBrushType, number> = {
    paddle_flat_smooth: 3, round_blow_dry: 10, boar_bristle_natural: 6, vent_quick_dry: 7, detangle_wet_flex: 4,
  };
  return m[t];
}

export function gentleness(t: HairBrushType): number {
  const m: Record<HairBrushType, number> = {
    paddle_flat_smooth: 7, round_blow_dry: 5, boar_bristle_natural: 8, vent_quick_dry: 6, detangle_wet_flex: 10,
  };
  return m[t];
}

export function dryingSpeed(t: HairBrushType): number {
  const m: Record<HairBrushType, number> = {
    paddle_flat_smooth: 5, round_blow_dry: 9, boar_bristle_natural: 4, vent_quick_dry: 10, detangle_wet_flex: 7,
  };
  return m[t];
}

export function brushCost(t: HairBrushType): number {
  const m: Record<HairBrushType, number> = {
    paddle_flat_smooth: 4, round_blow_dry: 6, boar_bristle_natural: 9, vent_quick_dry: 3, detangle_wet_flex: 5,
  };
  return m[t];
}

export function wetUse(t: HairBrushType): boolean {
  const m: Record<HairBrushType, boolean> = {
    paddle_flat_smooth: false, round_blow_dry: false, boar_bristle_natural: false, vent_quick_dry: true, detangle_wet_flex: true,
  };
  return m[t];
}

export function naturalBristle(t: HairBrushType): boolean {
  const m: Record<HairBrushType, boolean> = {
    paddle_flat_smooth: false, round_blow_dry: false, boar_bristle_natural: true, vent_quick_dry: false, detangle_wet_flex: false,
  };
  return m[t];
}

export function bristleMaterial(t: HairBrushType): string {
  const m: Record<HairBrushType, string> = {
    paddle_flat_smooth: "nylon_ball_tipped",
    round_blow_dry: "ceramic_ionic_barrel",
    boar_bristle_natural: "wild_boar_bristle",
    vent_quick_dry: "nylon_wide_spaced",
    detangle_wet_flex: "flexible_polyamide",
  };
  return m[t];
}

export function bestUse(t: HairBrushType): string {
  const m: Record<HairBrushType, string> = {
    paddle_flat_smooth: "straightening_daily_brush",
    round_blow_dry: "blowout_curl_styling",
    boar_bristle_natural: "shine_oil_distribution",
    vent_quick_dry: "quick_dry_after_wash",
    detangle_wet_flex: "shower_wet_detangle",
  };
  return m[t];
}

export function hairBrushes(): HairBrushType[] {
  return ["paddle_flat_smooth", "round_blow_dry", "boar_bristle_natural", "vent_quick_dry", "detangle_wet_flex"];
}

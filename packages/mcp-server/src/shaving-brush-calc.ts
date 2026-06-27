export type ShavingBrushType = "badger_silvertip_luxury" | "boar_bristle_break_in" | "synthetic_fiber_vegan" | "horse_hair_mixed" | "travel_compact_case";

export function latherQuality(t: ShavingBrushType): number {
  const m: Record<ShavingBrushType, number> = {
    badger_silvertip_luxury: 10, boar_bristle_break_in: 7, synthetic_fiber_vegan: 8, horse_hair_mixed: 6, travel_compact_case: 5,
  };
  return m[t];
}

export function softness(t: ShavingBrushType): number {
  const m: Record<ShavingBrushType, number> = {
    badger_silvertip_luxury: 10, boar_bristle_break_in: 4, synthetic_fiber_vegan: 9, horse_hair_mixed: 6, travel_compact_case: 7,
  };
  return m[t];
}

export function waterRetention(t: ShavingBrushType): number {
  const m: Record<ShavingBrushType, number> = {
    badger_silvertip_luxury: 10, boar_bristle_break_in: 8, synthetic_fiber_vegan: 6, horse_hair_mixed: 7, travel_compact_case: 5,
  };
  return m[t];
}

export function durability(t: ShavingBrushType): number {
  const m: Record<ShavingBrushType, number> = {
    badger_silvertip_luxury: 8, boar_bristle_break_in: 9, synthetic_fiber_vegan: 10, horse_hair_mixed: 7, travel_compact_case: 6,
  };
  return m[t];
}

export function brushCost(t: ShavingBrushType): number {
  const m: Record<ShavingBrushType, number> = {
    badger_silvertip_luxury: 10, boar_bristle_break_in: 3, synthetic_fiber_vegan: 5, horse_hair_mixed: 4, travel_compact_case: 6,
  };
  return m[t];
}

export function veganFriendly(t: ShavingBrushType): boolean {
  const m: Record<ShavingBrushType, boolean> = {
    badger_silvertip_luxury: false, boar_bristle_break_in: false, synthetic_fiber_vegan: true, horse_hair_mixed: false, travel_compact_case: true,
  };
  return m[t];
}

export function needsBreakIn(t: ShavingBrushType): boolean {
  const m: Record<ShavingBrushType, boolean> = {
    badger_silvertip_luxury: false, boar_bristle_break_in: true, synthetic_fiber_vegan: false, horse_hair_mixed: true, travel_compact_case: false,
  };
  return m[t];
}

export function knotMaterial(t: ShavingBrushType): string {
  const m: Record<ShavingBrushType, string> = {
    badger_silvertip_luxury: "silvertip_badger_grade_a",
    boar_bristle_break_in: "natural_boar_bleached",
    synthetic_fiber_vegan: "tuxedo_plissoft_nylon",
    horse_hair_mixed: "mane_tail_blend",
    travel_compact_case: "synthetic_retractable",
  };
  return m[t];
}

export function bestShaver(t: ShavingBrushType): string {
  const m: Record<ShavingBrushType, string> = {
    badger_silvertip_luxury: "luxury_traditional_ritual",
    boar_bristle_break_in: "budget_daily_routine",
    synthetic_fiber_vegan: "ethical_sensitive_skin",
    horse_hair_mixed: "moderate_face_lather",
    travel_compact_case: "frequent_traveler_portable",
  };
  return m[t];
}

export function shavingBrushes(): ShavingBrushType[] {
  return ["badger_silvertip_luxury", "boar_bristle_break_in", "synthetic_fiber_vegan", "horse_hair_mixed", "travel_compact_case"];
}

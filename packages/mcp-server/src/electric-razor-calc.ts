export type ElectricRazorType = "foil_head_close" | "rotary_triple_head" | "body_groomer_wet" | "single_foil_travel" | "hybrid_trim_shave";

export function closenessShave(t: ElectricRazorType): number {
  const m: Record<ElectricRazorType, number> = {
    foil_head_close: 10, rotary_triple_head: 7, body_groomer_wet: 5, single_foil_travel: 6, hybrid_trim_shave: 8,
  };
  return m[t];
}

export function skinComfort(t: ElectricRazorType): number {
  const m: Record<ElectricRazorType, number> = {
    foil_head_close: 7, rotary_triple_head: 9, body_groomer_wet: 8, single_foil_travel: 6, hybrid_trim_shave: 7,
  };
  return m[t];
}

export function batteryLife(t: ElectricRazorType): number {
  const m: Record<ElectricRazorType, number> = {
    foil_head_close: 8, rotary_triple_head: 9, body_groomer_wet: 7, single_foil_travel: 5, hybrid_trim_shave: 7,
  };
  return m[t];
}

export function portability(t: ElectricRazorType): number {
  const m: Record<ElectricRazorType, number> = {
    foil_head_close: 6, rotary_triple_head: 5, body_groomer_wet: 7, single_foil_travel: 10, hybrid_trim_shave: 7,
  };
  return m[t];
}

export function razorCost(t: ElectricRazorType): number {
  const m: Record<ElectricRazorType, number> = {
    foil_head_close: 8, rotary_triple_head: 9, body_groomer_wet: 6, single_foil_travel: 4, hybrid_trim_shave: 7,
  };
  return m[t];
}

export function wetDryUse(t: ElectricRazorType): boolean {
  const m: Record<ElectricRazorType, boolean> = {
    foil_head_close: false, rotary_triple_head: true, body_groomer_wet: true, single_foil_travel: false, hybrid_trim_shave: true,
  };
  return m[t];
}

export function selfCleaning(t: ElectricRazorType): boolean {
  const m: Record<ElectricRazorType, boolean> = {
    foil_head_close: true, rotary_triple_head: true, body_groomer_wet: false, single_foil_travel: false, hybrid_trim_shave: false,
  };
  return m[t];
}

export function bladeSystem(t: ElectricRazorType): string {
  const m: Record<ElectricRazorType, string> = {
    foil_head_close: "multi_foil_linear_motor",
    rotary_triple_head: "circular_blade_flex_pivot",
    body_groomer_wet: "rounded_tip_body_safe",
    single_foil_travel: "compact_foil_vibration",
    hybrid_trim_shave: "dual_edge_trim_foil_combo",
  };
  return m[t];
}

export function bestUse(t: ElectricRazorType): string {
  const m: Record<ElectricRazorType, string> = {
    foil_head_close: "daily_clean_shave_face",
    rotary_triple_head: "thick_beard_contour_follow",
    body_groomer_wet: "full_body_shower_groom",
    single_foil_travel: "travel_quick_touch_up",
    hybrid_trim_shave: "stubble_style_versatile",
  };
  return m[t];
}

export function electricRazors(): ElectricRazorType[] {
  return ["foil_head_close", "rotary_triple_head", "body_groomer_wet", "single_foil_travel", "hybrid_trim_shave"];
}

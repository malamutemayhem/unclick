export type ToothbrushType = "manual_soft_bristle" | "sonic_vibration" | "oscillating_round_head" | "bamboo_eco_friendly" | "water_flosser_combo";

export function cleaningPower(t: ToothbrushType): number {
  const m: Record<ToothbrushType, number> = {
    manual_soft_bristle: 5, sonic_vibration: 9, oscillating_round_head: 10, bamboo_eco_friendly: 5, water_flosser_combo: 8,
  };
  return m[t];
}

export function gumGentle(t: ToothbrushType): number {
  const m: Record<ToothbrushType, number> = {
    manual_soft_bristle: 9, sonic_vibration: 7, oscillating_round_head: 6, bamboo_eco_friendly: 8, water_flosser_combo: 7,
  };
  return m[t];
}

export function easeOfUse(t: ToothbrushType): number {
  const m: Record<ToothbrushType, number> = {
    manual_soft_bristle: 10, sonic_vibration: 8, oscillating_round_head: 8, bamboo_eco_friendly: 10, water_flosser_combo: 6,
  };
  return m[t];
}

export function travelFriendly(t: ToothbrushType): number {
  const m: Record<ToothbrushType, number> = {
    manual_soft_bristle: 10, sonic_vibration: 6, oscillating_round_head: 5, bamboo_eco_friendly: 9, water_flosser_combo: 3,
  };
  return m[t];
}

export function brushCost(t: ToothbrushType): number {
  const m: Record<ToothbrushType, number> = {
    manual_soft_bristle: 2, sonic_vibration: 8, oscillating_round_head: 9, bamboo_eco_friendly: 3, water_flosser_combo: 10,
  };
  return m[t];
}

export function needsPower(t: ToothbrushType): boolean {
  const m: Record<ToothbrushType, boolean> = {
    manual_soft_bristle: false, sonic_vibration: true, oscillating_round_head: true, bamboo_eco_friendly: false, water_flosser_combo: true,
  };
  return m[t];
}

export function ecoFriendly(t: ToothbrushType): boolean {
  const m: Record<ToothbrushType, boolean> = {
    manual_soft_bristle: false, sonic_vibration: false, oscillating_round_head: false, bamboo_eco_friendly: true, water_flosser_combo: false,
  };
  return m[t];
}

export function bristleType(t: ToothbrushType): string {
  const m: Record<ToothbrushType, string> = {
    manual_soft_bristle: "nylon_rounded_tip_soft",
    sonic_vibration: "dupont_tynex_vibration",
    oscillating_round_head: "angled_indicator_bristle",
    bamboo_eco_friendly: "charcoal_infused_plant",
    water_flosser_combo: "jet_stream_plus_bristle",
  };
  return m[t];
}

export function bestUser(t: ToothbrushType): string {
  const m: Record<ToothbrushType, string> = {
    manual_soft_bristle: "sensitive_gum_gentle_brush",
    sonic_vibration: "whitening_plaque_removal",
    oscillating_round_head: "deep_clean_thorough_user",
    bamboo_eco_friendly: "zero_waste_eco_conscious",
    water_flosser_combo: "braces_implant_special_need",
  };
  return m[t];
}

export function toothbrushes(): ToothbrushType[] {
  return ["manual_soft_bristle", "sonic_vibration", "oscillating_round_head", "bamboo_eco_friendly", "water_flosser_combo"];
}

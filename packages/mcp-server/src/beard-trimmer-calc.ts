export type BeardTrimmerType = "stubble_precision" | "full_beard_long" | "vacuum_suction" | "all_in_one_kit" | "cordless_pro";

export function trimPrecision(t: BeardTrimmerType): number {
  const m: Record<BeardTrimmerType, number> = {
    stubble_precision: 10, full_beard_long: 6, vacuum_suction: 7, all_in_one_kit: 5, cordless_pro: 8,
  };
  return m[t];
}

export function lengthRange(t: BeardTrimmerType): number {
  const m: Record<BeardTrimmerType, number> = {
    stubble_precision: 4, full_beard_long: 10, vacuum_suction: 7, all_in_one_kit: 8, cordless_pro: 7,
  };
  return m[t];
}

export function cleanupEase(t: BeardTrimmerType): number {
  const m: Record<BeardTrimmerType, number> = {
    stubble_precision: 5, full_beard_long: 4, vacuum_suction: 10, all_in_one_kit: 6, cordless_pro: 7,
  };
  return m[t];
}

export function attachmentCount(t: BeardTrimmerType): number {
  const m: Record<BeardTrimmerType, number> = {
    stubble_precision: 3, full_beard_long: 5, vacuum_suction: 4, all_in_one_kit: 10, cordless_pro: 6,
  };
  return m[t];
}

export function trimmerCost(t: BeardTrimmerType): number {
  const m: Record<BeardTrimmerType, number> = {
    stubble_precision: 6, full_beard_long: 5, vacuum_suction: 7, all_in_one_kit: 8, cordless_pro: 6,
  };
  return m[t];
}

export function waterproof(t: BeardTrimmerType): boolean {
  const m: Record<BeardTrimmerType, boolean> = {
    stubble_precision: false, full_beard_long: false, vacuum_suction: false, all_in_one_kit: true, cordless_pro: true,
  };
  return m[t];
}

export function vacuumSystem(t: BeardTrimmerType): boolean {
  const m: Record<BeardTrimmerType, boolean> = {
    stubble_precision: false, full_beard_long: false, vacuum_suction: true, all_in_one_kit: false, cordless_pro: false,
  };
  return m[t];
}

export function bladeType(t: BeardTrimmerType): string {
  const m: Record<BeardTrimmerType, string> = {
    stubble_precision: "micro_step_0_1mm",
    full_beard_long: "wide_comb_long_guard",
    vacuum_suction: "suction_chamber_blade",
    all_in_one_kit: "interchangeable_head_set",
    cordless_pro: "carbon_steel_taper",
  };
  return m[t];
}

export function bestStyle(t: BeardTrimmerType): string {
  const m: Record<BeardTrimmerType, string> = {
    stubble_precision: "designer_stubble_edge",
    full_beard_long: "viking_full_beard",
    vacuum_suction: "mess_free_sink_trim",
    all_in_one_kit: "head_to_toe_groom",
    cordless_pro: "barber_fade_lineup",
  };
  return m[t];
}

export function beardTrimmers(): BeardTrimmerType[] {
  return ["stubble_precision", "full_beard_long", "vacuum_suction", "all_in_one_kit", "cordless_pro"];
}

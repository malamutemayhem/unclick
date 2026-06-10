export type NoseTrimmerType = "rotary_blade_basic" | "dual_edge_precision" | "vacuum_collection_clean" | "manual_scissor_spring" | "waterproof_shower_safe";

export function trimPrecision(t: NoseTrimmerType): number {
  const m: Record<NoseTrimmerType, number> = {
    rotary_blade_basic: 7, dual_edge_precision: 9, vacuum_collection_clean: 7, manual_scissor_spring: 6, waterproof_shower_safe: 7,
  };
  return m[t];
}

export function comfort(t: NoseTrimmerType): number {
  const m: Record<NoseTrimmerType, number> = {
    rotary_blade_basic: 7, dual_edge_precision: 8, vacuum_collection_clean: 8, manual_scissor_spring: 5, waterproof_shower_safe: 9,
  };
  return m[t];
}

export function cleanupEase(t: NoseTrimmerType): number {
  const m: Record<NoseTrimmerType, number> = {
    rotary_blade_basic: 5, dual_edge_precision: 6, vacuum_collection_clean: 10, manual_scissor_spring: 7, waterproof_shower_safe: 8,
  };
  return m[t];
}

export function versatility(t: NoseTrimmerType): number {
  const m: Record<NoseTrimmerType, number> = {
    rotary_blade_basic: 5, dual_edge_precision: 9, vacuum_collection_clean: 6, manual_scissor_spring: 3, waterproof_shower_safe: 7,
  };
  return m[t];
}

export function trimmerCost(t: NoseTrimmerType): number {
  const m: Record<NoseTrimmerType, number> = {
    rotary_blade_basic: 2, dual_edge_precision: 4, vacuum_collection_clean: 5, manual_scissor_spring: 1, waterproof_shower_safe: 3,
  };
  return m[t];
}

export function needsBattery(t: NoseTrimmerType): boolean {
  const m: Record<NoseTrimmerType, boolean> = {
    rotary_blade_basic: true, dual_edge_precision: true, vacuum_collection_clean: true, manual_scissor_spring: false, waterproof_shower_safe: true,
  };
  return m[t];
}

export function waterproof(t: NoseTrimmerType): boolean {
  const m: Record<NoseTrimmerType, boolean> = {
    rotary_blade_basic: false, dual_edge_precision: false, vacuum_collection_clean: false, manual_scissor_spring: true, waterproof_shower_safe: true,
  };
  return m[t];
}

export function bladeType(t: NoseTrimmerType): string {
  const m: Record<NoseTrimmerType, string> = {
    rotary_blade_basic: "rotary_stainless_cone",
    dual_edge_precision: "dual_edge_linear_blade",
    vacuum_collection_clean: "rotary_vacuum_chamber",
    manual_scissor_spring: "spring_loaded_scissor",
    waterproof_shower_safe: "sealed_rotary_washable",
  };
  return m[t];
}

export function bestUse(t: NoseTrimmerType): string {
  const m: Record<NoseTrimmerType, string> = {
    rotary_blade_basic: "nose_ear_basic_trim",
    dual_edge_precision: "nose_ear_eyebrow_detail",
    vacuum_collection_clean: "mess_free_no_scatter",
    manual_scissor_spring: "travel_no_battery_needed",
    waterproof_shower_safe: "shower_quick_grooming",
  };
  return m[t];
}

export function noseTrimmers(): NoseTrimmerType[] {
  return ["rotary_blade_basic", "dual_edge_precision", "vacuum_collection_clean", "manual_scissor_spring", "waterproof_shower_safe"];
}

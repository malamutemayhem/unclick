export type ChaseFrameType = "steel_lockup_standard" | "aluminum_light_quick" | "magnetic_base_hold" | "adjustable_expand_set" | "wood_proof_press";

export function lockStrength(t: ChaseFrameType): number {
  const m: Record<ChaseFrameType, number> = {
    steel_lockup_standard: 10, aluminum_light_quick: 6, magnetic_base_hold: 7, adjustable_expand_set: 8, wood_proof_press: 4,
  };
  return m[t];
}

export function weightHandle(t: ChaseFrameType): number {
  const m: Record<ChaseFrameType, number> = {
    steel_lockup_standard: 4, aluminum_light_quick: 10, magnetic_base_hold: 7, adjustable_expand_set: 6, wood_proof_press: 8,
  };
  return m[t];
}

export function sizeRange(t: ChaseFrameType): number {
  const m: Record<ChaseFrameType, number> = {
    steel_lockup_standard: 7, aluminum_light_quick: 6, magnetic_base_hold: 5, adjustable_expand_set: 10, wood_proof_press: 8,
  };
  return m[t];
}

export function setupSpeed(t: ChaseFrameType): number {
  const m: Record<ChaseFrameType, number> = {
    steel_lockup_standard: 5, aluminum_light_quick: 8, magnetic_base_hold: 10, adjustable_expand_set: 6, wood_proof_press: 7,
  };
  return m[t];
}

export function frameCost(t: ChaseFrameType): number {
  const m: Record<ChaseFrameType, number> = {
    steel_lockup_standard: 2, aluminum_light_quick: 2, magnetic_base_hold: 3, adjustable_expand_set: 3, wood_proof_press: 1,
  };
  return m[t];
}

export function magnetic(t: ChaseFrameType): boolean {
  const m: Record<ChaseFrameType, boolean> = {
    steel_lockup_standard: false, aluminum_light_quick: false, magnetic_base_hold: true, adjustable_expand_set: false, wood_proof_press: false,
  };
  return m[t];
}

export function adjustable(t: ChaseFrameType): boolean {
  const m: Record<ChaseFrameType, boolean> = {
    steel_lockup_standard: false, aluminum_light_quick: false, magnetic_base_hold: false, adjustable_expand_set: true, wood_proof_press: false,
  };
  return m[t];
}

export function frameMaterial(t: ChaseFrameType): string {
  const m: Record<ChaseFrameType, string> = {
    steel_lockup_standard: "cast_steel_machined",
    aluminum_light_quick: "aluminum_extrusion",
    magnetic_base_hold: "steel_neodymium_base",
    adjustable_expand_set: "steel_slide_rail",
    wood_proof_press: "hardwood_mortise",
  };
  return m[t];
}

export function bestUse(t: ChaseFrameType): string {
  const m: Record<ChaseFrameType, string> = {
    steel_lockup_standard: "letterpress_production",
    aluminum_light_quick: "portable_proof_print",
    magnetic_base_hold: "quick_polymer_plate",
    adjustable_expand_set: "variable_size_form",
    wood_proof_press: "hand_proof_pull",
  };
  return m[t];
}

export function chaseFrames(): ChaseFrameType[] {
  return ["steel_lockup_standard", "aluminum_light_quick", "magnetic_base_hold", "adjustable_expand_set", "wood_proof_press"];
}

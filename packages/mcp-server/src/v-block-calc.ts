export type VBlockType = "hardened_steel_pair" | "cast_iron_heavy" | "magnetic_hold_block" | "adjustable_angle_set" | "micro_precision_small";

export function holdAccuracy(t: VBlockType): number {
  const m: Record<VBlockType, number> = {
    hardened_steel_pair: 9, cast_iron_heavy: 7, magnetic_hold_block: 6, adjustable_angle_set: 8, micro_precision_small: 10,
  };
  return m[t];
}

export function loadCapacity(t: VBlockType): number {
  const m: Record<VBlockType, number> = {
    hardened_steel_pair: 8, cast_iron_heavy: 10, magnetic_hold_block: 6, adjustable_angle_set: 7, micro_precision_small: 3,
  };
  return m[t];
}

export function diameterRange(t: VBlockType): number {
  const m: Record<VBlockType, number> = {
    hardened_steel_pair: 7, cast_iron_heavy: 9, magnetic_hold_block: 6, adjustable_angle_set: 10, micro_precision_small: 4,
  };
  return m[t];
}

export function surfaceFinish(t: VBlockType): number {
  const m: Record<VBlockType, number> = {
    hardened_steel_pair: 9, cast_iron_heavy: 6, magnetic_hold_block: 7, adjustable_angle_set: 8, micro_precision_small: 10,
  };
  return m[t];
}

export function blockCost(t: VBlockType): number {
  const m: Record<VBlockType, number> = {
    hardened_steel_pair: 2, cast_iron_heavy: 2, magnetic_hold_block: 2, adjustable_angle_set: 3, micro_precision_small: 3,
  };
  return m[t];
}

export function magnetic(t: VBlockType): boolean {
  const m: Record<VBlockType, boolean> = {
    hardened_steel_pair: false, cast_iron_heavy: false, magnetic_hold_block: true, adjustable_angle_set: false, micro_precision_small: false,
  };
  return m[t];
}

export function matchedPair(t: VBlockType): boolean {
  const m: Record<VBlockType, boolean> = {
    hardened_steel_pair: true, cast_iron_heavy: false, magnetic_hold_block: false, adjustable_angle_set: false, micro_precision_small: true,
  };
  return m[t];
}

export function blockMaterial(t: VBlockType): string {
  const m: Record<VBlockType, string> = {
    hardened_steel_pair: "hardened_ground_steel",
    cast_iron_heavy: "cast_iron_machined",
    magnetic_hold_block: "steel_rare_earth_mag",
    adjustable_angle_set: "tool_steel_pivot",
    micro_precision_small: "hardened_steel_lapped",
  };
  return m[t];
}

export function bestUse(t: VBlockType): string {
  const m: Record<VBlockType, string> = {
    hardened_steel_pair: "round_stock_inspect",
    cast_iron_heavy: "heavy_shaft_hold",
    magnetic_hold_block: "hands_free_hold",
    adjustable_angle_set: "angled_work_hold",
    micro_precision_small: "small_pin_inspect",
  };
  return m[t];
}

export function vBlocks(): VBlockType[] {
  return ["hardened_steel_pair", "cast_iron_heavy", "magnetic_hold_block", "adjustable_angle_set", "micro_precision_small"];
}

export type BenchPinType = "v_slot_standard" | "ring_clamp_combo" | "multi_slot_pro" | "anvil_flat_top" | "swivel_rotate_base";

export function holdStability(t: BenchPinType): number {
  const m: Record<BenchPinType, number> = {
    v_slot_standard: 7, ring_clamp_combo: 8, multi_slot_pro: 9, anvil_flat_top: 6, swivel_rotate_base: 8,
  };
  return m[t];
}

export function cutAccess(t: BenchPinType): number {
  const m: Record<BenchPinType, number> = {
    v_slot_standard: 9, ring_clamp_combo: 6, multi_slot_pro: 10, anvil_flat_top: 5, swivel_rotate_base: 8,
  };
  return m[t];
}

export function surfaceArea(t: BenchPinType): number {
  const m: Record<BenchPinType, number> = {
    v_slot_standard: 6, ring_clamp_combo: 5, multi_slot_pro: 7, anvil_flat_top: 10, swivel_rotate_base: 7,
  };
  return m[t];
}

export function durability(t: BenchPinType): number {
  const m: Record<BenchPinType, number> = {
    v_slot_standard: 8, ring_clamp_combo: 7, multi_slot_pro: 7, anvil_flat_top: 10, swivel_rotate_base: 8,
  };
  return m[t];
}

export function pinCost(t: BenchPinType): number {
  const m: Record<BenchPinType, number> = {
    v_slot_standard: 1, ring_clamp_combo: 2, multi_slot_pro: 3, anvil_flat_top: 2, swivel_rotate_base: 3,
  };
  return m[t];
}

export function hasClamp(t: BenchPinType): boolean {
  const m: Record<BenchPinType, boolean> = {
    v_slot_standard: false, ring_clamp_combo: true, multi_slot_pro: false, anvil_flat_top: false, swivel_rotate_base: false,
  };
  return m[t];
}

export function replaceable(t: BenchPinType): boolean {
  const m: Record<BenchPinType, boolean> = {
    v_slot_standard: true, ring_clamp_combo: false, multi_slot_pro: true, anvil_flat_top: false, swivel_rotate_base: true,
  };
  return m[t];
}

export function pinMaterial(t: BenchPinType): string {
  const m: Record<BenchPinType, string> = {
    v_slot_standard: "hardwood_maple_block",
    ring_clamp_combo: "wood_steel_hybrid",
    multi_slot_pro: "laminated_birch_ply",
    anvil_flat_top: "tool_steel_plate",
    swivel_rotate_base: "hardwood_brass_mount",
  };
  return m[t];
}

export function bestUse(t: BenchPinType): string {
  const m: Record<BenchPinType, string> = {
    v_slot_standard: "general_sawing_filing",
    ring_clamp_combo: "ring_sizing_work",
    multi_slot_pro: "intricate_piercing_cut",
    anvil_flat_top: "hammering_flat_work",
    swivel_rotate_base: "detail_engraving_set",
  };
  return m[t];
}

export function benchPins(): BenchPinType[] {
  return ["v_slot_standard", "ring_clamp_combo", "multi_slot_pro", "anvil_flat_top", "swivel_rotate_base"];
}

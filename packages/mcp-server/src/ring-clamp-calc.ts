export type RingClampType = "wood_wedge_hand" | "leather_jaw_soft" | "nylon_jaw_safe" | "steel_spring_grip" | "engraver_block_ball";

export function gripForce(t: RingClampType): number {
  const m: Record<RingClampType, number> = {
    wood_wedge_hand: 7, leather_jaw_soft: 6, nylon_jaw_safe: 5, steel_spring_grip: 9, engraver_block_ball: 10,
  };
  return m[t];
}

export function scratchSafe(t: RingClampType): number {
  const m: Record<RingClampType, number> = {
    wood_wedge_hand: 7, leather_jaw_soft: 10, nylon_jaw_safe: 9, steel_spring_grip: 4, engraver_block_ball: 6,
  };
  return m[t];
}

export function sizeRange(t: RingClampType): number {
  const m: Record<RingClampType, number> = {
    wood_wedge_hand: 8, leather_jaw_soft: 7, nylon_jaw_safe: 7, steel_spring_grip: 6, engraver_block_ball: 10,
  };
  return m[t];
}

export function easeOfUse(t: RingClampType): number {
  const m: Record<RingClampType, number> = {
    wood_wedge_hand: 9, leather_jaw_soft: 7, nylon_jaw_safe: 8, steel_spring_grip: 8, engraver_block_ball: 5,
  };
  return m[t];
}

export function clampCost(t: RingClampType): number {
  const m: Record<RingClampType, number> = {
    wood_wedge_hand: 1, leather_jaw_soft: 2, nylon_jaw_safe: 1, steel_spring_grip: 2, engraver_block_ball: 3,
  };
  return m[t];
}

export function handsFree(t: RingClampType): boolean {
  const m: Record<RingClampType, boolean> = {
    wood_wedge_hand: false, leather_jaw_soft: false, nylon_jaw_safe: false, steel_spring_grip: true, engraver_block_ball: true,
  };
  return m[t];
}

export function padded(t: RingClampType): boolean {
  const m: Record<RingClampType, boolean> = {
    wood_wedge_hand: false, leather_jaw_soft: true, nylon_jaw_safe: true, steel_spring_grip: false, engraver_block_ball: false,
  };
  return m[t];
}

export function jawMaterial(t: RingClampType): string {
  const m: Record<RingClampType, string> = {
    wood_wedge_hand: "hardwood_tapered_wedge",
    leather_jaw_soft: "cowhide_lined_pad",
    nylon_jaw_safe: "delrin_smooth_face",
    steel_spring_grip: "knurled_steel_jaw",
    engraver_block_ball: "thermoplastic_insert_cup",
  };
  return m[t];
}

export function bestUse(t: RingClampType): string {
  const m: Record<RingClampType, string> = {
    wood_wedge_hand: "quick_ring_hold",
    leather_jaw_soft: "polished_stone_set",
    nylon_jaw_safe: "soft_metal_protect",
    steel_spring_grip: "heavy_file_work",
    engraver_block_ball: "precision_engraving",
  };
  return m[t];
}

export function ringClamps(): RingClampType[] {
  return ["wood_wedge_hand", "leather_jaw_soft", "nylon_jaw_safe", "steel_spring_grip", "engraver_block_ball"];
}

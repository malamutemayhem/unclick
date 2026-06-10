export type CarvingKnifeType = "sloyd_knife_general" | "detail_knife_fine" | "chip_carving_stab" | "hook_knife_spoon" | "drawknife_two_hand";

export function cutControl(t: CarvingKnifeType): number {
  const m: Record<CarvingKnifeType, number> = {
    sloyd_knife_general: 8, detail_knife_fine: 10, chip_carving_stab: 7, hook_knife_spoon: 6, drawknife_two_hand: 5,
  };
  return m[t];
}

export function materialRemoval(t: CarvingKnifeType): number {
  const m: Record<CarvingKnifeType, number> = {
    sloyd_knife_general: 8, detail_knife_fine: 3, chip_carving_stab: 5, hook_knife_spoon: 7, drawknife_two_hand: 10,
  };
  return m[t];
}

export function edgeHold(t: CarvingKnifeType): number {
  const m: Record<CarvingKnifeType, number> = {
    sloyd_knife_general: 8, detail_knife_fine: 7, chip_carving_stab: 9, hook_knife_spoon: 6, drawknife_two_hand: 7,
  };
  return m[t];
}

export function beginnerFriendly(t: CarvingKnifeType): number {
  const m: Record<CarvingKnifeType, number> = {
    sloyd_knife_general: 10, detail_knife_fine: 7, chip_carving_stab: 6, hook_knife_spoon: 5, drawknife_two_hand: 4,
  };
  return m[t];
}

export function knifeCost(t: CarvingKnifeType): number {
  const m: Record<CarvingKnifeType, number> = {
    sloyd_knife_general: 2, detail_knife_fine: 2, chip_carving_stab: 2, hook_knife_spoon: 3, drawknife_two_hand: 3,
  };
  return m[t];
}

export function oneHanded(t: CarvingKnifeType): boolean {
  const m: Record<CarvingKnifeType, boolean> = {
    sloyd_knife_general: true, detail_knife_fine: true, chip_carving_stab: true, hook_knife_spoon: true, drawknife_two_hand: false,
  };
  return m[t];
}

export function curvedBlade(t: CarvingKnifeType): boolean {
  const m: Record<CarvingKnifeType, boolean> = {
    sloyd_knife_general: false, detail_knife_fine: false, chip_carving_stab: false, hook_knife_spoon: true, drawknife_two_hand: false,
  };
  return m[t];
}

export function bladeShape(t: CarvingKnifeType): string {
  const m: Record<CarvingKnifeType, string> = {
    sloyd_knife_general: "straight_drop_point",
    detail_knife_fine: "narrow_pointed_tip",
    chip_carving_stab: "short_rigid_blade",
    hook_knife_spoon: "curved_crook_hook",
    drawknife_two_hand: "wide_flat_bevel",
  };
  return m[t];
}

export function bestProject(t: CarvingKnifeType): string {
  const m: Record<CarvingKnifeType, string> = {
    sloyd_knife_general: "whittling_figure_shape",
    detail_knife_fine: "face_detail_finish",
    chip_carving_stab: "geometric_pattern_chip",
    hook_knife_spoon: "spoon_bowl_hollow",
    drawknife_two_hand: "bark_rough_shaping",
  };
  return m[t];
}

export function carvingKnives(): CarvingKnifeType[] {
  return ["sloyd_knife_general", "detail_knife_fine", "chip_carving_stab", "hook_knife_spoon", "drawknife_two_hand"];
}

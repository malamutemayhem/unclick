export type PruningShearType = "bypass_hand" | "anvil_hand" | "ratchet_assist" | "lopper_long_reach" | "pole_pruner";

export function cutClean(t: PruningShearType): number {
  const m: Record<PruningShearType, number> = {
    bypass_hand: 10, anvil_hand: 5, ratchet_assist: 7, lopper_long_reach: 8, pole_pruner: 6,
  };
  return m[t];
}

export function cuttingPower(t: PruningShearType): number {
  const m: Record<PruningShearType, number> = {
    bypass_hand: 5, anvil_hand: 7, ratchet_assist: 9, lopper_long_reach: 10, pole_pruner: 8,
  };
  return m[t];
}

export function handFatigue(t: PruningShearType): number {
  const m: Record<PruningShearType, number> = {
    bypass_hand: 6, anvil_hand: 5, ratchet_assist: 9, lopper_long_reach: 4, pole_pruner: 3,
  };
  return m[t];
}

export function branchDiameter(t: PruningShearType): number {
  const m: Record<PruningShearType, number> = {
    bypass_hand: 3, anvil_hand: 4, ratchet_assist: 5, lopper_long_reach: 9, pole_pruner: 8,
  };
  return m[t];
}

export function shearCost(t: PruningShearType): number {
  const m: Record<PruningShearType, number> = {
    bypass_hand: 3, anvil_hand: 2, ratchet_assist: 5, lopper_long_reach: 6, pole_pruner: 8,
  };
  return m[t];
}

export function oneHanded(t: PruningShearType): boolean {
  const m: Record<PruningShearType, boolean> = {
    bypass_hand: true, anvil_hand: true, ratchet_assist: true, lopper_long_reach: false, pole_pruner: false,
  };
  return m[t];
}

export function replaceBlade(t: PruningShearType): boolean {
  const m: Record<PruningShearType, boolean> = {
    bypass_hand: true, anvil_hand: true, ratchet_assist: true, lopper_long_reach: true, pole_pruner: false,
  };
  return m[t];
}

export function bladeStyle(t: PruningShearType): string {
  const m: Record<PruningShearType, string> = {
    bypass_hand: "curved_bypass_scissor", anvil_hand: "straight_anvil_crush",
    ratchet_assist: "compound_ratchet_mechanism", lopper_long_reach: "bypass_gear_multiplied",
    pole_pruner: "hook_and_blade_rope_pull",
  };
  return m[t];
}

export function bestPlant(t: PruningShearType): string {
  const m: Record<PruningShearType, string> = {
    bypass_hand: "rose_herb_green_stem", anvil_hand: "dead_wood_dry_branch",
    ratchet_assist: "thick_stem_weak_grip", lopper_long_reach: "tree_branch_shrub_heavy",
    pole_pruner: "high_canopy_overhead_limb",
  };
  return m[t];
}

export function pruningShears(): PruningShearType[] {
  return ["bypass_hand", "anvil_hand", "ratchet_assist", "lopper_long_reach", "pole_pruner"];
}

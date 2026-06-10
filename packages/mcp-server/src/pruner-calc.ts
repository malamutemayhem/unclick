export type PrunerType = "bypass_hand_curved" | "anvil_ratchet_thick" | "lopper_long_reach" | "pole_pruner_telescopic" | "electric_cordless_powered";

export function cuttingPower(t: PrunerType): number {
  const m: Record<PrunerType, number> = {
    bypass_hand_curved: 6, anvil_ratchet_thick: 8, lopper_long_reach: 9, pole_pruner_telescopic: 7, electric_cordless_powered: 10,
  };
  return m[t];
}

export function cutPrecision(t: PrunerType): number {
  const m: Record<PrunerType, number> = {
    bypass_hand_curved: 10, anvil_ratchet_thick: 5, lopper_long_reach: 6, pole_pruner_telescopic: 4, electric_cordless_powered: 7,
  };
  return m[t];
}

export function handFatigue(t: PrunerType): number {
  const m: Record<PrunerType, number> = {
    bypass_hand_curved: 5, anvil_ratchet_thick: 8, lopper_long_reach: 4, pole_pruner_telescopic: 3, electric_cordless_powered: 10,
  };
  return m[t];
}

export function reach(t: PrunerType): number {
  const m: Record<PrunerType, number> = {
    bypass_hand_curved: 2, anvil_ratchet_thick: 2, lopper_long_reach: 7, pole_pruner_telescopic: 10, electric_cordless_powered: 3,
  };
  return m[t];
}

export function prunerCost(t: PrunerType): number {
  const m: Record<PrunerType, number> = {
    bypass_hand_curved: 4, anvil_ratchet_thick: 5, lopper_long_reach: 6, pole_pruner_telescopic: 8, electric_cordless_powered: 10,
  };
  return m[t];
}

export function oneHanded(t: PrunerType): boolean {
  const m: Record<PrunerType, boolean> = {
    bypass_hand_curved: true, anvil_ratchet_thick: true, lopper_long_reach: false, pole_pruner_telescopic: false, electric_cordless_powered: true,
  };
  return m[t];
}

export function replaceableBlade(t: PrunerType): boolean {
  const m: Record<PrunerType, boolean> = {
    bypass_hand_curved: true, anvil_ratchet_thick: true, lopper_long_reach: true, pole_pruner_telescopic: true, electric_cordless_powered: false,
  };
  return m[t];
}

export function bladeType(t: PrunerType): string {
  const m: Record<PrunerType, string> = {
    bypass_hand_curved: "curved_bypass_sk5_steel",
    anvil_ratchet_thick: "straight_anvil_hardened",
    lopper_long_reach: "compound_bypass_gear",
    pole_pruner_telescopic: "hook_pull_chain_cut",
    electric_cordless_powered: "reciprocating_lithium",
  };
  return m[t];
}

export function bestTask(t: PrunerType): string {
  const m: Record<PrunerType, string> = {
    bypass_hand_curved: "live_branch_rose_vine",
    anvil_ratchet_thick: "dead_wood_dry_branch",
    lopper_long_reach: "thick_shrub_medium_limb",
    pole_pruner_telescopic: "high_canopy_tree_trim",
    electric_cordless_powered: "orchard_volume_pruning",
  };
  return m[t];
}

export function pruners(): PrunerType[] {
  return ["bypass_hand_curved", "anvil_ratchet_thick", "lopper_long_reach", "pole_pruner_telescopic", "electric_cordless_powered"];
}

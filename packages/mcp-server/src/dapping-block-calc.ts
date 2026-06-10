export type DappingBlockType = "steel_cube_standard" | "brass_round_small" | "wood_form_soft" | "lead_block_cushion" | "urethane_die_set";

export function domeDepth(t: DappingBlockType): number {
  const m: Record<DappingBlockType, number> = {
    steel_cube_standard: 9, brass_round_small: 7, wood_form_soft: 5, lead_block_cushion: 6, urethane_die_set: 8,
  };
  return m[t];
}

export function surfaceFinish(t: DappingBlockType): number {
  const m: Record<DappingBlockType, number> = {
    steel_cube_standard: 8, brass_round_small: 9, wood_form_soft: 6, lead_block_cushion: 4, urethane_die_set: 7,
  };
  return m[t];
}

export function sizeVariety(t: DappingBlockType): number {
  const m: Record<DappingBlockType, number> = {
    steel_cube_standard: 10, brass_round_small: 6, wood_form_soft: 5, lead_block_cushion: 4, urethane_die_set: 8,
  };
  return m[t];
}

export function durability(t: DappingBlockType): number {
  const m: Record<DappingBlockType, number> = {
    steel_cube_standard: 10, brass_round_small: 8, wood_form_soft: 4, lead_block_cushion: 3, urethane_die_set: 6,
  };
  return m[t];
}

export function blockCost(t: DappingBlockType): number {
  const m: Record<DappingBlockType, number> = {
    steel_cube_standard: 2, brass_round_small: 2, wood_form_soft: 1, lead_block_cushion: 1, urethane_die_set: 3,
  };
  return m[t];
}

export function nonMarring(t: DappingBlockType): boolean {
  const m: Record<DappingBlockType, boolean> = {
    steel_cube_standard: false, brass_round_small: false, wood_form_soft: true, lead_block_cushion: true, urethane_die_set: true,
  };
  return m[t];
}

export function includesPunches(t: DappingBlockType): boolean {
  const m: Record<DappingBlockType, boolean> = {
    steel_cube_standard: true, brass_round_small: false, wood_form_soft: false, lead_block_cushion: false, urethane_die_set: true,
  };
  return m[t];
}

export function blockMaterial(t: DappingBlockType): string {
  const m: Record<DappingBlockType, string> = {
    steel_cube_standard: "hardened_tool_steel",
    brass_round_small: "solid_brass_turned",
    wood_form_soft: "hardwood_carved_bowl",
    lead_block_cushion: "pure_lead_cast",
    urethane_die_set: "polyurethane_molded",
  };
  return m[t];
}

export function bestUse(t: DappingBlockType): string {
  const m: Record<DappingBlockType, string> = {
    steel_cube_standard: "metal_dome_forming",
    brass_round_small: "small_bead_cup",
    wood_form_soft: "thin_sheet_shape",
    lead_block_cushion: "texture_free_form",
    urethane_die_set: "complex_curve_press",
  };
  return m[t];
}

export function dappingBlocks(): DappingBlockType[] {
  return ["steel_cube_standard", "brass_round_small", "wood_form_soft", "lead_block_cushion", "urethane_die_set"];
}

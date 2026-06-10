export type PatternWeightType = "steel_disc_flat" | "lead_shot_bag" | "ceramic_tile_square" | "magnetic_strip_hold" | "stone_polished_round";

export function holdForce(t: PatternWeightType): number {
  const m: Record<PatternWeightType, number> = {
    steel_disc_flat: 8, lead_shot_bag: 9, ceramic_tile_square: 7, magnetic_strip_hold: 10, stone_polished_round: 6,
  };
  return m[t];
}

export function fabricSafe(t: PatternWeightType): number {
  const m: Record<PatternWeightType, number> = {
    steel_disc_flat: 7, lead_shot_bag: 9, ceramic_tile_square: 6, magnetic_strip_hold: 5, stone_polished_round: 10,
  };
  return m[t];
}

export function stackable(t: PatternWeightType): number {
  const m: Record<PatternWeightType, number> = {
    steel_disc_flat: 10, lead_shot_bag: 3, ceramic_tile_square: 9, magnetic_strip_hold: 8, stone_polished_round: 5,
  };
  return m[t];
}

export function gripBase(t: PatternWeightType): number {
  const m: Record<PatternWeightType, number> = {
    steel_disc_flat: 6, lead_shot_bag: 10, ceramic_tile_square: 7, magnetic_strip_hold: 8, stone_polished_round: 5,
  };
  return m[t];
}

export function weightCost(t: PatternWeightType): number {
  const m: Record<PatternWeightType, number> = {
    steel_disc_flat: 1, lead_shot_bag: 1, ceramic_tile_square: 1, magnetic_strip_hold: 2, stone_polished_round: 2,
  };
  return m[t];
}

export function magnetic(t: PatternWeightType): boolean {
  const m: Record<PatternWeightType, boolean> = {
    steel_disc_flat: false, lead_shot_bag: false, ceramic_tile_square: false, magnetic_strip_hold: true, stone_polished_round: false,
  };
  return m[t];
}

export function conforming(t: PatternWeightType): boolean {
  const m: Record<PatternWeightType, boolean> = {
    steel_disc_flat: false, lead_shot_bag: true, ceramic_tile_square: false, magnetic_strip_hold: false, stone_polished_round: false,
  };
  return m[t];
}

export function baseMaterial(t: PatternWeightType): string {
  const m: Record<PatternWeightType, string> = {
    steel_disc_flat: "chrome_plated_steel",
    lead_shot_bag: "canvas_lead_fill",
    ceramic_tile_square: "glazed_ceramic_tile",
    magnetic_strip_hold: "neodymium_base_strip",
    stone_polished_round: "river_stone_polished",
  };
  return m[t];
}

export function bestUse(t: PatternWeightType): string {
  const m: Record<PatternWeightType, string> = {
    steel_disc_flat: "flat_pattern_hold",
    lead_shot_bag: "curved_fabric_hold",
    ceramic_tile_square: "grid_layout_hold",
    magnetic_strip_hold: "metal_table_hold",
    stone_polished_round: "decorative_hold",
  };
  return m[t];
}

export function patternWeights(): PatternWeightType[] {
  return ["steel_disc_flat", "lead_shot_bag", "ceramic_tile_square", "magnetic_strip_hold", "stone_polished_round"];
}

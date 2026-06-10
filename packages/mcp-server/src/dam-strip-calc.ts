export type DamStripType = "fiber_strip_flex" | "stainless_bar_rigid" | "ceramic_rope_round" | "alumina_tape_thin" | "graphite_block_carve";

export function containForce(t: DamStripType): number {
  const m: Record<DamStripType, number> = {
    fiber_strip_flex: 6, stainless_bar_rigid: 10, ceramic_rope_round: 5, alumina_tape_thin: 4, graphite_block_carve: 8,
  };
  return m[t];
}

export function shapeability(t: DamStripType): number {
  const m: Record<DamStripType, number> = {
    fiber_strip_flex: 9, stainless_bar_rigid: 3, ceramic_rope_round: 10, alumina_tape_thin: 7, graphite_block_carve: 5,
  };
  return m[t];
}

export function surfaceFinish(t: DamStripType): number {
  const m: Record<DamStripType, number> = {
    fiber_strip_flex: 6, stainless_bar_rigid: 9, ceramic_rope_round: 4, alumina_tape_thin: 7, graphite_block_carve: 10,
  };
  return m[t];
}

export function reusability(t: DamStripType): number {
  const m: Record<DamStripType, number> = {
    fiber_strip_flex: 3, stainless_bar_rigid: 10, ceramic_rope_round: 4, alumina_tape_thin: 2, graphite_block_carve: 8,
  };
  return m[t];
}

export function stripCost(t: DamStripType): number {
  const m: Record<DamStripType, number> = {
    fiber_strip_flex: 1, stainless_bar_rigid: 2, ceramic_rope_round: 1, alumina_tape_thin: 1, graphite_block_carve: 3,
  };
  return m[t];
}

export function heatProof(t: DamStripType): boolean {
  const m: Record<DamStripType, boolean> = {
    fiber_strip_flex: true, stainless_bar_rigid: true, ceramic_rope_round: true, alumina_tape_thin: true, graphite_block_carve: true,
  };
  return m[t];
}

export function curved(t: DamStripType): boolean {
  const m: Record<DamStripType, boolean> = {
    fiber_strip_flex: true, stainless_bar_rigid: false, ceramic_rope_round: true, alumina_tape_thin: true, graphite_block_carve: false,
  };
  return m[t];
}

export function damMaterial(t: DamStripType): string {
  const m: Record<DamStripType, string> = {
    fiber_strip_flex: "ceramic_fiber_strip",
    stainless_bar_rigid: "stainless_steel_flat",
    ceramic_rope_round: "braided_ceramic_rope",
    alumina_tape_thin: "alumina_adhesive_tape",
    graphite_block_carve: "machined_graphite_bar",
  };
  return m[t];
}

export function bestUse(t: DamStripType): string {
  const m: Record<DamStripType, string> = {
    fiber_strip_flex: "freeform_glass_contain",
    stainless_bar_rigid: "straight_edge_dam",
    ceramic_rope_round: "curved_shape_contain",
    alumina_tape_thin: "quick_edge_seal",
    graphite_block_carve: "polished_edge_form",
  };
  return m[t];
}

export function damStrips(): DamStripType[] {
  return ["fiber_strip_flex", "stainless_bar_rigid", "ceramic_rope_round", "alumina_tape_thin", "graphite_block_carve"];
}

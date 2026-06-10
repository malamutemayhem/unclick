export type HarpCutterType = "single_wire_basic" | "multi_wire_even" | "adjustable_set_var" | "cheese_harp_large" | "bow_cutter_fine";

export function cutEvenness(t: HarpCutterType): number {
  const m: Record<HarpCutterType, number> = {
    single_wire_basic: 6, multi_wire_even: 10, adjustable_set_var: 8, cheese_harp_large: 7, bow_cutter_fine: 5,
  };
  return m[t];
}

export function sliceCount(t: HarpCutterType): number {
  const m: Record<HarpCutterType, number> = {
    single_wire_basic: 1, multi_wire_even: 10, adjustable_set_var: 7, cheese_harp_large: 8, bow_cutter_fine: 1,
  };
  return m[t];
}

export function adjustability(t: HarpCutterType): number {
  const m: Record<HarpCutterType, number> = {
    single_wire_basic: 3, multi_wire_even: 4, adjustable_set_var: 10, cheese_harp_large: 5, bow_cutter_fine: 6,
  };
  return m[t];
}

export function easeOfUse(t: HarpCutterType): number {
  const m: Record<HarpCutterType, number> = {
    single_wire_basic: 9, multi_wire_even: 7, adjustable_set_var: 6, cheese_harp_large: 8, bow_cutter_fine: 8,
  };
  return m[t];
}

export function cutterCost(t: HarpCutterType): number {
  const m: Record<HarpCutterType, number> = {
    single_wire_basic: 1, multi_wire_even: 2, adjustable_set_var: 3, cheese_harp_large: 2, bow_cutter_fine: 1,
  };
  return m[t];
}

export function multiSlice(t: HarpCutterType): boolean {
  const m: Record<HarpCutterType, boolean> = {
    single_wire_basic: false, multi_wire_even: true, adjustable_set_var: true, cheese_harp_large: true, bow_cutter_fine: false,
  };
  return m[t];
}

export function replaceable(t: HarpCutterType): boolean {
  const m: Record<HarpCutterType, boolean> = {
    single_wire_basic: true, multi_wire_even: true, adjustable_set_var: true, cheese_harp_large: true, bow_cutter_fine: true,
  };
  return m[t];
}

export function wireMaterial(t: HarpCutterType): string {
  const m: Record<HarpCutterType, string> = {
    single_wire_basic: "braided_steel_wire",
    multi_wire_even: "piano_wire_parallel",
    adjustable_set_var: "stainless_wire_set",
    cheese_harp_large: "twisted_steel_cable",
    bow_cutter_fine: "nylon_coated_wire",
  };
  return m[t];
}

export function bestUse(t: HarpCutterType): string {
  const m: Record<HarpCutterType, string> = {
    single_wire_basic: "wedge_block_cut",
    multi_wire_even: "even_slab_batch",
    adjustable_set_var: "variable_thick_slab",
    cheese_harp_large: "large_block_slice",
    bow_cutter_fine: "detail_shape_trim",
  };
  return m[t];
}

export function harpCutters(): HarpCutterType[] {
  return ["single_wire_basic", "multi_wire_even", "adjustable_set_var", "cheese_harp_large", "bow_cutter_fine"];
}

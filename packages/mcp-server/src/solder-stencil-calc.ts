export type SolderStencilType =
  | "laser_cut_stainless"
  | "electroform_nickel"
  | "kapton_polyimide"
  | "nano_coat_stainless"
  | "step_stencil_multi";

const DATA: Record<SolderStencilType, {
  aperturePrecision: number; pasteRelease: number; durability: number;
  leadTime: number; stencilCost: number; reusable: boolean;
  forFine: boolean; material: string; bestUse: string;
}> = {
  laser_cut_stainless: { aperturePrecision: 8, pasteRelease: 7, durability: 9, leadTime: 7, stencilCost: 5, reusable: true, forFine: false, material: "stainless_steel_304", bestUse: "general_smt_production" },
  electroform_nickel: { aperturePrecision: 10, pasteRelease: 10, durability: 7, leadTime: 4, stencilCost: 9, reusable: true, forFine: true, material: "electroformed_nickel", bestUse: "fine_pitch_bga_01005" },
  kapton_polyimide: { aperturePrecision: 5, pasteRelease: 6, durability: 3, leadTime: 10, stencilCost: 2, reusable: false, forFine: false, material: "laser_cut_polyimide", bestUse: "prototype_single_run" },
  nano_coat_stainless: { aperturePrecision: 9, pasteRelease: 10, durability: 10, leadTime: 5, stencilCost: 7, reusable: true, forFine: true, material: "nano_coated_stainless", bestUse: "high_volume_paste_print" },
  step_stencil_multi: { aperturePrecision: 8, pasteRelease: 7, durability: 8, leadTime: 3, stencilCost: 8, reusable: true, forFine: true, material: "etched_step_stainless", bestUse: "mixed_component_height" },
};

const get = (t: SolderStencilType) => DATA[t];

export const aperturePrecision = (t: SolderStencilType) => get(t).aperturePrecision;
export const pasteRelease = (t: SolderStencilType) => get(t).pasteRelease;
export const durability = (t: SolderStencilType) => get(t).durability;
export const leadTime = (t: SolderStencilType) => get(t).leadTime;
export const stencilCost = (t: SolderStencilType) => get(t).stencilCost;
export const reusable = (t: SolderStencilType) => get(t).reusable;
export const forFine = (t: SolderStencilType) => get(t).forFine;
export const material = (t: SolderStencilType) => get(t).material;
export const bestUse = (t: SolderStencilType) => get(t).bestUse;
export const solderStencils = (): SolderStencilType[] => Object.keys(DATA) as SolderStencilType[];

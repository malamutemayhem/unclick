export type Shielding =
  | "stamped_metal_can"
  | "board_level_fence"
  | "conductive_paint_spray"
  | "metal_foil_tape"
  | "multilayer_fabric_wrap";

const DATA: Record<Shielding, {
  effectiveness: number; frequency: number; weight: number;
  reworkability: number; shCost: number; conformal: boolean;
  forRf: boolean; material: string; bestUse: string;
}> = {
  stamped_metal_can: {
    effectiveness: 9, frequency: 8, weight: 4,
    reworkability: 7, shCost: 4, conformal: false,
    forRf: true, material: "tin_plated_steel_nickel",
    bestUse: "rf_module_board_level_can",
  },
  board_level_fence: {
    effectiveness: 8, frequency: 9, weight: 6,
    reworkability: 9, shCost: 5, conformal: false,
    forRf: true, material: "solder_clip_spring_fence",
    bestUse: "multi_compartment_5g_radio",
  },
  conductive_paint_spray: {
    effectiveness: 5, frequency: 6, weight: 9,
    reworkability: 3, shCost: 2, conformal: true,
    forRf: false, material: "nickel_copper_acrylic_coat",
    bestUse: "plastic_enclosure_internal_coat",
  },
  metal_foil_tape: {
    effectiveness: 7, frequency: 7, weight: 7,
    reworkability: 8, shCost: 1, conformal: true,
    forRf: false, material: "copper_aluminum_adhesive",
    bestUse: "cable_harness_wrap_shield",
  },
  multilayer_fabric_wrap: {
    effectiveness: 6, frequency: 5, weight: 10,
    reworkability: 6, shCost: 3, conformal: true,
    forRf: false, material: "woven_silver_nylon_mesh",
    bestUse: "wearable_flexible_emi_wrap",
  },
};

const get = (t: Shielding) => DATA[t];

export const effectiveness = (t: Shielding) => get(t).effectiveness;
export const frequency = (t: Shielding) => get(t).frequency;
export const weight = (t: Shielding) => get(t).weight;
export const reworkability = (t: Shielding) => get(t).reworkability;
export const shCost = (t: Shielding) => get(t).shCost;
export const conformal = (t: Shielding) => get(t).conformal;
export const forRf = (t: Shielding) => get(t).forRf;
export const material = (t: Shielding) => get(t).material;
export const bestUse = (t: Shielding) => get(t).bestUse;
export const shieldings = (): Shielding[] => Object.keys(DATA) as Shielding[];

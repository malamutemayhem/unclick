export type PlasmaCutType =
  | "conventional_dual_gas"
  | "high_definition_hd"
  | "fine_plasma_precision"
  | "underwater_submerged"
  | "cnc_bevel_3d_head";

interface PlasmaCutData {
  cutQuality: number;
  speed: number;
  thickness: number;
  operatingCost: number;
  pcCost: number;
  lowFume: boolean;
  forStainless: boolean;
  gas: string;
  bestUse: string;
}

const DATA: Record<PlasmaCutType, PlasmaCutData> = {
  conventional_dual_gas: {
    cutQuality: 6, speed: 9, thickness: 9, operatingCost: 5, pcCost: 4,
    lowFume: false, forStainless: false,
    gas: "oxygen_nitrogen_dual_gas",
    bestUse: "structural_steel_plate_fab",
  },
  high_definition_hd: {
    cutQuality: 9, speed: 8, thickness: 7, operatingCost: 7, pcCost: 7,
    lowFume: false, forStainless: true,
    gas: "nitrogen_argon_hydrogen_mix",
    bestUse: "precision_plate_parts_bolt_hole",
  },
  fine_plasma_precision: {
    cutQuality: 10, speed: 7, thickness: 5, operatingCost: 8, pcCost: 9,
    lowFume: false, forStainless: true,
    gas: "nitrogen_f5_shielding_swirl",
    bestUse: "thin_sheet_hvac_duct_panel",
  },
  underwater_submerged: {
    cutQuality: 7, speed: 8, thickness: 9, operatingCost: 6, pcCost: 6,
    lowFume: true, forStainless: false,
    gas: "oxygen_shield_water_muffler",
    bestUse: "shipyard_heavy_plate_low_noise",
  },
  cnc_bevel_3d_head: {
    cutQuality: 8, speed: 7, thickness: 8, operatingCost: 7, pcCost: 10,
    lowFume: false, forStainless: true,
    gas: "argon_hydrogen_high_definition",
    bestUse: "weld_prep_bevel_vk_groove_pipe",
  },
};

function get(t: PlasmaCutType): PlasmaCutData {
  return DATA[t];
}

export const cutQuality = (t: PlasmaCutType) => get(t).cutQuality;
export const speed = (t: PlasmaCutType) => get(t).speed;
export const thickness = (t: PlasmaCutType) => get(t).thickness;
export const operatingCost = (t: PlasmaCutType) => get(t).operatingCost;
export const pcCost = (t: PlasmaCutType) => get(t).pcCost;
export const lowFume = (t: PlasmaCutType) => get(t).lowFume;
export const forStainless = (t: PlasmaCutType) => get(t).forStainless;
export const gas = (t: PlasmaCutType) => get(t).gas;
export const bestUse = (t: PlasmaCutType) => get(t).bestUse;
export const plasmaCutTypes = (): PlasmaCutType[] =>
  Object.keys(DATA) as PlasmaCutType[];

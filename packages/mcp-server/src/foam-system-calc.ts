export type FoamSystemType =
  | "afff_proportioner_balanced"
  | "ar_afff_alcohol_resistant"
  | "class_a_compressed_air"
  | "high_expansion_generator"
  | "fluorine_free_f3_foam";

interface FoamSystemData {
  knockdown: number;
  burnback: number;
  environmental: number;
  versatility: number;
  fsCost: number;
  fluorineFree: boolean;
  forFuelSpill: boolean;
  concentrate: string;
  bestUse: string;
}

const DATA: Record<FoamSystemType, FoamSystemData> = {
  afff_proportioner_balanced: {
    knockdown: 10, burnback: 9, environmental: 3, versatility: 7, fsCost: 6,
    fluorineFree: false, forFuelSpill: true,
    concentrate: "3_6_pct_afff_pfas_based",
    bestUse: "aircraft_hangar_fuel_storage",
  },
  ar_afff_alcohol_resistant: {
    knockdown: 9, burnback: 8, environmental: 3, versatility: 9, fsCost: 7,
    fluorineFree: false, forFuelSpill: true,
    concentrate: "3_3_pct_ar_afff_polymer",
    bestUse: "chemical_plant_polar_solvent",
  },
  class_a_compressed_air: {
    knockdown: 7, burnback: 8, environmental: 8, versatility: 6, fsCost: 5,
    fluorineFree: true, forFuelSpill: false,
    concentrate: "0_5_pct_class_a_wetting_agent",
    bestUse: "wildland_structural_fire",
  },
  high_expansion_generator: {
    knockdown: 6, burnback: 7, environmental: 7, versatility: 5, fsCost: 6,
    fluorineFree: true, forFuelSpill: false,
    concentrate: "high_expansion_1000_1_ratio",
    bestUse: "lng_warehouse_enclosed_space",
  },
  fluorine_free_f3_foam: {
    knockdown: 8, burnback: 7, environmental: 10, versatility: 8, fsCost: 8,
    fluorineFree: true, forFuelSpill: true,
    concentrate: "f3_silicone_surfactant_pfas_free",
    bestUse: "environmentally_sensitive_site",
  },
};

function get(t: FoamSystemType): FoamSystemData {
  return DATA[t];
}

export const knockdown = (t: FoamSystemType) => get(t).knockdown;
export const burnback = (t: FoamSystemType) => get(t).burnback;
export const environmental = (t: FoamSystemType) => get(t).environmental;
export const versatility = (t: FoamSystemType) => get(t).versatility;
export const fsCost = (t: FoamSystemType) => get(t).fsCost;
export const fluorineFree = (t: FoamSystemType) => get(t).fluorineFree;
export const forFuelSpill = (t: FoamSystemType) => get(t).forFuelSpill;
export const concentrate = (t: FoamSystemType) => get(t).concentrate;
export const bestUse = (t: FoamSystemType) => get(t).bestUse;
export const foamSystemTypes = (): FoamSystemType[] =>
  Object.keys(DATA) as FoamSystemType[];

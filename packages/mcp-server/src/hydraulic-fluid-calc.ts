export type HydraulicFluidType =
  | "mineral_oil_hlp"
  | "fire_resistant_hfdu"
  | "water_glycol_hfc"
  | "phosphate_ester_hfdr"
  | "biodegradable_hetg";

interface HydraulicFluidData {
  lubricity: number;
  fireResist: number;
  tempRange: number;
  sealCompat: number;
  hfCost: number;
  biodegradable: boolean;
  forMobile: boolean;
  base: string;
  bestUse: string;
}

const DATA: Record<HydraulicFluidType, HydraulicFluidData> = {
  mineral_oil_hlp: {
    lubricity: 9, fireResist: 3, tempRange: 7, sealCompat: 9, hfCost: 3,
    biodegradable: false, forMobile: true,
    base: "paraffinic_mineral_oil_aw_additive",
    bestUse: "general_industrial_mobile_hydraulic",
  },
  fire_resistant_hfdu: {
    lubricity: 8, fireResist: 9, tempRange: 7, sealCompat: 7, hfCost: 8,
    biodegradable: true, forMobile: false,
    base: "polyol_ester_synthetic_fire_resist",
    bestUse: "steel_mill_foundry_mining_fire_zone",
  },
  water_glycol_hfc: {
    lubricity: 5, fireResist: 10, tempRange: 5, sealCompat: 6, hfCost: 5,
    biodegradable: false, forMobile: false,
    base: "water_ethylene_glycol_thickener",
    bestUse: "die_cast_furnace_quench_fire_safe",
  },
  phosphate_ester_hfdr: {
    lubricity: 7, fireResist: 10, tempRange: 8, sealCompat: 4, hfCost: 10,
    biodegradable: false, forMobile: false,
    base: "triaryl_phosphate_ester_synthetic",
    bestUse: "turbine_ehc_aerospace_fire_critical",
  },
  biodegradable_hetg: {
    lubricity: 8, fireResist: 3, tempRange: 5, sealCompat: 8, hfCost: 6,
    biodegradable: true, forMobile: true,
    base: "rapeseed_triglyceride_natural_ester",
    bestUse: "forestry_marine_waterway_eco_zone",
  },
};

function get(t: HydraulicFluidType): HydraulicFluidData {
  return DATA[t];
}

export const lubricity = (t: HydraulicFluidType) => get(t).lubricity;
export const fireResist = (t: HydraulicFluidType) => get(t).fireResist;
export const tempRange = (t: HydraulicFluidType) => get(t).tempRange;
export const sealCompat = (t: HydraulicFluidType) => get(t).sealCompat;
export const hfCost = (t: HydraulicFluidType) => get(t).hfCost;
export const biodegradable = (t: HydraulicFluidType) => get(t).biodegradable;
export const forMobile = (t: HydraulicFluidType) => get(t).forMobile;
export const base = (t: HydraulicFluidType) => get(t).base;
export const bestUse = (t: HydraulicFluidType) => get(t).bestUse;
export const hydraulicFluidTypes = (): HydraulicFluidType[] =>
  Object.keys(DATA) as HydraulicFluidType[];

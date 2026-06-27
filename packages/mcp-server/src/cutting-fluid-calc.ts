export type CuttingFluidType =
  | "soluble_oil_emulsion"
  | "synthetic_coolant_clear"
  | "semi_synthetic_blend"
  | "straight_oil_neat"
  | "mql_minimum_quantity";

interface CuttingFluidData {
  cooling: number;
  lubricity: number;
  life: number;
  cleanliness: number;
  cfCost: number;
  oilFree: boolean;
  forGrinding: boolean;
  base: string;
  bestUse: string;
}

const DATA: Record<CuttingFluidType, CuttingFluidData> = {
  soluble_oil_emulsion: {
    cooling: 8, lubricity: 7, life: 6, cleanliness: 6, cfCost: 4,
    oilFree: false, forGrinding: false,
    base: "mineral_oil_emulsifier_water_mix",
    bestUse: "general_turning_milling_drilling",
  },
  synthetic_coolant_clear: {
    cooling: 10, lubricity: 5, life: 8, cleanliness: 10, cfCost: 7,
    oilFree: true, forGrinding: true,
    base: "polymer_glycol_amine_water_solution",
    bestUse: "grinding_high_speed_clean_sump",
  },
  semi_synthetic_blend: {
    cooling: 9, lubricity: 7, life: 8, cleanliness: 8, cfCost: 6,
    oilFree: false, forGrinding: true,
    base: "low_oil_emulsion_synthetic_blend",
    bestUse: "multi_operation_cnc_cell_general",
  },
  straight_oil_neat: {
    cooling: 4, lubricity: 10, life: 9, cleanliness: 4, cfCost: 5,
    oilFree: false, forGrinding: false,
    base: "mineral_vegetable_neat_oil_ep",
    bestUse: "deep_hole_broach_heavy_thread_cut",
  },
  mql_minimum_quantity: {
    cooling: 3, lubricity: 8, life: 10, cleanliness: 9, cfCost: 8,
    oilFree: false, forGrinding: false,
    base: "ester_fatty_alcohol_aerosol_mist",
    bestUse: "near_dry_aluminum_composite_eco",
  },
};

function get(t: CuttingFluidType): CuttingFluidData {
  return DATA[t];
}

export const cooling = (t: CuttingFluidType) => get(t).cooling;
export const lubricity = (t: CuttingFluidType) => get(t).lubricity;
export const life = (t: CuttingFluidType) => get(t).life;
export const cleanliness = (t: CuttingFluidType) => get(t).cleanliness;
export const cfCost = (t: CuttingFluidType) => get(t).cfCost;
export const oilFree = (t: CuttingFluidType) => get(t).oilFree;
export const forGrinding = (t: CuttingFluidType) => get(t).forGrinding;
export const base = (t: CuttingFluidType) => get(t).base;
export const bestUse = (t: CuttingFluidType) => get(t).bestUse;
export const cuttingFluidTypes = (): CuttingFluidType[] =>
  Object.keys(DATA) as CuttingFluidType[];

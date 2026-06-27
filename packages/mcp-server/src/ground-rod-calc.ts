export type GroundRodType =
  | "copper_bonded_steel"
  | "galvanized_steel_plain"
  | "solid_copper_rod"
  | "stainless_steel_rod"
  | "chemical_ground_electrode";

interface GroundRodData {
  conductivity: number;
  corrosionResist: number;
  longevity: number;
  installEase: number;
  grCost: number;
  lowResistance: boolean;
  forCorrosive: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<GroundRodType, GroundRodData> = {
  copper_bonded_steel: {
    conductivity: 8, corrosionResist: 7, longevity: 8, installEase: 8, grCost: 3,
    lowResistance: true, forCorrosive: false,
    material: "steel_core_10_mil_copper",
    bestUse: "standard_building_service_ground",
  },
  galvanized_steel_plain: {
    conductivity: 5, corrosionResist: 5, longevity: 5, installEase: 8, grCost: 2,
    lowResistance: false, forCorrosive: false,
    material: "hot_dip_galvanized_steel",
    bestUse: "temporary_fence_ground_basic",
  },
  solid_copper_rod: {
    conductivity: 10, corrosionResist: 9, longevity: 10, installEase: 6, grCost: 8,
    lowResistance: true, forCorrosive: true,
    material: "solid_drawn_copper_rod",
    bestUse: "telecom_tower_sensitive_equip",
  },
  stainless_steel_rod: {
    conductivity: 6, corrosionResist: 10, longevity: 10, installEase: 7, grCost: 7,
    lowResistance: false, forCorrosive: true,
    material: "316_stainless_steel_rod",
    bestUse: "coastal_chemical_corrosive_soil",
  },
  chemical_ground_electrode: {
    conductivity: 9, corrosionResist: 8, longevity: 9, installEase: 4, grCost: 9,
    lowResistance: true, forCorrosive: true,
    material: "conductive_backfill_electrode",
    bestUse: "rocky_soil_high_resistance_area",
  },
};

function get(t: GroundRodType): GroundRodData {
  return DATA[t];
}

export const conductivity = (t: GroundRodType) => get(t).conductivity;
export const corrosionResist = (t: GroundRodType) => get(t).corrosionResist;
export const longevity = (t: GroundRodType) => get(t).longevity;
export const installEase = (t: GroundRodType) => get(t).installEase;
export const grCost = (t: GroundRodType) => get(t).grCost;
export const lowResistance = (t: GroundRodType) => get(t).lowResistance;
export const forCorrosive = (t: GroundRodType) => get(t).forCorrosive;
export const material = (t: GroundRodType) => get(t).material;
export const bestUse = (t: GroundRodType) => get(t).bestUse;
export const groundRodTypes = (): GroundRodType[] =>
  Object.keys(DATA) as GroundRodType[];

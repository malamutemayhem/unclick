export type GroundingRodType =
  | "copper_clad_steel"
  | "solid_copper_rod"
  | "galvanized_steel"
  | "ground_plate_mesh"
  | "chemical_electrode";

const DATA: Record<GroundingRodType, {
  conductivity: number; corrosionResist: number; installEase: number;
  longevity: number; rodCost: number; lowResistance: boolean;
  forRocky: boolean; material: string; bestUse: string;
}> = {
  copper_clad_steel: { conductivity: 8, corrosionResist: 7, installEase: 7, longevity: 8, rodCost: 4, lowResistance: true, forRocky: false, material: "steel_copper_clad", bestUse: "standard_building_ground" },
  solid_copper_rod: { conductivity: 10, corrosionResist: 9, installEase: 6, longevity: 10, rodCost: 8, lowResistance: true, forRocky: false, material: "solid_copper_bar", bestUse: "critical_facility_ground" },
  galvanized_steel: { conductivity: 5, corrosionResist: 5, installEase: 8, longevity: 5, rodCost: 2, lowResistance: false, forRocky: false, material: "galvanized_mild_steel", bestUse: "temporary_site_ground" },
  ground_plate_mesh: { conductivity: 7, corrosionResist: 8, installEase: 4, longevity: 9, rodCost: 7, lowResistance: true, forRocky: true, material: "copper_mesh_plate", bestUse: "rocky_soil_shallow_ground" },
  chemical_electrode: { conductivity: 9, corrosionResist: 8, installEase: 5, longevity: 7, rodCost: 9, lowResistance: true, forRocky: true, material: "backfill_chemical_rod", bestUse: "high_resistivity_soil" },
};

const get = (t: GroundingRodType) => DATA[t];

export const conductivity = (t: GroundingRodType) => get(t).conductivity;
export const corrosionResist = (t: GroundingRodType) => get(t).corrosionResist;
export const installEase = (t: GroundingRodType) => get(t).installEase;
export const longevity = (t: GroundingRodType) => get(t).longevity;
export const rodCost = (t: GroundingRodType) => get(t).rodCost;
export const lowResistance = (t: GroundingRodType) => get(t).lowResistance;
export const forRocky = (t: GroundingRodType) => get(t).forRocky;
export const material = (t: GroundingRodType) => get(t).material;
export const bestUse = (t: GroundingRodType) => get(t).bestUse;
export const groundingRods = (): GroundingRodType[] => Object.keys(DATA) as GroundingRodType[];

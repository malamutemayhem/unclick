export type CathodicProtectionType =
  | "galvanic_zinc_anode"
  | "galvanic_magnesium"
  | "galvanic_aluminum"
  | "impressed_current_std"
  | "hybrid_galvanic_ic";

interface CathodicProtectionData {
  drivingVoltage: number;
  currentOutput: number;
  anodeLife: number;
  maintenance: number;
  cpCost: number;
  passive: boolean;
  forMarine: boolean;
  anode: string;
  bestUse: string;
}

const DATA: Record<CathodicProtectionType, CathodicProtectionData> = {
  galvanic_zinc_anode: {
    drivingVoltage: 4, currentOutput: 5, anodeLife: 7, maintenance: 9, cpCost: 4,
    passive: true, forMarine: true,
    anode: "cast_zinc_alloy_hull_anode_bracelet_slab",
    bestUse: "ship_hull_seawater_piping_marine_structure",
  },
  galvanic_magnesium: {
    drivingVoltage: 8, currentOutput: 7, anodeLife: 5, maintenance: 8, cpCost: 5,
    passive: true, forMarine: false,
    anode: "high_potential_magnesium_alloy_backfill_bag",
    bestUse: "buried_pipeline_tank_bottom_low_resistivity",
  },
  galvanic_aluminum: {
    drivingVoltage: 5, currentOutput: 8, anodeLife: 8, maintenance: 9, cpCost: 5,
    passive: true, forMarine: true,
    anode: "aluminum_zinc_indium_alloy_high_capacity_anode",
    bestUse: "offshore_platform_subsea_pipeline_brackish",
  },
  impressed_current_std: {
    drivingVoltage: 10, currentOutput: 10, anodeLife: 10, maintenance: 5, cpCost: 8,
    passive: false, forMarine: false,
    anode: "mixed_metal_oxide_titanium_substrate_anode",
    bestUse: "long_pipeline_large_structure_high_resistivity",
  },
  hybrid_galvanic_ic: {
    drivingVoltage: 8, currentOutput: 9, anodeLife: 8, maintenance: 6, cpCost: 7,
    passive: false, forMarine: true,
    anode: "combined_sacrificial_rectifier_boost_anode",
    bestUse: "complex_structure_variable_soil_marine_hybrid",
  },
};

function get(t: CathodicProtectionType): CathodicProtectionData {
  return DATA[t];
}

export const drivingVoltage = (t: CathodicProtectionType) => get(t).drivingVoltage;
export const currentOutput = (t: CathodicProtectionType) => get(t).currentOutput;
export const anodeLife = (t: CathodicProtectionType) => get(t).anodeLife;
export const maintenance = (t: CathodicProtectionType) => get(t).maintenance;
export const cpCost = (t: CathodicProtectionType) => get(t).cpCost;
export const passive = (t: CathodicProtectionType) => get(t).passive;
export const forMarine = (t: CathodicProtectionType) => get(t).forMarine;
export const anode = (t: CathodicProtectionType) => get(t).anode;
export const bestUse = (t: CathodicProtectionType) => get(t).bestUse;
export const cathodicProtectionTypes = (): CathodicProtectionType[] =>
  Object.keys(DATA) as CathodicProtectionType[];

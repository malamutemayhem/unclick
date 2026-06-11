export type SphericalTankType =
  | "horton_sphere_lpg"
  | "pressurized_ammonia"
  | "water_tower_elevated"
  | "nuclear_containment"
  | "deep_sea_submersible";

interface SphericalTankData {
  pressureRating: number;
  volumeEfficiency: number;
  stressDistribution: number;
  weldComplexity: number;
  spCost: number;
  elevated: boolean;
  forLpg: boolean;
  shell: string;
  bestUse: string;
}

const DATA: Record<SphericalTankType, SphericalTankData> = {
  horton_sphere_lpg: {
    pressureRating: 9, volumeEfficiency: 10, stressDistribution: 10, weldComplexity: 4, spCost: 7,
    elevated: true, forLpg: true,
    shell: "welded_steel_sphere_leg_supported_lpg_storage",
    bestUse: "lpg_butane_propane_refinery_terminal_storage",
  },
  pressurized_ammonia: {
    pressureRating: 8, volumeEfficiency: 10, stressDistribution: 10, weldComplexity: 4, spCost: 8,
    elevated: false, forLpg: false,
    shell: "thick_wall_sphere_refrigerated_ammonia_storage",
    bestUse: "ammonia_storage_fertilizer_plant_refrigerated",
  },
  water_tower_elevated: {
    pressureRating: 3, volumeEfficiency: 8, stressDistribution: 8, weldComplexity: 5, spCost: 5,
    elevated: true, forLpg: false,
    shell: "elevated_spheroid_pedestal_gravity_head_pressure",
    bestUse: "municipal_water_supply_elevated_gravity_feed",
  },
  nuclear_containment: {
    pressureRating: 10, volumeEfficiency: 9, stressDistribution: 10, weldComplexity: 3, spCost: 10,
    elevated: false, forLpg: false,
    shell: "thick_wall_steel_liner_concrete_containment",
    bestUse: "nuclear_reactor_primary_containment_vessel",
  },
  deep_sea_submersible: {
    pressureRating: 10, volumeEfficiency: 10, stressDistribution: 10, weldComplexity: 2, spCost: 10,
    elevated: false, forLpg: false,
    shell: "titanium_or_steel_sphere_external_hydrostatic",
    bestUse: "deep_sea_research_submersible_pressure_hull",
  },
};

function get(t: SphericalTankType): SphericalTankData {
  return DATA[t];
}

export const pressureRating = (t: SphericalTankType) => get(t).pressureRating;
export const volumeEfficiency = (t: SphericalTankType) => get(t).volumeEfficiency;
export const stressDistribution = (t: SphericalTankType) => get(t).stressDistribution;
export const weldComplexity = (t: SphericalTankType) => get(t).weldComplexity;
export const spCost = (t: SphericalTankType) => get(t).spCost;
export const elevated = (t: SphericalTankType) => get(t).elevated;
export const forLpg = (t: SphericalTankType) => get(t).forLpg;
export const shell = (t: SphericalTankType) => get(t).shell;
export const bestUse = (t: SphericalTankType) => get(t).bestUse;
export const sphericalTankTypes = (): SphericalTankType[] =>
  Object.keys(DATA) as SphericalTankType[];

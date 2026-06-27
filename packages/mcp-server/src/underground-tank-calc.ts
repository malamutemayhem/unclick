export type UndergroundTankType =
  | "single_wall_steel"
  | "double_wall_steel"
  | "fiberglass_frp"
  | "concrete_vault"
  | "flexible_bladder";

interface UndergroundTankData {
  corrosionResist: number;
  leakDetection: number;
  installEase: number;
  longevity: number;
  ugCost: number;
  doubleContained: boolean;
  forFuel: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<UndergroundTankType, UndergroundTankData> = {
  single_wall_steel: {
    corrosionResist: 4, leakDetection: 3, installEase: 6, longevity: 5, ugCost: 4,
    doubleContained: false, forFuel: true,
    material: "carbon_steel_coated_cathodic_protection",
    bestUse: "legacy_fuel_storage_retrofit_cathodic_protect",
  },
  double_wall_steel: {
    corrosionResist: 6, leakDetection: 10, installEase: 5, longevity: 8, ugCost: 7,
    doubleContained: true, forFuel: true,
    material: "dual_steel_shell_interstitial_monitor_space",
    bestUse: "modern_fuel_station_epa_compliant_double_wall",
  },
  fiberglass_frp: {
    corrosionResist: 10, leakDetection: 8, installEase: 7, longevity: 9, ugCost: 6,
    doubleContained: true, forFuel: true,
    material: "fiberglass_reinforced_plastic_resin_laminate",
    bestUse: "retail_fuel_station_corrosion_free_frp_tank",
  },
  concrete_vault: {
    corrosionResist: 7, leakDetection: 6, installEase: 3, longevity: 10, ugCost: 9,
    doubleContained: true, forFuel: false,
    material: "reinforced_concrete_lined_vault_containment",
    bestUse: "stormwater_retention_wastewater_equalization",
  },
  flexible_bladder: {
    corrosionResist: 8, leakDetection: 5, installEase: 10, longevity: 4, ugCost: 3,
    doubleContained: false, forFuel: false,
    material: "reinforced_polymer_bladder_collapsible_fabric",
    bestUse: "temporary_water_storage_emergency_fuel_cache",
  },
};

function get(t: UndergroundTankType): UndergroundTankData {
  return DATA[t];
}

export const corrosionResist = (t: UndergroundTankType) => get(t).corrosionResist;
export const leakDetection = (t: UndergroundTankType) => get(t).leakDetection;
export const installEase = (t: UndergroundTankType) => get(t).installEase;
export const longevity = (t: UndergroundTankType) => get(t).longevity;
export const ugCost = (t: UndergroundTankType) => get(t).ugCost;
export const doubleContained = (t: UndergroundTankType) => get(t).doubleContained;
export const forFuel = (t: UndergroundTankType) => get(t).forFuel;
export const material = (t: UndergroundTankType) => get(t).material;
export const bestUse = (t: UndergroundTankType) => get(t).bestUse;
export const undergroundTankTypes = (): UndergroundTankType[] =>
  Object.keys(DATA) as UndergroundTankType[];

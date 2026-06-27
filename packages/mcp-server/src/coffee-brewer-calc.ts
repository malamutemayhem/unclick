export type CoffeeBrewerType =
  | "pour_over_drip"
  | "batch_brewer"
  | "cold_brew_tower"
  | "siphon_vacuum"
  | "turkish_ibrik";

interface CoffeeBrewerData {
  extractionControl: number;
  brewConsistency: number;
  throughput: number;
  flavorClarity: number;
  cbCost: number;
  automated: boolean;
  forSpecialty: boolean;
  brewerConfig: string;
  bestUse: string;
}

const DATA: Record<CoffeeBrewerType, CoffeeBrewerData> = {
  pour_over_drip: {
    extractionControl: 9, brewConsistency: 7, throughput: 3, flavorClarity: 10, cbCost: 3,
    automated: false, forSpecialty: true,
    brewerConfig: "pour_over_drip_brewer_manual_kettle_cone_filter_single_cup_craft",
    bestUse: "specialty_cafe_pour_over_drip_single_origin_manual_craft_brew",
  },
  batch_brewer: {
    extractionControl: 7, brewConsistency: 9, throughput: 10, flavorClarity: 7, cbCost: 6,
    automated: true, forSpecialty: false,
    brewerConfig: "batch_brewer_automatic_spray_head_insulated_server_volume_brew",
    bestUse: "high_volume_cafe_batch_brewer_consistent_automatic_large_serve",
  },
  cold_brew_tower: {
    extractionControl: 6, brewConsistency: 8, throughput: 5, flavorClarity: 9, cbCost: 5,
    automated: false, forSpecialty: true,
    brewerConfig: "cold_brew_tower_slow_drip_ice_water_glass_column_concentrate",
    bestUse: "specialty_cold_brew_tower_slow_drip_smooth_low_acid_concentrate",
  },
  siphon_vacuum: {
    extractionControl: 10, brewConsistency: 6, throughput: 2, flavorClarity: 10, cbCost: 7,
    automated: false, forSpecialty: true,
    brewerConfig: "siphon_vacuum_brewer_glass_globe_vapor_pressure_immersion_filter",
    bestUse: "premium_cafe_siphon_vacuum_brewer_theatrical_immersion_clean_cup",
  },
  turkish_ibrik: {
    extractionControl: 8, brewConsistency: 5, throughput: 2, flavorClarity: 5, cbCost: 2,
    automated: false, forSpecialty: true,
    brewerConfig: "turkish_ibrik_cezve_fine_grind_boil_foam_unfiltered_traditional",
    bestUse: "traditional_turkish_coffee_ibrik_cezve_fine_grind_foam_unfiltered",
  },
};

function get(t: CoffeeBrewerType): CoffeeBrewerData {
  return DATA[t];
}

export const extractionControl = (t: CoffeeBrewerType) => get(t).extractionControl;
export const brewConsistency = (t: CoffeeBrewerType) => get(t).brewConsistency;
export const throughput = (t: CoffeeBrewerType) => get(t).throughput;
export const flavorClarity = (t: CoffeeBrewerType) => get(t).flavorClarity;
export const cbCost = (t: CoffeeBrewerType) => get(t).cbCost;
export const automated = (t: CoffeeBrewerType) => get(t).automated;
export const forSpecialty = (t: CoffeeBrewerType) => get(t).forSpecialty;
export const brewerConfig = (t: CoffeeBrewerType) => get(t).brewerConfig;
export const bestUse = (t: CoffeeBrewerType) => get(t).bestUse;
export const coffeeBrewerTypes = (): CoffeeBrewerType[] =>
  Object.keys(DATA) as CoffeeBrewerType[];

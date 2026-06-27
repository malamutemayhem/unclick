export type AbsorptionChillerType =
  | "single_effect_steam"
  | "double_effect_direct"
  | "triple_effect_high_eff"
  | "exhaust_fired_cogen"
  | "solar_thermal_libr";

interface AbsorptionChillerData {
  cop: number;
  capacity: number;
  heatSourceFlex: number;
  maintenance: number;
  acCost: number;
  directFired: boolean;
  forWasteHeat: boolean;
  absorbent: string;
  bestUse: string;
}

const DATA: Record<AbsorptionChillerType, AbsorptionChillerData> = {
  single_effect_steam: {
    cop: 4, capacity: 6, heatSourceFlex: 7, maintenance: 8, acCost: 4,
    directFired: false, forWasteHeat: true,
    absorbent: "lithium_bromide_water_single_generator",
    bestUse: "low_grade_waste_heat_steam_available",
  },
  double_effect_direct: {
    cop: 7, capacity: 8, heatSourceFlex: 6, maintenance: 6, acCost: 7,
    directFired: true, forWasteHeat: false,
    absorbent: "lithium_bromide_two_stage_generator",
    bestUse: "natural_gas_site_high_cop_needed",
  },
  triple_effect_high_eff: {
    cop: 10, capacity: 9, heatSourceFlex: 4, maintenance: 4, acCost: 10,
    directFired: true, forWasteHeat: false,
    absorbent: "lithium_bromide_three_stage_advanced",
    bestUse: "premium_efficiency_large_district_cool",
  },
  exhaust_fired_cogen: {
    cop: 6, capacity: 7, heatSourceFlex: 5, maintenance: 7, acCost: 6,
    directFired: false, forWasteHeat: true,
    absorbent: "lithium_bromide_exhaust_gas_direct",
    bestUse: "turbine_exhaust_cogen_trigeneration",
  },
  solar_thermal_libr: {
    cop: 3, capacity: 4, heatSourceFlex: 3, maintenance: 9, acCost: 5,
    directFired: false, forWasteHeat: true,
    absorbent: "lithium_bromide_solar_evacuated_tube",
    bestUse: "solar_driven_remote_off_grid_cooling",
  },
};

function get(t: AbsorptionChillerType): AbsorptionChillerData {
  return DATA[t];
}

export const cop = (t: AbsorptionChillerType) => get(t).cop;
export const capacity = (t: AbsorptionChillerType) => get(t).capacity;
export const heatSourceFlex = (t: AbsorptionChillerType) => get(t).heatSourceFlex;
export const maintenance = (t: AbsorptionChillerType) => get(t).maintenance;
export const acCost = (t: AbsorptionChillerType) => get(t).acCost;
export const directFired = (t: AbsorptionChillerType) => get(t).directFired;
export const forWasteHeat = (t: AbsorptionChillerType) => get(t).forWasteHeat;
export const absorbent = (t: AbsorptionChillerType) => get(t).absorbent;
export const bestUse = (t: AbsorptionChillerType) => get(t).bestUse;
export const absorptionChillerTypes = (): AbsorptionChillerType[] =>
  Object.keys(DATA) as AbsorptionChillerType[];

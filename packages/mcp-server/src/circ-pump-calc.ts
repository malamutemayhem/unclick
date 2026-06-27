export type CircPumpType =
  | "wet_rotor_residential"
  | "dry_rotor_commercial"
  | "ecm_variable_speed"
  | "inline_flanged_large"
  | "solar_thermal_bronze";

interface CircPumpData {
  flow: number;
  efficiency: number;
  noise: number;
  longevity: number;
  cpCost: number;
  variableSpeed: boolean;
  forDomestic: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<CircPumpType, CircPumpData> = {
  wet_rotor_residential: {
    flow: 4, efficiency: 6, noise: 9, longevity: 7, cpCost: 3,
    variableSpeed: false, forDomestic: true,
    rotor: "wet_rotor_canned_stator",
    bestUse: "residential_hydronic_heating",
  },
  dry_rotor_commercial: {
    flow: 8, efficiency: 7, noise: 5, longevity: 8, cpCost: 6,
    variableSpeed: false, forDomestic: false,
    rotor: "dry_rotor_mechanical_seal",
    bestUse: "commercial_chilled_water_loop",
  },
  ecm_variable_speed: {
    flow: 6, efficiency: 10, noise: 8, longevity: 9, cpCost: 7,
    variableSpeed: true, forDomestic: true,
    rotor: "ecm_permanent_magnet_motor",
    bestUse: "energy_efficient_retrofit",
  },
  inline_flanged_large: {
    flow: 10, efficiency: 7, noise: 4, longevity: 9, cpCost: 8,
    variableSpeed: false, forDomestic: false,
    rotor: "inline_flanged_close_coupled",
    bestUse: "large_building_primary_loop",
  },
  solar_thermal_bronze: {
    flow: 3, efficiency: 7, noise: 9, longevity: 8, cpCost: 5,
    variableSpeed: false, forDomestic: true,
    rotor: "bronze_body_glycol_rated",
    bestUse: "solar_thermal_collector_loop",
  },
};

function get(t: CircPumpType): CircPumpData {
  return DATA[t];
}

export const flow = (t: CircPumpType) => get(t).flow;
export const efficiency = (t: CircPumpType) => get(t).efficiency;
export const noise = (t: CircPumpType) => get(t).noise;
export const longevity = (t: CircPumpType) => get(t).longevity;
export const cpCost = (t: CircPumpType) => get(t).cpCost;
export const variableSpeed = (t: CircPumpType) => get(t).variableSpeed;
export const forDomestic = (t: CircPumpType) => get(t).forDomestic;
export const rotor = (t: CircPumpType) => get(t).rotor;
export const bestUse = (t: CircPumpType) => get(t).bestUse;
export const circPumpTypes = (): CircPumpType[] =>
  Object.keys(DATA) as CircPumpType[];

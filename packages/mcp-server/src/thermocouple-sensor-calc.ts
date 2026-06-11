export type ThermocoupleSensorType =
  | "type_k_chromel_alumel"
  | "type_j_iron_constantan"
  | "type_t_copper_constantan"
  | "type_s_platinum_rhodium"
  | "type_n_nicrosil_nisil";

interface ThermocoupleSensorData {
  accuracy: number;
  tempRange: number;
  stability: number;
  response: number;
  tsCost: number;
  nobleMetl: boolean;
  forHighTemp: boolean;
  junction: string;
  bestUse: string;
}

const DATA: Record<ThermocoupleSensorType, ThermocoupleSensorData> = {
  type_k_chromel_alumel: {
    accuracy: 6, tempRange: 8, stability: 6, response: 8, tsCost: 3,
    nobleMetl: false, forHighTemp: false,
    junction: "chromel_alumel_nickel_alloy_general",
    bestUse: "general_purpose_furnace_oven_exhaust",
  },
  type_j_iron_constantan: {
    accuracy: 6, tempRange: 6, stability: 5, response: 8, tsCost: 2,
    nobleMetl: false, forHighTemp: false,
    junction: "iron_constantan_reducing_atmosphere",
    bestUse: "plastics_rubber_low_cost_reducing_atm",
  },
  type_t_copper_constantan: {
    accuracy: 8, tempRange: 4, stability: 7, response: 9, tsCost: 3,
    nobleMetl: false, forHighTemp: false,
    junction: "copper_constantan_cryogenic_to_medium",
    bestUse: "food_pharma_cryogenic_low_temp_precise",
  },
  type_s_platinum_rhodium: {
    accuracy: 9, tempRange: 10, stability: 10, response: 5, tsCost: 10,
    nobleMetl: true, forHighTemp: true,
    junction: "platinum_rhodium_noble_metal_high_temp",
    bestUse: "glass_ceramic_kiln_reference_standard",
  },
  type_n_nicrosil_nisil: {
    accuracy: 7, tempRange: 9, stability: 8, response: 7, tsCost: 4,
    nobleMetl: false, forHighTemp: true,
    junction: "nicrosil_nisil_improved_k_type_stable",
    bestUse: "high_temp_stable_alternative_to_type_k",
  },
};

function get(t: ThermocoupleSensorType): ThermocoupleSensorData {
  return DATA[t];
}

export const accuracy = (t: ThermocoupleSensorType) => get(t).accuracy;
export const tempRange = (t: ThermocoupleSensorType) => get(t).tempRange;
export const stability = (t: ThermocoupleSensorType) => get(t).stability;
export const response = (t: ThermocoupleSensorType) => get(t).response;
export const tsCost = (t: ThermocoupleSensorType) => get(t).tsCost;
export const nobleMetl = (t: ThermocoupleSensorType) => get(t).nobleMetl;
export const forHighTemp = (t: ThermocoupleSensorType) => get(t).forHighTemp;
export const junction = (t: ThermocoupleSensorType) => get(t).junction;
export const bestUse = (t: ThermocoupleSensorType) => get(t).bestUse;
export const thermocoupleSensorTypes = (): ThermocoupleSensorType[] =>
  Object.keys(DATA) as ThermocoupleSensorType[];

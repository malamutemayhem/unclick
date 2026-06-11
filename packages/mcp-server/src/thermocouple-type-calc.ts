export type ThermocoupleType =
  | "type_k_chromel_alumel"
  | "type_j_iron_constantan"
  | "type_t_copper_constantan"
  | "type_e_chromel_constantan"
  | "type_s_platinum_rhodium";

interface ThermocoupleData {
  range: number;
  accuracy: number;
  stability: number;
  response: number;
  tcCost: number;
  nobleMetal: boolean;
  forHigh: boolean;
  junction: string;
  bestUse: string;
}

const DATA: Record<ThermocoupleType, ThermocoupleData> = {
  type_k_chromel_alumel: {
    range: 8, accuracy: 7, stability: 7, response: 7, tcCost: 3,
    nobleMetal: false, forHigh: true,
    junction: "chromel_alumel_nickel_alloy_pair",
    bestUse: "general_industrial_kiln_exhaust_wide",
  },
  type_j_iron_constantan: {
    range: 6, accuracy: 7, stability: 5, response: 7, tcCost: 2,
    nobleMetal: false, forHigh: false,
    junction: "iron_constantan_copper_nickel",
    bestUse: "plastics_extrude_oven_vacuum_inert",
  },
  type_t_copper_constantan: {
    range: 4, accuracy: 8, stability: 8, response: 8, tcCost: 3,
    nobleMetal: false, forHigh: false,
    junction: "copper_constantan_low_temp_pair",
    bestUse: "food_pharma_cryo_low_temp_precise",
  },
  type_e_chromel_constantan: {
    range: 5, accuracy: 9, stability: 7, response: 9, tcCost: 4,
    nobleMetal: false, forHigh: false,
    junction: "chromel_constantan_high_output",
    bestUse: "lab_sub_zero_highest_emf_sensitive",
  },
  type_s_platinum_rhodium: {
    range: 10, accuracy: 8, stability: 10, response: 5, tcCost: 10,
    nobleMetal: true, forHigh: true,
    junction: "platinum_rhodium_10_pure_platinum",
    bestUse: "glass_furnace_steel_calibrate_ref",
  },
};

function get(t: ThermocoupleType): ThermocoupleData {
  return DATA[t];
}

export const range = (t: ThermocoupleType) => get(t).range;
export const accuracy = (t: ThermocoupleType) => get(t).accuracy;
export const stability = (t: ThermocoupleType) => get(t).stability;
export const response = (t: ThermocoupleType) => get(t).response;
export const tcCost = (t: ThermocoupleType) => get(t).tcCost;
export const nobleMetal = (t: ThermocoupleType) => get(t).nobleMetal;
export const forHigh = (t: ThermocoupleType) => get(t).forHigh;
export const junction = (t: ThermocoupleType) => get(t).junction;
export const bestUse = (t: ThermocoupleType) => get(t).bestUse;
export const thermocoupleTypes = (): ThermocoupleType[] =>
  Object.keys(DATA) as ThermocoupleType[];

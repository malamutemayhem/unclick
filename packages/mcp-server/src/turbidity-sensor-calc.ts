export type TurbiditySensorType =
  | "nephelometric_90_degree"
  | "ratio_4_beam_modulated"
  | "backscatter_high_range"
  | "absorption_inline_uv"
  | "laser_low_range_ntu";

interface TurbiditySensorData {
  accuracy: number;
  range: number;
  stability: number;
  response: number;
  tsCost: number;
  selfCleaning: boolean;
  forDrinkingWater: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<TurbiditySensorType, TurbiditySensorData> = {
  nephelometric_90_degree: {
    accuracy: 8, range: 6, stability: 8, response: 8, tsCost: 5,
    selfCleaning: false, forDrinkingWater: true,
    principle: "90_degree_scattered_light_epa_180_1",
    bestUse: "drinking_water_regulatory_compliance",
  },
  ratio_4_beam_modulated: {
    accuracy: 9, range: 7, stability: 9, response: 8, tsCost: 7,
    selfCleaning: true, forDrinkingWater: true,
    principle: "four_beam_alternating_ratio_compensation",
    bestUse: "filter_effluent_low_range_monitoring",
  },
  backscatter_high_range: {
    accuracy: 6, range: 10, stability: 7, response: 7, tsCost: 6,
    selfCleaning: true, forDrinkingWater: false,
    principle: "backscatter_140_degree_high_solids",
    bestUse: "wastewater_sludge_blanket_detection",
  },
  absorption_inline_uv: {
    accuracy: 7, range: 8, stability: 7, response: 9, tsCost: 6,
    selfCleaning: false, forDrinkingWater: false,
    principle: "uv_vis_absorption_inline_photometer",
    bestUse: "industrial_process_color_turbidity",
  },
  laser_low_range_ntu: {
    accuracy: 10, range: 4, stability: 9, response: 9, tsCost: 9,
    selfCleaning: false, forDrinkingWater: true,
    principle: "laser_nephelometer_sub_ntu_precision",
    bestUse: "ultra_pure_water_membrane_monitoring",
  },
};

function get(t: TurbiditySensorType): TurbiditySensorData {
  return DATA[t];
}

export const accuracy = (t: TurbiditySensorType) => get(t).accuracy;
export const range = (t: TurbiditySensorType) => get(t).range;
export const stability = (t: TurbiditySensorType) => get(t).stability;
export const response = (t: TurbiditySensorType) => get(t).response;
export const tsCost = (t: TurbiditySensorType) => get(t).tsCost;
export const selfCleaning = (t: TurbiditySensorType) => get(t).selfCleaning;
export const forDrinkingWater = (t: TurbiditySensorType) => get(t).forDrinkingWater;
export const principle = (t: TurbiditySensorType) => get(t).principle;
export const bestUse = (t: TurbiditySensorType) => get(t).bestUse;
export const turbiditySensorTypes = (): TurbiditySensorType[] =>
  Object.keys(DATA) as TurbiditySensorType[];

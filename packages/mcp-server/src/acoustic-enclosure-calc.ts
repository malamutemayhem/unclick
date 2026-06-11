export type AcousticEnclosureType =
  | "full_enclosure_modular"
  | "partial_barrier_hood"
  | "close_fitting_wrap"
  | "ventilated_enclosure"
  | "outdoor_weatherproof";

interface AcousticEnclosureData {
  noiseReduction: number;
  ventilation: number;
  accessibility: number;
  weatherResist: number;
  aeCost: number;
  fullySealable: boolean;
  forOutdoor: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<AcousticEnclosureType, AcousticEnclosureData> = {
  full_enclosure_modular: {
    noiseReduction: 10, ventilation: 6, accessibility: 7, weatherResist: 7, aeCost: 8,
    fullySealable: true, forOutdoor: false,
    construction: "modular_steel_panel_mineral_wool_lined_sealed",
    bestUse: "compressor_room_generator_high_noise_machine",
  },
  partial_barrier_hood: {
    noiseReduction: 6, ventilation: 9, accessibility: 9, weatherResist: 5, aeCost: 4,
    fullySealable: false, forOutdoor: false,
    construction: "three_sided_barrier_hood_open_top_absorber",
    bestUse: "production_line_partial_screen_operator_area",
  },
  close_fitting_wrap: {
    noiseReduction: 8, ventilation: 4, accessibility: 4, weatherResist: 6, aeCost: 6,
    fullySealable: true, forOutdoor: false,
    construction: "mass_loaded_vinyl_barrier_close_wrap_foam",
    bestUse: "pipe_valve_duct_lagging_close_fitting_wrap",
  },
  ventilated_enclosure: {
    noiseReduction: 8, ventilation: 8, accessibility: 7, weatherResist: 7, aeCost: 7,
    fullySealable: false, forOutdoor: false,
    construction: "silenced_inlet_outlet_duct_forced_air_cool",
    bestUse: "heat_generating_equipment_motor_transformer",
  },
  outdoor_weatherproof: {
    noiseReduction: 9, ventilation: 7, accessibility: 6, weatherResist: 10, aeCost: 9,
    fullySealable: true, forOutdoor: true,
    construction: "galvanized_steel_insulated_weatherproof_roof",
    bestUse: "outdoor_generator_chiller_plant_weather_rated",
  },
};

function get(t: AcousticEnclosureType): AcousticEnclosureData {
  return DATA[t];
}

export const noiseReduction = (t: AcousticEnclosureType) => get(t).noiseReduction;
export const ventilation = (t: AcousticEnclosureType) => get(t).ventilation;
export const accessibility = (t: AcousticEnclosureType) => get(t).accessibility;
export const weatherResist = (t: AcousticEnclosureType) => get(t).weatherResist;
export const aeCost = (t: AcousticEnclosureType) => get(t).aeCost;
export const fullySealable = (t: AcousticEnclosureType) => get(t).fullySealable;
export const forOutdoor = (t: AcousticEnclosureType) => get(t).forOutdoor;
export const construction = (t: AcousticEnclosureType) => get(t).construction;
export const bestUse = (t: AcousticEnclosureType) => get(t).bestUse;
export const acousticEnclosureTypes = (): AcousticEnclosureType[] =>
  Object.keys(DATA) as AcousticEnclosureType[];

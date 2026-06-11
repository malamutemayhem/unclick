export type ThermosolType =
  | "infrared_preheat"
  | "hot_flue_chamber"
  | "contact_drum"
  | "superheated_steam"
  | "combined_ir_hotair";

interface ThermosolData {
  fixationRate: number;
  fabricSpeed: number;
  heatTransfer: number;
  colorFastness: number;
  tsCost: number;
  continuous: boolean;
  forPolyester: boolean;
  heatingConfig: string;
  bestUse: string;
}

const DATA: Record<ThermosolType, ThermosolData> = {
  infrared_preheat: {
    fixationRate: 7, fabricSpeed: 8, heatTransfer: 8, colorFastness: 7, tsCost: 5,
    continuous: true, forPolyester: true,
    heatingConfig: "infrared_emitter_bank_rapid_preheat_before_thermosol_chamber",
    bestUse: "polyester_disperse_dye_preheat_stage_rapid_temperature_ramp",
  },
  hot_flue_chamber: {
    fixationRate: 9, fabricSpeed: 9, heatTransfer: 7, colorFastness: 9, tsCost: 7,
    continuous: true, forPolyester: true,
    heatingConfig: "hot_air_flue_chamber_200c_disperse_dye_sublimation_fixation",
    bestUse: "continuous_polyester_dyeing_disperse_dye_thermosol_fixation",
  },
  contact_drum: {
    fixationRate: 8, fabricSpeed: 7, heatTransfer: 10, colorFastness: 8, tsCost: 6,
    continuous: true, forPolyester: true,
    heatingConfig: "heated_chrome_drum_contact_transfer_heat_fabric_wrap_fixation",
    bestUse: "lightweight_polyester_contact_heat_transfer_drum_dye_fixation",
  },
  superheated_steam: {
    fixationRate: 10, fabricSpeed: 6, heatTransfer: 9, colorFastness: 10, tsCost: 9,
    continuous: false, forPolyester: false,
    heatingConfig: "superheated_steam_chamber_fixation_reactive_dye_cotton_blend",
    bestUse: "reactive_dye_cotton_polyester_blend_steam_fixation_wash_fast",
  },
  combined_ir_hotair: {
    fixationRate: 9, fabricSpeed: 10, heatTransfer: 9, colorFastness: 9, tsCost: 10,
    continuous: true, forPolyester: true,
    heatingConfig: "infrared_plus_hot_air_combined_zone_rapid_ramp_even_fixation",
    bestUse: "high_speed_continuous_thermosol_line_polyester_blended_fabric",
  },
};

function get(t: ThermosolType): ThermosolData {
  return DATA[t];
}

export const fixationRate = (t: ThermosolType) => get(t).fixationRate;
export const fabricSpeed = (t: ThermosolType) => get(t).fabricSpeed;
export const heatTransfer = (t: ThermosolType) => get(t).heatTransfer;
export const colorFastness = (t: ThermosolType) => get(t).colorFastness;
export const tsCost = (t: ThermosolType) => get(t).tsCost;
export const continuous = (t: ThermosolType) => get(t).continuous;
export const forPolyester = (t: ThermosolType) => get(t).forPolyester;
export const heatingConfig = (t: ThermosolType) => get(t).heatingConfig;
export const bestUse = (t: ThermosolType) => get(t).bestUse;
export const thermosolTypes = (): ThermosolType[] =>
  Object.keys(DATA) as ThermosolType[];

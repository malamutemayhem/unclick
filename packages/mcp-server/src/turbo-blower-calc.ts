export type TurboBlowerType =
  | "centrifugal_turbo"
  | "magnetic_bearing"
  | "air_foil_bearing"
  | "integrally_geared"
  | "multi_stage_turbo";

interface TurboBlowerData {
  efficiency: number;
  throughput: number;
  pressureRise: number;
  turndown: number;
  tbCost: number;
  oilFree: boolean;
  forWwtp: boolean;
  blowerConfig: string;
  bestUse: string;
}

const DATA: Record<TurboBlowerType, TurboBlowerData> = {
  centrifugal_turbo: {
    efficiency: 7, throughput: 9, pressureRise: 7, turndown: 6, tbCost: 7,
    oilFree: false, forWwtp: true,
    blowerConfig: "centrifugal_turbo_blower_impeller_volute_high_volume_air_move",
    bestUse: "large_wwtp_centrifugal_turbo_blower_high_volume_aeration_basin",
  },
  magnetic_bearing: {
    efficiency: 9, throughput: 8, pressureRise: 7, turndown: 9, tbCost: 10,
    oilFree: true, forWwtp: true,
    blowerConfig: "magnetic_bearing_turbo_blower_levitate_shaft_no_contact_no_oil",
    bestUse: "clean_air_magnetic_bearing_turbo_blower_oil_free_energy_save",
  },
  air_foil_bearing: {
    efficiency: 8, throughput: 7, pressureRise: 7, turndown: 8, tbCost: 8,
    oilFree: true, forWwtp: true,
    blowerConfig: "air_foil_bearing_turbo_blower_gas_film_support_compact_light",
    bestUse: "compact_wwtp_air_foil_bearing_turbo_blower_light_oil_free_quiet",
  },
  integrally_geared: {
    efficiency: 8, throughput: 10, pressureRise: 9, turndown: 7, tbCost: 9,
    oilFree: false, forWwtp: false,
    blowerConfig: "integrally_geared_turbo_blower_bull_gear_pinion_multi_stage_high",
    bestUse: "process_air_integrally_geared_turbo_blower_multi_stage_high_press",
  },
  multi_stage_turbo: {
    efficiency: 7, throughput: 9, pressureRise: 9, turndown: 6, tbCost: 8,
    oilFree: false, forWwtp: false,
    blowerConfig: "multi_stage_turbo_blower_series_impeller_step_up_pressure_ratio",
    bestUse: "cement_kiln_multi_stage_turbo_blower_high_pressure_combustion_air",
  },
};

function get(t: TurboBlowerType): TurboBlowerData {
  return DATA[t];
}

export const efficiency = (t: TurboBlowerType) => get(t).efficiency;
export const throughput = (t: TurboBlowerType) => get(t).throughput;
export const pressureRise = (t: TurboBlowerType) => get(t).pressureRise;
export const turndown = (t: TurboBlowerType) => get(t).turndown;
export const tbCost = (t: TurboBlowerType) => get(t).tbCost;
export const oilFree = (t: TurboBlowerType) => get(t).oilFree;
export const forWwtp = (t: TurboBlowerType) => get(t).forWwtp;
export const blowerConfig = (t: TurboBlowerType) => get(t).blowerConfig;
export const bestUse = (t: TurboBlowerType) => get(t).bestUse;
export const turboBlowerTypes = (): TurboBlowerType[] =>
  Object.keys(DATA) as TurboBlowerType[];

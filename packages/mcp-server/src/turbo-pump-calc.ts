export type TurboPumpType =
  | "compound_turbo"
  | "mag_bearing_turbo"
  | "wide_range_turbo"
  | "drag_stage_turbo"
  | "split_flow_turbo";

interface TurboPumpData {
  pumpSpeed: number;
  throughput: number;
  compression: number;
  startupTime: number;
  tpCost: number;
  oilFree: boolean;
  forCorrosive: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<TurboPumpType, TurboPumpData> = {
  compound_turbo: {
    pumpSpeed: 8, throughput: 8, compression: 9, startupTime: 7, tpCost: 6,
    oilFree: false, forCorrosive: false,
    pumpConfig: "compound_turbo_pump_rotor_stator_blades_molecular_drag_stage",
    bestUse: "general_hvac_compound_turbo_pump_high_compression_reliable",
  },
  mag_bearing_turbo: {
    pumpSpeed: 9, throughput: 8, compression: 9, startupTime: 8, tpCost: 9,
    oilFree: true, forCorrosive: true,
    pumpConfig: "mag_bearing_turbo_pump_active_magnetic_levitation_oil_free",
    bestUse: "clean_process_mag_bearing_turbo_pump_oil_free_no_contaminate",
  },
  wide_range_turbo: {
    pumpSpeed: 7, throughput: 9, compression: 8, startupTime: 6, tpCost: 7,
    oilFree: false, forCorrosive: false,
    pumpConfig: "wide_range_turbo_pump_integrated_drag_rough_to_high_vacuum",
    bestUse: "analytical_wide_range_turbo_pump_single_pump_rough_to_uhv",
  },
  drag_stage_turbo: {
    pumpSpeed: 6, throughput: 7, compression: 10, startupTime: 7, tpCost: 5,
    oilFree: false, forCorrosive: false,
    pumpConfig: "drag_stage_turbo_pump_holweck_siegbahn_high_fore_pressure_tol",
    bestUse: "high_backing_drag_stage_turbo_pump_tolerant_fore_pressure",
  },
  split_flow_turbo: {
    pumpSpeed: 7, throughput: 7, compression: 8, startupTime: 7, tpCost: 8,
    oilFree: false, forCorrosive: true,
    pumpConfig: "split_flow_turbo_pump_multiple_inlet_differential_pump_beam",
    bestUse: "diff_pump_split_flow_turbo_pump_multiple_inlet_mass_spec_beam",
  },
};

function get(t: TurboPumpType): TurboPumpData {
  return DATA[t];
}

export const pumpSpeed = (t: TurboPumpType) => get(t).pumpSpeed;
export const throughput = (t: TurboPumpType) => get(t).throughput;
export const compression = (t: TurboPumpType) => get(t).compression;
export const startupTime = (t: TurboPumpType) => get(t).startupTime;
export const tpCost = (t: TurboPumpType) => get(t).tpCost;
export const oilFree = (t: TurboPumpType) => get(t).oilFree;
export const forCorrosive = (t: TurboPumpType) => get(t).forCorrosive;
export const pumpConfig = (t: TurboPumpType) => get(t).pumpConfig;
export const bestUse = (t: TurboPumpType) => get(t).bestUse;
export const turboPumpTypes = (): TurboPumpType[] =>
  Object.keys(DATA) as TurboPumpType[];

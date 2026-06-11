export type VortexMeterType =
  | "inline_flanged_standard"
  | "insertion_retractable"
  | "dual_sensor_reducing"
  | "multivariable_mass"
  | "wafer_compact_low_cost";

interface VortexMeterData {
  accuracy: number;
  turndown: number;
  temperature: number;
  pressureLoss: number;
  vxCost: number;
  noMovingParts: boolean;
  forSteam: boolean;
  shedder: string;
  bestUse: string;
}

const DATA: Record<VortexMeterType, VortexMeterData> = {
  inline_flanged_standard: {
    accuracy: 9, turndown: 8, temperature: 8, pressureLoss: 7, vxCost: 6,
    noMovingParts: true, forSteam: true,
    shedder: "bluff_body_delta_bar_piezo",
    bestUse: "saturated_steam_flow_measurement",
  },
  insertion_retractable: {
    accuracy: 7, turndown: 7, temperature: 8, pressureLoss: 9, vxCost: 5,
    noMovingParts: true, forSteam: true,
    shedder: "retractable_probe_hot_tap",
    bestUse: "large_pipe_retrofit_no_shutdown",
  },
  dual_sensor_reducing: {
    accuracy: 9, turndown: 9, temperature: 8, pressureLoss: 7, vxCost: 7,
    noMovingParts: true, forSteam: true,
    shedder: "dual_piezo_noise_cancelling",
    bestUse: "low_flow_velocity_challenging",
  },
  multivariable_mass: {
    accuracy: 10, turndown: 9, temperature: 9, pressureLoss: 7, vxCost: 9,
    noMovingParts: true, forSteam: true,
    shedder: "integrated_pressure_temp_compensated",
    bestUse: "superheated_steam_mass_flow",
  },
  wafer_compact_low_cost: {
    accuracy: 8, turndown: 7, temperature: 7, pressureLoss: 6, vxCost: 4,
    noMovingParts: true, forSteam: false,
    shedder: "wafer_style_between_flanges",
    bestUse: "water_utility_process_liquid",
  },
};

function get(t: VortexMeterType): VortexMeterData {
  return DATA[t];
}

export const accuracy = (t: VortexMeterType) => get(t).accuracy;
export const turndown = (t: VortexMeterType) => get(t).turndown;
export const temperature = (t: VortexMeterType) => get(t).temperature;
export const pressureLoss = (t: VortexMeterType) => get(t).pressureLoss;
export const vxCost = (t: VortexMeterType) => get(t).vxCost;
export const noMovingParts = (t: VortexMeterType) => get(t).noMovingParts;
export const forSteam = (t: VortexMeterType) => get(t).forSteam;
export const shedder = (t: VortexMeterType) => get(t).shedder;
export const bestUse = (t: VortexMeterType) => get(t).bestUse;
export const vortexMeterTypes = (): VortexMeterType[] =>
  Object.keys(DATA) as VortexMeterType[];

export type FlowSwitchType =
  | "paddle_vane_inline"
  | "thermal_dispersion_probe"
  | "magnetic_piston_indicator"
  | "ultrasonic_clamp_on"
  | "coriolis_mass_flow";

interface FlowSwitchData {
  accuracy: number;
  range: number;
  response: number;
  reliability: number;
  fsCost: number;
  noMovingParts: boolean;
  forLiquid: boolean;
  sensing: string;
  bestUse: string;
}

const DATA: Record<FlowSwitchType, FlowSwitchData> = {
  paddle_vane_inline: {
    accuracy: 4, range: 6, response: 6, reliability: 7, fsCost: 2,
    noMovingParts: false, forLiquid: true,
    sensing: "spring_loaded_paddle_micro_switch",
    bestUse: "cooling_water_pump_protect_simple",
  },
  thermal_dispersion_probe: {
    accuracy: 7, range: 8, response: 8, reliability: 9, fsCost: 6,
    noMovingParts: true, forLiquid: true,
    sensing: "heated_rtd_pair_thermal_delta",
    bestUse: "gas_liquid_low_flow_detect_clean",
  },
  magnetic_piston_indicator: {
    accuracy: 5, range: 5, response: 7, reliability: 8, fsCost: 3,
    noMovingParts: false, forLiquid: true,
    sensing: "spring_piston_magnetic_reed_switch",
    bestUse: "hydraulic_oil_coolant_visual_flow",
  },
  ultrasonic_clamp_on: {
    accuracy: 8, range: 9, response: 7, reliability: 9, fsCost: 9,
    noMovingParts: true, forLiquid: true,
    sensing: "transit_time_doppler_external_clamp",
    bestUse: "retrofit_large_pipe_no_cut_non_invade",
  },
  coriolis_mass_flow: {
    accuracy: 10, range: 7, response: 9, reliability: 9, fsCost: 10,
    noMovingParts: true, forLiquid: true,
    sensing: "vibrating_tube_coriolis_force_phase",
    bestUse: "custody_transfer_batch_mass_precise",
  },
};

function get(t: FlowSwitchType): FlowSwitchData {
  return DATA[t];
}

export const accuracy = (t: FlowSwitchType) => get(t).accuracy;
export const range = (t: FlowSwitchType) => get(t).range;
export const response = (t: FlowSwitchType) => get(t).response;
export const reliability = (t: FlowSwitchType) => get(t).reliability;
export const fsCost = (t: FlowSwitchType) => get(t).fsCost;
export const noMovingParts = (t: FlowSwitchType) => get(t).noMovingParts;
export const forLiquid = (t: FlowSwitchType) => get(t).forLiquid;
export const sensing = (t: FlowSwitchType) => get(t).sensing;
export const bestUse = (t: FlowSwitchType) => get(t).bestUse;
export const flowSwitchTypes = (): FlowSwitchType[] =>
  Object.keys(DATA) as FlowSwitchType[];

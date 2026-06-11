export type FocMethod =
  | "sinusoidal_foc"
  | "dtc_direct_torque"
  | "sensorless_bemf"
  | "flux_weakening"
  | "mtpa_maximum_torque";

const DATA: Record<FocMethod, {
  torqueRipple: number; efficiency: number; dynamicResp: number;
  complexity: number; focCost: number; sensorless: boolean;
  forHighSpeed: boolean; technique: string; bestUse: string;
}> = {
  sinusoidal_foc: {
    torqueRipple: 9, efficiency: 9, dynamicResp: 8,
    complexity: 7, focCost: 5, sensorless: false,
    forHighSpeed: false, technique: "dq_frame_pi_current_loop",
    bestUse: "servo_robot_joint",
  },
  dtc_direct_torque: {
    torqueRipple: 5, efficiency: 7, dynamicResp: 10,
    complexity: 6, focCost: 4, sensorless: true,
    forHighSpeed: false, technique: "hysteresis_band_flux_torque",
    bestUse: "crane_hoist_fast_response",
  },
  sensorless_bemf: {
    torqueRipple: 7, efficiency: 8, dynamicResp: 6,
    complexity: 5, focCost: 2, sensorless: true,
    forHighSpeed: true, technique: "observer_bemf_estimate",
    bestUse: "hvac_compressor_fan",
  },
  flux_weakening: {
    torqueRipple: 6, efficiency: 7, dynamicResp: 7,
    complexity: 8, focCost: 6, sensorless: false,
    forHighSpeed: true, technique: "id_negative_field_reduce",
    bestUse: "ev_highway_top_speed",
  },
  mtpa_maximum_torque: {
    torqueRipple: 8, efficiency: 10, dynamicResp: 7,
    complexity: 9, focCost: 7, sensorless: false,
    forHighSpeed: false, technique: "reluctance_torque_optimize",
    bestUse: "ipmsm_traction_efficiency",
  },
};

const get = (t: FocMethod) => DATA[t];

export const torqueRipple = (t: FocMethod) => get(t).torqueRipple;
export const efficiency = (t: FocMethod) => get(t).efficiency;
export const dynamicResp = (t: FocMethod) => get(t).dynamicResp;
export const complexity = (t: FocMethod) => get(t).complexity;
export const focCost = (t: FocMethod) => get(t).focCost;
export const sensorless = (t: FocMethod) => get(t).sensorless;
export const forHighSpeed = (t: FocMethod) => get(t).forHighSpeed;
export const technique = (t: FocMethod) => get(t).technique;
export const bestUse = (t: FocMethod) => get(t).bestUse;
export const focMethods = (): FocMethod[] => Object.keys(DATA) as FocMethod[];

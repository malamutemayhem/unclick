export type VfdDrive =
  | "v_f_scalar"
  | "sensorless_vector"
  | "closed_loop_vector"
  | "direct_torque_ctrl"
  | "servo_drive_pm";

const DATA: Record<VfdDrive, {
  torqueControl: number; speedRange: number; efficiency: number;
  dynamicResp: number; vfdCost: number; encoderReq: boolean;
  forPump: boolean; method: string; bestUse: string;
}> = {
  v_f_scalar: {
    torqueControl: 4, speedRange: 5, efficiency: 6,
    dynamicResp: 4, vfdCost: 3, encoderReq: false,
    forPump: true, method: "voltage_frequency_ratio",
    bestUse: "fan_pump_constant_torque",
  },
  sensorless_vector: {
    torqueControl: 7, speedRange: 7, efficiency: 8,
    dynamicResp: 7, vfdCost: 5, encoderReq: false,
    forPump: true, method: "flux_model_observer",
    bestUse: "conveyor_crane_hoist",
  },
  closed_loop_vector: {
    torqueControl: 9, speedRange: 9, efficiency: 8,
    dynamicResp: 9, vfdCost: 7, encoderReq: true,
    forPump: false, method: "field_oriented_encoder",
    bestUse: "winder_tension_control",
  },
  direct_torque_ctrl: {
    torqueControl: 9, speedRange: 8, efficiency: 8,
    dynamicResp: 10, vfdCost: 8, encoderReq: false,
    forPump: false, method: "hysteresis_band_switch",
    bestUse: "rolling_mill_high_perf",
  },
  servo_drive_pm: {
    torqueControl: 10, speedRange: 10, efficiency: 9,
    dynamicResp: 10, vfdCost: 9, encoderReq: true,
    forPump: false, method: "pmsm_foc_high_bw",
    bestUse: "cnc_spindle_robot_axis",
  },
};

const get = (t: VfdDrive) => DATA[t];

export const torqueControl = (t: VfdDrive) => get(t).torqueControl;
export const speedRange = (t: VfdDrive) => get(t).speedRange;
export const efficiency = (t: VfdDrive) => get(t).efficiency;
export const dynamicResp = (t: VfdDrive) => get(t).dynamicResp;
export const vfdCost = (t: VfdDrive) => get(t).vfdCost;
export const encoderReq = (t: VfdDrive) => get(t).encoderReq;
export const forPump = (t: VfdDrive) => get(t).forPump;
export const method = (t: VfdDrive) => get(t).method;
export const bestUse = (t: VfdDrive) => get(t).bestUse;
export const vfdDrives = (): VfdDrive[] => Object.keys(DATA) as VfdDrive[];

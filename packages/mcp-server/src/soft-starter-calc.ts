export type SoftStarterType =
  | "thyristor_scr_standard"
  | "thyristor_bypass_contactor"
  | "solid_state_reduced_volt"
  | "autotransformer_start"
  | "star_delta_mechanical";

interface SoftStarterData {
  currentLimit: number;
  torqueControl: number;
  efficiency: number;
  protection: number;
  ssCost: number;
  electronic: boolean;
  forLargeMotor: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<SoftStarterType, SoftStarterData> = {
  thyristor_scr_standard: {
    currentLimit: 9, torqueControl: 9, efficiency: 7, protection: 9, ssCost: 7,
    electronic: true, forLargeMotor: true,
    method: "scr_phase_angle_control_ramp_voltage_current",
    bestUse: "pump_fan_compressor_smooth_start_stop_control",
  },
  thyristor_bypass_contactor: {
    currentLimit: 9, torqueControl: 9, efficiency: 9, protection: 9, ssCost: 8,
    electronic: true, forLargeMotor: true,
    method: "scr_soft_start_then_bypass_contactor_run",
    bestUse: "continuous_duty_motor_energy_efficient_run",
  },
  solid_state_reduced_volt: {
    currentLimit: 8, torqueControl: 7, efficiency: 8, protection: 8, ssCost: 6,
    electronic: true, forLargeMotor: false,
    method: "solid_state_voltage_ramp_reduced_voltage_start",
    bestUse: "mid_size_motor_conveyor_mixer_moderate_start",
  },
  autotransformer_start: {
    currentLimit: 7, torqueControl: 5, efficiency: 8, protection: 6, ssCost: 5,
    electronic: false, forLargeMotor: true,
    method: "tapped_autotransformer_65_80_pct_voltage_step",
    bestUse: "legacy_large_motor_step_voltage_reduction",
  },
  star_delta_mechanical: {
    currentLimit: 6, torqueControl: 3, efficiency: 9, protection: 4, ssCost: 3,
    electronic: false, forLargeMotor: false,
    method: "star_connection_start_delta_switch_run",
    bestUse: "simple_low_cost_light_load_start_fan_pump",
  },
};

function get(t: SoftStarterType): SoftStarterData {
  return DATA[t];
}

export const currentLimit = (t: SoftStarterType) => get(t).currentLimit;
export const torqueControl = (t: SoftStarterType) => get(t).torqueControl;
export const efficiency = (t: SoftStarterType) => get(t).efficiency;
export const protection = (t: SoftStarterType) => get(t).protection;
export const ssCost = (t: SoftStarterType) => get(t).ssCost;
export const electronic = (t: SoftStarterType) => get(t).electronic;
export const forLargeMotor = (t: SoftStarterType) => get(t).forLargeMotor;
export const method = (t: SoftStarterType) => get(t).method;
export const bestUse = (t: SoftStarterType) => get(t).bestUse;
export const softStarterTypes = (): SoftStarterType[] =>
  Object.keys(DATA) as SoftStarterType[];

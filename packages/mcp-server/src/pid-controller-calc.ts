export type PidControllerType =
  | "single_loop_analog"
  | "single_loop_digital"
  | "multi_loop_station"
  | "cascade_primary_sec"
  | "feedforward_ratio";

interface PidControllerData {
  controlAccuracy: number;
  responseSpeed: number;
  configurability: number;
  diagnostics: number;
  pcCost_: number;
  digital: boolean;
  forAdvancedControl: boolean;
  algorithm: string;
  bestUse: string;
}

const DATA: Record<PidControllerType, PidControllerData> = {
  single_loop_analog: {
    controlAccuracy: 6, responseSpeed: 9, configurability: 3, diagnostics: 2, pcCost_: 3,
    digital: false, forAdvancedControl: false,
    algorithm: "analog_op_amp_proportional_integral_derivative",
    bestUse: "simple_temperature_pressure_loop_legacy_retrofit",
  },
  single_loop_digital: {
    controlAccuracy: 8, responseSpeed: 8, configurability: 8, diagnostics: 7, pcCost_: 5,
    digital: true, forAdvancedControl: false,
    algorithm: "microprocessor_pid_auto_tune_adaptive_gain",
    bestUse: "standalone_process_loop_flow_level_temperature",
  },
  multi_loop_station: {
    controlAccuracy: 9, responseSpeed: 8, configurability: 9, diagnostics: 8, pcCost_: 7,
    digital: true, forAdvancedControl: true,
    algorithm: "multi_channel_pid_logic_sequencing_batch_recipe",
    bestUse: "batch_reactor_multi_variable_coordinated_control",
  },
  cascade_primary_sec: {
    controlAccuracy: 9, responseSpeed: 9, configurability: 7, diagnostics: 7, pcCost_: 6,
    digital: true, forAdvancedControl: true,
    algorithm: "inner_outer_loop_cascade_disturbance_rejection",
    bestUse: "heat_exchanger_boiler_drum_level_fast_disturbance",
  },
  feedforward_ratio: {
    controlAccuracy: 9, responseSpeed: 10, configurability: 6, diagnostics: 6, pcCost_: 5,
    digital: true, forAdvancedControl: true,
    algorithm: "measured_disturbance_ratio_trim_plus_feedback_pid",
    bestUse: "fuel_air_ratio_blending_neutralization_load_change",
  },
};

function get(t: PidControllerType): PidControllerData {
  return DATA[t];
}

export const controlAccuracy = (t: PidControllerType) => get(t).controlAccuracy;
export const responseSpeed = (t: PidControllerType) => get(t).responseSpeed;
export const configurability = (t: PidControllerType) => get(t).configurability;
export const diagnostics = (t: PidControllerType) => get(t).diagnostics;
export const pcCost_ = (t: PidControllerType) => get(t).pcCost_;
export const digital = (t: PidControllerType) => get(t).digital;
export const forAdvancedControl = (t: PidControllerType) => get(t).forAdvancedControl;
export const algorithm = (t: PidControllerType) => get(t).algorithm;
export const bestUse = (t: PidControllerType) => get(t).bestUse;
export const pidControllerTypes = (): PidControllerType[] =>
  Object.keys(DATA) as PidControllerType[];

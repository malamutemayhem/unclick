export type VariableFreqDriveType =
  | "pwm_voltage_source"
  | "current_source_csi"
  | "multilevel_medium_v"
  | "regenerative_4q"
  | "micro_drive_compact";

interface VariableFreqDriveData {
  efficiency: number;
  harmonicDistortion: number;
  speedRange: number;
  dynamicResponse: number;
  vfCost: number;
  regenerative: boolean;
  forHvac: boolean;
  topology: string;
  bestUse: string;
}

const DATA: Record<VariableFreqDriveType, VariableFreqDriveData> = {
  pwm_voltage_source: {
    efficiency: 9, harmonicDistortion: 7, speedRange: 9, dynamicResponse: 8, vfCost: 5,
    regenerative: false, forHvac: true,
    topology: "igbt_pwm_voltage_source_inverter_dc_bus",
    bestUse: "general_purpose_pump_fan_conveyor_speed_ctrl",
  },
  current_source_csi: {
    efficiency: 8, harmonicDistortion: 6, speedRange: 7, dynamicResponse: 7, vfCost: 7,
    regenerative: true, forHvac: false,
    topology: "thyristor_current_source_inverter_dc_link",
    bestUse: "large_synchronous_motor_compressor_extruder",
  },
  multilevel_medium_v: {
    efficiency: 9, harmonicDistortion: 10, speedRange: 8, dynamicResponse: 8, vfCost: 10,
    regenerative: false, forHvac: false,
    topology: "cascaded_h_bridge_neutral_point_clamp_mv",
    bestUse: "medium_voltage_large_motor_mining_oil_gas",
  },
  regenerative_4q: {
    efficiency: 9, harmonicDistortion: 8, speedRange: 10, dynamicResponse: 10, vfCost: 8,
    regenerative: true, forHvac: false,
    topology: "active_front_end_four_quadrant_regen_brake",
    bestUse: "crane_elevator_winder_regen_braking_energy",
  },
  micro_drive_compact: {
    efficiency: 8, harmonicDistortion: 5, speedRange: 7, dynamicResponse: 6, vfCost: 3,
    regenerative: false, forHvac: true,
    topology: "compact_pcb_mount_sensorless_vector_micro",
    bestUse: "oem_machine_small_motor_embedded_control_panel",
  },
};

function get(t: VariableFreqDriveType): VariableFreqDriveData {
  return DATA[t];
}

export const efficiency = (t: VariableFreqDriveType) => get(t).efficiency;
export const harmonicDistortion = (t: VariableFreqDriveType) => get(t).harmonicDistortion;
export const speedRange = (t: VariableFreqDriveType) => get(t).speedRange;
export const dynamicResponse = (t: VariableFreqDriveType) => get(t).dynamicResponse;
export const vfCost = (t: VariableFreqDriveType) => get(t).vfCost;
export const regenerative = (t: VariableFreqDriveType) => get(t).regenerative;
export const forHvac = (t: VariableFreqDriveType) => get(t).forHvac;
export const topology = (t: VariableFreqDriveType) => get(t).topology;
export const bestUse = (t: VariableFreqDriveType) => get(t).bestUse;
export const variableFreqDriveTypes = (): VariableFreqDriveType[] =>
  Object.keys(DATA) as VariableFreqDriveType[];

export type EnergyRecoveryType =
  | "plate_erv"
  | "rotary_wheel_erv"
  | "heat_pipe_erv"
  | "runaround_coil"
  | "membrane_erv";

interface EnergyRecoveryData {
  effectiveness: number;
  throughput: number;
  latentRecovery: number;
  pressureDrop: number;
  erCost: number;
  moistureTransfer: boolean;
  forHumidClimate: boolean;
  recoveryConfig: string;
  bestUse: string;
}

const DATA: Record<EnergyRecoveryType, EnergyRecoveryData> = {
  plate_erv: {
    effectiveness: 7, throughput: 7, latentRecovery: 5, pressureDrop: 6, erCost: 4,
    moistureTransfer: false, forHumidClimate: false,
    recoveryConfig: "plate_erv_crossflow_counterflow_sensible_only_no_moving_parts",
    bestUse: "office_ventilation_plate_erv_sensible_recovery_simple_reliable",
  },
  rotary_wheel_erv: {
    effectiveness: 9, throughput: 9, latentRecovery: 9, pressureDrop: 8, erCost: 7,
    moistureTransfer: true, forHumidClimate: true,
    recoveryConfig: "rotary_wheel_erv_desiccant_matrix_rotate_total_energy_exchange",
    bestUse: "tropical_ahu_rotary_wheel_erv_total_energy_recovery_dehumidify",
  },
  heat_pipe_erv: {
    effectiveness: 6, throughput: 8, latentRecovery: 3, pressureDrop: 7, erCost: 5,
    moistureTransfer: false, forHumidClimate: false,
    recoveryConfig: "heat_pipe_erv_passive_refrigerant_loop_tilt_control_no_crossover",
    bestUse: "hospital_exhaust_heat_pipe_erv_zero_cross_contamination_passive",
  },
  runaround_coil: {
    effectiveness: 5, throughput: 8, latentRecovery: 3, pressureDrop: 5, erCost: 6,
    moistureTransfer: false, forHumidClimate: false,
    recoveryConfig: "runaround_coil_erv_glycol_loop_pump_remote_ahu_no_duct_connect",
    bestUse: "lab_exhaust_runaround_coil_erv_remote_ahu_no_cross_contaminate",
  },
  membrane_erv: {
    effectiveness: 8, throughput: 7, latentRecovery: 8, pressureDrop: 7, erCost: 8,
    moistureTransfer: true, forHumidClimate: true,
    recoveryConfig: "membrane_erv_polymer_selective_permeate_vapor_block_contaminant",
    bestUse: "cleanroom_membrane_erv_selective_vapor_transfer_block_particle",
  },
};

function get(t: EnergyRecoveryType): EnergyRecoveryData {
  return DATA[t];
}

export const effectiveness = (t: EnergyRecoveryType) => get(t).effectiveness;
export const throughput = (t: EnergyRecoveryType) => get(t).throughput;
export const latentRecovery = (t: EnergyRecoveryType) => get(t).latentRecovery;
export const pressureDrop = (t: EnergyRecoveryType) => get(t).pressureDrop;
export const erCost = (t: EnergyRecoveryType) => get(t).erCost;
export const moistureTransfer = (t: EnergyRecoveryType) => get(t).moistureTransfer;
export const forHumidClimate = (t: EnergyRecoveryType) => get(t).forHumidClimate;
export const recoveryConfig = (t: EnergyRecoveryType) => get(t).recoveryConfig;
export const bestUse = (t: EnergyRecoveryType) => get(t).bestUse;
export const energyRecoveryTypes = (): EnergyRecoveryType[] =>
  Object.keys(DATA) as EnergyRecoveryType[];

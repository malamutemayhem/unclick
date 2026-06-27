export type CureMonitorType =
  | "dielectric_sensor"
  | "thermocouple_array"
  | "fiber_optic_bragg"
  | "ultrasonic_pulse"
  | "dsc_offline";

interface CureMonitorData {
  cureTracking: number;
  throughput: number;
  spatialResolution: number;
  realTime: number;
  crCost: number;
  embedded: boolean;
  forInProcess: boolean;
  monitorConfig: string;
  bestUse: string;
}

const DATA: Record<CureMonitorType, CureMonitorData> = {
  dielectric_sensor: {
    cureTracking: 9, throughput: 7, spatialResolution: 6, realTime: 9, crCost: 7,
    embedded: true, forInProcess: true,
    monitorConfig: "dielectric_sensor_cure_monitor_capacitance_loss_viscosity_track",
    bestUse: "rtm_cure_dielectric_sensor_cure_monitor_viscosity_gel_vitrify",
  },
  thermocouple_array: {
    cureTracking: 7, throughput: 8, spatialResolution: 8, realTime: 8, crCost: 4,
    embedded: true, forInProcess: true,
    monitorConfig: "thermocouple_array_cure_monitor_type_k_multi_point_exotherm",
    bestUse: "autoclave_part_thermocouple_array_cure_monitor_exotherm_map",
  },
  fiber_optic_bragg: {
    cureTracking: 8, throughput: 5, spatialResolution: 9, realTime: 9, crCost: 9,
    embedded: true, forInProcess: true,
    monitorConfig: "fiber_optic_bragg_cure_monitor_fbg_strain_temp_residual_stress",
    bestUse: "smart_structure_fiber_optic_bragg_cure_monitor_residual_strain",
  },
  ultrasonic_pulse: {
    cureTracking: 8, throughput: 6, spatialResolution: 7, realTime: 8, crCost: 7,
    embedded: false, forInProcess: true,
    monitorConfig: "ultrasonic_pulse_cure_monitor_transducer_wave_speed_modulus",
    bestUse: "thick_part_ultrasonic_pulse_cure_monitor_wave_speed_modulus",
  },
  dsc_offline: {
    cureTracking: 9, throughput: 3, spatialResolution: 3, realTime: 3, crCost: 6,
    embedded: false, forInProcess: false,
    monitorConfig: "dsc_offline_cure_monitor_heat_flow_scan_tg_degree_cure_lab",
    bestUse: "quality_check_dsc_offline_cure_monitor_tg_degree_cure_verify",
  },
};

function get(t: CureMonitorType): CureMonitorData {
  return DATA[t];
}

export const cureTracking = (t: CureMonitorType) => get(t).cureTracking;
export const throughput = (t: CureMonitorType) => get(t).throughput;
export const spatialResolution = (t: CureMonitorType) => get(t).spatialResolution;
export const realTime = (t: CureMonitorType) => get(t).realTime;
export const crCost = (t: CureMonitorType) => get(t).crCost;
export const embedded = (t: CureMonitorType) => get(t).embedded;
export const forInProcess = (t: CureMonitorType) => get(t).forInProcess;
export const monitorConfig = (t: CureMonitorType) => get(t).monitorConfig;
export const bestUse = (t: CureMonitorType) => get(t).bestUse;
export const cureMonitorTypes = (): CureMonitorType[] =>
  Object.keys(DATA) as CureMonitorType[];

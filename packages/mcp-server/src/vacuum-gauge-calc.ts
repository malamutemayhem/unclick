export type VacuumGaugeType =
  | "pirani_gauge"
  | "capacitance_diaphragm"
  | "ionization_hot"
  | "ionization_cold"
  | "spinning_rotor";

interface VacuumGaugeData {
  rangeSpan: number;
  throughput: number;
  accuracy: number;
  responseTime: number;
  vgCost: number;
  gasIndependent: boolean;
  forUhv: boolean;
  gaugeConfig: string;
  bestUse: string;
}

const DATA: Record<VacuumGaugeType, VacuumGaugeData> = {
  pirani_gauge: {
    rangeSpan: 6, throughput: 8, accuracy: 6, responseTime: 7, vgCost: 3,
    gasIndependent: false, forUhv: false,
    gaugeConfig: "pirani_gauge_thermal_conductivity_heated_wire_rough_vacuum",
    bestUse: "rough_vacuum_pirani_gauge_thermal_conductivity_simple_reliable",
  },
  capacitance_diaphragm: {
    rangeSpan: 5, throughput: 9, accuracy: 10, responseTime: 9, vgCost: 7,
    gasIndependent: true, forUhv: false,
    gaugeConfig: "capacitance_diaphragm_gauge_absolute_pressure_gas_independent",
    bestUse: "process_control_capacitance_diaphragm_gauge_absolute_accurate",
  },
  ionization_hot: {
    rangeSpan: 9, throughput: 7, accuracy: 7, responseTime: 6, vgCost: 6,
    gasIndependent: false, forUhv: true,
    gaugeConfig: "hot_cathode_ionization_gauge_bayard_alpert_high_vacuum_measure",
    bestUse: "high_vacuum_hot_cathode_ionization_gauge_bayard_alpert_standard",
  },
  ionization_cold: {
    rangeSpan: 8, throughput: 8, accuracy: 6, responseTime: 7, vgCost: 5,
    gasIndependent: false, forUhv: true,
    gaugeConfig: "cold_cathode_ionization_gauge_penning_inverted_magnetron_rugged",
    bestUse: "industrial_vacuum_cold_cathode_penning_gauge_rugged_no_filament",
  },
  spinning_rotor: {
    rangeSpan: 4, throughput: 5, accuracy: 10, responseTime: 4, vgCost: 9,
    gasIndependent: false, forUhv: false,
    gaugeConfig: "spinning_rotor_gauge_viscosity_molecular_drag_calibration_std",
    bestUse: "calibration_standard_spinning_rotor_gauge_primary_reference",
  },
};

function get(t: VacuumGaugeType): VacuumGaugeData {
  return DATA[t];
}

export const rangeSpan = (t: VacuumGaugeType) => get(t).rangeSpan;
export const throughput = (t: VacuumGaugeType) => get(t).throughput;
export const accuracy = (t: VacuumGaugeType) => get(t).accuracy;
export const responseTime = (t: VacuumGaugeType) => get(t).responseTime;
export const vgCost = (t: VacuumGaugeType) => get(t).vgCost;
export const gasIndependent = (t: VacuumGaugeType) => get(t).gasIndependent;
export const forUhv = (t: VacuumGaugeType) => get(t).forUhv;
export const gaugeConfig = (t: VacuumGaugeType) => get(t).gaugeConfig;
export const bestUse = (t: VacuumGaugeType) => get(t).bestUse;
export const vacuumGaugeTypes = (): VacuumGaugeType[] =>
  Object.keys(DATA) as VacuumGaugeType[];

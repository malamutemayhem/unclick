export type MassFlowType =
  | "coriolis_mass"
  | "thermal_mass"
  | "differential_pressure"
  | "multivariable_mass"
  | "optical_mass";

interface MassFlowData {
  accuracy: number;
  throughput: number;
  rangeability: number;
  densityMeasure: number;
  mfCost: number;
  directMass: boolean;
  forGas: boolean;
  meterConfig: string;
  bestUse: string;
}

const DATA: Record<MassFlowType, MassFlowData> = {
  coriolis_mass: {
    accuracy: 10, throughput: 8, rangeability: 9, densityMeasure: 10, mfCost: 9,
    directMass: true, forGas: false,
    meterConfig: "coriolis_mass_flow_meter_vibrate_tube_phase_shift_direct_mass",
    bestUse: "custody_transfer_coriolis_mass_flow_meter_direct_mass_density",
  },
  thermal_mass: {
    accuracy: 7, throughput: 7, rangeability: 8, densityMeasure: 3, mfCost: 6,
    directMass: false, forGas: true,
    meterConfig: "thermal_mass_flow_meter_heat_dissipate_sensor_gas_velocity_calc",
    bestUse: "gas_pipe_thermal_mass_flow_meter_no_moving_part_low_pressure_drop",
  },
  differential_pressure: {
    accuracy: 6, throughput: 9, rangeability: 5, densityMeasure: 4, mfCost: 4,
    directMass: false, forGas: true,
    meterConfig: "differential_pressure_mass_flow_orifice_plate_venturi_bernoulli",
    bestUse: "steam_flow_differential_pressure_mass_flow_orifice_plate_robust",
  },
  multivariable_mass: {
    accuracy: 8, throughput: 8, rangeability: 7, densityMeasure: 6, mfCost: 7,
    directMass: false, forGas: true,
    meterConfig: "multivariable_mass_flow_meter_pressure_temp_dp_compensate_calc",
    bestUse: "compressed_air_multivariable_mass_flow_meter_compensate_condition",
  },
  optical_mass: {
    accuracy: 8, throughput: 6, rangeability: 7, densityMeasure: 5, mfCost: 8,
    directMass: false, forGas: false,
    meterConfig: "optical_mass_flow_meter_laser_scatter_particle_count_velocity",
    bestUse: "dust_monitor_optical_mass_flow_meter_particle_count_emission",
  },
};

function get(t: MassFlowType): MassFlowData {
  return DATA[t];
}

export const accuracy = (t: MassFlowType) => get(t).accuracy;
export const throughput = (t: MassFlowType) => get(t).throughput;
export const rangeability = (t: MassFlowType) => get(t).rangeability;
export const densityMeasure = (t: MassFlowType) => get(t).densityMeasure;
export const mfCost = (t: MassFlowType) => get(t).mfCost;
export const directMass = (t: MassFlowType) => get(t).directMass;
export const forGas = (t: MassFlowType) => get(t).forGas;
export const meterConfig = (t: MassFlowType) => get(t).meterConfig;
export const bestUse = (t: MassFlowType) => get(t).bestUse;
export const massFlowTypes = (): MassFlowType[] =>
  Object.keys(DATA) as MassFlowType[];

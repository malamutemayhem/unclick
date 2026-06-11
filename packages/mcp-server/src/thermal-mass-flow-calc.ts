export type ThermalMassFlowType =
  | "capillary_tube_bypass"
  | "immersible_probe_insert"
  | "inline_full_bore"
  | "micro_flow_sensor"
  | "constant_temperature_diff";

interface ThermalMassFlowData {
  accuracy: number;
  turndown: number;
  lowFlowSens: number;
  gasHandle: number;
  tfCost: number;
  directMass: boolean;
  forGas: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<ThermalMassFlowType, ThermalMassFlowData> = {
  capillary_tube_bypass: {
    accuracy: 9, turndown: 10, lowFlowSens: 10, gasHandle: 9, tfCost: 6,
    directMass: true, forGas: true,
    sensor: "heated_capillary_temp_diff_bypass",
    bestUse: "lab_process_gas_low_flow_mfc_control",
  },
  immersible_probe_insert: {
    accuracy: 7, turndown: 8, lowFlowSens: 7, gasHandle: 8, tfCost: 4,
    directMass: true, forGas: true,
    sensor: "insertion_probe_rtd_pair_heated_ref",
    bestUse: "duct_stack_combustion_air_natural_gas",
  },
  inline_full_bore: {
    accuracy: 8, turndown: 9, lowFlowSens: 8, gasHandle: 9, tfCost: 7,
    directMass: true, forGas: true,
    sensor: "full_bore_multi_point_thermal_element",
    bestUse: "biogas_compressed_air_mass_flow_total",
  },
  micro_flow_sensor: {
    accuracy: 8, turndown: 10, lowFlowSens: 10, gasHandle: 7, tfCost: 5,
    directMass: true, forGas: true,
    sensor: "mems_silicon_chip_micro_heater_therm",
    bestUse: "semiconductor_gas_delivery_ultra_low_flow",
  },
  constant_temperature_diff: {
    accuracy: 7, turndown: 7, lowFlowSens: 6, gasHandle: 6, tfCost: 3,
    directMass: true, forGas: false,
    sensor: "two_rtd_constant_delta_t_power_measure",
    bestUse: "liquid_cooling_loop_hvac_btu_metering",
  },
};

function get(t: ThermalMassFlowType): ThermalMassFlowData {
  return DATA[t];
}

export const accuracy = (t: ThermalMassFlowType) => get(t).accuracy;
export const turndown = (t: ThermalMassFlowType) => get(t).turndown;
export const lowFlowSens = (t: ThermalMassFlowType) => get(t).lowFlowSens;
export const gasHandle = (t: ThermalMassFlowType) => get(t).gasHandle;
export const tfCost = (t: ThermalMassFlowType) => get(t).tfCost;
export const directMass = (t: ThermalMassFlowType) => get(t).directMass;
export const forGas = (t: ThermalMassFlowType) => get(t).forGas;
export const sensor = (t: ThermalMassFlowType) => get(t).sensor;
export const bestUse = (t: ThermalMassFlowType) => get(t).bestUse;
export const thermalMassFlowTypes = (): ThermalMassFlowType[] =>
  Object.keys(DATA) as ThermalMassFlowType[];

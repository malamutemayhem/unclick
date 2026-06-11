export type FluidCouplingType =
  | "constant_fill_basic"
  | "variable_fill_scoop"
  | "torque_converter_stall"
  | "hydrodynamic_brake_retarder"
  | "magnetic_eddy_current";

interface FluidCouplingData {
  torqueCapacity: number;
  efficiency: number;
  softStart: number;
  overloadProtect: number;
  fcCost: number;
  variableSpeed: boolean;
  forConveyor: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<FluidCouplingType, FluidCouplingData> = {
  constant_fill_basic: {
    torqueCapacity: 7, efficiency: 8, softStart: 8, overloadProtect: 7, fcCost: 4,
    variableSpeed: false, forConveyor: true,
    medium: "mineral_oil_sealed_impeller_runner",
    bestUse: "conveyor_pump_fan_soft_start",
  },
  variable_fill_scoop: {
    torqueCapacity: 9, efficiency: 7, softStart: 10, overloadProtect: 9, fcCost: 7,
    variableSpeed: true, forConveyor: true,
    medium: "oil_scoop_tube_variable_fill_level",
    bestUse: "crusher_mill_variable_speed_start",
  },
  torque_converter_stall: {
    torqueCapacity: 10, efficiency: 6, softStart: 10, overloadProtect: 8, fcCost: 6,
    variableSpeed: false, forConveyor: false,
    medium: "atf_impeller_turbine_stator_set",
    bestUse: "mobile_equipment_auto_transmission",
  },
  hydrodynamic_brake_retarder: {
    torqueCapacity: 8, efficiency: 5, softStart: 6, overloadProtect: 10, fcCost: 8,
    variableSpeed: true, forConveyor: false,
    medium: "water_glycol_rotor_stator_braking",
    bestUse: "dynamometer_downhill_retard_brake",
  },
  magnetic_eddy_current: {
    torqueCapacity: 6, efficiency: 7, softStart: 9, overloadProtect: 8, fcCost: 9,
    variableSpeed: true, forConveyor: true,
    medium: "eddy_current_air_gap_magnetic_field",
    bestUse: "precision_tension_fan_speed_control",
  },
};

function get(t: FluidCouplingType): FluidCouplingData {
  return DATA[t];
}

export const torqueCapacity = (t: FluidCouplingType) => get(t).torqueCapacity;
export const efficiency = (t: FluidCouplingType) => get(t).efficiency;
export const softStart = (t: FluidCouplingType) => get(t).softStart;
export const overloadProtect = (t: FluidCouplingType) => get(t).overloadProtect;
export const fcCost = (t: FluidCouplingType) => get(t).fcCost;
export const variableSpeed = (t: FluidCouplingType) => get(t).variableSpeed;
export const forConveyor = (t: FluidCouplingType) => get(t).forConveyor;
export const medium = (t: FluidCouplingType) => get(t).medium;
export const bestUse = (t: FluidCouplingType) => get(t).bestUse;
export const fluidCouplingTypes = (): FluidCouplingType[] =>
  Object.keys(DATA) as FluidCouplingType[];

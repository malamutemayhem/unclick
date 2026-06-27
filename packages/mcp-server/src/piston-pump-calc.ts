export type PistonPumpType =
  | "axial_piston_swash"
  | "radial_piston_cam"
  | "triplex_plunger"
  | "air_operated_double"
  | "metering_solenoid";

interface PistonPumpData {
  pressure: number;
  efficiency: number;
  flowPulsation: number;
  variableDisp: number;
  ppCost: number;
  variableFlow: boolean;
  forHighPressure: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<PistonPumpType, PistonPumpData> = {
  axial_piston_swash: {
    pressure: 9, efficiency: 9, flowPulsation: 6, variableDisp: 10, ppCost: 8,
    variableFlow: true, forHighPressure: true,
    mechanism: "swashplate_axial_piston_variable_displacement",
    bestUse: "hydraulic_power_unit_mobile_machine_drive",
  },
  radial_piston_cam: {
    pressure: 10, efficiency: 9, flowPulsation: 7, variableDisp: 8, ppCost: 9,
    variableFlow: true, forHighPressure: true,
    mechanism: "eccentric_cam_radial_piston_high_pressure",
    bestUse: "press_machine_steel_mill_ultra_high_pressure",
  },
  triplex_plunger: {
    pressure: 10, efficiency: 8, flowPulsation: 5, variableDisp: 3, ppCost: 7,
    variableFlow: false, forHighPressure: true,
    mechanism: "three_plunger_crankshaft_positive_displacement",
    bestUse: "water_jetting_descaling_high_pressure_wash",
  },
  air_operated_double: {
    pressure: 5, efficiency: 4, flowPulsation: 4, variableDisp: 6, ppCost: 4,
    variableFlow: false, forHighPressure: false,
    mechanism: "air_shuttle_valve_double_diaphragm_reciprocate",
    bestUse: "chemical_transfer_slurry_paint_drum_unloading",
  },
  metering_solenoid: {
    pressure: 6, efficiency: 5, flowPulsation: 3, variableDisp: 9, ppCost: 5,
    variableFlow: true, forHighPressure: false,
    mechanism: "solenoid_driven_diaphragm_electronic_stroke",
    bestUse: "chemical_dosing_water_treatment_precise_inject",
  },
};

function get(t: PistonPumpType): PistonPumpData {
  return DATA[t];
}

export const pressure = (t: PistonPumpType) => get(t).pressure;
export const efficiency = (t: PistonPumpType) => get(t).efficiency;
export const flowPulsation = (t: PistonPumpType) => get(t).flowPulsation;
export const variableDisp = (t: PistonPumpType) => get(t).variableDisp;
export const ppCost = (t: PistonPumpType) => get(t).ppCost;
export const variableFlow = (t: PistonPumpType) => get(t).variableFlow;
export const forHighPressure = (t: PistonPumpType) => get(t).forHighPressure;
export const mechanism = (t: PistonPumpType) => get(t).mechanism;
export const bestUse = (t: PistonPumpType) => get(t).bestUse;
export const pistonPumpTypes = (): PistonPumpType[] =>
  Object.keys(DATA) as PistonPumpType[];

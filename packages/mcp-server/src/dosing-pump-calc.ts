export type DosingPumpType =
  | "peristaltic_dose"
  | "diaphragm_dose"
  | "piston_dose"
  | "gear_dose"
  | "syringe_dose";

interface DosingPumpData {
  accuracy: number;
  throughput: number;
  pressureRange: number;
  chemicalResist: number;
  dpCost: number;
  pulseFree: boolean;
  forCorrosive: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<DosingPumpType, DosingPumpData> = {
  peristaltic_dose: {
    accuracy: 7, throughput: 6, pressureRange: 5, chemicalResist: 9, dpCost: 5,
    pulseFree: false, forCorrosive: true,
    pumpConfig: "peristaltic_dosing_pump_tube_roller_no_contact_fluid_path_replace",
    bestUse: "chemical_feed_peristaltic_dosing_pump_no_contact_corrosive_dose",
  },
  diaphragm_dose: {
    accuracy: 8, throughput: 7, pressureRange: 8, chemicalResist: 8, dpCost: 6,
    pulseFree: false, forCorrosive: true,
    pumpConfig: "diaphragm_dosing_pump_flex_membrane_check_valve_pulse_metering",
    bestUse: "water_treat_diaphragm_dosing_pump_chemical_inject_precise_meter",
  },
  piston_dose: {
    accuracy: 9, throughput: 8, pressureRange: 9, chemicalResist: 6, dpCost: 8,
    pulseFree: false, forCorrosive: false,
    pumpConfig: "piston_dosing_pump_reciprocating_plunger_high_pressure_accurate",
    bestUse: "high_pressure_piston_dosing_pump_precise_inject_viscous_fluid",
  },
  gear_dose: {
    accuracy: 7, throughput: 9, pressureRange: 7, chemicalResist: 5, dpCost: 6,
    pulseFree: true, forCorrosive: false,
    pumpConfig: "gear_dosing_pump_intermesh_gear_smooth_flow_viscous_continuous",
    bestUse: "adhesive_dispense_gear_dosing_pump_smooth_continuous_viscous_flow",
  },
  syringe_dose: {
    accuracy: 10, throughput: 4, pressureRange: 4, chemicalResist: 7, dpCost: 7,
    pulseFree: true, forCorrosive: false,
    pumpConfig: "syringe_dosing_pump_stepper_drive_barrel_plunger_micro_volume",
    bestUse: "lab_micro_syringe_dosing_pump_ultra_precise_micro_liter_dispense",
  },
};

function get(t: DosingPumpType): DosingPumpData {
  return DATA[t];
}

export const accuracy = (t: DosingPumpType) => get(t).accuracy;
export const throughput = (t: DosingPumpType) => get(t).throughput;
export const pressureRange = (t: DosingPumpType) => get(t).pressureRange;
export const chemicalResist = (t: DosingPumpType) => get(t).chemicalResist;
export const dpCost = (t: DosingPumpType) => get(t).dpCost;
export const pulseFree = (t: DosingPumpType) => get(t).pulseFree;
export const forCorrosive = (t: DosingPumpType) => get(t).forCorrosive;
export const pumpConfig = (t: DosingPumpType) => get(t).pumpConfig;
export const bestUse = (t: DosingPumpType) => get(t).bestUse;
export const dosingPumpTypes = (): DosingPumpType[] =>
  Object.keys(DATA) as DosingPumpType[];

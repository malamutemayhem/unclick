export type CurrentSense =
  | "shunt_resistor_low"
  | "hall_effect_isolated"
  | "fluxgate_closed_loop"
  | "rogowski_coil_ac"
  | "mosfet_rds_on";

const DATA: Record<CurrentSense, {
  accuracy: number; bandwidth: number; isolation: number;
  insertionLoss: number; csCost: number; bidirectional: boolean;
  forMotor: boolean; principle: string; bestUse: string;
}> = {
  shunt_resistor_low: {
    accuracy: 9, bandwidth: 9, isolation: 1,
    insertionLoss: 4, csCost: 1, bidirectional: true,
    forMotor: false, principle: "ohmic_voltage_drop",
    bestUse: "battery_fuel_gauge",
  },
  hall_effect_isolated: {
    accuracy: 6, bandwidth: 6, isolation: 9,
    insertionLoss: 8, csCost: 4, bidirectional: true,
    forMotor: true, principle: "magnetic_field_sense",
    bestUse: "motor_drive_overcurrent",
  },
  fluxgate_closed_loop: {
    accuracy: 10, bandwidth: 8, isolation: 10,
    insertionLoss: 9, csCost: 8, bidirectional: true,
    forMotor: true, principle: "core_null_compensation",
    bestUse: "precision_inverter_control",
  },
  rogowski_coil_ac: {
    accuracy: 7, bandwidth: 10, isolation: 10,
    insertionLoss: 10, csCost: 6, bidirectional: false,
    forMotor: false, principle: "di_dt_air_core_integral",
    bestUse: "power_quality_transient",
  },
  mosfet_rds_on: {
    accuracy: 4, bandwidth: 7, isolation: 1,
    insertionLoss: 10, csCost: 1, bidirectional: false,
    forMotor: false, principle: "fet_channel_resistance",
    bestUse: "lossless_buck_sensing",
  },
};

const get = (t: CurrentSense) => DATA[t];

export const accuracy = (t: CurrentSense) => get(t).accuracy;
export const bandwidth = (t: CurrentSense) => get(t).bandwidth;
export const isolation = (t: CurrentSense) => get(t).isolation;
export const insertionLoss = (t: CurrentSense) => get(t).insertionLoss;
export const csCost = (t: CurrentSense) => get(t).csCost;
export const bidirectional = (t: CurrentSense) => get(t).bidirectional;
export const forMotor = (t: CurrentSense) => get(t).forMotor;
export const principle = (t: CurrentSense) => get(t).principle;
export const bestUse = (t: CurrentSense) => get(t).bestUse;
export const currentSenses = (): CurrentSense[] => Object.keys(DATA) as CurrentSense[];

export type ValvePositionerType =
  | "pneumatic_force_balance"
  | "electropneumatic_i_to_p"
  | "digital_smart_fieldbus"
  | "electric_actuator_motor"
  | "hydraulic_high_force";

interface ValvePositionerData {
  accuracy: number;
  response: number;
  diagnostics: number;
  reliability: number;
  vpCost: number;
  digital: boolean;
  forCritical: boolean;
  signal: string;
  bestUse: string;
}

const DATA: Record<ValvePositionerType, ValvePositionerData> = {
  pneumatic_force_balance: {
    accuracy: 7, response: 8, diagnostics: 3, reliability: 9, vpCost: 4,
    digital: false, forCritical: false,
    signal: "3_15psi_pneumatic_nozzle_flapper",
    bestUse: "simple_loop_proven_reliable",
  },
  electropneumatic_i_to_p: {
    accuracy: 8, response: 8, diagnostics: 5, reliability: 8, vpCost: 5,
    digital: false, forCritical: false,
    signal: "4_20ma_i_to_p_converter_pneumatic",
    bestUse: "analog_dcs_loop_standard",
  },
  digital_smart_fieldbus: {
    accuracy: 10, response: 9, diagnostics: 10, reliability: 9, vpCost: 8,
    digital: true, forCritical: true,
    signal: "hart_foundation_fieldbus_digital",
    bestUse: "smart_plant_predictive_maintenance",
  },
  electric_actuator_motor: {
    accuracy: 9, response: 6, diagnostics: 7, reliability: 7, vpCost: 7,
    digital: true, forCritical: false,
    signal: "modbus_profibus_motor_drive",
    bestUse: "remote_site_no_air_supply",
  },
  hydraulic_high_force: {
    accuracy: 8, response: 7, diagnostics: 4, reliability: 8, vpCost: 9,
    digital: false, forCritical: true,
    signal: "hydraulic_servo_high_thrust",
    bestUse: "large_valve_high_dp_pipeline",
  },
};

function get(t: ValvePositionerType): ValvePositionerData {
  return DATA[t];
}

export const accuracy = (t: ValvePositionerType) => get(t).accuracy;
export const response = (t: ValvePositionerType) => get(t).response;
export const diagnostics = (t: ValvePositionerType) => get(t).diagnostics;
export const reliability = (t: ValvePositionerType) => get(t).reliability;
export const vpCost = (t: ValvePositionerType) => get(t).vpCost;
export const digital = (t: ValvePositionerType) => get(t).digital;
export const forCritical = (t: ValvePositionerType) => get(t).forCritical;
export const signal = (t: ValvePositionerType) => get(t).signal;
export const bestUse = (t: ValvePositionerType) => get(t).bestUse;
export const valvePositionerTypes = (): ValvePositionerType[] =>
  Object.keys(DATA) as ValvePositionerType[];

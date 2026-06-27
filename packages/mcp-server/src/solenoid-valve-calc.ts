export type SolenoidValveType =
  | "direct_acting_2_way"
  | "pilot_operated_2_way"
  | "three_way_diverting"
  | "proportional_analog"
  | "latching_bistable_pulse";

interface SolenoidValveData {
  response: number;
  flow: number;
  pressure: number;
  power: number;
  svCost: number;
  normallyClosed: boolean;
  forHighPressure: boolean;
  coil: string;
  bestUse: string;
}

const DATA: Record<SolenoidValveType, SolenoidValveData> = {
  direct_acting_2_way: {
    response: 10, flow: 4, pressure: 6, power: 6, svCost: 3,
    normallyClosed: true, forHighPressure: false,
    coil: "dc_12_24v_direct_plunger_spring",
    bestUse: "lab_instrument_dispense_small",
  },
  pilot_operated_2_way: {
    response: 7, flow: 9, pressure: 9, power: 5, svCost: 5,
    normallyClosed: true, forHighPressure: true,
    coil: "ac_120v_pilot_diaphragm_assist",
    bestUse: "irrigation_water_supply_main",
  },
  three_way_diverting: {
    response: 8, flow: 6, pressure: 7, power: 6, svCost: 6,
    normallyClosed: false, forHighPressure: false,
    coil: "dc_24v_3_port_spool_divert",
    bestUse: "pneumatic_cylinder_air_control",
  },
  proportional_analog: {
    response: 9, flow: 5, pressure: 7, power: 7, svCost: 8,
    normallyClosed: true, forHighPressure: false,
    coil: "pwm_proportional_linear_stroke",
    bestUse: "gas_mixing_flow_modulation",
  },
  latching_bistable_pulse: {
    response: 8, flow: 7, pressure: 8, power: 10, svCost: 7,
    normallyClosed: false, forHighPressure: true,
    coil: "pulse_latch_permanent_magnet",
    bestUse: "battery_powered_remote_metering",
  },
};

function get(t: SolenoidValveType): SolenoidValveData {
  return DATA[t];
}

export const response = (t: SolenoidValveType) => get(t).response;
export const flow = (t: SolenoidValveType) => get(t).flow;
export const pressure = (t: SolenoidValveType) => get(t).pressure;
export const power = (t: SolenoidValveType) => get(t).power;
export const svCost = (t: SolenoidValveType) => get(t).svCost;
export const normallyClosed = (t: SolenoidValveType) => get(t).normallyClosed;
export const forHighPressure = (t: SolenoidValveType) => get(t).forHighPressure;
export const coil = (t: SolenoidValveType) => get(t).coil;
export const bestUse = (t: SolenoidValveType) => get(t).bestUse;
export const solenoidValveTypes = (): SolenoidValveType[] =>
  Object.keys(DATA) as SolenoidValveType[];

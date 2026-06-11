export type MixingValveType =
  | "thermostatic_point_of_use"
  | "digital_electronic_master"
  | "pressure_balance_shower"
  | "tempering_valve_hw_tank"
  | "three_way_motorized_hvac";

interface MixingValveData {
  accuracy: number;
  response: number;
  scalding: number;
  durability: number;
  mvCost: number;
  digital: boolean;
  forDomestic: boolean;
  control: string;
  bestUse: string;
}

const DATA: Record<MixingValveType, MixingValveData> = {
  thermostatic_point_of_use: {
    accuracy: 9, response: 8, scalding: 9, durability: 8, mvCost: 5,
    digital: false, forDomestic: true,
    control: "wax_element_thermal_actuator",
    bestUse: "shower_lavatory_scald_protect",
  },
  digital_electronic_master: {
    accuracy: 10, response: 10, scalding: 10, durability: 7, mvCost: 9,
    digital: true, forDomestic: true,
    control: "electronic_sensor_servo_motor",
    bestUse: "hospital_school_central_master",
  },
  pressure_balance_shower: {
    accuracy: 7, response: 9, scalding: 8, durability: 8, mvCost: 3,
    digital: false, forDomestic: true,
    control: "piston_spool_pressure_balance",
    bestUse: "residential_shower_valve_basic",
  },
  tempering_valve_hw_tank: {
    accuracy: 7, response: 6, scalding: 8, durability: 9, mvCost: 3,
    digital: false, forDomestic: true,
    control: "bimetallic_disc_spring_mix",
    bestUse: "water_heater_outlet_temper",
  },
  three_way_motorized_hvac: {
    accuracy: 8, response: 7, scalding: 5, durability: 9, mvCost: 6,
    digital: false, forDomestic: false,
    control: "motorized_actuator_3_way_port",
    bestUse: "hvac_hydronic_coil_control",
  },
};

function get(t: MixingValveType): MixingValveData {
  return DATA[t];
}

export const accuracy = (t: MixingValveType) => get(t).accuracy;
export const response = (t: MixingValveType) => get(t).response;
export const scalding = (t: MixingValveType) => get(t).scalding;
export const durability = (t: MixingValveType) => get(t).durability;
export const mvCost = (t: MixingValveType) => get(t).mvCost;
export const digital = (t: MixingValveType) => get(t).digital;
export const forDomestic = (t: MixingValveType) => get(t).forDomestic;
export const control = (t: MixingValveType) => get(t).control;
export const bestUse = (t: MixingValveType) => get(t).bestUse;
export const mixingValveTypes = (): MixingValveType[] =>
  Object.keys(DATA) as MixingValveType[];

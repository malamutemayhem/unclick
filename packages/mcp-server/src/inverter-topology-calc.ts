export type InverterTopology =
  | "two_level_vsi"
  | "three_level_npc"
  | "t_type_anpc"
  | "cascaded_h_bridge"
  | "matrix_converter";

const DATA: Record<InverterTopology, {
  efficiency: number; thd: number; voltage: number;
  complexity: number; invCost: number; multilevel: boolean;
  forSolar: boolean; switching: string; bestUse: string;
}> = {
  two_level_vsi: {
    efficiency: 7, thd: 4, voltage: 5,
    complexity: 2, invCost: 2, multilevel: false,
    forSolar: false, switching: "six_switch_igbt_bridge",
    bestUse: "low_power_motor_drive",
  },
  three_level_npc: {
    efficiency: 9, thd: 8, voltage: 8,
    complexity: 6, invCost: 6, multilevel: true,
    forSolar: true, switching: "clamped_neutral_diode",
    bestUse: "medium_voltage_wind_turbine",
  },
  t_type_anpc: {
    efficiency: 9, thd: 9, voltage: 7,
    complexity: 7, invCost: 7, multilevel: true,
    forSolar: true, switching: "active_neutral_bidirectional",
    bestUse: "string_solar_inverter",
  },
  cascaded_h_bridge: {
    efficiency: 8, thd: 10, voltage: 10,
    complexity: 9, invCost: 9, multilevel: true,
    forSolar: true, switching: "modular_cell_stacked",
    bestUse: "statcom_grid_reactive",
  },
  matrix_converter: {
    efficiency: 8, thd: 7, voltage: 6,
    complexity: 10, invCost: 8, multilevel: false,
    forSolar: false, switching: "direct_ac_ac_bidirectional",
    bestUse: "variable_freq_ac_drive",
  },
};

const get = (t: InverterTopology) => DATA[t];

export const efficiency = (t: InverterTopology) => get(t).efficiency;
export const thd = (t: InverterTopology) => get(t).thd;
export const voltage = (t: InverterTopology) => get(t).voltage;
export const complexity = (t: InverterTopology) => get(t).complexity;
export const invCost = (t: InverterTopology) => get(t).invCost;
export const multilevel = (t: InverterTopology) => get(t).multilevel;
export const forSolar = (t: InverterTopology) => get(t).forSolar;
export const switching = (t: InverterTopology) => get(t).switching;
export const bestUse = (t: InverterTopology) => get(t).bestUse;
export const inverterTopologies = (): InverterTopology[] => Object.keys(DATA) as InverterTopology[];

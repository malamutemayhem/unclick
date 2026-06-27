// heat-sink-calc - heat sink types for electronics cooling

export type HeatSink =
  | "extruded_aluminum_fin"
  | "forged_copper_block"
  | "stamped_steel_flat"
  | "pin_fin_radial"
  | "heat_pipe_tower";

const DATA: Record<HeatSink, {
  thermalPerform: number; airflowEase: number; durability: number; weightLight: number;
  cost: number; passive: boolean; forHighPower: boolean; finStyle: string; bestUse: string;
}> = {
  extruded_aluminum_fin:  { thermalPerform: 7, airflowEase: 8, durability: 8, weightLight: 7, cost: 4, passive: true, forHighPower: false, finStyle: "parallel_fin_array", bestUse: "general_component_cool" },
  forged_copper_block:    { thermalPerform: 10, airflowEase: 5, durability: 9, weightLight: 3, cost: 8, passive: true, forHighPower: true, finStyle: "solid_copper_mass", bestUse: "high_power_direct" },
  stamped_steel_flat:     { thermalPerform: 5, airflowEase: 7, durability: 9, weightLight: 5, cost: 2, passive: true, forHighPower: false, finStyle: "flat_plate_stamp", bestUse: "budget_low_power" },
  pin_fin_radial:         { thermalPerform: 8, airflowEase: 10, durability: 7, weightLight: 6, cost: 5, passive: true, forHighPower: false, finStyle: "radial_pin_array", bestUse: "omnidirectional_cool" },
  heat_pipe_tower:        { thermalPerform: 10, airflowEase: 7, durability: 8, weightLight: 4, cost: 9, passive: false, forHighPower: true, finStyle: "pipe_fin_tower", bestUse: "cpu_gpu_tower_cool" },
};

const get = (h: HeatSink) => DATA[h];
export const thermalPerform = (h: HeatSink) => get(h).thermalPerform;
export const airflowEase = (h: HeatSink) => get(h).airflowEase;
export const durability = (h: HeatSink) => get(h).durability;
export const weightLight = (h: HeatSink) => get(h).weightLight;
export const sinkCost = (h: HeatSink) => get(h).cost;
export const passive = (h: HeatSink) => get(h).passive;
export const forHighPower = (h: HeatSink) => get(h).forHighPower;
export const finStyle = (h: HeatSink) => get(h).finStyle;
export const bestUse = (h: HeatSink) => get(h).bestUse;
export const heatSinks = (): HeatSink[] => Object.keys(DATA) as HeatSink[];

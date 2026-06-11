export type ReliefValveType =
  | "spring_loaded_pop_action"
  | "pilot_operated_high_cap"
  | "balanced_bellows_backpressure"
  | "thermal_relief_liquid_lock"
  | "rupture_disc_burst_membrane";

interface ReliefValveData {
  capacity: number;
  accuracy: number;
  reseat: number;
  reliability: number;
  rvCost: number;
  reclosing: boolean;
  forPressure: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<ReliefValveType, ReliefValveData> = {
  spring_loaded_pop_action: {
    capacity: 7, accuracy: 7, reseat: 8, reliability: 9, rvCost: 5,
    reclosing: true, forPressure: true,
    element: "compression_spring_disc_nozzle",
    bestUse: "vessel_boiler_standard_overpressure",
  },
  pilot_operated_high_cap: {
    capacity: 10, accuracy: 9, reseat: 9, reliability: 8, rvCost: 9,
    reclosing: true, forPressure: true,
    element: "pilot_dome_piston_main_valve",
    bestUse: "high_capacity_pipeline_close_set",
  },
  balanced_bellows_backpressure: {
    capacity: 7, accuracy: 8, reseat: 7, reliability: 7, rvCost: 7,
    reclosing: true, forPressure: true,
    element: "bellows_balance_backpressure_comp",
    bestUse: "variable_backpressure_flare_header",
  },
  thermal_relief_liquid_lock: {
    capacity: 3, accuracy: 5, reseat: 6, reliability: 8, rvCost: 2,
    reclosing: true, forPressure: false,
    element: "small_spring_thermal_expansion",
    bestUse: "blocked_liquid_pipe_thermal_expand",
  },
  rupture_disc_burst_membrane: {
    capacity: 10, accuracy: 6, reseat: 1, reliability: 10, rvCost: 3,
    reclosing: false, forPressure: true,
    element: "metal_membrane_burst_at_pressure",
    bestUse: "fast_action_toxic_service_backup",
  },
};

function get(t: ReliefValveType): ReliefValveData {
  return DATA[t];
}

export const capacity = (t: ReliefValveType) => get(t).capacity;
export const accuracy = (t: ReliefValveType) => get(t).accuracy;
export const reseat = (t: ReliefValveType) => get(t).reseat;
export const reliability = (t: ReliefValveType) => get(t).reliability;
export const rvCost = (t: ReliefValveType) => get(t).rvCost;
export const reclosing = (t: ReliefValveType) => get(t).reclosing;
export const forPressure = (t: ReliefValveType) => get(t).forPressure;
export const element = (t: ReliefValveType) => get(t).element;
export const bestUse = (t: ReliefValveType) => get(t).bestUse;
export const reliefValveTypes = (): ReliefValveType[] =>
  Object.keys(DATA) as ReliefValveType[];

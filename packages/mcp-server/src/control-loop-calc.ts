export type ControlLoop =
  | "feedback_single_pid"
  | "cascade_inner_outer"
  | "feedforward_disturbance"
  | "ratio_flow_blend"
  | "split_range_valve";

const DATA: Record<ControlLoop, {
  disturbReject: number; setpointTrack: number; complexity: number;
  stability: number; clCost: number; multiVariable: boolean;
  forBatch: boolean; structure: string; bestUse: string;
}> = {
  feedback_single_pid: {
    disturbReject: 5, setpointTrack: 6, complexity: 2,
    stability: 8, clCost: 1, multiVariable: false,
    forBatch: false, structure: "single_loop_error_driven",
    bestUse: "level_control_tank_fill",
  },
  cascade_inner_outer: {
    disturbReject: 9, setpointTrack: 8, complexity: 5,
    stability: 7, clCost: 3, multiVariable: false,
    forBatch: false, structure: "nested_primary_secondary",
    bestUse: "reactor_jacket_temp_cascade",
  },
  feedforward_disturbance: {
    disturbReject: 10, setpointTrack: 5, complexity: 6,
    stability: 9, clCost: 4, multiVariable: false,
    forBatch: false, structure: "measured_disturbance_compensate",
    bestUse: "boiler_steam_demand_ff",
  },
  ratio_flow_blend: {
    disturbReject: 7, setpointTrack: 9, complexity: 4,
    stability: 8, clCost: 2, multiVariable: true,
    forBatch: true, structure: "wild_controlled_flow_ratio",
    bestUse: "fuel_air_combustion_ratio",
  },
  split_range_valve: {
    disturbReject: 6, setpointTrack: 7, complexity: 7,
    stability: 6, clCost: 5, multiVariable: true,
    forBatch: true, structure: "single_output_dual_actuator",
    bestUse: "pressure_vent_makeup_split",
  },
};

const get = (t: ControlLoop) => DATA[t];

export const disturbReject = (t: ControlLoop) => get(t).disturbReject;
export const setpointTrack = (t: ControlLoop) => get(t).setpointTrack;
export const complexity = (t: ControlLoop) => get(t).complexity;
export const stability = (t: ControlLoop) => get(t).stability;
export const clCost = (t: ControlLoop) => get(t).clCost;
export const multiVariable = (t: ControlLoop) => get(t).multiVariable;
export const forBatch = (t: ControlLoop) => get(t).forBatch;
export const structure = (t: ControlLoop) => get(t).structure;
export const bestUse = (t: ControlLoop) => get(t).bestUse;
export const controlLoops = (): ControlLoop[] => Object.keys(DATA) as ControlLoop[];

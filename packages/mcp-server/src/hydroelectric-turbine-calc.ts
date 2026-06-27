export type HydroelectricTurbineType =
  | "francis"
  | "kaplan"
  | "pelton"
  | "crossflow_banki"
  | "bulb_tubular";

interface HydroelectricTurbineData {
  efficiency: number;
  headRange: number;
  flowRange: number;
  capacity: number;
  htCost: number;
  adjustable: boolean;
  forLowHead: boolean;
  runner: string;
  bestUse: string;
}

const DATA: Record<HydroelectricTurbineType, HydroelectricTurbineData> = {
  francis: {
    efficiency: 10, headRange: 9, flowRange: 8, capacity: 10, htCost: 8,
    adjustable: true, forLowHead: false,
    runner: "inward_flow_reaction_runner_scroll_case_draft_tube_medium",
    bestUse: "large_dam_medium_high_head_30_700m_base_load_grid_power",
  },
  kaplan: {
    efficiency: 9, headRange: 5, flowRange: 10, capacity: 9, htCost: 7,
    adjustable: true, forLowHead: true,
    runner: "axial_flow_propeller_adjustable_blade_runner_low_head",
    bestUse: "run_of_river_low_head_2_40m_high_flow_variable_discharge",
  },
  pelton: {
    efficiency: 9, headRange: 10, flowRange: 4, capacity: 8, htCost: 6,
    adjustable: false, forLowHead: false,
    runner: "impulse_bucket_wheel_nozzle_jet_deflector_high_head",
    bestUse: "high_head_mountain_300_1800m_low_flow_alpine_reservoir",
  },
  crossflow_banki: {
    efficiency: 7, headRange: 6, flowRange: 7, capacity: 4, htCost: 3,
    adjustable: false, forLowHead: true,
    runner: "drum_shaped_crossflow_runner_double_pass_water_self_clean",
    bestUse: "small_hydro_micro_hydro_irrigation_canal_remote_village",
  },
  bulb_tubular: {
    efficiency: 9, headRange: 3, flowRange: 10, capacity: 8, htCost: 9,
    adjustable: true, forLowHead: true,
    runner: "horizontal_axial_bulb_generator_submerged_in_flow_passage",
    bestUse: "tidal_barrage_very_low_head_2_15m_high_flow_river_estuary",
  },
};

function get(t: HydroelectricTurbineType): HydroelectricTurbineData {
  return DATA[t];
}

export const efficiency = (t: HydroelectricTurbineType) => get(t).efficiency;
export const headRange = (t: HydroelectricTurbineType) => get(t).headRange;
export const flowRange = (t: HydroelectricTurbineType) => get(t).flowRange;
export const capacity = (t: HydroelectricTurbineType) => get(t).capacity;
export const htCost = (t: HydroelectricTurbineType) => get(t).htCost;
export const adjustable = (t: HydroelectricTurbineType) => get(t).adjustable;
export const forLowHead = (t: HydroelectricTurbineType) => get(t).forLowHead;
export const runner = (t: HydroelectricTurbineType) => get(t).runner;
export const bestUse = (t: HydroelectricTurbineType) => get(t).bestUse;
export const hydroelectricTurbineTypes = (): HydroelectricTurbineType[] =>
  Object.keys(DATA) as HydroelectricTurbineType[];

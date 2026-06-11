export type TargetFlowType =
  | "drag_disc_standard"
  | "annular_ring_full_bore"
  | "micro_target_low_flow"
  | "high_temp_refractory"
  | "cryogenic_target_cold";

interface TargetFlowData {
  accuracy: number;
  turndown: number;
  ruggedness: number;
  noMovingParts: number;
  tgCost: number;
  bidirectional: boolean;
  forDirty: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<TargetFlowType, TargetFlowData> = {
  drag_disc_standard: {
    accuracy: 6, turndown: 6, ruggedness: 8, noMovingParts: 9, tgCost: 3,
    bidirectional: false, forDirty: true,
    element: "disc_target_on_force_bar_strain_gauge",
    bestUse: "dirty_liquid_slurry_sewage_flow_switch",
  },
  annular_ring_full_bore: {
    accuracy: 7, turndown: 7, ruggedness: 8, noMovingParts: 9, tgCost: 4,
    bidirectional: true, forDirty: true,
    element: "annular_ring_full_bore_low_blockage",
    bestUse: "river_water_intake_large_pipe_dirty_flow",
  },
  micro_target_low_flow: {
    accuracy: 8, turndown: 8, ruggedness: 7, noMovingParts: 9, tgCost: 5,
    bidirectional: false, forDirty: false,
    element: "micro_disc_small_pipe_low_flow_detect",
    bestUse: "chemical_injection_sampling_low_flow_rate",
  },
  high_temp_refractory: {
    accuracy: 5, turndown: 5, ruggedness: 10, noMovingParts: 9, tgCost: 6,
    bidirectional: false, forDirty: true,
    element: "refractory_target_high_temp_alloy_bar",
    bestUse: "molten_salt_hot_oil_thermal_fluid_flow",
  },
  cryogenic_target_cold: {
    accuracy: 7, turndown: 6, ruggedness: 8, noMovingParts: 9, tgCost: 5,
    bidirectional: false, forDirty: false,
    element: "cryogenic_rated_target_stainless_316",
    bestUse: "lng_liquid_nitrogen_cryogenic_flow_meter",
  },
};

function get(t: TargetFlowType): TargetFlowData {
  return DATA[t];
}

export const accuracy = (t: TargetFlowType) => get(t).accuracy;
export const turndown = (t: TargetFlowType) => get(t).turndown;
export const ruggedness = (t: TargetFlowType) => get(t).ruggedness;
export const noMovingParts = (t: TargetFlowType) => get(t).noMovingParts;
export const tgCost = (t: TargetFlowType) => get(t).tgCost;
export const bidirectional = (t: TargetFlowType) => get(t).bidirectional;
export const forDirty = (t: TargetFlowType) => get(t).forDirty;
export const element = (t: TargetFlowType) => get(t).element;
export const bestUse = (t: TargetFlowType) => get(t).bestUse;
export const targetFlowTypes = (): TargetFlowType[] =>
  Object.keys(DATA) as TargetFlowType[];

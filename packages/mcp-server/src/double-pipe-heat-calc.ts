export type DoublePipeHeatType =
  | "plain_tube_concentric"
  | "finned_tube_longitudinal"
  | "multi_tube_hairpin"
  | "jacketed_pipe_trace"
  | "triple_tube_annular";

interface DoublePipeHeatData {
  heatTransfer: number;
  flexibility: number;
  pressureCapability: number;
  maintenance: number;
  dpCost: number;
  modular: boolean;
  forHighPress: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<DoublePipeHeatType, DoublePipeHeatData> = {
  plain_tube_concentric: {
    heatTransfer: 5, flexibility: 8, pressureCapability: 8, maintenance: 9, dpCost: 3,
    modular: true, forHighPress: true,
    construction: "pipe_in_pipe_countercurrent_u_bend",
    bestUse: "small_flow_pilot_plant_simple_duty",
  },
  finned_tube_longitudinal: {
    heatTransfer: 8, flexibility: 7, pressureCapability: 7, maintenance: 7, dpCost: 5,
    modular: true, forHighPress: false,
    construction: "longitudinal_fin_welded_inner_tube",
    bestUse: "gas_cooling_low_coefficient_enhance",
  },
  multi_tube_hairpin: {
    heatTransfer: 7, flexibility: 9, pressureCapability: 9, maintenance: 8, dpCost: 6,
    modular: true, forHighPress: true,
    construction: "multi_inner_tube_bundle_hairpin_return",
    bestUse: "high_pressure_feedwater_heat_recover",
  },
  jacketed_pipe_trace: {
    heatTransfer: 4, flexibility: 6, pressureCapability: 5, maintenance: 5, dpCost: 4,
    modular: false, forHighPress: false,
    construction: "outer_jacket_steam_trace_pipe_run",
    bestUse: "pipeline_heat_trace_viscous_maintain",
  },
  triple_tube_annular: {
    heatTransfer: 9, flexibility: 5, pressureCapability: 6, maintenance: 4, dpCost: 8,
    modular: false, forHighPress: false,
    construction: "three_concentric_tube_two_annuli_flow",
    bestUse: "food_pasteurize_heat_recover_regen",
  },
};

function get(t: DoublePipeHeatType): DoublePipeHeatData {
  return DATA[t];
}

export const heatTransfer = (t: DoublePipeHeatType) => get(t).heatTransfer;
export const flexibility = (t: DoublePipeHeatType) => get(t).flexibility;
export const pressureCapability = (t: DoublePipeHeatType) => get(t).pressureCapability;
export const maintenance = (t: DoublePipeHeatType) => get(t).maintenance;
export const dpCost = (t: DoublePipeHeatType) => get(t).dpCost;
export const modular = (t: DoublePipeHeatType) => get(t).modular;
export const forHighPress = (t: DoublePipeHeatType) => get(t).forHighPress;
export const construction = (t: DoublePipeHeatType) => get(t).construction;
export const bestUse = (t: DoublePipeHeatType) => get(t).bestUse;
export const doublePipeHeatTypes = (): DoublePipeHeatType[] =>
  Object.keys(DATA) as DoublePipeHeatType[];

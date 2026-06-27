export type CncLatheType =
  | "horizontal_turning_center"
  | "vertical_turret_lathe"
  | "swiss_type_sliding_head"
  | "multi_spindle_automatic"
  | "live_tooling_mill_turn";

interface CncLatheData {
  precision: number;
  speed: number;
  complexity: number;
  throughput: number;
  clCost: number;
  multiAxis: boolean;
  forSmallParts: boolean;
  spindle: string;
  bestUse: string;
}

const DATA: Record<CncLatheType, CncLatheData> = {
  horizontal_turning_center: {
    precision: 8, speed: 8, complexity: 7, throughput: 8, clCost: 6,
    multiAxis: false, forSmallParts: false,
    spindle: "horizontal_chuck_tailstock",
    bestUse: "general_shaft_flange_turning",
  },
  vertical_turret_lathe: {
    precision: 7, speed: 7, complexity: 6, throughput: 8, clCost: 7,
    multiAxis: false, forSmallParts: false,
    spindle: "vertical_table_gravity_loading",
    bestUse: "large_diameter_heavy_workpiece",
  },
  swiss_type_sliding_head: {
    precision: 10, speed: 9, complexity: 8, throughput: 9, clCost: 8,
    multiAxis: true, forSmallParts: true,
    spindle: "sliding_headstock_guide_bushing",
    bestUse: "medical_implant_watch_component",
  },
  multi_spindle_automatic: {
    precision: 7, speed: 10, complexity: 6, throughput: 10, clCost: 9,
    multiAxis: true, forSmallParts: true,
    spindle: "six_eight_spindle_simultaneous",
    bestUse: "high_volume_fastener_fitting",
  },
  live_tooling_mill_turn: {
    precision: 9, speed: 8, complexity: 10, throughput: 8, clCost: 9,
    multiAxis: true, forSmallParts: false,
    spindle: "main_sub_spindle_c_y_axis",
    bestUse: "complex_part_one_setup_complete",
  },
};

function get(t: CncLatheType): CncLatheData {
  return DATA[t];
}

export const precision = (t: CncLatheType) => get(t).precision;
export const speed = (t: CncLatheType) => get(t).speed;
export const complexity = (t: CncLatheType) => get(t).complexity;
export const throughput = (t: CncLatheType) => get(t).throughput;
export const clCost = (t: CncLatheType) => get(t).clCost;
export const multiAxis = (t: CncLatheType) => get(t).multiAxis;
export const forSmallParts = (t: CncLatheType) => get(t).forSmallParts;
export const spindle = (t: CncLatheType) => get(t).spindle;
export const bestUse = (t: CncLatheType) => get(t).bestUse;
export const cncLatheTypes = (): CncLatheType[] =>
  Object.keys(DATA) as CncLatheType[];

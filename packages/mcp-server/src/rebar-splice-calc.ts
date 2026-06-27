export type RebarSpliceType =
  | "lap_splice_overlap_tie"
  | "mechanical_coupler_threaded"
  | "cadweld_exothermic_fuse"
  | "headed_bar_anchor_plate"
  | "welded_splice_butt_weld";

interface RebarSpliceData {
  strength: number;
  speed: number;
  congestion: number;
  reliability: number;
  rsCost: number;
  mechanical: boolean;
  forColumn: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<RebarSpliceType, RebarSpliceData> = {
  lap_splice_overlap_tie: {
    strength: 6, speed: 8, congestion: 3, reliability: 7, rsCost: 2,
    mechanical: false, forColumn: false,
    method: "wire_tie_overlap_development_length",
    bestUse: "slab_wall_standard_rebar_connection",
  },
  mechanical_coupler_threaded: {
    strength: 10, speed: 9, congestion: 9, reliability: 10, rsCost: 8,
    mechanical: true, forColumn: true,
    method: "threaded_coupler_torque_connect",
    bestUse: "column_beam_high_seismic_splice",
  },
  cadweld_exothermic_fuse: {
    strength: 9, speed: 5, congestion: 8, reliability: 9, rsCost: 7,
    mechanical: false, forColumn: true,
    method: "exothermic_weld_powder_crucible",
    bestUse: "heavy_foundation_nuclear_critical",
  },
  headed_bar_anchor_plate: {
    strength: 8, speed: 7, congestion: 10, reliability: 8, rsCost: 6,
    mechanical: true, forColumn: true,
    method: "forged_head_friction_weld_plate",
    bestUse: "beam_column_joint_congested_node",
  },
  welded_splice_butt_weld: {
    strength: 8, speed: 4, congestion: 7, reliability: 7, rsCost: 5,
    mechanical: false, forColumn: false,
    method: "electric_arc_butt_weld_preheat",
    bestUse: "field_splice_large_bar_repair",
  },
};

function get(t: RebarSpliceType): RebarSpliceData {
  return DATA[t];
}

export const strength = (t: RebarSpliceType) => get(t).strength;
export const speed = (t: RebarSpliceType) => get(t).speed;
export const congestion = (t: RebarSpliceType) => get(t).congestion;
export const reliability = (t: RebarSpliceType) => get(t).reliability;
export const rsCost = (t: RebarSpliceType) => get(t).rsCost;
export const mechanical = (t: RebarSpliceType) => get(t).mechanical;
export const forColumn = (t: RebarSpliceType) => get(t).forColumn;
export const method = (t: RebarSpliceType) => get(t).method;
export const bestUse = (t: RebarSpliceType) => get(t).bestUse;
export const rebarSpliceTypes = (): RebarSpliceType[] =>
  Object.keys(DATA) as RebarSpliceType[];

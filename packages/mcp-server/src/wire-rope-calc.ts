export type WireRopeType =
  | "iwrc_6x19_standard"
  | "iwrc_6x37_flexible"
  | "fiber_core_6x19_general"
  | "rotation_resistant_19x7"
  | "compacted_strand_swaged";

interface WireRopeData {
  strength: number;
  flexibility: number;
  abrasionResist: number;
  fatigue: number;
  wrCost: number;
  rotationResist: boolean;
  forCrane: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<WireRopeType, WireRopeData> = {
  iwrc_6x19_standard: {
    strength: 8, flexibility: 5, abrasionResist: 9, fatigue: 6, wrCost: 5,
    rotationResist: false, forCrane: true,
    construction: "six_strand_19_wire_iwrc_core",
    bestUse: "crane_hoist_general_lifting_drag",
  },
  iwrc_6x37_flexible: {
    strength: 7, flexibility: 9, abrasionResist: 6, fatigue: 9, wrCost: 6,
    rotationResist: false, forCrane: true,
    construction: "six_strand_37_wire_iwrc_fine",
    bestUse: "small_sheave_elevator_high_flex",
  },
  fiber_core_6x19_general: {
    strength: 6, flexibility: 7, abrasionResist: 7, fatigue: 7, wrCost: 3,
    rotationResist: false, forCrane: false,
    construction: "six_strand_19_wire_fiber_core",
    bestUse: "guy_wire_standing_rigging_light",
  },
  rotation_resistant_19x7: {
    strength: 7, flexibility: 6, abrasionResist: 7, fatigue: 7, wrCost: 8,
    rotationResist: true, forCrane: true,
    construction: "nineteen_strand_7_wire_counter",
    bestUse: "single_line_crane_headache_ball",
  },
  compacted_strand_swaged: {
    strength: 10, flexibility: 4, abrasionResist: 10, fatigue: 8, wrCost: 9,
    rotationResist: false, forCrane: true,
    construction: "swaged_compacted_smooth_strand",
    bestUse: "mining_hoist_heavy_load_long_life",
  },
};

function get(t: WireRopeType): WireRopeData {
  return DATA[t];
}

export const strength = (t: WireRopeType) => get(t).strength;
export const flexibility = (t: WireRopeType) => get(t).flexibility;
export const abrasionResist = (t: WireRopeType) => get(t).abrasionResist;
export const fatigue = (t: WireRopeType) => get(t).fatigue;
export const wrCost = (t: WireRopeType) => get(t).wrCost;
export const rotationResist = (t: WireRopeType) => get(t).rotationResist;
export const forCrane = (t: WireRopeType) => get(t).forCrane;
export const construction = (t: WireRopeType) => get(t).construction;
export const bestUse = (t: WireRopeType) => get(t).bestUse;
export const wireRopeTypes = (): WireRopeType[] =>
  Object.keys(DATA) as WireRopeType[];

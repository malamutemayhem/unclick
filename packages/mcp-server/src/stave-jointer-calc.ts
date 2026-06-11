// Stave jointer calculator - coopering stave edge tools

export type StaveJointerType =
  | "long_try_plane"
  | "jointer_bench_inverted"
  | "electric_jointer_power"
  | "hand_plane_short"
  | "hollow_joint_curved";

const JOINTER_DATA: Record<
  StaveJointerType,
  {
    edgeStraight: number;
    jointTight: number;
    speedJoint: number;
    staveRange: number;
    cost: number;
    powered: boolean;
    forCurved: boolean;
    planeLength: string;
    bestUse: string;
  }
> = {
  long_try_plane: {
    edgeStraight: 10,
    jointTight: 9,
    speedJoint: 6,
    staveRange: 8,
    cost: 6,
    powered: false,
    forCurved: false,
    planeLength: "long_28_inch",
    bestUse: "straight_stave_edge",
  },
  jointer_bench_inverted: {
    edgeStraight: 10,
    jointTight: 10,
    speedJoint: 7,
    staveRange: 9,
    cost: 8,
    powered: false,
    forCurved: false,
    planeLength: "bench_72_inch",
    bestUse: "production_stave_edge",
  },
  electric_jointer_power: {
    edgeStraight: 8,
    jointTight: 8,
    speedJoint: 10,
    staveRange: 7,
    cost: 9,
    powered: true,
    forCurved: false,
    planeLength: "table_48_inch",
    bestUse: "fast_volume_joint",
  },
  hand_plane_short: {
    edgeStraight: 7,
    jointTight: 7,
    speedJoint: 8,
    staveRange: 5,
    cost: 3,
    powered: false,
    forCurved: false,
    planeLength: "short_14_inch",
    bestUse: "small_barrel_edge",
  },
  hollow_joint_curved: {
    edgeStraight: 7,
    jointTight: 9,
    speedJoint: 5,
    staveRange: 7,
    cost: 7,
    powered: false,
    forCurved: true,
    planeLength: "medium_20_inch",
    bestUse: "curved_bilge_joint",
  },
};

export function edgeStraight(type: StaveJointerType): number {
  return JOINTER_DATA[type].edgeStraight;
}
export function jointTight(type: StaveJointerType): number {
  return JOINTER_DATA[type].jointTight;
}
export function speedJoint(type: StaveJointerType): number {
  return JOINTER_DATA[type].speedJoint;
}
export function staveRange(type: StaveJointerType): number {
  return JOINTER_DATA[type].staveRange;
}
export function jointerCost(type: StaveJointerType): number {
  return JOINTER_DATA[type].cost;
}
export function powered(type: StaveJointerType): boolean {
  return JOINTER_DATA[type].powered;
}
export function forCurved(type: StaveJointerType): boolean {
  return JOINTER_DATA[type].forCurved;
}
export function planeLength(type: StaveJointerType): string {
  return JOINTER_DATA[type].planeLength;
}
export function bestUse(type: StaveJointerType): string {
  return JOINTER_DATA[type].bestUse;
}
export function staveJointers(): StaveJointerType[] {
  return Object.keys(JOINTER_DATA) as StaveJointerType[];
}

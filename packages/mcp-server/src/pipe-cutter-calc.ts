// Pipe cutter calculator - plumbing pipe cutting tools

export type PipeCutterType =
  | "wheel_cutter_copper"
  | "ratchet_cutter_plastic"
  | "chain_snap_cast"
  | "internal_tube_inside"
  | "soil_pipe_heavy";

const CUTTER_DATA: Record<
  PipeCutterType,
  {
    cutClean: number;
    speedCut: number;
    pipeRange: number;
    portability: number;
    cost: number;
    ratchet: boolean;
    forCopper: boolean;
    wheelType: string;
    bestUse: string;
  }
> = {
  wheel_cutter_copper: {
    cutClean: 9,
    speedCut: 7,
    pipeRange: 6,
    portability: 9,
    cost: 4,
    ratchet: false,
    forCopper: true,
    wheelType: "single_steel_wheel",
    bestUse: "copper_tube_cut",
  },
  ratchet_cutter_plastic: {
    cutClean: 7,
    speedCut: 10,
    pipeRange: 7,
    portability: 10,
    cost: 3,
    ratchet: true,
    forCopper: false,
    wheelType: "blade_jaw_ratchet",
    bestUse: "plastic_pipe_snap",
  },
  chain_snap_cast: {
    cutClean: 5,
    speedCut: 6,
    pipeRange: 10,
    portability: 5,
    cost: 7,
    ratchet: false,
    forCopper: false,
    wheelType: "chain_link_cutter",
    bestUse: "cast_iron_snap",
  },
  internal_tube_inside: {
    cutClean: 8,
    speedCut: 5,
    pipeRange: 4,
    portability: 8,
    cost: 6,
    ratchet: false,
    forCopper: true,
    wheelType: "internal_expand_blade",
    bestUse: "tight_space_cut",
  },
  soil_pipe_heavy: {
    cutClean: 6,
    speedCut: 7,
    pipeRange: 9,
    portability: 4,
    cost: 8,
    ratchet: true,
    forCopper: false,
    wheelType: "heavy_chain_wheel",
    bestUse: "large_drain_cut",
  },
};

export function cutClean(type: PipeCutterType): number {
  return CUTTER_DATA[type].cutClean;
}
export function speedCut(type: PipeCutterType): number {
  return CUTTER_DATA[type].speedCut;
}
export function pipeRange(type: PipeCutterType): number {
  return CUTTER_DATA[type].pipeRange;
}
export function portability(type: PipeCutterType): number {
  return CUTTER_DATA[type].portability;
}
export function cutterCost(type: PipeCutterType): number {
  return CUTTER_DATA[type].cost;
}
export function ratchet(type: PipeCutterType): boolean {
  return CUTTER_DATA[type].ratchet;
}
export function forCopper(type: PipeCutterType): boolean {
  return CUTTER_DATA[type].forCopper;
}
export function wheelType(type: PipeCutterType): string {
  return CUTTER_DATA[type].wheelType;
}
export function bestUse(type: PipeCutterType): string {
  return CUTTER_DATA[type].bestUse;
}
export function pipeCutters(): PipeCutterType[] {
  return Object.keys(CUTTER_DATA) as PipeCutterType[];
}

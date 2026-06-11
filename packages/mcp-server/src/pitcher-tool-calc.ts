// Pitcher tool calculator - stone masonry splitting/pitching chisels

export type PitcherToolType =
  | "wide_blade_split"
  | "narrow_blade_score"
  | "bolster_broad_flat"
  | "plugs_feathers_set"
  | "hydraulic_splitter_press";

const PITCHER_DATA: Record<
  PitcherToolType,
  {
    splitForce: number;
    lineControl: number;
    faceSmooth: number;
    stoneRange: number;
    cost: number;
    hydraulic: boolean;
    forThickSlab: boolean;
    edgeProfile: string;
    bestUse: string;
  }
> = {
  wide_blade_split: {
    splitForce: 8,
    lineControl: 7,
    faceSmooth: 7,
    stoneRange: 7,
    cost: 4,
    hydraulic: false,
    forThickSlab: false,
    edgeProfile: "wide_wedge_edge",
    bestUse: "general_stone_split",
  },
  narrow_blade_score: {
    splitForce: 6,
    lineControl: 10,
    faceSmooth: 8,
    stoneRange: 6,
    cost: 4,
    hydraulic: false,
    forThickSlab: false,
    edgeProfile: "narrow_score_line",
    bestUse: "precise_line_split",
  },
  bolster_broad_flat: {
    splitForce: 9,
    lineControl: 8,
    faceSmooth: 6,
    stoneRange: 8,
    cost: 5,
    hydraulic: false,
    forThickSlab: true,
    edgeProfile: "broad_flat_face",
    bestUse: "thick_block_cleave",
  },
  plugs_feathers_set: {
    splitForce: 10,
    lineControl: 9,
    faceSmooth: 8,
    stoneRange: 9,
    cost: 7,
    hydraulic: false,
    forThickSlab: true,
    edgeProfile: "wedge_shim_pair",
    bestUse: "controlled_block_split",
  },
  hydraulic_splitter_press: {
    splitForce: 10,
    lineControl: 7,
    faceSmooth: 7,
    stoneRange: 10,
    cost: 10,
    hydraulic: true,
    forThickSlab: true,
    edgeProfile: "hydraulic_ram_blade",
    bestUse: "production_slab_split",
  },
};

export function splitForce(type: PitcherToolType): number {
  return PITCHER_DATA[type].splitForce;
}
export function lineControl(type: PitcherToolType): number {
  return PITCHER_DATA[type].lineControl;
}
export function faceSmooth(type: PitcherToolType): number {
  return PITCHER_DATA[type].faceSmooth;
}
export function stoneRange(type: PitcherToolType): number {
  return PITCHER_DATA[type].stoneRange;
}
export function pitcherCost(type: PitcherToolType): number {
  return PITCHER_DATA[type].cost;
}
export function hydraulic(type: PitcherToolType): boolean {
  return PITCHER_DATA[type].hydraulic;
}
export function forThickSlab(type: PitcherToolType): boolean {
  return PITCHER_DATA[type].forThickSlab;
}
export function edgeProfile(type: PitcherToolType): string {
  return PITCHER_DATA[type].edgeProfile;
}
export function bestUse(type: PitcherToolType): string {
  return PITCHER_DATA[type].bestUse;
}
export function pitcherTools(): PitcherToolType[] {
  return Object.keys(PITCHER_DATA) as PitcherToolType[];
}

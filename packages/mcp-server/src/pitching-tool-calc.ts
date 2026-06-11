// Pitching tool calculator - stone masonry edge pitching tools

export type PitchingToolType =
  | "wide_blade_standard"
  | "narrow_blade_detail"
  | "bolster_wide_split"
  | "pitcher_angled_face"
  | "mason_set_flat";

const PITCH_DATA: Record<
  PitchingToolType,
  {
    edgeClean: number;
    splitControl: number;
    forceTransfer: number;
    stoneRange: number;
    cost: number;
    angled: boolean;
    forSplit: boolean;
    bladeWidth: string;
    bestUse: string;
  }
> = {
  wide_blade_standard: {
    edgeClean: 8,
    splitControl: 8,
    forceTransfer: 8,
    stoneRange: 8,
    cost: 4,
    angled: false,
    forSplit: false,
    bladeWidth: "wide_3_inch",
    bestUse: "general_edge_pitch",
  },
  narrow_blade_detail: {
    edgeClean: 9,
    splitControl: 9,
    forceTransfer: 6,
    stoneRange: 5,
    cost: 4,
    angled: false,
    forSplit: false,
    bladeWidth: "narrow_1_inch",
    bestUse: "detail_edge_trim",
  },
  bolster_wide_split: {
    edgeClean: 7,
    splitControl: 7,
    forceTransfer: 10,
    stoneRange: 9,
    cost: 5,
    angled: false,
    forSplit: true,
    bladeWidth: "extra_wide_4_inch",
    bestUse: "stone_split_line",
  },
  pitcher_angled_face: {
    edgeClean: 9,
    splitControl: 8,
    forceTransfer: 8,
    stoneRange: 7,
    cost: 5,
    angled: true,
    forSplit: false,
    bladeWidth: "medium_2_inch",
    bestUse: "angled_face_dress",
  },
  mason_set_flat: {
    edgeClean: 7,
    splitControl: 7,
    forceTransfer: 9,
    stoneRange: 8,
    cost: 3,
    angled: false,
    forSplit: true,
    bladeWidth: "flat_wide_set",
    bestUse: "straight_line_break",
  },
};

export function edgeClean(type: PitchingToolType): number {
  return PITCH_DATA[type].edgeClean;
}
export function splitControl(type: PitchingToolType): number {
  return PITCH_DATA[type].splitControl;
}
export function forceTransfer(type: PitchingToolType): number {
  return PITCH_DATA[type].forceTransfer;
}
export function stoneRange(type: PitchingToolType): number {
  return PITCH_DATA[type].stoneRange;
}
export function pitchCost(type: PitchingToolType): number {
  return PITCH_DATA[type].cost;
}
export function angled(type: PitchingToolType): boolean {
  return PITCH_DATA[type].angled;
}
export function forSplit(type: PitchingToolType): boolean {
  return PITCH_DATA[type].forSplit;
}
export function bladeWidth(type: PitchingToolType): string {
  return PITCH_DATA[type].bladeWidth;
}
export function bestUse(type: PitchingToolType): string {
  return PITCH_DATA[type].bestUse;
}
export function pitchingTools(): PitchingToolType[] {
  return Object.keys(PITCH_DATA) as PitchingToolType[];
}

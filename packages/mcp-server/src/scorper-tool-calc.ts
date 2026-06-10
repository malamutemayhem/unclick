// Scorper tool calculator - engraving round/flat scorper cutting tools

export type ScorperToolType =
  | "round_scorper_deep"
  | "flat_scorper_wide"
  | "knife_edge_line"
  | "bullstick_round_cut"
  | "dotter_stipple_point";

const SCORPER_DATA: Record<
  ScorperToolType,
  {
    cutDepth: number;
    lineWidth: number;
    controlFeel: number;
    metalClear: number;
    cost: number;
    forBackground: boolean;
    curved: boolean;
    faceProfile: string;
    bestUse: string;
  }
> = {
  round_scorper_deep: {
    cutDepth: 9,
    lineWidth: 7,
    controlFeel: 6,
    metalClear: 9,
    cost: 5,
    forBackground: true,
    curved: true,
    faceProfile: "concave_round_cup",
    bestUse: "background_remove",
  },
  flat_scorper_wide: {
    cutDepth: 7,
    lineWidth: 9,
    controlFeel: 7,
    metalClear: 8,
    cost: 5,
    forBackground: true,
    curved: false,
    faceProfile: "flat_wide_edge",
    bestUse: "broad_area_clear",
  },
  knife_edge_line: {
    cutDepth: 5,
    lineWidth: 3,
    controlFeel: 9,
    metalClear: 4,
    cost: 4,
    forBackground: false,
    curved: false,
    faceProfile: "sharp_knife_point",
    bestUse: "fine_line_detail",
  },
  bullstick_round_cut: {
    cutDepth: 8,
    lineWidth: 6,
    controlFeel: 7,
    metalClear: 7,
    cost: 6,
    forBackground: false,
    curved: true,
    faceProfile: "round_belly_curve",
    bestUse: "scroll_curve_cut",
  },
  dotter_stipple_point: {
    cutDepth: 3,
    lineWidth: 2,
    controlFeel: 8,
    metalClear: 3,
    cost: 4,
    forBackground: true,
    curved: false,
    faceProfile: "blunt_round_tip",
    bestUse: "stipple_texture_dot",
  },
};

export function cutDepth(type: ScorperToolType): number {
  return SCORPER_DATA[type].cutDepth;
}
export function lineWidth(type: ScorperToolType): number {
  return SCORPER_DATA[type].lineWidth;
}
export function controlFeel(type: ScorperToolType): number {
  return SCORPER_DATA[type].controlFeel;
}
export function metalClear(type: ScorperToolType): number {
  return SCORPER_DATA[type].metalClear;
}
export function scorperCost(type: ScorperToolType): number {
  return SCORPER_DATA[type].cost;
}
export function forBackground(type: ScorperToolType): boolean {
  return SCORPER_DATA[type].forBackground;
}
export function curved(type: ScorperToolType): boolean {
  return SCORPER_DATA[type].curved;
}
export function faceProfile(type: ScorperToolType): string {
  return SCORPER_DATA[type].faceProfile;
}
export function bestUse(type: ScorperToolType): string {
  return SCORPER_DATA[type].bestUse;
}
export function scorperTools(): ScorperToolType[] {
  return Object.keys(SCORPER_DATA) as ScorperToolType[];
}

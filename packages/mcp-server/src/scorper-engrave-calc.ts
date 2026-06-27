// Scorper engrave calculator - engraving background removal tools

export type ScorperEngraveType =
  | "flat_scorper_wide"
  | "round_scorper_scoop"
  | "bull_stick_push"
  | "dotter_stipple_point"
  | "liner_parallel_multi";

const SCORPER_DATA: Record<
  ScorperEngraveType,
  {
    clearSpeed: number;
    surfaceSmooth: number;
    depthControl: number;
    areaRange: number;
    cost: number;
    multiLine: boolean;
    forBackground: boolean;
    cutProfile: string;
    bestUse: string;
  }
> = {
  flat_scorper_wide: {
    clearSpeed: 9,
    surfaceSmooth: 8,
    depthControl: 7,
    areaRange: 9,
    cost: 4,
    multiLine: false,
    forBackground: true,
    cutProfile: "flat_wide_scoop",
    bestUse: "background_clear_flat",
  },
  round_scorper_scoop: {
    clearSpeed: 7,
    surfaceSmooth: 9,
    depthControl: 8,
    areaRange: 6,
    cost: 4,
    multiLine: false,
    forBackground: true,
    cutProfile: "round_scoop_cup",
    bestUse: "concave_background_cut",
  },
  bull_stick_push: {
    clearSpeed: 6,
    surfaceSmooth: 7,
    depthControl: 9,
    areaRange: 5,
    cost: 5,
    multiLine: false,
    forBackground: false,
    cutProfile: "round_push_point",
    bestUse: "detail_push_engrave",
  },
  dotter_stipple_point: {
    clearSpeed: 5,
    surfaceSmooth: 6,
    depthControl: 8,
    areaRange: 7,
    cost: 4,
    multiLine: false,
    forBackground: true,
    cutProfile: "point_stipple_dot",
    bestUse: "stipple_shade_texture",
  },
  liner_parallel_multi: {
    clearSpeed: 8,
    surfaceSmooth: 7,
    depthControl: 7,
    areaRange: 8,
    cost: 6,
    multiLine: true,
    forBackground: false,
    cutProfile: "multi_line_parallel",
    bestUse: "parallel_line_shade",
  },
};

export function clearSpeed(type: ScorperEngraveType): number {
  return SCORPER_DATA[type].clearSpeed;
}
export function surfaceSmooth(type: ScorperEngraveType): number {
  return SCORPER_DATA[type].surfaceSmooth;
}
export function depthControl(type: ScorperEngraveType): number {
  return SCORPER_DATA[type].depthControl;
}
export function areaRange(type: ScorperEngraveType): number {
  return SCORPER_DATA[type].areaRange;
}
export function scorperCost(type: ScorperEngraveType): number {
  return SCORPER_DATA[type].cost;
}
export function multiLine(type: ScorperEngraveType): boolean {
  return SCORPER_DATA[type].multiLine;
}
export function forBackground(type: ScorperEngraveType): boolean {
  return SCORPER_DATA[type].forBackground;
}
export function cutProfile(type: ScorperEngraveType): string {
  return SCORPER_DATA[type].cutProfile;
}
export function bestUse(type: ScorperEngraveType): string {
  return SCORPER_DATA[type].bestUse;
}
export function scorperEngraves(): ScorperEngraveType[] {
  return Object.keys(SCORPER_DATA) as ScorperEngraveType[];
}

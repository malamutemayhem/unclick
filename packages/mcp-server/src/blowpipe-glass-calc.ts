// Blowpipe glass calculator - glassblowing pipe selection tools

export type BlowpipeGlassType =
  | "standard_steel_pipe"
  | "lightweight_aluminum_short"
  | "heavy_gather_long"
  | "starter_student_basic"
  | "double_wall_cool";

const BLOWPIPE_DATA: Record<
  BlowpipeGlassType,
  {
    gatherControl: number;
    blowEase: number;
    heatRetain: number;
    handleCool: number;
    cost: number;
    lightweight: boolean;
    forLarge: boolean;
    pipeLength: string;
    bestUse: string;
  }
> = {
  standard_steel_pipe: {
    gatherControl: 8,
    blowEase: 8,
    heatRetain: 8,
    handleCool: 6,
    cost: 5,
    lightweight: false,
    forLarge: false,
    pipeLength: "medium_48_inch",
    bestUse: "general_blow_work",
  },
  lightweight_aluminum_short: {
    gatherControl: 7,
    blowEase: 9,
    heatRetain: 6,
    handleCool: 9,
    cost: 6,
    lightweight: true,
    forLarge: false,
    pipeLength: "short_36_inch",
    bestUse: "small_piece_blow",
  },
  heavy_gather_long: {
    gatherControl: 9,
    blowEase: 6,
    heatRetain: 10,
    handleCool: 5,
    cost: 7,
    lightweight: false,
    forLarge: true,
    pipeLength: "long_60_inch",
    bestUse: "large_vessel_gather",
  },
  starter_student_basic: {
    gatherControl: 6,
    blowEase: 8,
    heatRetain: 7,
    handleCool: 8,
    cost: 3,
    lightweight: true,
    forLarge: false,
    pipeLength: "short_30_inch",
    bestUse: "beginner_practice",
  },
  double_wall_cool: {
    gatherControl: 8,
    blowEase: 8,
    heatRetain: 7,
    handleCool: 10,
    cost: 8,
    lightweight: false,
    forLarge: false,
    pipeLength: "medium_48_inch",
    bestUse: "extended_session_blow",
  },
};

export function gatherControl(type: BlowpipeGlassType): number {
  return BLOWPIPE_DATA[type].gatherControl;
}
export function blowEase(type: BlowpipeGlassType): number {
  return BLOWPIPE_DATA[type].blowEase;
}
export function heatRetain(type: BlowpipeGlassType): number {
  return BLOWPIPE_DATA[type].heatRetain;
}
export function handleCool(type: BlowpipeGlassType): number {
  return BLOWPIPE_DATA[type].handleCool;
}
export function blowpipeCost(type: BlowpipeGlassType): number {
  return BLOWPIPE_DATA[type].cost;
}
export function lightweight(type: BlowpipeGlassType): boolean {
  return BLOWPIPE_DATA[type].lightweight;
}
export function forLarge(type: BlowpipeGlassType): boolean {
  return BLOWPIPE_DATA[type].forLarge;
}
export function pipeLength(type: BlowpipeGlassType): string {
  return BLOWPIPE_DATA[type].pipeLength;
}
export function bestUse(type: BlowpipeGlassType): string {
  return BLOWPIPE_DATA[type].bestUse;
}
export function blowpipeGlasses(): BlowpipeGlassType[] {
  return Object.keys(BLOWPIPE_DATA) as BlowpipeGlassType[];
}

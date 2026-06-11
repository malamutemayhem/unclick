// Lining tool calculator - engraving parallel line tools

export type LiningToolType =
  | "single_line_standard"
  | "double_line_parallel"
  | "multiple_line_comb"
  | "crosshatch_grid_tool"
  | "spiral_line_rose";

const LINING_DATA: Record<
  LiningToolType,
  {
    lineConsist: number;
    spacingEven: number;
    speedCover: number;
    patternRange: number;
    cost: number;
    multiLine: boolean;
    forPattern: boolean;
    lineCount: string;
    bestUse: string;
  }
> = {
  single_line_standard: {
    lineConsist: 9,
    spacingEven: 8,
    speedCover: 5,
    patternRange: 6,
    cost: 3,
    multiLine: false,
    forPattern: false,
    lineCount: "single_stroke",
    bestUse: "border_line_engrave",
  },
  double_line_parallel: {
    lineConsist: 8,
    spacingEven: 9,
    speedCover: 7,
    patternRange: 5,
    cost: 4,
    multiLine: true,
    forPattern: false,
    lineCount: "double_parallel",
    bestUse: "double_border_band",
  },
  multiple_line_comb: {
    lineConsist: 7,
    spacingEven: 9,
    speedCover: 9,
    patternRange: 7,
    cost: 6,
    multiLine: true,
    forPattern: false,
    lineCount: "multi_comb_set",
    bestUse: "shade_fill_line",
  },
  crosshatch_grid_tool: {
    lineConsist: 8,
    spacingEven: 10,
    speedCover: 8,
    patternRange: 8,
    cost: 7,
    multiLine: true,
    forPattern: true,
    lineCount: "grid_cross_set",
    bestUse: "crosshatch_texture",
  },
  spiral_line_rose: {
    lineConsist: 8,
    spacingEven: 7,
    speedCover: 6,
    patternRange: 10,
    cost: 8,
    multiLine: false,
    forPattern: true,
    lineCount: "spiral_single_arc",
    bestUse: "rose_engine_pattern",
  },
};

export function lineConsist(type: LiningToolType): number {
  return LINING_DATA[type].lineConsist;
}
export function spacingEven(type: LiningToolType): number {
  return LINING_DATA[type].spacingEven;
}
export function speedCover(type: LiningToolType): number {
  return LINING_DATA[type].speedCover;
}
export function patternRange(type: LiningToolType): number {
  return LINING_DATA[type].patternRange;
}
export function liningCost(type: LiningToolType): number {
  return LINING_DATA[type].cost;
}
export function multiLine(type: LiningToolType): boolean {
  return LINING_DATA[type].multiLine;
}
export function forPattern(type: LiningToolType): boolean {
  return LINING_DATA[type].forPattern;
}
export function lineCount(type: LiningToolType): string {
  return LINING_DATA[type].lineCount;
}
export function bestUse(type: LiningToolType): string {
  return LINING_DATA[type].bestUse;
}
export function liningTools(): LiningToolType[] {
  return Object.keys(LINING_DATA) as LiningToolType[];
}

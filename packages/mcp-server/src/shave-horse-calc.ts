// Shave horse calculator - green woodworking workholding tools

export type ShaveHorseType =
  | "dumbhead_standard"
  | "english_pivot_head"
  | "german_schnitzelbank"
  | "bodger_portable_fold"
  | "metal_jaw_modern";

const HORSE_DATA: Record<
  ShaveHorseType,
  {
    clampForce: number;
    adjustSpeed: number;
    workRange: number;
    portability: number;
    cost: number;
    portable: boolean;
    forRound: boolean;
    headStyle: string;
    bestUse: string;
  }
> = {
  dumbhead_standard: {
    clampForce: 8,
    adjustSpeed: 8,
    workRange: 7,
    portability: 4,
    cost: 4,
    portable: false,
    forRound: true,
    headStyle: "fixed_dumbhead",
    bestUse: "general_shaving_work",
  },
  english_pivot_head: {
    clampForce: 9,
    adjustSpeed: 9,
    workRange: 8,
    portability: 4,
    cost: 6,
    portable: false,
    forRound: true,
    headStyle: "pivot_swivel_head",
    bestUse: "varied_angle_shave",
  },
  german_schnitzelbank: {
    clampForce: 10,
    adjustSpeed: 7,
    workRange: 9,
    portability: 3,
    cost: 7,
    portable: false,
    forRound: false,
    headStyle: "flat_jaw_bench",
    bestUse: "heavy_timber_shave",
  },
  bodger_portable_fold: {
    clampForce: 6,
    adjustSpeed: 7,
    workRange: 6,
    portability: 10,
    cost: 5,
    portable: true,
    forRound: true,
    headStyle: "folding_tripod",
    bestUse: "woodland_field_work",
  },
  metal_jaw_modern: {
    clampForce: 9,
    adjustSpeed: 10,
    workRange: 8,
    portability: 5,
    cost: 8,
    portable: false,
    forRound: true,
    headStyle: "steel_quick_clamp",
    bestUse: "production_repeat_shave",
  },
};

export function clampForce(type: ShaveHorseType): number {
  return HORSE_DATA[type].clampForce;
}
export function adjustSpeed(type: ShaveHorseType): number {
  return HORSE_DATA[type].adjustSpeed;
}
export function workRange(type: ShaveHorseType): number {
  return HORSE_DATA[type].workRange;
}
export function portability(type: ShaveHorseType): number {
  return HORSE_DATA[type].portability;
}
export function horseCost(type: ShaveHorseType): number {
  return HORSE_DATA[type].cost;
}
export function portable(type: ShaveHorseType): boolean {
  return HORSE_DATA[type].portable;
}
export function forRound(type: ShaveHorseType): boolean {
  return HORSE_DATA[type].forRound;
}
export function headStyle(type: ShaveHorseType): string {
  return HORSE_DATA[type].headStyle;
}
export function bestUse(type: ShaveHorseType): string {
  return HORSE_DATA[type].bestUse;
}
export function shaveHorses(): ShaveHorseType[] {
  return Object.keys(HORSE_DATA) as ShaveHorseType[];
}

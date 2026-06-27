// Froe cleave calculator - green woodworking riving/splitting tools

export type FroeCleaveType =
  | "straight_blade_standard"
  | "curved_blade_shingle"
  | "wide_blade_clapboard"
  | "narrow_blade_lath"
  | "folding_camp_travel";

const FROE_DATA: Record<
  FroeCleaveType,
  {
    splitClean: number;
    bladeControl: number;
    grainFollow: number;
    handleLeverage: number;
    cost: number;
    folding: boolean;
    forShingles: boolean;
    bladeLength: string;
    bestUse: string;
  }
> = {
  straight_blade_standard: {
    splitClean: 8,
    bladeControl: 8,
    grainFollow: 8,
    handleLeverage: 7,
    cost: 5,
    folding: false,
    forShingles: false,
    bladeLength: "ten_inch_straight",
    bestUse: "general_riving_split",
  },
  curved_blade_shingle: {
    splitClean: 9,
    bladeControl: 7,
    grainFollow: 9,
    handleLeverage: 8,
    cost: 6,
    folding: false,
    forShingles: true,
    bladeLength: "twelve_inch_curve",
    bestUse: "roof_shingle_split",
  },
  wide_blade_clapboard: {
    splitClean: 7,
    bladeControl: 6,
    grainFollow: 8,
    handleLeverage: 9,
    cost: 7,
    folding: false,
    forShingles: false,
    bladeLength: "sixteen_inch_wide",
    bestUse: "wide_board_rive",
  },
  narrow_blade_lath: {
    splitClean: 9,
    bladeControl: 9,
    grainFollow: 7,
    handleLeverage: 6,
    cost: 4,
    folding: false,
    forShingles: false,
    bladeLength: "six_inch_narrow",
    bestUse: "thin_lath_split",
  },
  folding_camp_travel: {
    splitClean: 6,
    bladeControl: 7,
    grainFollow: 6,
    handleLeverage: 5,
    cost: 8,
    folding: true,
    forShingles: false,
    bladeLength: "eight_inch_fold",
    bestUse: "field_camp_rive",
  },
};

export function splitClean(type: FroeCleaveType): number {
  return FROE_DATA[type].splitClean;
}
export function bladeControl(type: FroeCleaveType): number {
  return FROE_DATA[type].bladeControl;
}
export function grainFollow(type: FroeCleaveType): number {
  return FROE_DATA[type].grainFollow;
}
export function handleLeverage(type: FroeCleaveType): number {
  return FROE_DATA[type].handleLeverage;
}
export function froeCost(type: FroeCleaveType): number {
  return FROE_DATA[type].cost;
}
export function folding(type: FroeCleaveType): boolean {
  return FROE_DATA[type].folding;
}
export function forShingles(type: FroeCleaveType): boolean {
  return FROE_DATA[type].forShingles;
}
export function bladeLength(type: FroeCleaveType): string {
  return FROE_DATA[type].bladeLength;
}
export function bestUse(type: FroeCleaveType): string {
  return FROE_DATA[type].bestUse;
}
export function froeCleaves(): FroeCleaveType[] {
  return Object.keys(FROE_DATA) as FroeCleaveType[];
}

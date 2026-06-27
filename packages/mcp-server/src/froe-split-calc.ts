// Froe split calculator - green woodworking riving tools

export type FroeSplitType =
  | "straight_froe_standard"
  | "curved_froe_shingle"
  | "wide_froe_board"
  | "narrow_froe_lath"
  | "club_mallet_drive";

const FROE_DATA: Record<
  FroeSplitType,
  {
    splitClean: number;
    grainFollow: number;
    controlLever: number;
    widthRange: number;
    cost: number;
    curved: boolean;
    forShingle: boolean;
    bladeWidth: string;
    bestUse: string;
  }
> = {
  straight_froe_standard: {
    splitClean: 8,
    grainFollow: 8,
    controlLever: 8,
    widthRange: 7,
    cost: 5,
    curved: false,
    forShingle: false,
    bladeWidth: "medium_8_inch",
    bestUse: "general_rive_split",
  },
  curved_froe_shingle: {
    splitClean: 7,
    grainFollow: 9,
    controlLever: 9,
    widthRange: 6,
    cost: 6,
    curved: true,
    forShingle: true,
    bladeWidth: "curved_6_inch",
    bestUse: "shingle_shake_split",
  },
  wide_froe_board: {
    splitClean: 8,
    grainFollow: 7,
    controlLever: 7,
    widthRange: 10,
    cost: 7,
    curved: false,
    forShingle: false,
    bladeWidth: "wide_12_inch",
    bestUse: "wide_board_rive",
  },
  narrow_froe_lath: {
    splitClean: 9,
    grainFollow: 9,
    controlLever: 8,
    widthRange: 4,
    cost: 4,
    curved: false,
    forShingle: false,
    bladeWidth: "narrow_4_inch",
    bestUse: "lath_strip_rive",
  },
  club_mallet_drive: {
    splitClean: 7,
    grainFollow: 6,
    controlLever: 6,
    widthRange: 8,
    cost: 3,
    curved: false,
    forShingle: false,
    bladeWidth: "heavy_club_head",
    bestUse: "starting_split_drive",
  },
};

export function splitClean(type: FroeSplitType): number {
  return FROE_DATA[type].splitClean;
}
export function grainFollow(type: FroeSplitType): number {
  return FROE_DATA[type].grainFollow;
}
export function controlLever(type: FroeSplitType): number {
  return FROE_DATA[type].controlLever;
}
export function widthRange(type: FroeSplitType): number {
  return FROE_DATA[type].widthRange;
}
export function froeCost(type: FroeSplitType): number {
  return FROE_DATA[type].cost;
}
export function curved(type: FroeSplitType): boolean {
  return FROE_DATA[type].curved;
}
export function forShingle(type: FroeSplitType): boolean {
  return FROE_DATA[type].forShingle;
}
export function bladeWidth(type: FroeSplitType): string {
  return FROE_DATA[type].bladeWidth;
}
export function bestUse(type: FroeSplitType): string {
  return FROE_DATA[type].bestUse;
}
export function froeSplits(): FroeSplitType[] {
  return Object.keys(FROE_DATA) as FroeSplitType[];
}

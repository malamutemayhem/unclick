// Hackle comb calculator - fiber preparation combing tools

export type HackleCombType =
  | "single_row_fine"
  | "double_row_medium"
  | "dutch_comb_long"
  | "mini_comb_hand"
  | "viking_comb_wide";

const HACKLE_DATA: Record<
  HackleCombType,
  {
    fiberAlign: number;
    wasteLow: number;
    speedComb: number;
    lengthRange: number;
    cost: number;
    doubleRow: boolean;
    forLong: boolean;
    tineSpacing: string;
    bestUse: string;
  }
> = {
  single_row_fine: {
    fiberAlign: 9,
    wasteLow: 6,
    speedComb: 7,
    lengthRange: 6,
    cost: 4,
    doubleRow: false,
    forLong: false,
    tineSpacing: "fine_close_set",
    bestUse: "fine_fiber_prep",
  },
  double_row_medium: {
    fiberAlign: 8,
    wasteLow: 7,
    speedComb: 8,
    lengthRange: 7,
    cost: 5,
    doubleRow: true,
    forLong: false,
    tineSpacing: "medium_double_row",
    bestUse: "general_fiber_comb",
  },
  dutch_comb_long: {
    fiberAlign: 9,
    wasteLow: 7,
    speedComb: 6,
    lengthRange: 10,
    cost: 7,
    doubleRow: false,
    forLong: true,
    tineSpacing: "long_tine_dutch",
    bestUse: "long_staple_prep",
  },
  mini_comb_hand: {
    fiberAlign: 7,
    wasteLow: 8,
    speedComb: 9,
    lengthRange: 4,
    cost: 3,
    doubleRow: false,
    forLong: false,
    tineSpacing: "short_hand_grip",
    bestUse: "small_batch_comb",
  },
  viking_comb_wide: {
    fiberAlign: 8,
    wasteLow: 8,
    speedComb: 7,
    lengthRange: 8,
    cost: 6,
    doubleRow: false,
    forLong: true,
    tineSpacing: "wide_viking_spread",
    bestUse: "heritage_wool_prep",
  },
};

export function fiberAlign(type: HackleCombType): number {
  return HACKLE_DATA[type].fiberAlign;
}
export function wasteLow(type: HackleCombType): number {
  return HACKLE_DATA[type].wasteLow;
}
export function speedComb(type: HackleCombType): number {
  return HACKLE_DATA[type].speedComb;
}
export function lengthRange(type: HackleCombType): number {
  return HACKLE_DATA[type].lengthRange;
}
export function hackleCost(type: HackleCombType): number {
  return HACKLE_DATA[type].cost;
}
export function doubleRow(type: HackleCombType): boolean {
  return HACKLE_DATA[type].doubleRow;
}
export function forLong(type: HackleCombType): boolean {
  return HACKLE_DATA[type].forLong;
}
export function tineSpacing(type: HackleCombType): string {
  return HACKLE_DATA[type].tineSpacing;
}
export function bestUse(type: HackleCombType): string {
  return HACKLE_DATA[type].bestUse;
}
export function hackleCombs(): HackleCombType[] {
  return Object.keys(HACKLE_DATA) as HackleCombType[];
}

export type HighChairType = "traditional_wooden" | "convertible_grow" | "clip_on_portable" | "booster_seat" | "space_saver_fold";

export function stabilityScore(t: HighChairType): number {
  const m: Record<HighChairType, number> = {
    traditional_wooden: 10, convertible_grow: 9, clip_on_portable: 5, booster_seat: 6, space_saver_fold: 7,
  };
  return m[t];
}

export function cleanEase(t: HighChairType): number {
  const m: Record<HighChairType, number> = {
    traditional_wooden: 6, convertible_grow: 7, clip_on_portable: 9, booster_seat: 8, space_saver_fold: 8,
  };
  return m[t];
}

export function portability(t: HighChairType): number {
  const m: Record<HighChairType, number> = {
    traditional_wooden: 2, convertible_grow: 3, clip_on_portable: 10, booster_seat: 9, space_saver_fold: 7,
  };
  return m[t];
}

export function longevityYears(t: HighChairType): number {
  const m: Record<HighChairType, number> = {
    traditional_wooden: 8, convertible_grow: 10, clip_on_portable: 3, booster_seat: 4, space_saver_fold: 5,
  };
  return m[t];
}

export function chairCost(t: HighChairType): number {
  const m: Record<HighChairType, number> = {
    traditional_wooden: 7, convertible_grow: 10, clip_on_portable: 3, booster_seat: 2, space_saver_fold: 4,
  };
  return m[t];
}

export function adjustableHeight(t: HighChairType): boolean {
  const m: Record<HighChairType, boolean> = {
    traditional_wooden: false, convertible_grow: true, clip_on_portable: false, booster_seat: false, space_saver_fold: true,
  };
  return m[t];
}

export function foldable(t: HighChairType): boolean {
  const m: Record<HighChairType, boolean> = {
    traditional_wooden: false, convertible_grow: false, clip_on_portable: true, booster_seat: false, space_saver_fold: true,
  };
  return m[t];
}

export function trayStyle(t: HighChairType): string {
  const m: Record<HighChairType, string> = {
    traditional_wooden: "fixed_wooden_rail", convertible_grow: "removable_dishwasher_safe",
    clip_on_portable: "none_uses_table", booster_seat: "snap_on_plastic",
    space_saver_fold: "removable_one_hand",
  };
  return m[t];
}

export function bestAge(t: HighChairType): string {
  const m: Record<HighChairType, string> = {
    traditional_wooden: "six_months_to_three_years", convertible_grow: "six_months_to_adult",
    clip_on_portable: "six_months_to_two_years", booster_seat: "twelve_months_to_four_years",
    space_saver_fold: "six_months_to_three_years",
  };
  return m[t];
}

export function highChairs(): HighChairType[] {
  return ["traditional_wooden", "convertible_grow", "clip_on_portable", "booster_seat", "space_saver_fold"];
}

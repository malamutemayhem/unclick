export type GymBenchType = "flat_utility" | "adjustable_incline" | "folding_compact" | "olympic_wide_pad" | "preacher_curl_pad";

export function versatility(t: GymBenchType): number {
  const m: Record<GymBenchType, number> = {
    flat_utility: 6, adjustable_incline: 10, folding_compact: 5, olympic_wide_pad: 7, preacher_curl_pad: 3,
  };
  return m[t];
}

export function weightCapacity(t: GymBenchType): number {
  const m: Record<GymBenchType, number> = {
    flat_utility: 8, adjustable_incline: 7, folding_compact: 4, olympic_wide_pad: 10, preacher_curl_pad: 6,
  };
  return m[t];
}

export function padComfort(t: GymBenchType): number {
  const m: Record<GymBenchType, number> = {
    flat_utility: 6, adjustable_incline: 8, folding_compact: 5, olympic_wide_pad: 9, preacher_curl_pad: 7,
  };
  return m[t];
}

export function storability(t: GymBenchType): number {
  const m: Record<GymBenchType, number> = {
    flat_utility: 5, adjustable_incline: 4, folding_compact: 10, olympic_wide_pad: 2, preacher_curl_pad: 3,
  };
  return m[t];
}

export function benchCost(t: GymBenchType): number {
  const m: Record<GymBenchType, number> = {
    flat_utility: 3, adjustable_incline: 6, folding_compact: 4, olympic_wide_pad: 8, preacher_curl_pad: 5,
  };
  return m[t];
}

export function foldable(t: GymBenchType): boolean {
  const m: Record<GymBenchType, boolean> = {
    flat_utility: false, adjustable_incline: false, folding_compact: true, olympic_wide_pad: false, preacher_curl_pad: false,
  };
  return m[t];
}

export function hasRack(t: GymBenchType): boolean {
  const m: Record<GymBenchType, boolean> = {
    flat_utility: false, adjustable_incline: false, folding_compact: false, olympic_wide_pad: true, preacher_curl_pad: false,
  };
  return m[t];
}

export function frameType(t: GymBenchType): string {
  const m: Record<GymBenchType, string> = {
    flat_utility: "square_tube_steel_flat",
    adjustable_incline: "ladder_lock_multi_angle",
    folding_compact: "x_frame_fold_flat",
    olympic_wide_pad: "heavy_gauge_wide_base",
    preacher_curl_pad: "angled_arm_pad_support",
  };
  return m[t];
}

export function bestExercise(t: GymBenchType): string {
  const m: Record<GymBenchType, string> = {
    flat_utility: "dumbbell_press_row",
    adjustable_incline: "incline_decline_full_range",
    folding_compact: "apartment_home_gym",
    olympic_wide_pad: "barbell_bench_press",
    preacher_curl_pad: "isolated_bicep_curl",
  };
  return m[t];
}

export function gymBenches(): GymBenchType[] {
  return ["flat_utility", "adjustable_incline", "folding_compact", "olympic_wide_pad", "preacher_curl_pad"];
}

export type SleepingBag = "mummy_down" | "mummy_synthetic" | "rectangular" | "quilt_topless" | "double_wide";

export function warmthRating(s: SleepingBag): number {
  const m: Record<SleepingBag, number> = {
    mummy_down: 10, mummy_synthetic: 8, rectangular: 5, quilt_topless: 7, double_wide: 4,
  };
  return m[s];
}

export function packWeight(s: SleepingBag): number {
  const m: Record<SleepingBag, number> = {
    mummy_down: 9, mummy_synthetic: 6, rectangular: 3, quilt_topless: 10, double_wide: 1,
  };
  return m[s];
}

export function compressibility(s: SleepingBag): number {
  const m: Record<SleepingBag, number> = {
    mummy_down: 10, mummy_synthetic: 6, rectangular: 3, quilt_topless: 9, double_wide: 2,
  };
  return m[s];
}

export function roominess(s: SleepingBag): number {
  const m: Record<SleepingBag, number> = {
    mummy_down: 3, mummy_synthetic: 4, rectangular: 9, quilt_topless: 7, double_wide: 10,
  };
  return m[s];
}

export function bagCost(s: SleepingBag): number {
  const m: Record<SleepingBag, number> = {
    mummy_down: 9, mummy_synthetic: 5, rectangular: 3, quilt_topless: 7, double_wide: 6,
  };
  return m[s];
}

export function waterResistant(s: SleepingBag): boolean {
  const m: Record<SleepingBag, boolean> = {
    mummy_down: false, mummy_synthetic: true, rectangular: false, quilt_topless: false, double_wide: false,
  };
  return m[s];
}

export function hasHoodCinch(s: SleepingBag): boolean {
  const m: Record<SleepingBag, boolean> = {
    mummy_down: true, mummy_synthetic: true, rectangular: false, quilt_topless: false, double_wide: false,
  };
  return m[s];
}

export function insulation(s: SleepingBag): string {
  const m: Record<SleepingBag, string> = {
    mummy_down: "goose_down_800_fill_power", mummy_synthetic: "continuous_filament_polyester",
    rectangular: "hollow_fiber_sheet_layer", quilt_topless: "duck_down_700_fill_sewn",
    double_wide: "synthetic_blend_sheet_fill",
  };
  return m[s];
}

export function bestUse(s: SleepingBag): string {
  const m: Record<SleepingBag, string> = {
    mummy_down: "alpine_winter_backpacking", mummy_synthetic: "wet_climate_three_season",
    rectangular: "car_camping_cabin_comfort", quilt_topless: "ultralight_thru_hiking",
    double_wide: "couples_car_camping",
  };
  return m[s];
}

export function sleepingBags(): SleepingBag[] {
  return ["mummy_down", "mummy_synthetic", "rectangular", "quilt_topless", "double_wide"];
}

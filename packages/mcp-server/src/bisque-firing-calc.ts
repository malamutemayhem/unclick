export type BisqueSchedule = "slow_bisque" | "fast_bisque" | "candling" | "preheat_hold" | "ramp_soak";

export function totalHours(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 14, fast_bisque: 8, candling: 6, preheat_hold: 10, ramp_soak: 12,
  };
  return m[schedule];
}

export function peakTempCelsius(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 1000, fast_bisque: 1000, candling: 200, preheat_hold: 600, ramp_soak: 1000,
  };
  return m[schedule];
}

export function crackRisk(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 2, fast_bisque: 7, candling: 1, preheat_hold: 3, ramp_soak: 3,
  };
  return m[schedule];
}

export function moistureTolerance(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 6, fast_bisque: 2, candling: 9, preheat_hold: 7, ramp_soak: 5,
  };
  return m[schedule];
}

export function energyCost(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 35, fast_bisque: 20, candling: 8, preheat_hold: 25, ramp_soak: 30,
  };
  return m[schedule];
}

export function automated(schedule: BisqueSchedule): boolean {
  const m: Record<BisqueSchedule, boolean> = {
    slow_bisque: true, fast_bisque: true, candling: false, preheat_hold: true, ramp_soak: true,
  };
  return m[schedule];
}

export function thickPieceSafe(schedule: BisqueSchedule): boolean {
  const m: Record<BisqueSchedule, boolean> = {
    slow_bisque: true, fast_bisque: false, candling: true, preheat_hold: true, ramp_soak: true,
  };
  return m[schedule];
}

export function bestClayBody(schedule: BisqueSchedule): string {
  const m: Record<BisqueSchedule, string> = {
    slow_bisque: "porcelain", fast_bisque: "stoneware", candling: "sculpture",
    preheat_hold: "earthenware", ramp_soak: "mixed_load",
  };
  return m[schedule];
}

export function skillLevel(schedule: BisqueSchedule): number {
  const m: Record<BisqueSchedule, number> = {
    slow_bisque: 3, fast_bisque: 5, candling: 2, preheat_hold: 4, ramp_soak: 6,
  };
  return m[schedule];
}

export function bisqueSchedules(): BisqueSchedule[] {
  return ["slow_bisque", "fast_bisque", "candling", "preheat_hold", "ramp_soak"];
}

export type SleepStage = "n1_light" | "n2_intermediate" | "n3_deep" | "rem" | "wake";

export function durationPercent(s: SleepStage): number {
  const m: Record<SleepStage, number> = {
    n1_light: 3, n2_intermediate: 9, n3_deep: 5, rem: 7, wake: 1,
  };
  return m[s];
}

export function restorativeValue(s: SleepStage): number {
  const m: Record<SleepStage, number> = {
    n1_light: 2, n2_intermediate: 5, n3_deep: 10, rem: 8, wake: 0,
  };
  return m[s];
}

export function memoryConsolidation(s: SleepStage): number {
  const m: Record<SleepStage, number> = {
    n1_light: 1, n2_intermediate: 5, n3_deep: 7, rem: 10, wake: 0,
  };
  return m[s];
}

export function arousalThreshold(s: SleepStage): number {
  const m: Record<SleepStage, number> = {
    n1_light: 2, n2_intermediate: 5, n3_deep: 10, rem: 6, wake: 0,
  };
  return m[s];
}

export function muscleRelaxation(s: SleepStage): number {
  const m: Record<SleepStage, number> = {
    n1_light: 4, n2_intermediate: 6, n3_deep: 8, rem: 10, wake: 2,
  };
  return m[s];
}

export function dreamingOccurs(s: SleepStage): boolean {
  const m: Record<SleepStage, boolean> = {
    n1_light: false, n2_intermediate: false, n3_deep: false, rem: true, wake: false,
  };
  return m[s];
}

export function growthHormoneRelease(s: SleepStage): boolean {
  const m: Record<SleepStage, boolean> = {
    n1_light: false, n2_intermediate: false, n3_deep: true, rem: false, wake: false,
  };
  return m[s];
}

export function brainWavePattern(s: SleepStage): string {
  const m: Record<SleepStage, string> = {
    n1_light: "theta_waves", n2_intermediate: "sleep_spindles_k_complexes",
    n3_deep: "delta_waves", rem: "mixed_frequency_low_amplitude",
    wake: "alpha_beta_waves",
  };
  return m[s];
}

export function cyclePosition(s: SleepStage): string {
  const m: Record<SleepStage, string> = {
    n1_light: "transition_entry", n2_intermediate: "early_mid_cycle",
    n3_deep: "first_half_night", rem: "second_half_night",
    wake: "between_cycles",
  };
  return m[s];
}

export function sleepStages(): SleepStage[] {
  return ["n1_light", "n2_intermediate", "n3_deep", "rem", "wake"];
}

export type SleepDisorder = "insomnia" | "apnea" | "narcolepsy" | "restless_legs" | "parasomnia";

export function prevalenceRate(d: SleepDisorder): number {
  const m: Record<SleepDisorder, number> = {
    insomnia: 10, apnea: 7, narcolepsy: 2, restless_legs: 5, parasomnia: 4,
  };
  return m[d];
}

export function severityImpact(d: SleepDisorder): number {
  const m: Record<SleepDisorder, number> = {
    insomnia: 7, apnea: 9, narcolepsy: 10, restless_legs: 5, parasomnia: 6,
  };
  return m[d];
}

export function diagnosisDifficulty(d: SleepDisorder): number {
  const m: Record<SleepDisorder, number> = {
    insomnia: 4, apnea: 6, narcolepsy: 8, restless_legs: 5, parasomnia: 7,
  };
  return m[d];
}

export function treatmentComplexity(d: SleepDisorder): number {
  const m: Record<SleepDisorder, number> = {
    insomnia: 5, apnea: 7, narcolepsy: 9, restless_legs: 6, parasomnia: 6,
  };
  return m[d];
}

export function daytimeImpairment(d: SleepDisorder): number {
  const m: Record<SleepDisorder, number> = {
    insomnia: 8, apnea: 7, narcolepsy: 10, restless_legs: 5, parasomnia: 4,
  };
  return m[d];
}

export function requiresSleepStudy(d: SleepDisorder): boolean {
  const m: Record<SleepDisorder, boolean> = {
    insomnia: false, apnea: true, narcolepsy: true, restless_legs: false, parasomnia: true,
  };
  return m[d];
}

export function geneticComponent(d: SleepDisorder): boolean {
  const m: Record<SleepDisorder, boolean> = {
    insomnia: true, apnea: true, narcolepsy: true, restless_legs: true, parasomnia: true,
  };
  return m[d];
}

export function primaryTreatment(d: SleepDisorder): string {
  const m: Record<SleepDisorder, string> = {
    insomnia: "cbt_i_therapy", apnea: "cpap_device",
    narcolepsy: "stimulant_medication", restless_legs: "dopamine_agonists",
    parasomnia: "safety_measures_medication",
  };
  return m[d];
}

export function affectedSleepPhase(d: SleepDisorder): string {
  const m: Record<SleepDisorder, string> = {
    insomnia: "sleep_onset_maintenance", apnea: "all_stages",
    narcolepsy: "rem_intrusion", restless_legs: "sleep_onset",
    parasomnia: "nrem_or_rem",
  };
  return m[d];
}

export function sleepDisorders(): SleepDisorder[] {
  return ["insomnia", "apnea", "narcolepsy", "restless_legs", "parasomnia"];
}

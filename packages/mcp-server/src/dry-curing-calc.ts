export type DryCuringStage = "salting" | "resting" | "washing" | "drying" | "aging";

export function durationDays(stage: DryCuringStage): number {
  const d: Record<DryCuringStage, number> = {
    salting: 14, resting: 30, washing: 1, drying: 60, aging: 180,
  };
  return d[stage];
}

export function tempCelsius(stage: DryCuringStage): number {
  const t: Record<DryCuringStage, number> = {
    salting: 3, resting: 4, washing: 10, drying: 12, aging: 14,
  };
  return t[stage];
}

export function humidityPercent(stage: DryCuringStage): number {
  const h: Record<DryCuringStage, number> = {
    salting: 85, resting: 80, washing: 70, drying: 70, aging: 75,
  };
  return h[stage];
}

export function weightLossPercent(stage: DryCuringStage): number {
  const w: Record<DryCuringStage, number> = {
    salting: 5, resting: 3, washing: 0, drying: 15, aging: 12,
  };
  return w[stage];
}

export function monitoringFrequencyDays(stage: DryCuringStage): number {
  const m: Record<DryCuringStage, number> = {
    salting: 1, resting: 3, washing: 1, drying: 7, aging: 14,
  };
  return m[stage];
}

export function moldManagement(stage: DryCuringStage): string {
  const m: Record<DryCuringStage, string> = {
    salting: "none", resting: "monitor", washing: "remove",
    drying: "encourage_white", aging: "maintain",
  };
  return m[stage];
}

export function airflowRequired(stage: DryCuringStage): number {
  const a: Record<DryCuringStage, number> = {
    salting: 2, resting: 3, washing: 5, drying: 8, aging: 5,
  };
  return a[stage];
}

export function criticalControl(stage: DryCuringStage): boolean {
  return stage === "salting" || stage === "drying";
}

export function laborIntensity(stage: DryCuringStage): number {
  const l: Record<DryCuringStage, number> = {
    salting: 8, resting: 2, washing: 7, drying: 3, aging: 1,
  };
  return l[stage];
}

export function dryCuringStages(): DryCuringStage[] {
  return ["salting", "resting", "washing", "drying", "aging"];
}

export type FlaxStage = "pulling" | "retting" | "breaking" | "scutching" | "hackling";

export function durationDays(stage: FlaxStage): number {
  const d: Record<FlaxStage, number> = {
    pulling: 1, retting: 14, breaking: 1, scutching: 2, hackling: 1,
  };
  return d[stage];
}

export function fiberLossPercent(stage: FlaxStage): number {
  const l: Record<FlaxStage, number> = {
    pulling: 0, retting: 10, breaking: 15, scutching: 20, hackling: 25,
  };
  return l[stage];
}

export function waterRequired(stage: FlaxStage): boolean {
  return stage === "retting";
}

export function toolsNeeded(stage: FlaxStage): number {
  const t: Record<FlaxStage, number> = {
    pulling: 0, retting: 1, breaking: 2, scutching: 2, hackling: 3,
  };
  return t[stage];
}

export function laborIntensity(stage: FlaxStage): number {
  const l: Record<FlaxStage, number> = {
    pulling: 7, retting: 3, breaking: 8, scutching: 9, hackling: 6,
  };
  return l[stage];
}

export function outputQuality(stage: FlaxStage): number {
  const q: Record<FlaxStage, number> = {
    pulling: 2, retting: 4, breaking: 6, scutching: 8, hackling: 10,
  };
  return q[stage];
}

export function orderInProcess(stage: FlaxStage): number {
  const o: Record<FlaxStage, number> = {
    pulling: 1, retting: 2, breaking: 3, scutching: 4, hackling: 5,
  };
  return o[stage];
}

export function byproductUseful(stage: FlaxStage): boolean {
  return stage === "scutching" || stage === "hackling";
}

export function costPerKgProcessed(stage: FlaxStage): number {
  const c: Record<FlaxStage, number> = {
    pulling: 2, retting: 1, breaking: 3, scutching: 4, hackling: 5,
  };
  return c[stage];
}

export function flaxStages(): FlaxStage[] {
  return ["pulling", "retting", "breaking", "scutching", "hackling"];
}

export type FleeceStep = "skirting" | "washing" | "picking" | "drying" | "storing";

export function timePerKgMinutes(step: FleeceStep): number {
  const t: Record<FleeceStep, number> = {
    skirting: 30, washing: 60, picking: 45, drying: 120, storing: 10,
  };
  return t[step];
}

export function waterTempCelsius(step: FleeceStep): number {
  const w: Record<FleeceStep, number> = {
    skirting: 0, washing: 60, picking: 0, drying: 0, storing: 0,
  };
  return w[step];
}

export function weightLossPercent(step: FleeceStep): number {
  const l: Record<FleeceStep, number> = {
    skirting: 15, washing: 30, picking: 5, drying: 10, storing: 0,
  };
  return l[step];
}

export function greasRemoval(step: FleeceStep): number {
  const g: Record<FleeceStep, number> = {
    skirting: 0, washing: 10, picking: 0, drying: 0, storing: 0,
  };
  return g[step];
}

export function vmRemoval(step: FleeceStep): number {
  const v: Record<FleeceStep, number> = {
    skirting: 8, washing: 3, picking: 7, drying: 1, storing: 0,
  };
  return v[step];
}

export function feltingRisk(step: FleeceStep): number {
  const f: Record<FleeceStep, number> = {
    skirting: 0, washing: 8, picking: 1, drying: 3, storing: 1,
  };
  return f[step];
}

export function spaceRequired(step: FleeceStep): number {
  const s: Record<FleeceStep, number> = {
    skirting: 8, washing: 5, picking: 6, drying: 9, storing: 7,
  };
  return s[step];
}

export function orderInProcess(step: FleeceStep): number {
  const o: Record<FleeceStep, number> = {
    skirting: 1, washing: 2, picking: 3, drying: 4, storing: 5,
  };
  return o[step];
}

export function costPerKg(step: FleeceStep): number {
  const c: Record<FleeceStep, number> = {
    skirting: 1, washing: 3, picking: 2, drying: 1, storing: 1,
  };
  return c[step];
}

export function fleeceSteps(): FleeceStep[] {
  return ["skirting", "washing", "picking", "drying", "storing"];
}

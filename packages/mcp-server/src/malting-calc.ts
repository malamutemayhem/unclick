export type MaltingGrain = "barley" | "wheat" | "rye" | "oat" | "sorghum";

export function steepingHours(grain: MaltingGrain): number {
  const h: Record<MaltingGrain, number> = {
    barley: 48, wheat: 36, rye: 40, oat: 30, sorghum: 24,
  };
  return h[grain];
}

export function germinationDays(grain: MaltingGrain): number {
  const d: Record<MaltingGrain, number> = {
    barley: 5, wheat: 4, rye: 5, oat: 4, sorghum: 3,
  };
  return d[grain];
}

export function kilnTempCelsius(grain: MaltingGrain): number {
  const t: Record<MaltingGrain, number> = {
    barley: 85, wheat: 80, rye: 75, oat: 90, sorghum: 70,
  };
  return t[grain];
}

export function enzymaticPower(grain: MaltingGrain): number {
  const e: Record<MaltingGrain, number> = {
    barley: 9, wheat: 7, rye: 6, oat: 4, sorghum: 5,
  };
  return e[grain];
}

export function colorContribution(grain: MaltingGrain): number {
  const c: Record<MaltingGrain, number> = {
    barley: 5, wheat: 3, rye: 6, oat: 4, sorghum: 7,
  };
  return c[grain];
}

export function glutenFree(grain: MaltingGrain): boolean {
  return grain === "sorghum";
}

export function moistureTargetPercent(grain: MaltingGrain): number {
  const m: Record<MaltingGrain, number> = {
    barley: 45, wheat: 42, rye: 44, oat: 40, sorghum: 38,
  };
  return m[grain];
}

export function yieldPercent(grain: MaltingGrain): number {
  const y: Record<MaltingGrain, number> = {
    barley: 80, wheat: 78, rye: 72, oat: 70, sorghum: 68,
  };
  return y[grain];
}

export function costPerKg(grain: MaltingGrain): number {
  const c: Record<MaltingGrain, number> = {
    barley: 1.2, wheat: 1.0, rye: 1.5, oat: 1.1, sorghum: 0.8,
  };
  return c[grain];
}

export function maltingGrains(): MaltingGrain[] {
  return ["barley", "wheat", "rye", "oat", "sorghum"];
}

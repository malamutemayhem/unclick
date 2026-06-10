export type WoodType = "oak" | "pine" | "cherry" | "walnut" | "maple";

export function targetMoisturePercent(wood: WoodType): number {
  const m: Record<WoodType, number> = {
    oak: 7, pine: 8, cherry: 7, walnut: 6, maple: 7,
  };
  return m[wood];
}

export function dryingDays(wood: WoodType): number {
  const d: Record<WoodType, number> = {
    oak: 45, pine: 14, cherry: 28, walnut: 35, maple: 30,
  };
  return d[wood];
}

export function tempCelsius(wood: WoodType): number {
  const t: Record<WoodType, number> = {
    oak: 60, pine: 70, cherry: 55, walnut: 55, maple: 60,
  };
  return t[wood];
}

export function humidityPercent(wood: WoodType): number {
  const h: Record<WoodType, number> = {
    oak: 40, pine: 50, cherry: 45, walnut: 40, maple: 42,
  };
  return h[wood];
}

export function shrinkagePercent(wood: WoodType): number {
  const s: Record<WoodType, number> = {
    oak: 4.2, pine: 3.5, cherry: 3.7, walnut: 3.8, maple: 4.8,
  };
  return s[wood];
}

export function defectRisk(wood: WoodType): number {
  const d: Record<WoodType, number> = {
    oak: 6, pine: 3, cherry: 5, walnut: 4, maple: 7,
  };
  return d[wood];
}

export function energyCostRating(wood: WoodType): number {
  const e: Record<WoodType, number> = {
    oak: 8, pine: 4, cherry: 6, walnut: 7, maple: 6,
  };
  return e[wood];
}

export function colorChangeRisk(wood: WoodType): boolean {
  const c: Record<WoodType, boolean> = {
    oak: true, pine: true, cherry: true, walnut: false, maple: false,
  };
  return c[wood];
}

export function costPerBoardFoot(wood: WoodType): number {
  const c: Record<WoodType, number> = {
    oak: 1.5, pine: 0.6, cherry: 1.8, walnut: 2.2, maple: 1.3,
  };
  return c[wood];
}

export function kilnDryingWoods(): WoodType[] {
  return ["oak", "pine", "cherry", "walnut", "maple"];
}

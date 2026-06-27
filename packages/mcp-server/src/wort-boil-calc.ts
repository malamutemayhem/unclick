export type BoilMethod = "full_volume" | "partial_boil" | "no_boil" | "extended_boil" | "pressure_boil";

export function durationMinutes(method: BoilMethod): number {
  const d: Record<BoilMethod, number> = {
    full_volume: 60, partial_boil: 60, no_boil: 0,
    extended_boil: 120, pressure_boil: 30,
  };
  return d[method];
}

export function evaporationRatePercentPerHour(method: BoilMethod): number {
  const e: Record<BoilMethod, number> = {
    full_volume: 10, partial_boil: 15, no_boil: 0,
    extended_boil: 10, pressure_boil: 3,
  };
  return e[method];
}

export function dmsReduction(method: BoilMethod): number {
  const d: Record<BoilMethod, number> = {
    full_volume: 8, partial_boil: 7, no_boil: 1,
    extended_boil: 10, pressure_boil: 6,
  };
  return d[method];
}

export function hopUtilizationPercent(method: BoilMethod): number {
  const h: Record<BoilMethod, number> = {
    full_volume: 30, partial_boil: 20, no_boil: 5,
    extended_boil: 35, pressure_boil: 40,
  };
  return h[method];
}

export function colorDarkening(method: BoilMethod): number {
  const c: Record<BoilMethod, number> = {
    full_volume: 5, partial_boil: 7, no_boil: 0,
    extended_boil: 9, pressure_boil: 3,
  };
  return c[method];
}

export function proteinCoagulation(method: BoilMethod): number {
  const p: Record<BoilMethod, number> = {
    full_volume: 8, partial_boil: 6, no_boil: 1,
    extended_boil: 9, pressure_boil: 7,
  };
  return p[method];
}

export function energyCost(method: BoilMethod): number {
  const e: Record<BoilMethod, number> = {
    full_volume: 5, partial_boil: 3, no_boil: 0,
    extended_boil: 9, pressure_boil: 4,
  };
  return e[method];
}

export function ketleSizeRequired(method: BoilMethod): string {
  const k: Record<BoilMethod, string> = {
    full_volume: "full_batch", partial_boil: "half_batch",
    no_boil: "any", extended_boil: "full_batch",
    pressure_boil: "pressure_rated",
  };
  return k[method];
}

export function skillLevel(method: BoilMethod): number {
  const s: Record<BoilMethod, number> = {
    full_volume: 3, partial_boil: 2, no_boil: 1,
    extended_boil: 5, pressure_boil: 7,
  };
  return s[method];
}

export function boilMethods(): BoilMethod[] {
  return ["full_volume", "partial_boil", "no_boil", "extended_boil", "pressure_boil"];
}

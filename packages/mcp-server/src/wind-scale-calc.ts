export type WindScale = "calm" | "breeze" | "gale" | "storm" | "hurricane";

export function speedKmh(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 2, breeze: 25, gale: 70, storm: 100, hurricane: 180,
  };
  return m[wind];
}

export function beaufortNumber(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 0, breeze: 4, gale: 8, storm: 10, hurricane: 12,
  };
  return m[wind];
}

export function seaStateHeight(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 0, breeze: 1, gale: 6, storm: 10, hurricane: 14,
  };
  return m[wind];
}

export function structuralDamage(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 0, breeze: 0, gale: 3, storm: 7, hurricane: 10,
  };
  return m[wind];
}

export function visibilityImpact(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 0, breeze: 1, gale: 4, storm: 6, hurricane: 8,
  };
  return m[wind];
}

export function sailingFavorable(wind: WindScale): boolean {
  const m: Record<WindScale, boolean> = {
    calm: false, breeze: true, gale: false, storm: false, hurricane: false,
  };
  return m[wind];
}

export function evacuationRequired(wind: WindScale): boolean {
  const m: Record<WindScale, boolean> = {
    calm: false, breeze: false, gale: false, storm: true, hurricane: true,
  };
  return m[wind];
}

export function typicalWeather(wind: WindScale): string {
  const m: Record<WindScale, string> = {
    calm: "clear_sky", breeze: "fair", gale: "rain_likely",
    storm: "severe_weather", hurricane: "extreme_danger",
  };
  return m[wind];
}

export function powerGenerationKw(wind: WindScale): number {
  const m: Record<WindScale, number> = {
    calm: 0, breeze: 50, gale: 500, storm: 0, hurricane: 0,
  };
  return m[wind];
}

export function windScales(): WindScale[] {
  return ["calm", "breeze", "gale", "storm", "hurricane"];
}

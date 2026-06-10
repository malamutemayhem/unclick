export type FiringType = "bisque" | "glaze_low" | "glaze_mid" | "glaze_high" | "raku";

export function peakTempCelsius(type: FiringType): number {
  const temps: Record<FiringType, number> = {
    bisque: 900, glaze_low: 1060, glaze_mid: 1220, glaze_high: 1300, raku: 1000,
  };
  return temps[type];
}

export function rampRateCelsiusPerHour(type: FiringType): number {
  const rates: Record<FiringType, number> = {
    bisque: 60, glaze_low: 100, glaze_mid: 80, glaze_high: 70, raku: 200,
  };
  return rates[type];
}

export function soakMinutes(type: FiringType): number {
  const mins: Record<FiringType, number> = {
    bisque: 15, glaze_low: 20, glaze_mid: 30, glaze_high: 30, raku: 5,
  };
  return mins[type];
}

export function totalFiringHours(type: FiringType): number {
  const hours: Record<FiringType, number> = {
    bisque: 12, glaze_low: 8, glaze_mid: 10, glaze_high: 14, raku: 3,
  };
  return hours[type];
}

export function coolingHours(type: FiringType): number {
  const hours: Record<FiringType, number> = {
    bisque: 24, glaze_low: 18, glaze_mid: 24, glaze_high: 30, raku: 0,
  };
  return hours[type];
}

export function candlingRequired(type: FiringType): boolean {
  return type === "bisque";
}

export function reductionAtmosphere(type: FiringType): boolean {
  return type === "raku" || type === "glaze_high";
}

export function energyCostRating(type: FiringType): number {
  const cost: Record<FiringType, number> = {
    bisque: 2, glaze_low: 3, glaze_mid: 4, glaze_high: 5, raku: 2,
  };
  return cost[type];
}

export function costPerFiring(type: FiringType): number {
  const costs: Record<FiringType, number> = {
    bisque: 15, glaze_low: 20, glaze_mid: 30, glaze_high: 45, raku: 10,
  };
  return costs[type];
}

export function firingTypes(): FiringType[] {
  return ["bisque", "glaze_low", "glaze_mid", "glaze_high", "raku"];
}

export type ScytheStyle = "austrian" | "american" | "turkish" | "flemish" | "ditch";

export function bladeLengthCm(style: ScytheStyle): number {
  const lengths: Record<ScytheStyle, number> = {
    austrian: 70, american: 80, turkish: 60, flemish: 65, ditch: 50,
  };
  return lengths[style];
}

export function snathLengthCm(userHeightCm: number): number {
  return Math.round(userHeightCm * 0.9);
}

export function mowingRateM2PerHour(style: ScytheStyle): number {
  const rates: Record<ScytheStyle, number> = {
    austrian: 400, american: 350, turkish: 300, flemish: 380, ditch: 200,
  };
  return rates[style];
}

export function honingIntervalMinutes(grassType: "soft" | "tough"): number {
  return grassType === "soft" ? 15 : 8;
}

export function peeningIntervalHours(style: ScytheStyle): number {
  const hours: Record<ScytheStyle, number> = {
    austrian: 8, american: 10, turkish: 6, flemish: 8, ditch: 12,
  };
  return hours[style];
}

export function bladeWeightG(style: ScytheStyle): number {
  const weights: Record<ScytheStyle, number> = {
    austrian: 350, american: 550, turkish: 280, flemish: 320, ditch: 400,
  };
  return weights[style];
}

export function handleGripCount(style: ScytheStyle): number {
  const grips: Record<ScytheStyle, number> = {
    austrian: 2, american: 2, turkish: 1, flemish: 2, ditch: 1,
  };
  return grips[style];
}

export function optimalMowingAngleDeg(): number {
  return 30;
}

export function costEstimate(style: ScytheStyle): number {
  const costs: Record<ScytheStyle, number> = {
    austrian: 150, american: 100, turkish: 80, flemish: 130, ditch: 90,
  };
  return costs[style];
}

export function scytheStyles(): ScytheStyle[] {
  return ["austrian", "american", "turkish", "flemish", "ditch"];
}

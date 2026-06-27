export type HempBinder = "lime_putty" | "hydraulic_lime" | "magnesium_oxide" | "clay" | "cement_blend";

export function hempShivRatio(binder: HempBinder): number {
  const ratios: Record<HempBinder, number> = {
    lime_putty: 2.5, hydraulic_lime: 2.0, magnesium_oxide: 2.2, clay: 3.0, cement_blend: 1.8,
  };
  return ratios[binder];
}

export function wallThicknessCm(rValue: number): number {
  return Math.round(rValue * 3.5);
}

export function settingTimeDays(binder: HempBinder): number {
  const days: Record<HempBinder, number> = {
    lime_putty: 90, hydraulic_lime: 28, magnesium_oxide: 14, clay: 60, cement_blend: 7,
  };
  return days[binder];
}

export function densityKgPerM3(binder: HempBinder): number {
  const d: Record<HempBinder, number> = {
    lime_putty: 350, hydraulic_lime: 400, magnesium_oxide: 380, clay: 300, cement_blend: 500,
  };
  return d[binder];
}

export function compressiveStrengthMpa(binder: HempBinder): number {
  const strengths: Record<HempBinder, number> = {
    lime_putty: 0.5, hydraulic_lime: 1.0, magnesium_oxide: 0.8, clay: 0.3, cement_blend: 2.0,
  };
  return strengths[binder];
}

export function thermalRValuePerCm(): number {
  return 0.28;
}

export function moistureBufferRating(binder: HempBinder): number {
  const ratings: Record<HempBinder, number> = {
    lime_putty: 5, hydraulic_lime: 4, magnesium_oxide: 4, clay: 5, cement_blend: 2,
  };
  return ratings[binder];
}

export function carbonSequestrationKgPerM3(binder: HempBinder): number {
  const seq: Record<HempBinder, number> = {
    lime_putty: 110, hydraulic_lime: 80, magnesium_oxide: 90, clay: 60, cement_blend: 20,
  };
  return seq[binder];
}

export function costPerM3(binder: HempBinder): number {
  const costs: Record<HempBinder, number> = {
    lime_putty: 180, hydraulic_lime: 200, magnesium_oxide: 250, clay: 120, cement_blend: 160,
  };
  return costs[binder];
}

export function hempBinders(): HempBinder[] {
  return ["lime_putty", "hydraulic_lime", "magnesium_oxide", "clay", "cement_blend"];
}

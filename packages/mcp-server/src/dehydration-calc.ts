export type DehydrationMethod = "sun_drying" | "oven" | "electric_dehydrator" | "freeze_drying" | "air_drying";

export function tempCelsius(method: DehydrationMethod): number {
  const temps: Record<DehydrationMethod, number> = {
    sun_drying: 35, oven: 70, electric_dehydrator: 57, freeze_drying: -40, air_drying: 20,
  };
  return temps[method];
}

export function timeHoursPerKg(method: DehydrationMethod): number {
  const hours: Record<DehydrationMethod, number> = {
    sun_drying: 48, oven: 8, electric_dehydrator: 12, freeze_drying: 24, air_drying: 72,
  };
  return hours[method];
}

export function moistureTargetPercent(method: DehydrationMethod): number {
  const targets: Record<DehydrationMethod, number> = {
    sun_drying: 12, oven: 8, electric_dehydrator: 10, freeze_drying: 2, air_drying: 15,
  };
  return targets[method];
}

export function nutrientRetentionPercent(method: DehydrationMethod): number {
  const retention: Record<DehydrationMethod, number> = {
    sun_drying: 50, oven: 40, electric_dehydrator: 60, freeze_drying: 95, air_drying: 55,
  };
  return retention[method];
}

export function weightReductionPercent(method: DehydrationMethod): number {
  const reduction: Record<DehydrationMethod, number> = {
    sun_drying: 80, oven: 85, electric_dehydrator: 82, freeze_drying: 90, air_drying: 75,
  };
  return reduction[method];
}

export function shelfLifeMonths(method: DehydrationMethod): number {
  const months: Record<DehydrationMethod, number> = {
    sun_drying: 6, oven: 8, electric_dehydrator: 12, freeze_drying: 25, air_drying: 4,
  };
  return months[method];
}

export function energyCost(method: DehydrationMethod): number {
  const costs: Record<DehydrationMethod, number> = {
    sun_drying: 0, oven: 3, electric_dehydrator: 2, freeze_drying: 5, air_drying: 0,
  };
  return costs[method];
}

export function textureQuality(method: DehydrationMethod): number {
  const quality: Record<DehydrationMethod, number> = {
    sun_drying: 3, oven: 2, electric_dehydrator: 4, freeze_drying: 5, air_drying: 3,
  };
  return quality[method];
}

export function costPerKg(method: DehydrationMethod): number {
  const costs: Record<DehydrationMethod, number> = {
    sun_drying: 1, oven: 3, electric_dehydrator: 4, freeze_drying: 15, air_drying: 0.5,
  };
  return costs[method];
}

export function dehydrationMethods(): DehydrationMethod[] {
  return ["sun_drying", "oven", "electric_dehydrator", "freeze_drying", "air_drying"];
}

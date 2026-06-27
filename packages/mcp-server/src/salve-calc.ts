export type BaseOil = "olive" | "coconut" | "jojoba" | "almond" | "sunflower";

export function oilVolumeMl(batchWeightG: number): number {
  return Math.round(batchWeightG * 0.75);
}

export function beeswaxWeightG(oilMl: number): number {
  return Math.round(oilMl * 0.15);
}

export function infusionTimeHours(method: "solar" | "stovetop" | "crockpot"): number {
  const hours: Record<string, number> = { solar: 336, stovetop: 4, crockpot: 8 };
  return hours[method];
}

export function infusionTempCelsius(method: "solar" | "stovetop" | "crockpot"): number {
  const temps: Record<string, number> = { solar: 35, stovetop: 65, crockpot: 50 };
  return temps[method];
}

export function essentialOilDrops(batchMl: number, dilutionPercent: number): number {
  return Math.round(batchMl * dilutionPercent / 100 * 20);
}

export function shelfLifeMonths(baseOil: BaseOil): number {
  const months: Record<BaseOil, number> = {
    olive: 12, coconut: 24, jojoba: 36, almond: 6, sunflower: 8,
  };
  return months[baseOil];
}

export function absorptionRate(baseOil: BaseOil): number {
  const rates: Record<BaseOil, number> = {
    olive: 3, coconut: 4, jojoba: 5, almond: 4, sunflower: 3,
  };
  return rates[baseOil];
}

export function containerSizeMl(batchMl: number): number {
  const sizes = [15, 30, 60, 120, 240];
  for (const s of sizes) if (s >= batchMl) return s;
  return 240;
}

export function costPerBatch(oilCostPerLiter: number, batchMl: number): number {
  return parseFloat((oilCostPerLiter * batchMl / 1000 * 1.3).toFixed(2));
}

export function baseOils(): BaseOil[] {
  return ["olive", "coconut", "jojoba", "almond", "sunflower"];
}

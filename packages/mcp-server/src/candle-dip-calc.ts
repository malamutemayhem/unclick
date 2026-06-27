export type WaxType = "beeswax" | "tallow" | "soy" | "paraffin" | "bayberry";

export function meltingPointCelsius(wax: WaxType): number {
  const temps: Record<WaxType, number> = {
    beeswax: 63, tallow: 45, soy: 50, paraffin: 55, bayberry: 48,
  };
  return temps[wax];
}

export function dippingTempCelsius(wax: WaxType): number {
  const temps: Record<WaxType, number> = {
    beeswax: 71, tallow: 55, soy: 60, paraffin: 65, bayberry: 58,
  };
  return temps[wax];
}

export function dipsPerCandle(diameterMm: number): number {
  return Math.ceil(diameterMm / 1.5);
}

export function coolingSecondsPerDip(wax: WaxType): number {
  const secs: Record<WaxType, number> = {
    beeswax: 30, tallow: 20, soy: 25, paraffin: 15, bayberry: 25,
  };
  return secs[wax];
}

export function wickDiameterMm(candleDiameterMm: number): number {
  return parseFloat((candleDiameterMm / 10).toFixed(1));
}

export function burnRateGPerHour(wax: WaxType): number {
  const rates: Record<WaxType, number> = {
    beeswax: 7, tallow: 10, soy: 8, paraffin: 9, bayberry: 6,
  };
  return rates[wax];
}

export function burnTimeHours(weightG: number, burnRateGPerHour: number): number {
  if (burnRateGPerHour <= 0) return 0;
  return parseFloat((weightG / burnRateGPerHour).toFixed(1));
}

export function sootRating(wax: WaxType): number {
  const ratings: Record<WaxType, number> = {
    beeswax: 1, tallow: 4, soy: 2, paraffin: 3, bayberry: 1,
  };
  return ratings[wax];
}

export function costPerKg(wax: WaxType): number {
  const costs: Record<WaxType, number> = {
    beeswax: 35, tallow: 5, soy: 12, paraffin: 8, bayberry: 60,
  };
  return costs[wax];
}

export function waxTypes(): WaxType[] {
  return ["beeswax", "tallow", "soy", "paraffin", "bayberry"];
}

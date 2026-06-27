export type CandleWax = "beeswax" | "tallow" | "paraffin" | "soy" | "bayberry";

export function burnRateCmPerHour(wax: CandleWax): number {
  const rates: Record<CandleWax, number> = {
    beeswax: 1.5, tallow: 2.0, paraffin: 2.5, soy: 1.8, bayberry: 1.2,
  };
  return rates[wax];
}

export function totalBurnHours(heightCm: number, wax: CandleWax): number {
  return Math.round(heightCm / burnRateCmPerHour(wax) * 10) / 10;
}

export function markingsPerHour(wax: CandleWax): number {
  const marks: Record<CandleWax, number> = {
    beeswax: 4, tallow: 3, paraffin: 2, soy: 3, bayberry: 5,
  };
  return marks[wax];
}

export function accuracyMinutes(wax: CandleWax): number {
  const acc: Record<CandleWax, number> = {
    beeswax: 5, tallow: 10, paraffin: 8, soy: 7, bayberry: 4,
  };
  return acc[wax];
}

export function draftSensitivity(wax: CandleWax): number {
  const sensitivity: Record<CandleWax, number> = {
    beeswax: 2, tallow: 4, paraffin: 3, soy: 3, bayberry: 2,
  };
  return sensitivity[wax];
}

export function scentLevel(wax: CandleWax): number {
  const scent: Record<CandleWax, number> = {
    beeswax: 3, tallow: 4, paraffin: 1, soy: 2, bayberry: 5,
  };
  return scent[wax];
}

export function smokeLevel(wax: CandleWax): number {
  const smoke: Record<CandleWax, number> = {
    beeswax: 1, tallow: 4, paraffin: 3, soy: 1, bayberry: 1,
  };
  return smoke[wax];
}

export function wickType(wax: CandleWax): string {
  const wicks: Record<CandleWax, string> = {
    beeswax: "braided_cotton", tallow: "rush_pith", paraffin: "zinc_core",
    soy: "cotton", bayberry: "braided_cotton",
  };
  return wicks[wax];
}

export function costPerHour(wax: CandleWax): number {
  const costs: Record<CandleWax, number> = {
    beeswax: 2.5, tallow: 0.5, paraffin: 0.8, soy: 1.2, bayberry: 4.0,
  };
  return costs[wax];
}

export function candleWaxTypes(): CandleWax[] {
  return ["beeswax", "tallow", "paraffin", "soy", "bayberry"];
}

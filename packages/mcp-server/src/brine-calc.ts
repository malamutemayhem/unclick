export type BrineUse = "fermentation" | "curing" | "pickling" | "cheese" | "olive";

export function saltPercentByWeight(use: BrineUse): number {
  const pct: Record<BrineUse, number> = {
    fermentation: 3.5, curing: 20, pickling: 5, cheese: 18, olive: 10,
  };
  return pct[use];
}

export function saltGrams(waterMl: number, saltPercent: number): number {
  return Math.round(waterMl * saltPercent / 100);
}

export function specificGravity(saltPercent: number): number {
  return parseFloat((1 + saltPercent * 0.007).toFixed(3));
}

export function temperatureCelsius(use: BrineUse): number {
  const temps: Record<BrineUse, number> = {
    fermentation: 20, curing: 4, pickling: 22, cheese: 12, olive: 18,
  };
  return temps[use];
}

export function soakTimeHours(use: BrineUse): number {
  const hours: Record<BrineUse, number> = {
    fermentation: 168, curing: 48, pickling: 72, cheese: 720, olive: 2160,
  };
  return hours[use];
}

export function phTarget(use: BrineUse): number {
  const ph: Record<BrineUse, number> = {
    fermentation: 3.5, curing: 5.0, pickling: 3.2, cheese: 5.2, olive: 4.0,
  };
  return ph[use];
}

export function shelfLifeWeeks(use: BrineUse): number {
  const weeks: Record<BrineUse, number> = {
    fermentation: 26, curing: 12, pickling: 52, cheese: 16, olive: 104,
  };
  return weeks[use];
}

export function vesselVolumeLiters(productKg: number, liquidRatio: number): number {
  return parseFloat((productKg * liquidRatio).toFixed(1));
}

export function costPerLiter(use: BrineUse): number {
  const costs: Record<BrineUse, number> = {
    fermentation: 0.50, curing: 1.20, pickling: 0.80, cheese: 1.50, olive: 0.60,
  };
  return costs[use];
}

export function brineUses(): BrineUse[] {
  return ["fermentation", "curing", "pickling", "cheese", "olive"];
}

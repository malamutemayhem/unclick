export type Menstruum = "ethanol" | "glycerin" | "vinegar" | "honey" | "oil";

export function herbWeightG(menstruumMl: number, ratio: number): number {
  return Math.round(menstruumMl / ratio);
}

export function alcoholPercent(menstruum: Menstruum): number {
  const pct: Record<Menstruum, number> = {
    ethanol: 40, glycerin: 0, vinegar: 0, honey: 0, oil: 0,
  };
  return pct[menstruum];
}

export function macerationDays(menstruum: Menstruum): number {
  const days: Record<Menstruum, number> = {
    ethanol: 28, glycerin: 42, vinegar: 21, honey: 30, oil: 35,
  };
  return days[menstruum];
}

export function shakeFrequencyPerDay(): number {
  return 2;
}

export function shelfLifeMonths(menstruum: Menstruum): number {
  const months: Record<Menstruum, number> = {
    ethanol: 60, glycerin: 24, vinegar: 12, honey: 36, oil: 6,
  };
  return months[menstruum];
}

export function dosageMl(strengthRatio: number): number {
  return parseFloat((5 / strengthRatio).toFixed(1));
}

export function strainLossPercent(menstruum: Menstruum): number {
  const loss: Record<Menstruum, number> = {
    ethanol: 15, glycerin: 20, vinegar: 18, honey: 10, oil: 25,
  };
  return loss[menstruum];
}

export function storageTemp(): string {
  return "cool_dark";
}

export function costPerLiter(menstruum: Menstruum): number {
  const costs: Record<Menstruum, number> = {
    ethanol: 25, glycerin: 15, vinegar: 5, honey: 30, oil: 20,
  };
  return costs[menstruum];
}

export function menstruumTypes(): Menstruum[] {
  return ["ethanol", "glycerin", "vinegar", "honey", "oil"];
}

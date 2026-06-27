export type VatMethod = "fermentation" | "zinc_lime" | "fructose" | "sodium_hydrosulfite" | "iron";

export function vatTempCelsius(method: VatMethod): number {
  const temps: Record<VatMethod, number> = {
    fermentation: 35, zinc_lime: 50, fructose: 50, sodium_hydrosulfite: 25, iron: 40,
  };
  return temps[method];
}

export function reductionTimeHours(method: VatMethod): number {
  const hours: Record<VatMethod, number> = {
    fermentation: 72, zinc_lime: 1, fructose: 4, sodium_hydrosulfite: 0.5, iron: 24,
  };
  return hours[method];
}

export function phTarget(method: VatMethod): number {
  const ph: Record<VatMethod, number> = {
    fermentation: 10, zinc_lime: 12, fructose: 11, sodium_hydrosulfite: 11, iron: 10,
  };
  return ph[method];
}

export function dipsForMediumBlue(): number {
  return 6;
}

export function oxidationTimeMinutes(): number {
  return 20;
}

export function indigoGPerLiter(method: VatMethod): number {
  const grams: Record<VatMethod, number> = {
    fermentation: 5, zinc_lime: 10, fructose: 8, sodium_hydrosulfite: 10, iron: 6,
  };
  return grams[method];
}

export function vatLifeDays(method: VatMethod): number {
  const days: Record<VatMethod, number> = {
    fermentation: 365, zinc_lime: 7, fructose: 30, sodium_hydrosulfite: 3, iron: 60,
  };
  return days[method];
}

export function ecoRating(method: VatMethod): number {
  const ratings: Record<VatMethod, number> = {
    fermentation: 5, zinc_lime: 1, fructose: 4, sodium_hydrosulfite: 1, iron: 3,
  };
  return ratings[method];
}

export function costPerLiter(method: VatMethod): number {
  const costs: Record<VatMethod, number> = {
    fermentation: 2, zinc_lime: 5, fructose: 8, sodium_hydrosulfite: 3, iron: 4,
  };
  return costs[method];
}

export function vatMethods(): VatMethod[] {
  return ["fermentation", "zinc_lime", "fructose", "sodium_hydrosulfite", "iron"];
}

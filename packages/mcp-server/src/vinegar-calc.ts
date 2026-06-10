export type VinegarBase = "wine" | "cider" | "malt" | "rice" | "coconut";

export function startingAbv(base: VinegarBase): number {
  const abv: Record<VinegarBase, number> = {
    wine: 12, cider: 6, malt: 5, rice: 8, coconut: 4,
  };
  return abv[base];
}

export function aceticAcidPercent(base: VinegarBase): number {
  const acid: Record<VinegarBase, number> = {
    wine: 7, cider: 5, malt: 5, rice: 4, coconut: 4,
  };
  return acid[base];
}

export function motherFormationDays(base: VinegarBase): number {
  const days: Record<VinegarBase, number> = {
    wine: 14, cider: 21, malt: 28, rice: 21, coconut: 30,
  };
  return days[base];
}

export function conversionWeeks(base: VinegarBase): number {
  const weeks: Record<VinegarBase, number> = {
    wine: 8, cider: 10, malt: 12, rice: 10, coconut: 14,
  };
  return weeks[base];
}

export function idealTempCelsius(): number {
  return 27;
}

export function oxygenRequired(): boolean {
  return true;
}

export function agingMonths(base: VinegarBase): number {
  const months: Record<VinegarBase, number> = {
    wine: 6, cider: 3, malt: 2, rice: 4, coconut: 2,
  };
  return months[base];
}

export function flavorComplexity(base: VinegarBase): number {
  const ratings: Record<VinegarBase, number> = {
    wine: 5, cider: 4, malt: 3, rice: 3, coconut: 4,
  };
  return ratings[base];
}

export function costPerLiter(base: VinegarBase): number {
  const costs: Record<VinegarBase, number> = {
    wine: 8, cider: 4, malt: 3, rice: 5, coconut: 6,
  };
  return costs[base];
}

export function vinegarBases(): VinegarBase[] {
  return ["wine", "cider", "malt", "rice", "coconut"];
}

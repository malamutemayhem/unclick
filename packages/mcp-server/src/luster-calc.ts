export type LusterType = "gold" | "silver" | "copper" | "bismuth" | "mother_of_pearl";

export function firingTempCelsius(luster: LusterType): number {
  const temps: Record<LusterType, number> = {
    gold: 750, silver: 720, copper: 730, bismuth: 680, mother_of_pearl: 700,
  };
  return temps[luster];
}

export function applicationCoats(luster: LusterType): number {
  const coats: Record<LusterType, number> = {
    gold: 1, silver: 1, copper: 2, bismuth: 2, mother_of_pearl: 3,
  };
  return coats[luster];
}

export function dryingTimeMinutes(luster: LusterType): number {
  const times: Record<LusterType, number> = {
    gold: 15, silver: 15, copper: 20, bismuth: 25, mother_of_pearl: 30,
  };
  return times[luster];
}

export function coverageMlPerM2(luster: LusterType): number {
  const rates: Record<LusterType, number> = {
    gold: 10, silver: 12, copper: 15, bismuth: 18, mother_of_pearl: 20,
  };
  return rates[luster];
}

export function reflectivityPercent(luster: LusterType): number {
  const values: Record<LusterType, number> = {
    gold: 90, silver: 95, copper: 80, bismuth: 60, mother_of_pearl: 70,
  };
  return values[luster];
}

export function durabilityRating(luster: LusterType): number {
  const ratings: Record<LusterType, number> = {
    gold: 5, silver: 3, copper: 4, bismuth: 2, mother_of_pearl: 3,
  };
  return ratings[luster];
}

export function foodSafe(luster: LusterType): boolean {
  return luster === "gold" || luster === "mother_of_pearl";
}

export function ventilationRequired(): boolean {
  return true;
}

export function costPerMl(luster: LusterType): number {
  const costs: Record<LusterType, number> = {
    gold: 8, silver: 5, copper: 3, bismuth: 2, mother_of_pearl: 4,
  };
  return costs[luster];
}

export function lusterTypes(): LusterType[] {
  return ["gold", "silver", "copper", "bismuth", "mother_of_pearl"];
}

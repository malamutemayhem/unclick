export type HeatingSource = "fireplace" | "hypocaust" | "brazier" | "stove" | "underfloor";

export function floorAreaM2(monkCount: number): number {
  return parseFloat((monkCount * 1.8 + 10).toFixed(1));
}

export function hearthSizeCm(floorAreaM2: number): number {
  return parseFloat((Math.sqrt(floorAreaM2) * 15).toFixed(1));
}

export function chimneySizeCm(hearthSizeCm: number): number {
  return parseFloat((hearthSizeCm * 0.4).toFixed(1));
}

export function fuelConsumptionKgPerDay(floorAreaM2: number, source: HeatingSource): number {
  const rates: Record<HeatingSource, number> = {
    fireplace: 2.0, hypocaust: 3.5, brazier: 1.5, stove: 1.2, underfloor: 2.8,
  };
  return parseFloat((floorAreaM2 * rates[source] / 10).toFixed(1));
}

export function heatOutputBtu(floorAreaM2: number, source: HeatingSource): number {
  const btuPerM2: Record<HeatingSource, number> = {
    fireplace: 400, hypocaust: 600, brazier: 250, stove: 500, underfloor: 550,
  };
  return parseFloat((floorAreaM2 * btuPerM2[source]).toFixed(1));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 15));
}

export function seatingCapacity(floorAreaM2: number): number {
  return Math.floor(floorAreaM2 / 2);
}

export function operatingHoursPerDay(season: "winter" | "summer"): number {
  return season === "winter" ? 14 : 4;
}

export function maintenanceFrequencyDays(source: HeatingSource): number {
  const days: Record<HeatingSource, number> = {
    fireplace: 1, hypocaust: 3, brazier: 1, stove: 7, underfloor: 14,
  };
  return days[source];
}

export function constructionCost(floorAreaM2: number, source: HeatingSource, costPerM2: number): number {
  const multipliers: Record<HeatingSource, number> = {
    fireplace: 1.0, hypocaust: 2.5, brazier: 0.5, stove: 1.2, underfloor: 3.0,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[source]).toFixed(2));
}

export function heatingSources(): HeatingSource[] {
  return ["fireplace", "hypocaust", "brazier", "stove", "underfloor"];
}

export type YeastType = "ale" | "lager" | "wheat" | "belgian" | "wild";

export function pitchRateCellsPerMlPerPlato(type: YeastType): number {
  const rates: Record<YeastType, number> = {
    ale: 0.75, lager: 1.5, wheat: 0.75, belgian: 0.5, wild: 0.25,
  };
  return rates[type];
}

export function cellsNeeded(volumeL: number, gravityPlato: number, pitchRate: number): number {
  return parseFloat((volumeL * 1000 * gravityPlato * pitchRate / 1e6).toFixed(0));
}

export function starterVolumeMl(cellsNeededBillions: number): number {
  return Math.round(cellsNeededBillions * 10);
}

export function fermentationTempCelsius(type: YeastType): { min: number; max: number } {
  const temps: Record<YeastType, { min: number; max: number }> = {
    ale: { min: 16, max: 22 }, lager: { min: 8, max: 13 },
    wheat: { min: 17, max: 24 }, belgian: { min: 18, max: 28 },
    wild: { min: 15, max: 25 },
  };
  return temps[type];
}

export function attenuationPercent(type: YeastType): number {
  const att: Record<YeastType, number> = {
    ale: 75, lager: 80, wheat: 73, belgian: 82, wild: 85,
  };
  return att[type];
}

export function flocculationRating(type: YeastType): string {
  const floc: Record<YeastType, string> = {
    ale: "high", lager: "medium", wheat: "low", belgian: "medium", wild: "low",
  };
  return floc[type];
}

export function generationsMax(type: YeastType): number {
  const gens: Record<YeastType, number> = {
    ale: 8, lager: 6, wheat: 5, belgian: 4, wild: 1,
  };
  return gens[type];
}

export function lagTimeHours(type: YeastType): number {
  const hours: Record<YeastType, number> = {
    ale: 12, lager: 24, wheat: 8, belgian: 16, wild: 72,
  };
  return hours[type];
}

export function viabilityCurve(daysSinceManufacture: number): number {
  const viability = Math.max(0, 100 - daysSinceManufacture * 0.7);
  return parseFloat(viability.toFixed(1));
}

export function yeastTypes(): YeastType[] {
  return ["ale", "lager", "wheat", "belgian", "wild"];
}

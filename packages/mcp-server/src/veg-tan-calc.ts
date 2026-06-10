export type TanninSource = "oak_bark" | "chestnut" | "mimosa" | "quebracho" | "sumac";

export function tanningDaysPerMm(source: TanninSource): number {
  const days: Record<TanninSource, number> = {
    oak_bark: 30, chestnut: 20, mimosa: 15, quebracho: 10, sumac: 25,
  };
  return days[source];
}

export function bathConcentrationPercent(source: TanninSource): number {
  const conc: Record<TanninSource, number> = {
    oak_bark: 3, chestnut: 5, mimosa: 8, quebracho: 10, sumac: 4,
  };
  return conc[source];
}

export function colorResult(source: TanninSource): string {
  const colors: Record<TanninSource, string> = {
    oak_bark: "golden_brown", chestnut: "reddish_brown", mimosa: "light_tan",
    quebracho: "deep_red", sumac: "pale_cream",
  };
  return colors[source];
}

export function firmness(source: TanninSource): number {
  const ratings: Record<TanninSource, number> = {
    oak_bark: 4, chestnut: 3, mimosa: 2, quebracho: 5, sumac: 3,
  };
  return ratings[source];
}

export function shrinkageTempCelsius(source: TanninSource): number {
  const temps: Record<TanninSource, number> = {
    oak_bark: 75, chestnut: 72, mimosa: 68, quebracho: 80, sumac: 70,
  };
  return temps[source];
}

export function phRange(source: TanninSource): number {
  const ph: Record<TanninSource, number> = {
    oak_bark: 4.5, chestnut: 3.8, mimosa: 4.2, quebracho: 4.0, sumac: 4.8,
  };
  return ph[source];
}

export function waterUseLitersPerKg(source: TanninSource): number {
  const liters: Record<TanninSource, number> = {
    oak_bark: 50, chestnut: 40, mimosa: 35, quebracho: 30, sumac: 45,
  };
  return liters[source];
}

export function toolingQuality(source: TanninSource): number {
  const ratings: Record<TanninSource, number> = {
    oak_bark: 5, chestnut: 4, mimosa: 3, quebracho: 4, sumac: 3,
  };
  return ratings[source];
}

export function costPerKg(source: TanninSource): number {
  const costs: Record<TanninSource, number> = {
    oak_bark: 8, chestnut: 6, mimosa: 5, quebracho: 7, sumac: 10,
  };
  return costs[source];
}

export function tanninSources(): TanninSource[] {
  return ["oak_bark", "chestnut", "mimosa", "quebracho", "sumac"];
}

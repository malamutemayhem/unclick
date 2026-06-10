export type PulpSource = "cotton" | "linen" | "hemp" | "wood" | "kozo";

export function pulpWeightKgPerSheet(widthCm: number, heightCm: number, gsmTarget: number): number {
  const areaM2 = (widthCm * heightCm) / 10000;
  return parseFloat((areaM2 * gsmTarget / 1000).toFixed(4));
}

export function soakingHours(source: PulpSource): number {
  const hours: Record<PulpSource, number> = {
    cotton: 4, linen: 6, hemp: 8, wood: 24, kozo: 12,
  };
  return hours[source];
}

export function beatingMinutes(source: PulpSource): number {
  const mins: Record<PulpSource, number> = {
    cotton: 30, linen: 45, hemp: 60, wood: 90, kozo: 40,
  };
  return mins[source];
}

export function waterLitersPerSheet(gsmTarget: number): number {
  return parseFloat((gsmTarget * 0.1).toFixed(1));
}

export function pressTimeMinutes(thicknessMm: number): number {
  return Math.round(thicknessMm * 15 + 5);
}

export function dryingHours(method: "air" | "heated" | "loft"): number {
  const hours: Record<string, number> = { air: 48, heated: 4, loft: 24 };
  return hours[method];
}

export function sizingRequired(use: "writing" | "printing" | "art"): boolean {
  return use === "writing" || use === "printing";
}

export function sheetStrengthRating(source: PulpSource): number {
  const ratings: Record<PulpSource, number> = {
    cotton: 8, linen: 9, hemp: 7, wood: 4, kozo: 10,
  };
  return ratings[source];
}

export function archivalQualityYears(source: PulpSource): number {
  const years: Record<PulpSource, number> = {
    cotton: 500, linen: 600, hemp: 400, wood: 50, kozo: 1000,
  };
  return years[source];
}

export function costPerSheet(source: PulpSource, baseCost: number): number {
  const mult: Record<PulpSource, number> = {
    cotton: 2.0, linen: 3.0, hemp: 1.5, wood: 1.0, kozo: 4.0,
  };
  return parseFloat((baseCost * mult[source]).toFixed(2));
}

export function pulpSources(): PulpSource[] {
  return ["cotton", "linen", "hemp", "wood", "kozo"];
}

export type ExtractionMethod = "steam_distill" | "cold_press" | "enfleurage" | "solvent" | "co2";

export function plantMaterialKg(oilMl: number, yieldPercent: number): number {
  if (yieldPercent <= 0) return 0;
  return parseFloat((oilMl / (yieldPercent / 100 * 1000)).toFixed(1));
}

export function yieldPercent(method: ExtractionMethod): number {
  const yields: Record<ExtractionMethod, number> = {
    steam_distill: 1.5, cold_press: 3, enfleurage: 0.5, solvent: 5, co2: 4,
  };
  return yields[method];
}

export function extractionTimeHours(method: ExtractionMethod): number {
  const hours: Record<ExtractionMethod, number> = {
    steam_distill: 4, cold_press: 1, enfleurage: 720, solvent: 8, co2: 3,
  };
  return hours[method];
}

export function purityPercent(method: ExtractionMethod): number {
  const purity: Record<ExtractionMethod, number> = {
    steam_distill: 95, cold_press: 85, enfleurage: 99, solvent: 80, co2: 98,
  };
  return purity[method];
}

export function shelfLifeMonths(method: ExtractionMethod): number {
  const months: Record<ExtractionMethod, number> = {
    steam_distill: 24, cold_press: 12, enfleurage: 36, solvent: 18, co2: 30,
  };
  return months[method];
}

export function dilutionPercent(application: "topical" | "massage" | "bath"): number {
  const pct: Record<string, number> = { topical: 2, massage: 1, bath: 3 };
  return pct[application];
}

export function dropsPerMl(): number {
  return 20;
}

export function flashPointCelsius(method: ExtractionMethod): number {
  const temps: Record<ExtractionMethod, number> = {
    steam_distill: 50, cold_press: 45, enfleurage: 60, solvent: 35, co2: 55,
  };
  return temps[method];
}

export function costPerMl(method: ExtractionMethod): number {
  const costs: Record<ExtractionMethod, number> = {
    steam_distill: 1.5, cold_press: 0.8, enfleurage: 10, solvent: 0.5, co2: 3,
  };
  return costs[method];
}

export function extractionMethods(): ExtractionMethod[] {
  return ["steam_distill", "cold_press", "enfleurage", "solvent", "co2"];
}

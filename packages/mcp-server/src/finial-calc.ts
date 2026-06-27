export type FinialForm = "ball" | "spire" | "urn" | "acorn" | "pineapple";

export function heightCm(roofPeakHeightM: number): number {
  return parseFloat((roofPeakHeightM * 100 * 0.05).toFixed(1));
}

export function baseDiameterCm(heightCm: number): number {
  return parseFloat((heightCm * 0.4).toFixed(1));
}

export function weightKg(heightCm: number, form: FinialForm, material: string): number {
  const volumeFactor: Record<FinialForm, number> = {
    ball: 0.52, spire: 0.15, urn: 0.35, acorn: 0.3, pineapple: 0.4,
  };
  const densityKgPerCm3: Record<string, number> = {
    stone: 0.0025, copper: 0.009, lead: 0.0113, wood: 0.0006, iron: 0.0079,
  };
  const radius = heightCm * 0.2;
  const volume = Math.PI * radius * radius * heightCm * volumeFactor[form];
  const density = densityKgPerCm3[material] || 0.003;
  return parseFloat((volume * density).toFixed(1));
}

export function windLoadN(heightCm: number, baseDiameterCm: number, windSpeedKph: number): number {
  const areaM2 = heightCm / 100 * baseDiameterCm / 100;
  const speedMps = windSpeedKph / 3.6;
  return parseFloat((0.5 * 1.225 * speedMps * speedMps * areaM2 * 1.2).toFixed(1));
}

export function lightningRisk(heightAboveRoofCm: number, metallic: boolean): number {
  const base = heightAboveRoofCm / 100 * 2;
  return parseFloat((metallic ? base * 3 : base).toFixed(1));
}

export function gildingArea(heightCm: number, form: FinialForm): number {
  const factors: Record<FinialForm, number> = {
    ball: 3.14, spire: 1.5, urn: 2.8, acorn: 2.5, pineapple: 4.0,
  };
  const radius = heightCm * 0.2;
  return parseFloat((radius * radius * factors[form]).toFixed(1));
}

export function mountingBoltCount(weightKg: number): number {
  if (weightKg <= 5) return 2;
  if (weightKg <= 20) return 4;
  if (weightKg <= 50) return 6;
  return 8;
}

export function carvingHours(form: FinialForm, heightCm: number): number {
  const hoursPerCm: Record<FinialForm, number> = {
    ball: 0.1, spire: 0.15, urn: 0.3, acorn: 0.25, pineapple: 0.5,
  };
  return parseFloat((heightCm * hoursPerCm[form]).toFixed(1));
}

export function maintenanceYears(material: string): number {
  const years: Record<string, number> = {
    stone: 25, copper: 50, lead: 40, wood: 10, iron: 15,
  };
  return years[material] || 20;
}

export function finialForms(): FinialForm[] {
  return ["ball", "spire", "urn", "acorn", "pineapple"];
}

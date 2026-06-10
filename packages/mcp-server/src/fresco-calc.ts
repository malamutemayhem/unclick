export type PlasterLayer = "arriccio" | "intonaco" | "sinopia";

export function wallAreaM2(widthM: number, heightM: number): number {
  return parseFloat((widthM * heightM).toFixed(1));
}

export function giornataCm2(skillLevel: string): number {
  const areas: Record<string, number> = { apprentice: 2000, journeyman: 4000, master: 8000 };
  return areas[skillLevel] || 4000;
}

export function daysToComplete(areaCm2: number, giornataSize: number): number {
  if (giornataSize <= 0) return 0;
  return Math.ceil(areaCm2 / giornataSize);
}

export function plasterThicknessMm(layer: PlasterLayer): number {
  const thickness: Record<PlasterLayer, number> = { arriccio: 15, intonaco: 5, sinopia: 1 };
  return thickness[layer];
}

export function limeKg(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 * thicknessMm / 10000 * 1.2).toFixed(1));
}

export function sandKg(limeKg: number, ratio: number): number {
  return parseFloat((limeKg * ratio).toFixed(1));
}

export function pigmentGrams(areaCm2: number, coverage: string): number {
  const factor: Record<string, number> = { light: 0.5, medium: 1, heavy: 2, opaque: 3 };
  return parseFloat((areaCm2 * (factor[coverage] || 1) * 0.01).toFixed(0));
}

export function dryingWindowHours(humidity: number, temp: number): number {
  const base = 6;
  return parseFloat((base * (1 - humidity / 200) * (temp / 20)).toFixed(1));
}

export function scaffoldPlatforms(heightM: number, platformSpacingM: number): number {
  if (platformSpacingM <= 0) return 0;
  return Math.ceil(heightM / platformSpacingM);
}

export function restorationCost(areaCm2: number, damagePercent: number): number {
  return parseFloat((areaCm2 * damagePercent * 0.05).toFixed(0));
}

export function plasterLayers(): PlasterLayer[] {
  return ["arriccio", "intonaco", "sinopia"];
}

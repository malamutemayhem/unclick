export type BatikMethod = "tjanting" | "stamp" | "screen" | "freehand" | "digital";

export function waxTemperature(waxType: string): number {
  const temps: Record<string, number> = {
    paraffin: 60, beeswax: 65, soy: 55, microcrystalline: 70,
  };
  return temps[waxType] || 60;
}

export function waxAmountG(fabricAreaM2: number, layers: number): number {
  return parseFloat((fabricAreaM2 * 200 * layers).toFixed(0));
}

export function dyeBathLiters(fabricWeightG: number, ratio: number): number {
  return parseFloat((fabricWeightG * ratio / 1000).toFixed(1));
}

export function colorLayers(complexity: number): number {
  return Math.min(Math.ceil(complexity / 2), 8);
}

export function crackleEffect(waxAge: string): number {
  const ratings: Record<string, number> = {
    fresh: 1, aged: 3, reheated: 5,
  };
  return ratings[waxAge] || 1;
}

export function tjantingFlow(nozzleMm: number, waxTemp: number): number {
  return parseFloat((nozzleMm * (waxTemp - 50) * 0.01).toFixed(2));
}

export function boilingOutTime(fabricWeightG: number): number {
  return Math.ceil(fabricWeightG / 100) * 5;
}

export function fixativeConcentration(dyeType: string): number {
  const pct: Record<string, number> = {
    reactive: 3, vat: 5, natural: 8, acid: 4,
  };
  return pct[dyeType] || 5;
}

export function dryingHours(humidity: number): number {
  return parseFloat((2 + humidity * 0.05).toFixed(1));
}

export function stampRepeats(fabricWidthCm: number, stampWidthCm: number): number {
  if (stampWidthCm <= 0) return 0;
  return Math.ceil(fabricWidthCm / stampWidthCm);
}

export function batikMethods(): BatikMethod[] {
  return ["tjanting", "stamp", "screen", "freehand", "digital"];
}

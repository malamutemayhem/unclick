export type PalanquinStyle = "sedan_chair" | "litter" | "jiao" | "doli" | "machila";

export function poleLength(cabinLength: number): number {
  return parseFloat((cabinLength * 2.5).toFixed(1));
}

export function bearerCount(totalWeightKg: number): number {
  if (totalWeightKg <= 80) return 2;
  if (totalWeightKg <= 150) return 4;
  if (totalWeightKg <= 250) return 6;
  return 8;
}

export function loadPerBearer(totalWeightKg: number, bearers: number): number {
  if (bearers <= 0) return 0;
  return parseFloat((totalWeightKg / bearers).toFixed(1));
}

export function marchSpeedKmh(gradient: number, loadKg: number): number {
  const base = 4;
  const gradientFactor = Math.max(0.3, 1 - gradient * 0.05);
  const loadFactor = Math.max(0.5, 1 - (loadKg - 60) * 0.002);
  return parseFloat((base * gradientFactor * loadFactor).toFixed(1));
}

export function restStopInterval(tempC: number): number {
  if (tempC > 35) return 20;
  if (tempC > 30) return 30;
  return 45;
}

export function cabinVolumeLiters(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat(((lengthCm * widthCm * heightCm) / 1000).toFixed(0));
}

export function canopyWeightKg(areaCm2: number, material: string): number {
  const densities: Record<string, number> = { silk: 0.001, cotton: 0.002, leather: 0.004 };
  const d = densities[material] || 0.002;
  return parseFloat((areaCm2 * d).toFixed(1));
}

export function journeyTimeHours(distanceKm: number, speedKmh: number, restMin: number, restIntervalMin: number): number {
  if (speedKmh <= 0) return 0;
  const travelHours = distanceKm / speedKmh;
  const stops = Math.floor(travelHours * 60 / restIntervalMin);
  return parseFloat((travelHours + (stops * restMin) / 60).toFixed(1));
}

export function decorationCost(style: PalanquinStyle): number {
  const costs: Record<PalanquinStyle, number> = {
    sedan_chair: 500, litter: 200, jiao: 800, doli: 600, machila: 150,
  };
  return costs[style];
}

export function palanquinStyles(): PalanquinStyle[] {
  return ["sedan_chair", "litter", "jiao", "doli", "machila"];
}

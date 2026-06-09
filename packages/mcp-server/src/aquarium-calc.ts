export interface TankDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface WaterParams {
  temperature: number;
  ph: number;
  ammonia: number;
  nitrite: number;
  nitrate: number;
  gh: number;
  kh: number;
}

export function tankVolumeLiters(dims: TankDimensions): number {
  return parseFloat(((dims.lengthCm * dims.widthCm * dims.heightCm) / 1000).toFixed(1));
}

export function tankVolumeGallons(dims: TankDimensions): number {
  return parseFloat((tankVolumeLiters(dims) * 0.264172).toFixed(1));
}

export function surfaceArea(dims: TankDimensions): number {
  return parseFloat((dims.lengthCm * dims.widthCm).toFixed(1));
}

export function glassThickness(heightCm: number, lengthCm: number): number {
  const maxDim = Math.max(heightCm, lengthCm);
  if (maxDim <= 30) return 4;
  if (maxDim <= 45) return 6;
  if (maxDim <= 60) return 8;
  if (maxDim <= 80) return 10;
  return 12;
}

export function waterWeight(liters: number): number {
  return parseFloat(liters.toFixed(1));
}

export function totalWeight(dims: TankDimensions, glassThicknessMm: number): number {
  const vol = tankVolumeLiters(dims);
  const waterKg = vol;
  const glassDensity = 2.5;
  const l = dims.lengthCm / 100;
  const w = dims.widthCm / 100;
  const h = dims.heightCm / 100;
  const t = glassThicknessMm / 1000;
  const glassArea = 2 * (l * h + w * h) + l * w;
  const glassKg = glassArea * t * glassDensity * 1000;
  return parseFloat((waterKg + glassKg).toFixed(1));
}

export function stockingLevel(liters: number, rule: "inch" | "cm" = "cm"): number {
  if (rule === "inch") return Math.floor(liters / 3.785);
  return Math.floor(liters / 2);
}

export function filterFlowRate(liters: number, turnovers = 4): number {
  return parseFloat((liters * turnovers).toFixed(0));
}

export function heaterWatts(liters: number, tempDiffC: number = 5): number {
  const wattsPerLiter = tempDiffC > 10 ? 5 : tempDiffC > 5 ? 3 : 1.5;
  return Math.ceil(liters * wattsPerLiter / 25) * 25;
}

export function lightingWatts(dims: TankDimensions, level: "low" | "medium" | "high" = "medium"): number {
  const area = surfaceArea(dims);
  const wpsl: Record<string, number> = { low: 0.3, medium: 0.5, high: 0.8 };
  return Math.ceil(area * wpsl[level] / 100);
}

export function waterChangeVolume(totalLiters: number, percent: number): number {
  return parseFloat((totalLiters * percent / 100).toFixed(1));
}

export function cyclingStatus(ammonia: number, nitrite: number, nitrate: number): string {
  if (ammonia > 0 && nitrite === 0 && nitrate === 0) return "beginning";
  if (ammonia > 0 && nitrite > 0) return "in progress";
  if (ammonia === 0 && nitrite > 0) return "almost complete";
  if (ammonia === 0 && nitrite === 0 && nitrate > 0) return "cycled";
  return "unknown";
}

export function waterQuality(params: WaterParams): string {
  if (params.ammonia > 0.25 || params.nitrite > 0.25) return "dangerous";
  if (params.ammonia > 0 || params.nitrite > 0) return "concerning";
  if (params.nitrate > 40) return "fair";
  if (params.nitrate > 20) return "good";
  return "excellent";
}

export function co2Level(kh: number, ph: number): number {
  return parseFloat((3 * kh * Math.pow(10, 7 - ph)).toFixed(1));
}

export function evaporationRate(surfaceAreaCm2: number, tempC: number): number {
  const factor = tempC > 25 ? 0.002 : 0.001;
  return parseFloat((surfaceAreaCm2 * factor / 1000).toFixed(2));
}

export function substrateVolume(dims: TankDimensions, depthCm: number): number {
  return parseFloat(((dims.lengthCm * dims.widthCm * depthCm) / 1000).toFixed(1));
}

export function substrateWeight(volumeLiters: number, density = 1.5): number {
  return parseFloat((volumeLiters * density).toFixed(1));
}

export function compatibilityCheck(temp1: [number, number], temp2: [number, number], ph1: [number, number], ph2: [number, number]): boolean {
  const tempOverlap = temp1[0] <= temp2[1] && temp2[0] <= temp1[1];
  const phOverlap = ph1[0] <= ph2[1] && ph2[0] <= ph1[1];
  return tempOverlap && phOverlap;
}

export type TatamiSize = "kyoto" | "tokyo" | "chukyou" | "danchi";

export function matCount(roomJo: number): number {
  return roomJo;
}

export function matDimensions(size: TatamiSize): { lengthCm: number; widthCm: number } {
  const dims: Record<TatamiSize, [number, number]> = {
    kyoto: [191, 95.5],
    tokyo: [176, 88],
    chukyou: [182, 91],
    danchi: [170, 85],
  };
  const [l, w] = dims[size];
  return { lengthCm: l, widthCm: w };
}

export function roomAreaM2(matCount: number, size: TatamiSize): number {
  const d = matDimensions(size);
  return parseFloat((matCount * d.lengthCm * d.widthCm / 10000).toFixed(2));
}

export function strawWeight(matCount: number, thicknessCm: number): number {
  return parseFloat((matCount * thicknessCm * 0.8).toFixed(1));
}

export function replacementYears(traffic: string): number {
  const years: Record<string, number> = { light: 10, moderate: 5, heavy: 3, commercial: 2 };
  return years[traffic] || 5;
}

export function borderTrimM(matCount: number, size: TatamiSize): number {
  const d = matDimensions(size);
  return parseFloat((matCount * 2 * d.lengthCm / 100).toFixed(1));
}

export function moisturePercent(humidity: number): number {
  return parseFloat(Math.min(20, humidity * 0.15).toFixed(1));
}

export function installTimeHours(matCount: number): number {
  return parseFloat((matCount * 0.25 + 0.5).toFixed(1));
}

export function costPerMat(size: TatamiSize, quality: string): number {
  const base: Record<TatamiSize, number> = { kyoto: 120, tokyo: 100, chukyou: 110, danchi: 80 };
  const mult: Record<string, number> = { economy: 0.5, standard: 1, premium: 2, luxury: 3.5 };
  return parseFloat((base[size] * (mult[quality] || 1)).toFixed(0));
}

export function loadBearingKgM2(thicknessCm: number): number {
  return parseFloat((thicknessCm * 50).toFixed(0));
}

export function tatamiSizes(): TatamiSize[] {
  return ["kyoto", "tokyo", "chukyou", "danchi"];
}

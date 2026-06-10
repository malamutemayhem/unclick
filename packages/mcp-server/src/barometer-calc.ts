export type BarometerType = "mercury" | "aneroid" | "digital" | "water" | "fortin";

export function hPaToMmHg(hPa: number): number {
  return parseFloat((hPa * 0.75006).toFixed(2));
}

export function mmHgToHPa(mmHg: number): number {
  return parseFloat((mmHg / 0.75006).toFixed(2));
}

export function hPaToInHg(hPa: number): number {
  return parseFloat((hPa * 0.02953).toFixed(2));
}

export function altimeterSetting(stationPressureHPa: number, elevationM: number): number {
  const correction = elevationM / 8.3;
  return parseFloat((stationPressureHPa + correction).toFixed(1));
}

export function pressureAltitude(pressureHPa: number): number {
  return parseFloat(((1013.25 - pressureHPa) * 8.3).toFixed(0));
}

export function tendency(currentHPa: number, previousHPa: number): string {
  const diff = currentHPa - previousHPa;
  if (diff > 1) return "rising";
  if (diff < -1) return "falling";
  return "steady";
}

export function weatherForecast(pressureHPa: number, tendency: string): string {
  if (pressureHPa > 1022 && tendency === "rising") return "fair";
  if (pressureHPa < 1000 && tendency === "falling") return "stormy";
  if (tendency === "falling") return "deteriorating";
  if (tendency === "rising") return "improving";
  return "stable";
}

export function mercuryColumnHeight(pressureHPa: number): number {
  return parseFloat((pressureHPa * 0.75006).toFixed(1));
}

export function waterColumnHeight(pressureHPa: number): number {
  return parseFloat((pressureHPa * 10.2).toFixed(0));
}

export function accuracy(type: BarometerType): number {
  const hPa: Record<BarometerType, number> = {
    mercury: 0.1, aneroid: 1, digital: 0.3, water: 2, fortin: 0.05,
  };
  return hPa[type];
}

export function calibrationInterval(type: BarometerType): number {
  const months: Record<BarometerType, number> = {
    mercury: 12, aneroid: 6, digital: 12, water: 3, fortin: 12,
  };
  return months[type];
}

export function barometerTypes(): BarometerType[] {
  return ["mercury", "aneroid", "digital", "water", "fortin"];
}

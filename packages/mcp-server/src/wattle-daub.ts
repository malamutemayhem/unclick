export type WallFinish = "limewash" | "roughcast" | "smooth" | "exposed" | "painted";

export function uprightCount(wallLengthM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((wallLengthM * 100) / spacingCm) + 1;
}

export function wattleRods(wallAreaM2: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((wallAreaM2 * 100) / spacingCm);
}

export function daubVolumeLiters(wallAreaM2: number, thicknessCm: number): number {
  return parseFloat((wallAreaM2 * thicknessCm * 10).toFixed(0));
}

export function clayRatio(): { clay: number; sand: number; straw: number; water: number } {
  return { clay: 40, sand: 30, straw: 20, water: 10 };
}

export function dryingDays(thicknessCm: number, tempC: number): number {
  const base = thicknessCm * 3;
  const tempFactor = tempC > 20 ? 0.7 : tempC > 10 ? 1 : 1.5;
  return Math.ceil(base * tempFactor);
}

export function thermalResistance(thicknessCm: number): number {
  return parseFloat((thicknessCm * 0.15).toFixed(2));
}

export function loadBearing(thicknessCm: number, heightM: number): boolean {
  return thicknessCm >= 15 && heightM <= 3;
}

export function plasterCoats(finish: WallFinish): number {
  const coats: Record<WallFinish, number> = {
    limewash: 3, roughcast: 2, smooth: 3, exposed: 0, painted: 2,
  };
  return coats[finish];
}

export function maintenanceYears(finish: WallFinish): number {
  const years: Record<WallFinish, number> = {
    limewash: 3, roughcast: 10, smooth: 7, exposed: 5, painted: 4,
  };
  return years[finish];
}

export function soundInsulation(thicknessCm: number): number {
  return parseFloat((thicknessCm * 2.5).toFixed(0));
}

export function wallFinishes(): WallFinish[] {
  return ["limewash", "roughcast", "smooth", "exposed", "painted"];
}

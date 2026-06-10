export type FlecheMaterial = "lead" | "copper" | "slate" | "timber" | "zinc";

export function heightM(roofRidgeLengthM: number): number {
  return parseFloat((roofRidgeLengthM * 0.15).toFixed(2));
}

export function baseWidthCm(heightM: number): number {
  return parseFloat((heightM * 100 * 0.3).toFixed(0));
}

export function spireAngle(heightM: number, baseWidthCm: number): number {
  if (baseWidthCm <= 0) return 0;
  return parseFloat((2 * Math.atan(baseWidthCm / 2 / (heightM * 100)) * 180 / Math.PI).toFixed(1));
}

export function surfaceAreaM2(heightM: number, baseWidthCm: number, sides: number): number {
  const baseM = baseWidthCm / 100;
  const slantHeight = Math.sqrt(heightM ** 2 + (baseM / 2) ** 2);
  return parseFloat((sides * baseM * slantHeight / 2).toFixed(2));
}

export function sheetingWeight(surfaceAreaM2: number, material: FlecheMaterial): number {
  const kgPerM2: Record<FlecheMaterial, number> = {
    lead: 35, copper: 5, slate: 25, timber: 8, zinc: 7,
  };
  return parseFloat((surfaceAreaM2 * kgPerM2[material]).toFixed(1));
}

export function windForceKn(heightM: number, baseWidthCm: number, windSpeedKph: number): number {
  const areaM2 = heightM * baseWidthCm / 100 / 2;
  const speedMps = windSpeedKph / 3.6;
  return parseFloat((0.5 * 1.225 * speedMps ** 2 * areaM2 * 1.5 / 1000).toFixed(2));
}

export function crossCount(): number {
  return 1;
}

export function weathercockArea(heightM: number): number {
  return parseFloat((heightM * 0.1 * heightM * 0.15).toFixed(3));
}

export function lightningRodHeight(flecheHeightM: number): number {
  return parseFloat((flecheHeightM * 0.3).toFixed(2));
}

export function maintenanceIntervalYears(material: FlecheMaterial): number {
  const years: Record<FlecheMaterial, number> = {
    lead: 50, copper: 40, slate: 30, timber: 15, zinc: 25,
  };
  return years[material];
}

export function flecheMaterials(): FlecheMaterial[] {
  return ["lead", "copper", "slate", "timber", "zinc"];
}

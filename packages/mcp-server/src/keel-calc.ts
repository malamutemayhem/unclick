export type KeelType = "flat" | "bar" | "fin" | "bulb" | "wing";

export function lengthM(hullLengthM: number): number {
  return parseFloat((hullLengthM * 0.85).toFixed(2));
}

export function depthCm(hullBeamM: number): number {
  return parseFloat((hullBeamM * 8).toFixed(1));
}

export function widthCm(depthCm: number, type: KeelType): number {
  const ratios: Record<KeelType, number> = {
    flat: 3.0, bar: 0.8, fin: 0.3, bulb: 0.5, wing: 0.4,
  };
  return parseFloat((depthCm * ratios[type]).toFixed(1));
}

export function draftM(keelDepthCm: number, hullDepthM: number): number {
  return parseFloat((hullDepthM + keelDepthCm / 100).toFixed(2));
}

export function ballastWeightKg(displacementKg: number, type: KeelType): number {
  const ratios: Record<KeelType, number> = {
    flat: 0.25, bar: 0.30, fin: 0.40, bulb: 0.45, wing: 0.42,
  };
  return parseFloat((displacementKg * ratios[type]).toFixed(1));
}

export function lateralResistanceM2(lengthM: number, depthCm: number): number {
  return parseFloat((lengthM * depthCm / 10000).toFixed(3));
}

export function boltCount(lengthM: number): number {
  return Math.ceil(lengthM * 3);
}

export function scarfJointCount(lengthM: number, timberLengthM: number): number {
  if (timberLengthM <= 0) return 0;
  return Math.max(0, Math.ceil(lengthM / timberLengthM) - 1);
}

export function antifouilingAreaM2(lengthM: number, widthCm: number): number {
  return parseFloat((lengthM * widthCm / 100 * 2).toFixed(2));
}

export function constructionCost(lengthM: number, type: KeelType, costPerM: number): number {
  const multipliers: Record<KeelType, number> = {
    flat: 1.0, bar: 1.5, fin: 2.5, bulb: 3.0, wing: 3.5,
  };
  return parseFloat((lengthM * costPerM * multipliers[type]).toFixed(2));
}

export function keelTypes(): KeelType[] {
  return ["flat", "bar", "fin", "bulb", "wing"];
}

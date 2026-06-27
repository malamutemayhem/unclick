export type OgeeApplication = "cornice" | "baseboard" | "arch" | "window" | "furniture";

export function profileDepthMm(heightMm: number): number {
  return parseFloat((heightMm * 0.3).toFixed(1));
}

export function curveRadiusMm(heightMm: number): number {
  return parseFloat((heightMm * 0.45).toFixed(1));
}

export function inflectionPointMm(heightMm: number): number {
  return parseFloat((heightMm * 0.5).toFixed(1));
}

export function moldingLengthM(perimeterM: number, waste: number): number {
  return parseFloat((perimeterM * (1 + waste / 100)).toFixed(2));
}

export function miterAngle(cornerDeg: number): number {
  return parseFloat((cornerDeg / 2).toFixed(1));
}

export function cornerCount(roomSides: number): number {
  return roomSides;
}

export function paintVolumeMl(lengthM: number, profileHeightMm: number, coats: number): number {
  const perimeterFactor = 1 + profileHeightMm / 100;
  return parseFloat((lengthM * perimeterFactor * coats * 15).toFixed(1));
}

export function routerBitDiameterMm(profileDepthMm: number): number {
  return parseFloat((profileDepthMm * 2.2).toFixed(1));
}

export function cuttingSpeedMps(material: string): number {
  const speeds: Record<string, number> = {
    softwood: 5, hardwood: 3, mdf: 6, plaster: 2, stone: 0.5,
  };
  return speeds[material] || 3;
}

export function costPerMeter(application: OgeeApplication): number {
  const costs: Record<OgeeApplication, number> = {
    cornice: 25, baseboard: 12, arch: 45, window: 35, furniture: 18,
  };
  return costs[application];
}

export function ogeeApplications(): OgeeApplication[] {
  return ["cornice", "baseboard", "arch", "window", "furniture"];
}

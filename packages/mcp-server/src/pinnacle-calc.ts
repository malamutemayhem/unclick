export type PinnacleShape = "conical" | "pyramidal" | "octagonal" | "crocketed" | "finial";

export function heightM(baseDiameterM: number, shape: PinnacleShape): number {
  const ratio: Record<PinnacleShape, number> = { conical: 3, pyramidal: 2.5, octagonal: 2.8, crocketed: 3.5, finial: 4 };
  return parseFloat((baseDiameterM * ratio[shape]).toFixed(1));
}

export function baseArea(diameterM: number, shape: PinnacleShape): number {
  if (shape === "octagonal") {
    return parseFloat((2 * Math.pow(diameterM / 2, 2) * (1 + Math.sqrt(2))).toFixed(2));
  }
  return parseFloat((Math.PI * Math.pow(diameterM / 2, 2)).toFixed(2));
}

export function stoneVolume(baseDiameterM: number, heightM: number): number {
  return parseFloat((Math.PI * Math.pow(baseDiameterM / 2, 2) * heightM / 3).toFixed(2));
}

export function weightTonnes(volumeM3: number, stoneDensity: number): number {
  return parseFloat((volumeM3 * stoneDensity).toFixed(1));
}

export function windForceKn(heightM: number, diameterM: number, windSpeedMs: number): number {
  return parseFloat((0.5 * 1.225 * windSpeedMs * windSpeedMs * heightM * diameterM * 0.7 / 1000).toFixed(2));
}

export function crocketCount(heightM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(heightM * 100 / spacingCm) * 4;
}

export function carvingHours(shape: PinnacleShape, heightM: number): number {
  const base: Record<PinnacleShape, number> = { conical: 20, pyramidal: 30, octagonal: 40, crocketed: 80, finial: 60 };
  return parseFloat((base[shape] * heightM).toFixed(0));
}

export function lightningRisk(heightAboveRoofM: number): string {
  if (heightAboveRoofM > 5) return "high";
  if (heightAboveRoofM > 2) return "moderate";
  return "low";
}

export function restorationCost(heightM: number, damagePercent: number): number {
  return parseFloat((heightM * damagePercent * 500).toFixed(0));
}

export function pinnacleShapes(): PinnacleShape[] {
  return ["conical", "pyramidal", "octagonal", "crocketed", "finial"];
}

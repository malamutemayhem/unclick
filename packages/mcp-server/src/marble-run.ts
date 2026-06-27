export type TrackPiece = "straight" | "curve" | "spiral" | "funnel" | "drop" | "jump";
export type Material = "wood" | "plastic" | "metal" | "glass";

export function trackLength(pieces: Map<TrackPiece, number>): number {
  const lengths: Record<TrackPiece, number> = {
    straight: 15, curve: 12, spiral: 25, funnel: 20, drop: 10, jump: 18,
  };
  let total = 0;
  for (const [piece, count] of pieces) {
    total += (lengths[piece] ?? 0) * count;
  }
  return total;
}

export function marbleSpeed(heightDropCm: number): number {
  const speedMs = Math.sqrt(2 * 9.81 * heightDropCm / 100);
  return parseFloat((speedMs * 100).toFixed(1));
}

export function runTime(trackLengthCm: number, avgSpeedCmPerS: number): number {
  if (avgSpeedCmPerS === 0) return 0;
  return parseFloat((trackLengthCm / avgSpeedCmPerS).toFixed(2));
}

export function heightNeeded(targetSpeedCmPerS: number): number {
  const speedMs = targetSpeedCmPerS / 100;
  return parseFloat((speedMs ** 2 / (2 * 9.81) * 100).toFixed(1));
}

export function marbleWeight(diameterMm: number, material: Material): number {
  const density: Record<Material, number> = {
    wood: 0.6, plastic: 1.1, metal: 7.8, glass: 2.5,
  };
  const radiusCm = diameterMm / 20;
  const volumeCm3 = (4 / 3) * Math.PI * radiusCm ** 3;
  return parseFloat((volumeCm3 * density[material]).toFixed(2));
}

export function loopMinHeight(loopDiamCm: number): number {
  return parseFloat((loopDiamCm * 2.5).toFixed(1));
}

export function jumpDistance(launchSpeedCmPerS: number, launchAngleDeg: number): number {
  const speedMs = launchSpeedCmPerS / 100;
  const rad = launchAngleDeg * Math.PI / 180;
  const distM = speedMs ** 2 * Math.sin(2 * rad) / 9.81;
  return parseFloat((distM * 100).toFixed(1));
}

export function funnelRevolutions(funnelDiamCm: number, entrySpeedCmPerS: number): number {
  if (funnelDiamCm === 0) return 0;
  return Math.round(entrySpeedCmPerS / (Math.PI * funnelDiamCm) * 3);
}

export function switchTracks(marbleWeightG: number, switchThresholdG: number): boolean {
  return marbleWeightG >= switchThresholdG;
}

export function parallelCapacity(trackWidthCm: number, marbleDiamMm: number): number {
  return Math.floor(trackWidthCm / (marbleDiamMm / 10));
}

export function chainReactionDelay(marbleCount: number, spacingCm: number): number {
  return parseFloat((marbleCount * spacingCm / 50).toFixed(2));
}

export function pieceCount(pieces: Map<TrackPiece, number>): number {
  let total = 0;
  for (const count of pieces.values()) total += count;
  return total;
}

export function trackPieces(): TrackPiece[] {
  return ["straight", "curve", "spiral", "funnel", "drop", "jump"];
}

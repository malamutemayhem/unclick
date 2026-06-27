export type AstragalProfile = "bead" | "reel" | "bead-and-reel" | "fillet" | "torus";

export function beadDiameterMm(columnDiameterCm: number): number {
  return parseFloat((columnDiameterCm * 0.8).toFixed(1));
}

export function reelSpacingMm(beadDiameterMm: number): number {
  return parseFloat((beadDiameterMm * 0.6).toFixed(1));
}

export function patternRepeatMm(beadDiameterMm: number, reelSpacingMm: number): number {
  return parseFloat((beadDiameterMm + reelSpacingMm).toFixed(1));
}

export function beadCount(circumferenceCm: number, patternRepeatMm: number): number {
  if (patternRepeatMm <= 0) return 0;
  return Math.floor((circumferenceCm * 10) / patternRepeatMm);
}

export function carvingDepthMm(profile: AstragalProfile): number {
  const depths: Record<AstragalProfile, number> = {
    bead: 4, reel: 3, "bead-and-reel": 5, fillet: 1, torus: 6,
  };
  return depths[profile];
}

export function carvingTimeHours(beadCount: number, profile: AstragalProfile): number {
  const hoursPerBead: Record<AstragalProfile, number> = {
    bead: 0.3, reel: 0.2, "bead-and-reel": 0.5, fillet: 0.1, torus: 0.4,
  };
  return parseFloat((beadCount * hoursPerBead[profile]).toFixed(1));
}

export function moldingLengthM(circumferenceCm: number, ringCount: number): number {
  return parseFloat((circumferenceCm * ringCount / 100).toFixed(2));
}

export function gildingAreaCm2(beadDiameterMm: number, beadCount: number): number {
  const radiusCm = beadDiameterMm / 20;
  const singleArea = Math.PI * radiusCm * radiusCm;
  return parseFloat((singleArea * beadCount).toFixed(1));
}

export function paintVolumeMl(areaCm2: number, coats: number): number {
  return parseFloat((areaCm2 / 100 * coats * 0.15).toFixed(1));
}

export function weatheringResistance(profile: AstragalProfile, sheltered: boolean): number {
  const base: Record<AstragalProfile, number> = {
    bead: 6, reel: 7, "bead-and-reel": 5, fillet: 9, torus: 4,
  };
  return sheltered ? base[profile] + 3 : base[profile];
}

export function astragalProfiles(): AstragalProfile[] {
  return ["bead", "reel", "bead-and-reel", "fillet", "torus"];
}

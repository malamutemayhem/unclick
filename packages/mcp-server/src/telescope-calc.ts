export type TelescopeType = "refractor" | "reflector" | "catadioptric" | "dobsonian";
export type MountType = "alt_az" | "equatorial" | "goto" | "dobsonian";

export function magnification(focalLengthMm: number, eyepieceMm: number): number {
  return parseFloat((focalLengthMm / eyepieceMm).toFixed(1));
}

export function maxUsefulMag(apertureMm: number): number {
  return Math.round(apertureMm * 2);
}

export function minUsefulMag(apertureMm: number): number {
  return parseFloat((apertureMm / 7).toFixed(1));
}

export function focalRatio(focalLengthMm: number, apertureMm: number): number {
  return parseFloat((focalLengthMm / apertureMm).toFixed(1));
}

export function exitPupil(apertureMm: number, mag: number): number {
  return parseFloat((apertureMm / mag).toFixed(1));
}

export function trueFov(apparentFov: number, mag: number): number {
  return parseFloat((apparentFov / mag).toFixed(2));
}

export function dawesLimit(apertureMm: number): number {
  return parseFloat((116 / apertureMm).toFixed(2));
}

export function limitingMagnitude(apertureMm: number): number {
  return parseFloat((2 + 5 * Math.log10(apertureMm)).toFixed(1));
}

export function lightGatheringPower(apertureMm: number): number {
  const eyePupil = 7;
  return parseFloat(((apertureMm / eyePupil) ** 2).toFixed(0));
}

export function contrastFactor(apertureMm: number, centralObstruction: number): number {
  const ratio = centralObstruction / apertureMm;
  return parseFloat(((1 - ratio ** 2) ** 2).toFixed(3));
}

export function cooldownMinutes(apertureMm: number, tempDiffC: number): number {
  return Math.round(apertureMm / 25 * tempDiffC / 5 * 10);
}

export function eyepieceForMag(focalLengthMm: number, targetMag: number): number {
  return parseFloat((focalLengthMm / targetMag).toFixed(1));
}

export function barlowMag(baseMag: number, barlowFactor: number): number {
  return parseFloat((baseMag * barlowFactor).toFixed(1));
}

export function filterFactor(filterType: "moon" | "solar" | "uhc" | "oiii" | "cls"): number {
  const factors: Record<string, number> = {
    moon: 0.13, solar: 0.00001, uhc: 0.3, oiii: 0.15, cls: 0.5,
  };
  return factors[filterType];
}

export function weightEstimate(apertureMm: number, type: TelescopeType): number {
  const base: Record<TelescopeType, number> = {
    refractor: 0.015, reflector: 0.02, catadioptric: 0.025, dobsonian: 0.03,
  };
  return parseFloat((apertureMm ** 2 * base[type]).toFixed(1));
}

export function telescopeTypes(): TelescopeType[] {
  return ["refractor", "reflector", "catadioptric", "dobsonian"];
}

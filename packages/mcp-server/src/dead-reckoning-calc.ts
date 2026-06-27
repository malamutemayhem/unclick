export type CurrentType = "none" | "following" | "opposing" | "crosswind" | "tidal";

export function distanceNm(speedKnots: number, timeHours: number): number {
  return Math.round(speedKnots * timeHours * 100) / 100;
}

export function courseOverGround(heading: number, currentDir: number, currentKnots: number, boatKnots: number): number {
  if (boatKnots <= 0) return heading;
  const drift = Math.atan2(currentKnots * Math.sin((currentDir - heading) * Math.PI / 180), boatKnots + currentKnots * Math.cos((currentDir - heading) * Math.PI / 180)) * 180 / Math.PI;
  let cog = heading + drift;
  if (cog < 0) cog += 360;
  if (cog >= 360) cog -= 360;
  return Math.round(cog * 10) / 10;
}

export function speedMadeGood(boatKnots: number, currentType: CurrentType, currentKnots: number): number {
  const adjustments: Record<CurrentType, number> = {
    none: 0, following: currentKnots, opposing: -currentKnots,
    crosswind: -currentKnots * 0.3, tidal: currentKnots * 0.5,
  };
  return Math.max(0, Math.round((boatKnots + adjustments[currentType]) * 10) / 10);
}

export function positionErrorNmPerHour(): number {
  return 0.5;
}

export function fixIntervalMinutes(visibility: "good" | "poor"): number {
  return visibility === "good" ? 60 : 15;
}

export function logRequired(): boolean {
  return true;
}

export function chartRequired(): boolean {
  return true;
}

export function leewayDeg(windBeaufort: number): number {
  return Math.min(15, Math.round(windBeaufort * 1.5));
}

export function etaHours(distanceNm: number, speedKnots: number): number {
  if (speedKnots <= 0) return Infinity;
  return Math.round(distanceNm / speedKnots * 10) / 10;
}

export function currentTypes(): CurrentType[] {
  return ["none", "following", "opposing", "crosswind", "tidal"];
}

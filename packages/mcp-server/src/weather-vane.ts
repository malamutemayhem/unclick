export type VaneStyle = "rooster" | "arrow" | "ship" | "horse" | "eagle" | "custom";
export type MountType = "roof_ridge" | "cupola" | "post" | "chimney";

export function compassBearing(degrees: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const idx = Math.round(((degrees % 360) + 360) % 360 / 22.5) % 16;
  return dirs[idx];
}

export function cardinalDirection(degrees: number): string {
  const norm = ((degrees % 360) + 360) % 360;
  if (norm < 45 || norm >= 315) return "N";
  if (norm < 135) return "E";
  if (norm < 225) return "S";
  return "W";
}

export function vaneLength(mountHeight: number): number {
  return parseFloat((mountHeight * 0.6).toFixed(1));
}

export function balancePoint(totalLengthCm: number): number {
  return parseFloat((totalLengthCm * 0.4).toFixed(1));
}

export function pointerWeight(vaneLengthCm: number, material: "copper" | "steel" | "aluminum"): number {
  const density: Record<string, number> = { copper: 0.15, steel: 0.18, aluminum: 0.06 };
  return parseFloat((vaneLengthCm * density[material]).toFixed(1));
}

export function mountingHeight(buildingHeightM: number): number {
  return parseFloat((buildingHeightM + 1.5).toFixed(1));
}

export function responseTime(vaneMassKg: number, windSpeedKmh: number): number {
  if (windSpeedKmh <= 0) return Infinity;
  return parseFloat((vaneMassKg * 10 / windSpeedKmh).toFixed(1));
}

export function minWindSpeed(vaneMassKg: number): number {
  return parseFloat((vaneMassKg * 5 + 3).toFixed(1));
}

export function bearingType(outdoorExposure: boolean): string {
  return outdoorExposure ? "sealed ball bearing" : "sleeve bearing";
}

export function lightningRodRequired(mountType: MountType): boolean {
  return mountType === "roof_ridge" || mountType === "cupola";
}

export function patinaDays(material: "copper" | "steel" | "aluminum"): number {
  const days: Record<string, number> = { copper: 365, steel: 30, aluminum: 0 };
  return days[material];
}

export function installationCost(mountType: MountType): number {
  const cost: Record<MountType, number> = {
    roof_ridge: 400, cupola: 600, post: 150, chimney: 350,
  };
  return cost[mountType];
}

export function vaneStyles(): VaneStyle[] {
  return ["rooster", "arrow", "ship", "horse", "eagle", "custom"];
}

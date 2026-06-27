export type ClimateZone = "tropical" | "arid" | "temperate" | "continental" | "polar";

export function avgTempCelsius(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 27, arid: 30, temperate: 15, continental: 5, polar: -20,
  };
  return m[zone];
}

export function annualRainfallMm(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 2000, arid: 250, temperate: 800, continental: 600, polar: 100,
  };
  return m[zone];
}

export function biodiversityIndex(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 10, arid: 3, temperate: 7, continental: 5, polar: 2,
  };
  return m[zone];
}

export function seasonalVariation(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 2, arid: 4, temperate: 7, continental: 10, polar: 8,
  };
  return m[zone];
}

export function agriculturalPotential(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 8, arid: 2, temperate: 9, continental: 6, polar: 1,
  };
  return m[zone];
}

export function permafrostPresent(zone: ClimateZone): boolean {
  const m: Record<ClimateZone, boolean> = {
    tropical: false, arid: false, temperate: false, continental: false, polar: true,
  };
  return m[zone];
}

export function yearRoundGrowing(zone: ClimateZone): boolean {
  const m: Record<ClimateZone, boolean> = {
    tropical: true, arid: false, temperate: false, continental: false, polar: false,
  };
  return m[zone];
}

export function koeppenPrefix(zone: ClimateZone): string {
  const m: Record<ClimateZone, string> = {
    tropical: "A", arid: "B", temperate: "C",
    continental: "D", polar: "E",
  };
  return m[zone];
}

export function populationDensity(zone: ClimateZone): number {
  const m: Record<ClimateZone, number> = {
    tropical: 7, arid: 2, temperate: 10, continental: 5, polar: 1,
  };
  return m[zone];
}

export function climateZones(): ClimateZone[] {
  return ["tropical", "arid", "temperate", "continental", "polar"];
}

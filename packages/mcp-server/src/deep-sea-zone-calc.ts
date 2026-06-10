export type DeepSeaZone = "epipelagic" | "mesopelagic" | "bathypelagic" | "abyssopelagic" | "hadopelagic";

export function depthRangeMeters(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 200, mesopelagic: 1000, bathypelagic: 4000, abyssopelagic: 6000, hadopelagic: 11000,
  };
  return m[zone];
}

export function lightLevel(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 10, mesopelagic: 3, bathypelagic: 0, abyssopelagic: 0, hadopelagic: 0,
  };
  return m[zone];
}

export function pressureAtm(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 20, mesopelagic: 100, bathypelagic: 400, abyssopelagic: 600, hadopelagic: 1100,
  };
  return m[zone];
}

export function biodiversity(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 10, mesopelagic: 6, bathypelagic: 4, abyssopelagic: 3, hadopelagic: 2,
  };
  return m[zone];
}

export function bioluminescence(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 1, mesopelagic: 8, bathypelagic: 9, abyssopelagic: 6, hadopelagic: 4,
  };
  return m[zone];
}

export function photosynthesisPossible(zone: DeepSeaZone): boolean {
  const m: Record<DeepSeaZone, boolean> = {
    epipelagic: true, mesopelagic: false, bathypelagic: false, abyssopelagic: false, hadopelagic: false,
  };
  return m[zone];
}

export function humanExplored(zone: DeepSeaZone): boolean {
  const m: Record<DeepSeaZone, boolean> = {
    epipelagic: true, mesopelagic: true, bathypelagic: true, abyssopelagic: true, hadopelagic: true,
  };
  return m[zone];
}

export function commonName(zone: DeepSeaZone): string {
  const m: Record<DeepSeaZone, string> = {
    epipelagic: "sunlight_zone", mesopelagic: "twilight_zone", bathypelagic: "midnight_zone",
    abyssopelagic: "abyssal_zone", hadopelagic: "hadal_zone",
  };
  return m[zone];
}

export function explorationDifficulty(zone: DeepSeaZone): number {
  const m: Record<DeepSeaZone, number> = {
    epipelagic: 1, mesopelagic: 4, bathypelagic: 7, abyssopelagic: 9, hadopelagic: 10,
  };
  return m[zone];
}

export function deepSeaZones(): DeepSeaZone[] {
  return ["epipelagic", "mesopelagic", "bathypelagic", "abyssopelagic", "hadopelagic"];
}

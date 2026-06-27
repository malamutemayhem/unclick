export type OceanZone = "epipelagic" | "mesopelagic" | "bathypelagic" | "abyssopelagic" | "hadopelagic";

export function depthMeters(z: OceanZone): number {
  const m: Record<OceanZone, number> = {
    epipelagic: 200, mesopelagic: 1000, bathypelagic: 4000, abyssopelagic: 6000, hadopelagic: 11000,
  };
  return m[z];
}

export function lightPenetration(z: OceanZone): number {
  const m: Record<OceanZone, number> = {
    epipelagic: 10, mesopelagic: 3, bathypelagic: 0, abyssopelagic: 0, hadopelagic: 0,
  };
  return m[z];
}

export function speciesDiversity(z: OceanZone): number {
  const m: Record<OceanZone, number> = {
    epipelagic: 10, mesopelagic: 7, bathypelagic: 4, abyssopelagic: 2, hadopelagic: 1,
  };
  return m[z];
}

export function pressureAtm(z: OceanZone): number {
  const m: Record<OceanZone, number> = {
    epipelagic: 20, mesopelagic: 100, bathypelagic: 400, abyssopelagic: 600, hadopelagic: 1100,
  };
  return m[z];
}

export function temperatureCelsius(z: OceanZone): number {
  const m: Record<OceanZone, number> = {
    epipelagic: 20, mesopelagic: 10, bathypelagic: 4, abyssopelagic: 2, hadopelagic: 1,
  };
  return m[z];
}

export function hasPhotosynthesis(z: OceanZone): boolean {
  const m: Record<OceanZone, boolean> = {
    epipelagic: true, mesopelagic: false, bathypelagic: false, abyssopelagic: false, hadopelagic: false,
  };
  return m[z];
}

export function bioluminescent(z: OceanZone): boolean {
  const m: Record<OceanZone, boolean> = {
    epipelagic: false, mesopelagic: true, bathypelagic: true, abyssopelagic: false, hadopelagic: false,
  };
  return m[z];
}

export function commonName(z: OceanZone): string {
  const m: Record<OceanZone, string> = {
    epipelagic: "sunlight_zone", mesopelagic: "twilight_zone",
    bathypelagic: "midnight_zone", abyssopelagic: "abyssal_zone",
    hadopelagic: "hadal_zone",
  };
  return m[z];
}

export function keyOrganism(z: OceanZone): string {
  const m: Record<OceanZone, string> = {
    epipelagic: "phytoplankton", mesopelagic: "lanternfish",
    bathypelagic: "anglerfish", abyssopelagic: "sea_cucumber",
    hadopelagic: "amphipod",
  };
  return m[z];
}

export function oceanZones(): OceanZone[] {
  return ["epipelagic", "mesopelagic", "bathypelagic", "abyssopelagic", "hadopelagic"];
}

export type OceanLayer = "epipelagic" | "mesopelagic" | "bathypelagic" | "abyssopelagic" | "hadopelagic";

export function depthRangeM(o: OceanLayer): number {
  const m: Record<OceanLayer, number> = {
    epipelagic: 200, mesopelagic: 1000, bathypelagic: 4000, abyssopelagic: 6000, hadopelagic: 11000,
  };
  return m[o];
}

export function lightLevel(o: OceanLayer): number {
  const m: Record<OceanLayer, number> = {
    epipelagic: 10, mesopelagic: 3, bathypelagic: 0, abyssopelagic: 0, hadopelagic: 0,
  };
  return m[o];
}

export function temperatureC(o: OceanLayer): number {
  const m: Record<OceanLayer, number> = {
    epipelagic: 20, mesopelagic: 5, bathypelagic: 2, abyssopelagic: 1, hadopelagic: 1,
  };
  return m[o];
}

export function pressureAtm(o: OceanLayer): number {
  const m: Record<OceanLayer, number> = {
    epipelagic: 20, mesopelagic: 100, bathypelagic: 400, abyssopelagic: 600, hadopelagic: 1100,
  };
  return m[o];
}

export function biodiversity(o: OceanLayer): number {
  const m: Record<OceanLayer, number> = {
    epipelagic: 10, mesopelagic: 6, bathypelagic: 3, abyssopelagic: 2, hadopelagic: 1,
  };
  return m[o];
}

export function photosynthesisPossible(o: OceanLayer): boolean {
  const m: Record<OceanLayer, boolean> = {
    epipelagic: true, mesopelagic: false, bathypelagic: false, abyssopelagic: false, hadopelagic: false,
  };
  return m[o];
}

export function humanExplored(o: OceanLayer): boolean {
  const m: Record<OceanLayer, boolean> = {
    epipelagic: true, mesopelagic: true, bathypelagic: true, abyssopelagic: true, hadopelagic: true,
  };
  return m[o];
}

export function commonName(o: OceanLayer): string {
  const m: Record<OceanLayer, string> = {
    epipelagic: "sunlight_zone", mesopelagic: "twilight_zone",
    bathypelagic: "midnight_zone", abyssopelagic: "abyssal_zone",
    hadopelagic: "hadal_zone",
  };
  return m[o];
}

export function typicalOrganism(o: OceanLayer): string {
  const m: Record<OceanLayer, string> = {
    epipelagic: "tuna_coral", mesopelagic: "lanternfish_jellyfish",
    bathypelagic: "anglerfish_squid", abyssopelagic: "sea_cucumber_worm",
    hadopelagic: "amphipod_snailfish",
  };
  return m[o];
}

export function oceanLayers(): OceanLayer[] {
  return ["epipelagic", "mesopelagic", "bathypelagic", "abyssopelagic", "hadopelagic"];
}

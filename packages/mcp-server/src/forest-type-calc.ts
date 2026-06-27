export type ForestType = "tropical_dry" | "temperate_deciduous" | "boreal" | "cloud" | "kelp";

export function canopyHeightMeters(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 20, temperate_deciduous: 30, boreal: 15, cloud: 25, kelp: 40,
  };
  return m[forest];
}

export function speciesPerHectare(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 150, temperate_deciduous: 50, boreal: 20, cloud: 200, kelp: 80,
  };
  return m[forest];
}

export function annualGrowthRate(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 5, temperate_deciduous: 6, boreal: 3, cloud: 4, kelp: 10,
  };
  return m[forest];
}

export function carbonDensity(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 6, temperate_deciduous: 7, boreal: 8, cloud: 9, kelp: 5,
  };
  return m[forest];
}

export function waterCycleImpact(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 5, temperate_deciduous: 7, boreal: 6, cloud: 10, kelp: 3,
  };
  return m[forest];
}

export function deciduous(forest: ForestType): boolean {
  const m: Record<ForestType, boolean> = {
    tropical_dry: true, temperate_deciduous: true, boreal: false, cloud: false, kelp: false,
  };
  return m[forest];
}

export function aquatic(forest: ForestType): boolean {
  const m: Record<ForestType, boolean> = {
    tropical_dry: false, temperate_deciduous: false, boreal: false, cloud: false, kelp: true,
  };
  return m[forest];
}

export function keySpecies(forest: ForestType): string {
  const m: Record<ForestType, string> = {
    tropical_dry: "teak", temperate_deciduous: "oak", boreal: "spruce",
    cloud: "tree_fern", kelp: "giant_kelp",
  };
  return m[forest];
}

export function threatLevel(forest: ForestType): number {
  const m: Record<ForestType, number> = {
    tropical_dry: 9, temperate_deciduous: 5, boreal: 6, cloud: 8, kelp: 7,
  };
  return m[forest];
}

export function forestTypes(): ForestType[] {
  return ["tropical_dry", "temperate_deciduous", "boreal", "cloud", "kelp"];
}

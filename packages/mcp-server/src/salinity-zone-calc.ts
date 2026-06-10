export type SalinityZone = "freshwater" | "brackish" | "marine" | "hypersaline" | "brine_pool";

export function salinityPpt(z: SalinityZone): number {
  const m: Record<SalinityZone, number> = {
    freshwater: 0.5, brackish: 15, marine: 35, hypersaline: 80, brine_pool: 250,
  };
  return m[z];
}

export function speciesAdaptation(z: SalinityZone): number {
  const m: Record<SalinityZone, number> = {
    freshwater: 8, brackish: 5, marine: 10, hypersaline: 3, brine_pool: 1,
  };
  return m[z];
}

export function oxygenContent(z: SalinityZone): number {
  const m: Record<SalinityZone, number> = {
    freshwater: 9, brackish: 7, marine: 8, hypersaline: 4, brine_pool: 1,
  };
  return m[z];
}

export function evaporationRate(z: SalinityZone): number {
  const m: Record<SalinityZone, number> = {
    freshwater: 3, brackish: 5, marine: 6, hypersaline: 9, brine_pool: 10,
  };
  return m[z];
}

export function humanUsability(z: SalinityZone): number {
  const m: Record<SalinityZone, number> = {
    freshwater: 10, brackish: 4, marine: 2, hypersaline: 1, brine_pool: 0,
  };
  return m[z];
}

export function drinkable(z: SalinityZone): boolean {
  const m: Record<SalinityZone, boolean> = {
    freshwater: true, brackish: false, marine: false, hypersaline: false, brine_pool: false,
  };
  return m[z];
}

export function supportsCoralReefs(z: SalinityZone): boolean {
  const m: Record<SalinityZone, boolean> = {
    freshwater: false, brackish: false, marine: true, hypersaline: false, brine_pool: false,
  };
  return m[z];
}

export function typicalEnvironment(z: SalinityZone): string {
  const m: Record<SalinityZone, string> = {
    freshwater: "river", brackish: "estuary", marine: "open_ocean",
    hypersaline: "salt_lake", brine_pool: "deep_sea_floor",
  };
  return m[z];
}

export function keySpecies(z: SalinityZone): string {
  const m: Record<SalinityZone, string> = {
    freshwater: "trout", brackish: "mangrove", marine: "coral",
    hypersaline: "brine_shrimp", brine_pool: "extremophile_bacteria",
  };
  return m[z];
}

export function salinityZones(): SalinityZone[] {
  return ["freshwater", "brackish", "marine", "hypersaline", "brine_pool"];
}

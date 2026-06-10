export type GrasslandType = "savanna" | "steppe" | "prairie" | "pampas" | "veld";

export function rainfallMmPerYear(gl: GrasslandType): number {
  const m: Record<GrasslandType, number> = {
    savanna: 900, steppe: 350, prairie: 600, pampas: 1000, veld: 700,
  };
  return m[gl];
}

export function grassHeightMeters(gl: GrasslandType): number {
  const m: Record<GrasslandType, number> = {
    savanna: 2, steppe: 0.3, prairie: 1.5, pampas: 1, veld: 0.8,
  };
  return m[gl];
}

export function biodiversityScore(gl: GrasslandType): number {
  const m: Record<GrasslandType, number> = {
    savanna: 10, steppe: 4, prairie: 7, pampas: 6, veld: 8,
  };
  return m[gl];
}

export function soilFertility(gl: GrasslandType): number {
  const m: Record<GrasslandType, number> = {
    savanna: 5, steppe: 7, prairie: 10, pampas: 9, veld: 6,
  };
  return m[gl];
}

export function fireFrequencyYears(gl: GrasslandType): number {
  const m: Record<GrasslandType, number> = {
    savanna: 2, steppe: 5, prairie: 3, pampas: 10, veld: 4,
  };
  return m[gl];
}

export function hasScatteredTrees(gl: GrasslandType): boolean {
  const m: Record<GrasslandType, boolean> = {
    savanna: true, steppe: false, prairie: false, pampas: false, veld: true,
  };
  return m[gl];
}

export function agriculturalConversion(gl: GrasslandType): boolean {
  const m: Record<GrasslandType, boolean> = {
    savanna: false, steppe: true, prairie: true, pampas: true, veld: false,
  };
  return m[gl];
}

export function iconicAnimal(gl: GrasslandType): string {
  const m: Record<GrasslandType, string> = {
    savanna: "lion", steppe: "saiga_antelope", prairie: "bison",
    pampas: "rhea", veld: "springbok",
  };
  return m[gl];
}

export function continentLocation(gl: GrasslandType): string {
  const m: Record<GrasslandType, string> = {
    savanna: "africa", steppe: "central_asia", prairie: "north_america",
    pampas: "south_america", veld: "southern_africa",
  };
  return m[gl];
}

export function grasslandTypes(): GrasslandType[] {
  return ["savanna", "steppe", "prairie", "pampas", "veld"];
}

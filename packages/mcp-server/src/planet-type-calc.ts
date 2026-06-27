export type PlanetType = "terrestrial" | "gas_giant" | "ice_giant" | "dwarf" | "super_earth";

export function radiusKm(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 6371, gas_giant: 69911, ice_giant: 25362, dwarf: 1188, super_earth: 12000,
  };
  return m[planet];
}

export function massEarths(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 1, gas_giant: 318, ice_giant: 14.5, dwarf: 0.002, super_earth: 5,
  };
  return m[planet];
}

export function surfaceGravity(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 9.8, gas_giant: 24.8, ice_giant: 8.9, dwarf: 0.6, super_earth: 15,
  };
  return m[planet];
}

export function atmosphereDensity(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 5, gas_giant: 10, ice_giant: 8, dwarf: 1, super_earth: 7,
  };
  return m[planet];
}

export function magneticFieldStrength(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 5, gas_giant: 10, ice_giant: 4, dwarf: 1, super_earth: 7,
  };
  return m[planet];
}

export function solidSurface(planet: PlanetType): boolean {
  const m: Record<PlanetType, boolean> = {
    terrestrial: true, gas_giant: false, ice_giant: false, dwarf: true, super_earth: true,
  };
  return m[planet];
}

export function hasRings(planet: PlanetType): boolean {
  const m: Record<PlanetType, boolean> = {
    terrestrial: false, gas_giant: true, ice_giant: true, dwarf: false, super_earth: false,
  };
  return m[planet];
}

export function exampleBody(planet: PlanetType): string {
  const m: Record<PlanetType, string> = {
    terrestrial: "earth", gas_giant: "jupiter", ice_giant: "neptune",
    dwarf: "pluto", super_earth: "kepler_442b",
  };
  return m[planet];
}

export function habitabilityScore(planet: PlanetType): number {
  const m: Record<PlanetType, number> = {
    terrestrial: 8, gas_giant: 1, ice_giant: 2, dwarf: 3, super_earth: 7,
  };
  return m[planet];
}

export function planetTypes(): PlanetType[] {
  return ["terrestrial", "gas_giant", "ice_giant", "dwarf", "super_earth"];
}

export type ForgeFuel = "bituminous_coal" | "charcoal" | "propane" | "coke" | "anthracite";

export function maxTempCelsius(fuel: ForgeFuel): number {
  const t: Record<ForgeFuel, number> = {
    bituminous_coal: 1500, charcoal: 1400, propane: 1200, coke: 1600, anthracite: 1550,
  };
  return t[fuel];
}

export function burnDurationHours(fuel: ForgeFuel): number {
  const b: Record<ForgeFuel, number> = {
    bituminous_coal: 4, charcoal: 2, propane: 8, coke: 6, anthracite: 5,
  };
  return b[fuel];
}

export function smokeLevel(fuel: ForgeFuel): number {
  const s: Record<ForgeFuel, number> = {
    bituminous_coal: 9, charcoal: 3, propane: 1, coke: 4, anthracite: 2,
  };
  return s[fuel];
}

export function ashProduction(fuel: ForgeFuel): number {
  const a: Record<ForgeFuel, number> = {
    bituminous_coal: 8, charcoal: 3, propane: 0, coke: 5, anthracite: 4,
  };
  return a[fuel];
}

export function controlEase(fuel: ForgeFuel): number {
  const c: Record<ForgeFuel, number> = {
    bituminous_coal: 5, charcoal: 4, propane: 10, coke: 6, anthracite: 7,
  };
  return c[fuel];
}

export function indoorSafe(fuel: ForgeFuel): boolean {
  const i: Record<ForgeFuel, boolean> = {
    bituminous_coal: false, charcoal: false, propane: true, coke: false, anthracite: false,
  };
  return i[fuel];
}

export function bestForgeType(fuel: ForgeFuel): string {
  const b: Record<ForgeFuel, string> = {
    bituminous_coal: "side_blast", charcoal: "bottom_blast", propane: "gas_forge",
    coke: "industrial", anthracite: "side_blast",
  };
  return b[fuel];
}

export function scaleCausation(fuel: ForgeFuel): number {
  const s: Record<ForgeFuel, number> = {
    bituminous_coal: 7, charcoal: 3, propane: 5, coke: 6, anthracite: 4,
  };
  return s[fuel];
}

export function costPerKg(fuel: ForgeFuel): number {
  const c: Record<ForgeFuel, number> = {
    bituminous_coal: 0.5, charcoal: 2, propane: 1.5, coke: 0.8, anthracite: 0.7,
  };
  return c[fuel];
}

export function forgeFuels(): ForgeFuel[] {
  return ["bituminous_coal", "charcoal", "propane", "coke", "anthracite"];
}

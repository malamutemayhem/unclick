export type SpiceType = "cumin" | "turmeric" | "cinnamon" | "saffron" | "black_pepper";

export function scovilleHeat(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 500, turmeric: 0, cinnamon: 50000, saffron: 0, black_pepper: 100000,
  };
  return m[spice];
}

export function colorIntensity(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 4, turmeric: 10, cinnamon: 5, saffron: 10, black_pepper: 2,
  };
  return m[spice];
}

export function aromaStrength(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 8, turmeric: 5, cinnamon: 9, saffron: 7, black_pepper: 6,
  };
  return m[spice];
}

export function versatility(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 8, turmeric: 7, cinnamon: 9, saffron: 4, black_pepper: 10,
  };
  return m[spice];
}

export function shelfLifeMonths(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 36, turmeric: 36, cinnamon: 48, saffron: 24, black_pepper: 48,
  };
  return m[spice];
}

export function wholeForm(spice: SpiceType): boolean {
  const m: Record<SpiceType, boolean> = {
    cumin: true, turmeric: true, cinnamon: true, saffron: true, black_pepper: true,
  };
  return m[spice];
}

export function usedInDesserts(spice: SpiceType): boolean {
  const m: Record<SpiceType, boolean> = {
    cumin: false, turmeric: false, cinnamon: true, saffron: true, black_pepper: false,
  };
  return m[spice];
}

export function originRegion(spice: SpiceType): string {
  const m: Record<SpiceType, string> = {
    cumin: "middle_east", turmeric: "south_asia", cinnamon: "sri_lanka",
    saffron: "iran", black_pepper: "india",
  };
  return m[spice];
}

export function pricePerKg(spice: SpiceType): number {
  const m: Record<SpiceType, number> = {
    cumin: 15, turmeric: 10, cinnamon: 20, saffron: 5000, black_pepper: 25,
  };
  return m[spice];
}

export function spiceTypes(): SpiceType[] {
  return ["cumin", "turmeric", "cinnamon", "saffron", "black_pepper"];
}

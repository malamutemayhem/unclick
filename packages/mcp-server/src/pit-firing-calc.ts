export type PitFiringFuel = "wood" | "sawdust" | "dung" | "straw" | "charcoal";

export function maxTempCelsius(fuel: PitFiringFuel): number {
  const t: Record<PitFiringFuel, number> = {
    wood: 900, sawdust: 700, dung: 650, straw: 600, charcoal: 1000,
  };
  return t[fuel];
}

export function burnTimeHours(fuel: PitFiringFuel): number {
  const h: Record<PitFiringFuel, number> = {
    wood: 8, sawdust: 12, dung: 10, straw: 4, charcoal: 14,
  };
  return h[fuel];
}

export function smokeLevel(fuel: PitFiringFuel): number {
  const s: Record<PitFiringFuel, number> = {
    wood: 7, sawdust: 8, dung: 9, straw: 6, charcoal: 3,
  };
  return s[fuel];
}

export function colorVariation(fuel: PitFiringFuel): number {
  const c: Record<PitFiringFuel, number> = {
    wood: 7, sawdust: 8, dung: 6, straw: 5, charcoal: 4,
  };
  return c[fuel];
}

export function carbonTrapping(fuel: PitFiringFuel): number {
  const c: Record<PitFiringFuel, number> = {
    wood: 6, sawdust: 9, dung: 7, straw: 4, charcoal: 8,
  };
  return c[fuel];
}

export function ashGlazeEffect(fuel: PitFiringFuel): number {
  const a: Record<PitFiringFuel, number> = {
    wood: 8, sawdust: 3, dung: 2, straw: 4, charcoal: 1,
  };
  return a[fuel];
}

export function pitDepthCm(fuel: PitFiringFuel): number {
  const d: Record<PitFiringFuel, number> = {
    wood: 60, sawdust: 40, dung: 50, straw: 30, charcoal: 45,
  };
  return d[fuel];
}

export function predictability(fuel: PitFiringFuel): number {
  const p: Record<PitFiringFuel, number> = {
    wood: 5, sawdust: 4, dung: 3, straw: 2, charcoal: 7,
  };
  return p[fuel];
}

export function costPerFiring(fuel: PitFiringFuel): number {
  const c: Record<PitFiringFuel, number> = {
    wood: 15, sawdust: 8, dung: 3, straw: 5, charcoal: 20,
  };
  return c[fuel];
}

export function pitFiringFuels(): PitFiringFuel[] {
  return ["wood", "sawdust", "dung", "straw", "charcoal"];
}

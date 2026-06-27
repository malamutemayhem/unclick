export type OarWood = "spruce" | "ash" | "cherry" | "cedar" | "basswood";

export function weightKgPerMeter(wood: OarWood): number {
  const w: Record<OarWood, number> = {
    spruce: 0.8, ash: 1.2, cherry: 1.1, cedar: 0.7, basswood: 0.9,
  };
  return w[wood];
}

export function flexRating(wood: OarWood): number {
  const f: Record<OarWood, number> = {
    spruce: 8, ash: 9, cherry: 6, cedar: 5, basswood: 4,
  };
  return f[wood];
}

export function durability(wood: OarWood): number {
  const d: Record<OarWood, number> = {
    spruce: 5, ash: 9, cherry: 7, cedar: 4, basswood: 3,
  };
  return d[wood];
}

export function bladeAreaCm2(wood: OarWood): number {
  const a: Record<OarWood, number> = {
    spruce: 600, ash: 700, cherry: 650, cedar: 550, basswood: 500,
  };
  return a[wood];
}

export function finishCoatsNeeded(wood: OarWood): number {
  const f: Record<OarWood, number> = {
    spruce: 4, ash: 3, cherry: 3, cedar: 5, basswood: 4,
  };
  return f[wood];
}

export function waterResistance(wood: OarWood): number {
  const w: Record<OarWood, number> = {
    spruce: 5, ash: 7, cherry: 8, cedar: 9, basswood: 3,
  };
  return w[wood];
}

export function carveability(wood: OarWood): number {
  const c: Record<OarWood, number> = {
    spruce: 6, ash: 4, cherry: 7, cedar: 8, basswood: 10,
  };
  return c[wood];
}

export function grainBeauty(wood: OarWood): number {
  const g: Record<OarWood, number> = {
    spruce: 5, ash: 8, cherry: 9, cedar: 6, basswood: 3,
  };
  return g[wood];
}

export function costPerBlank(wood: OarWood): number {
  const c: Record<OarWood, number> = {
    spruce: 30, ash: 45, cherry: 60, cedar: 35, basswood: 25,
  };
  return c[wood];
}

export function oarWoods(): OarWood[] {
  return ["spruce", "ash", "cherry", "cedar", "basswood"];
}

export type WhorlMaterial = "clay" | "stone" | "bone" | "wood" | "metal";

export function weightGrams(mat: WhorlMaterial): number {
  const w: Record<WhorlMaterial, number> = {
    clay: 30, stone: 50, bone: 20, wood: 15, metal: 40,
  };
  return w[mat];
}

export function diameterCm(mat: WhorlMaterial): number {
  const d: Record<WhorlMaterial, number> = {
    clay: 5, stone: 4, bone: 3, wood: 6, metal: 3.5,
  };
  return d[mat];
}

export function spinDurationSeconds(mat: WhorlMaterial): number {
  const s: Record<WhorlMaterial, number> = {
    clay: 45, stone: 60, bone: 30, wood: 25, metal: 55,
  };
  return s[mat];
}

export function threadFineness(mat: WhorlMaterial): number {
  const t: Record<WhorlMaterial, number> = {
    clay: 5, stone: 7, bone: 8, wood: 3, metal: 9,
  };
  return t[mat];
}

export function durabilityRating(mat: WhorlMaterial): number {
  const d: Record<WhorlMaterial, number> = {
    clay: 4, stone: 9, bone: 5, wood: 3, metal: 10,
  };
  return d[mat];
}

export function decorated(mat: WhorlMaterial): boolean {
  const d: Record<WhorlMaterial, boolean> = {
    clay: true, stone: true, bone: true, wood: false, metal: true,
  };
  return d[mat];
}

export function archaeologicalFrequency(mat: WhorlMaterial): number {
  const a: Record<WhorlMaterial, number> = {
    clay: 10, stone: 7, bone: 4, wood: 1, metal: 3,
  };
  return a[mat];
}

export function bestForFiber(mat: WhorlMaterial): string {
  const b: Record<WhorlMaterial, string> = {
    clay: "wool", stone: "flax", bone: "silk", wood: "cotton", metal: "fine_wool",
  };
  return b[mat];
}

export function costEstimate(mat: WhorlMaterial): number {
  const c: Record<WhorlMaterial, number> = {
    clay: 5, stone: 15, bone: 20, wood: 3, metal: 25,
  };
  return c[mat];
}

export function whorlMaterials(): WhorlMaterial[] {
  return ["clay", "stone", "bone", "wood", "metal"];
}

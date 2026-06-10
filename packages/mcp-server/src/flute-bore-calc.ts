export type FluteMaterial = "bamboo" | "silver" | "wood" | "bone" | "clay";

export function boreDiameterMm(mat: FluteMaterial): number {
  const b: Record<FluteMaterial, number> = {
    bamboo: 18, silver: 19, wood: 17, bone: 12, clay: 15,
  };
  return b[mat];
}

export function toneWarmth(mat: FluteMaterial): number {
  const t: Record<FluteMaterial, number> = {
    bamboo: 8, silver: 4, wood: 9, bone: 6, clay: 7,
  };
  return t[mat];
}

export function projectionDistance(mat: FluteMaterial): number {
  const p: Record<FluteMaterial, number> = {
    bamboo: 5, silver: 10, wood: 6, bone: 4, clay: 3,
  };
  return p[mat];
}

export function breathResistance(mat: FluteMaterial): number {
  const b: Record<FluteMaterial, number> = {
    bamboo: 4, silver: 3, wood: 5, bone: 7, clay: 6,
  };
  return b[mat];
}

export function weightGrams(mat: FluteMaterial): number {
  const w: Record<FluteMaterial, number> = {
    bamboo: 80, silver: 450, wood: 200, bone: 150, clay: 300,
  };
  return w[mat];
}

export function moistureSensitive(mat: FluteMaterial): boolean {
  const m: Record<FluteMaterial, boolean> = {
    bamboo: true, silver: false, wood: true, bone: true, clay: false,
  };
  return m[mat];
}

export function octaveRange(mat: FluteMaterial): number {
  const o: Record<FluteMaterial, number> = {
    bamboo: 2, silver: 3, wood: 2.5, bone: 1.5, clay: 1.5,
  };
  return o[mat];
}

export function culturalOrigin(mat: FluteMaterial): string {
  const c: Record<FluteMaterial, string> = {
    bamboo: "asian", silver: "european", wood: "celtic",
    bone: "prehistoric", clay: "mesoamerican",
  };
  return c[mat];
}

export function costEstimate(mat: FluteMaterial): number {
  const c: Record<FluteMaterial, number> = {
    bamboo: 30, silver: 2000, wood: 300, bone: 100, clay: 50,
  };
  return c[mat];
}

export function fluteMaterials(): FluteMaterial[] {
  return ["bamboo", "silver", "wood", "bone", "clay"];
}

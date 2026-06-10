export type PanFluteMaterial = "bamboo" | "cane" | "wood" | "glass" | "metal";

export function tubeLengthCmForC4(mat: PanFluteMaterial): number {
  const l: Record<PanFluteMaterial, number> = {
    bamboo: 16.5, cane: 16.8, wood: 17.0, glass: 16.2, metal: 16.0,
  };
  return l[mat];
}

export function toneBrightness(mat: PanFluteMaterial): number {
  const t: Record<PanFluteMaterial, number> = {
    bamboo: 6, cane: 5, wood: 4, glass: 9, metal: 8,
  };
  return t[mat];
}

export function warmth(mat: PanFluteMaterial): number {
  const w: Record<PanFluteMaterial, number> = {
    bamboo: 8, cane: 9, wood: 7, glass: 3, metal: 4,
  };
  return w[mat];
}

export function breathResponse(mat: PanFluteMaterial): number {
  const b: Record<PanFluteMaterial, number> = {
    bamboo: 8, cane: 7, wood: 5, glass: 6, metal: 9,
  };
  return b[mat];
}

export function durability(mat: PanFluteMaterial): number {
  const d: Record<PanFluteMaterial, number> = {
    bamboo: 4, cane: 3, wood: 7, glass: 2, metal: 9,
  };
  return d[mat];
}

export function moistureSensitive(mat: PanFluteMaterial): boolean {
  return mat === "bamboo" || mat === "cane" || mat === "wood";
}

export function weightGrams(mat: PanFluteMaterial): number {
  const w: Record<PanFluteMaterial, number> = {
    bamboo: 150, cane: 140, wood: 300, glass: 400, metal: 500,
  };
  return w[mat];
}

export function tuningStability(mat: PanFluteMaterial): number {
  const t: Record<PanFluteMaterial, number> = {
    bamboo: 5, cane: 4, wood: 6, glass: 8, metal: 9,
  };
  return t[mat];
}

export function costEstimate(mat: PanFluteMaterial): number {
  const c: Record<PanFluteMaterial, number> = {
    bamboo: 30, cane: 25, wood: 80, glass: 200, metal: 150,
  };
  return c[mat];
}

export function panFluteMaterials(): PanFluteMaterial[] {
  return ["bamboo", "cane", "wood", "glass", "metal"];
}

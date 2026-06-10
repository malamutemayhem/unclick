export type SaggerMaterial = "clay" | "stoneware" | "silicon_carbide" | "mullite" | "cordierite";

export function maxTempCelsius(mat: SaggerMaterial): number {
  const t: Record<SaggerMaterial, number> = {
    clay: 1100, stoneware: 1280, silicon_carbide: 1600, mullite: 1500, cordierite: 1350,
  };
  return t[mat];
}

export function thermalShockResistance(mat: SaggerMaterial): number {
  const r: Record<SaggerMaterial, number> = {
    clay: 3, stoneware: 5, silicon_carbide: 9, mullite: 7, cordierite: 10,
  };
  return r[mat];
}

export function firingCycles(mat: SaggerMaterial): number {
  const c: Record<SaggerMaterial, number> = {
    clay: 5, stoneware: 15, silicon_carbide: 100, mullite: 60, cordierite: 80,
  };
  return c[mat];
}

export function weightKg(mat: SaggerMaterial): number {
  const w: Record<SaggerMaterial, number> = {
    clay: 3, stoneware: 4, silicon_carbide: 6, mullite: 5, cordierite: 3.5,
  };
  return w[mat];
}

export function porosity(mat: SaggerMaterial): number {
  const p: Record<SaggerMaterial, number> = {
    clay: 8, stoneware: 4, silicon_carbide: 1, mullite: 2, cordierite: 3,
  };
  return p[mat];
}

export function fumingEffect(mat: SaggerMaterial): boolean {
  const f: Record<SaggerMaterial, boolean> = {
    clay: true, stoneware: true, silicon_carbide: false, mullite: false, cordierite: false,
  };
  return f[mat];
}

export function handBuildable(mat: SaggerMaterial): boolean {
  const h: Record<SaggerMaterial, boolean> = {
    clay: true, stoneware: true, silicon_carbide: false, mullite: false, cordierite: false,
  };
  return h[mat];
}

export function bestUse(mat: SaggerMaterial): string {
  const b: Record<SaggerMaterial, string> = {
    clay: "decorative_fuming", stoneware: "general_saggers", silicon_carbide: "industrial",
    mullite: "high_temp", cordierite: "thermal_cycling",
  };
  return b[mat];
}

export function costPerUnit(mat: SaggerMaterial): number {
  const c: Record<SaggerMaterial, number> = {
    clay: 5, stoneware: 15, silicon_carbide: 80, mullite: 50, cordierite: 60,
  };
  return c[mat];
}

export function saggerMaterials(): SaggerMaterial[] {
  return ["clay", "stoneware", "silicon_carbide", "mullite", "cordierite"];
}

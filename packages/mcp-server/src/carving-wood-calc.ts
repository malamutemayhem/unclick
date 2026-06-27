export type CarvingWood = "basswood" | "butternut" | "walnut" | "cherry" | "mahogany";

export function hardnessJanka(wood: CarvingWood): number {
  const h: Record<CarvingWood, number> = {
    basswood: 410, butternut: 490, walnut: 1010, cherry: 950, mahogany: 800,
  };
  return h[wood];
}

export function grainConsistency(wood: CarvingWood): number {
  const g: Record<CarvingWood, number> = {
    basswood: 10, butternut: 8, walnut: 7, cherry: 8, mahogany: 9,
  };
  return g[wood];
}

export function detailHolding(wood: CarvingWood): number {
  const d: Record<CarvingWood, number> = {
    basswood: 9, butternut: 7, walnut: 8, cherry: 8, mahogany: 9,
  };
  return d[wood];
}

export function splittingResistance(wood: CarvingWood): number {
  const s: Record<CarvingWood, number> = {
    basswood: 7, butternut: 5, walnut: 8, cherry: 7, mahogany: 9,
  };
  return s[wood];
}

export function finishQuality(wood: CarvingWood): number {
  const f: Record<CarvingWood, number> = {
    basswood: 6, butternut: 7, walnut: 10, cherry: 9, mahogany: 10,
  };
  return f[wood];
}

export function paintable(wood: CarvingWood): boolean {
  const p: Record<CarvingWood, boolean> = {
    basswood: true, butternut: true, walnut: false, cherry: false, mahogany: false,
  };
  return p[wood];
}

export function bestProject(wood: CarvingWood): string {
  const b: Record<CarvingWood, string> = {
    basswood: "figurines", butternut: "relief_panels", walnut: "furniture_details",
    cherry: "decorative_boxes", mahogany: "sculptures",
  };
  return b[wood];
}

export function toolEdgeRetention(wood: CarvingWood): number {
  const t: Record<CarvingWood, number> = {
    basswood: 9, butternut: 8, walnut: 5, cherry: 6, mahogany: 7,
  };
  return t[wood];
}

export function costPerBoardFoot(wood: CarvingWood): number {
  const c: Record<CarvingWood, number> = {
    basswood: 6, butternut: 8, walnut: 12, cherry: 10, mahogany: 15,
  };
  return c[wood];
}

export function carvingWoods(): CarvingWood[] {
  return ["basswood", "butternut", "walnut", "cherry", "mahogany"];
}

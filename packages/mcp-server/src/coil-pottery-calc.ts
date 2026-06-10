export type CoilTechnique = "traditional" | "pinch_coil" | "slab_coil" | "extruded" | "rope_coil";

export function wallThicknessMm(technique: CoilTechnique): number {
  const w: Record<CoilTechnique, number> = {
    traditional: 8, pinch_coil: 6, slab_coil: 10, extruded: 5, rope_coil: 12,
  };
  return w[technique];
}

export function maxHeightCm(technique: CoilTechnique): number {
  const h: Record<CoilTechnique, number> = {
    traditional: 60, pinch_coil: 30, slab_coil: 80, extruded: 100, rope_coil: 50,
  };
  return h[technique];
}

export function buildTimeHours(technique: CoilTechnique): number {
  const t: Record<CoilTechnique, number> = {
    traditional: 4, pinch_coil: 2, slab_coil: 5, extruded: 1, rope_coil: 3,
  };
  return t[technique];
}

export function surfaceSmoothness(technique: CoilTechnique): number {
  const s: Record<CoilTechnique, number> = {
    traditional: 6, pinch_coil: 5, slab_coil: 7, extruded: 9, rope_coil: 3,
  };
  return s[technique];
}

export function strengthRating(technique: CoilTechnique): number {
  const s: Record<CoilTechnique, number> = {
    traditional: 7, pinch_coil: 5, slab_coil: 8, extruded: 6, rope_coil: 9,
  };
  return s[technique];
}

export function toolsNeeded(technique: CoilTechnique): number {
  const t: Record<CoilTechnique, number> = {
    traditional: 3, pinch_coil: 2, slab_coil: 5, extruded: 6, rope_coil: 2,
  };
  return t[technique];
}

export function decorativeTexture(technique: CoilTechnique): boolean {
  const d: Record<CoilTechnique, boolean> = {
    traditional: false, pinch_coil: true, slab_coil: false, extruded: false, rope_coil: true,
  };
  return d[technique];
}

export function beginnerSuitable(technique: CoilTechnique): boolean {
  const b: Record<CoilTechnique, boolean> = {
    traditional: true, pinch_coil: true, slab_coil: false, extruded: false, rope_coil: true,
  };
  return b[technique];
}

export function costRating(technique: CoilTechnique): number {
  const c: Record<CoilTechnique, number> = {
    traditional: 2, pinch_coil: 1, slab_coil: 3, extruded: 7, rope_coil: 1,
  };
  return c[technique];
}

export function coilTechniques(): CoilTechnique[] {
  return ["traditional", "pinch_coil", "slab_coil", "extruded", "rope_coil"];
}

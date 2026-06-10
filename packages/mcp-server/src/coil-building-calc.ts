export type CoilTechnique = "basic_coil" | "pinch_coil" | "slab_coil" | "rope_coil" | "extruded_coil";

export function coilDiameterCm(tech: CoilTechnique): number {
  const d: Record<CoilTechnique, number> = {
    basic_coil: 2, pinch_coil: 1.5, slab_coil: 3, rope_coil: 4, extruded_coil: 2.5,
  };
  return d[tech];
}

export function wallThicknessCm(tech: CoilTechnique): number {
  const w: Record<CoilTechnique, number> = {
    basic_coil: 1.0, pinch_coil: 0.6, slab_coil: 1.2, rope_coil: 1.5, extruded_coil: 0.8,
  };
  return w[tech];
}

export function maxHeightCm(tech: CoilTechnique): number {
  const h: Record<CoilTechnique, number> = {
    basic_coil: 40, pinch_coil: 25, slab_coil: 60, rope_coil: 80, extruded_coil: 50,
  };
  return h[tech];
}

export function joinStrength(tech: CoilTechnique): number {
  const j: Record<CoilTechnique, number> = {
    basic_coil: 6, pinch_coil: 8, slab_coil: 7, rope_coil: 5, extruded_coil: 7,
  };
  return j[tech];
}

export function surfaceSmoothness(tech: CoilTechnique): number {
  const s: Record<CoilTechnique, number> = {
    basic_coil: 5, pinch_coil: 7, slab_coil: 8, rope_coil: 3, extruded_coil: 9,
  };
  return s[tech];
}

export function textureVisible(tech: CoilTechnique): boolean {
  return tech === "rope_coil" || tech === "basic_coil";
}

export function buildSpeedRating(tech: CoilTechnique): number {
  const s: Record<CoilTechnique, number> = {
    basic_coil: 5, pinch_coil: 3, slab_coil: 7, rope_coil: 6, extruded_coil: 8,
  };
  return s[tech];
}

export function beginnerFriendly(tech: CoilTechnique): number {
  const b: Record<CoilTechnique, number> = {
    basic_coil: 9, pinch_coil: 7, slab_coil: 6, rope_coil: 8, extruded_coil: 5,
  };
  return b[tech];
}

export function toolsRequired(tech: CoilTechnique): number {
  const t: Record<CoilTechnique, number> = {
    basic_coil: 2, pinch_coil: 1, slab_coil: 4, rope_coil: 2, extruded_coil: 3,
  };
  return t[tech];
}

export function coilTechniques(): CoilTechnique[] {
  return ["basic_coil", "pinch_coil", "slab_coil", "rope_coil", "extruded_coil"];
}

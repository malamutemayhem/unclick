export type SlabTechnique = "soft_slab" | "hard_slab" | "draped_slab" | "textured_slab" | "laminated_slab";

export function thicknessMm(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 6, hard_slab: 10, draped_slab: 5, textured_slab: 8, laminated_slab: 12,
  };
  return m[technique];
}

export function workTimeMinutes(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 15, hard_slab: 30, draped_slab: 20, textured_slab: 25, laminated_slab: 45,
  };
  return m[technique];
}

export function warpingRisk(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 7, hard_slab: 3, draped_slab: 5, textured_slab: 4, laminated_slab: 2,
  };
  return m[technique];
}

export function surfaceDetail(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 4, hard_slab: 6, draped_slab: 5, textured_slab: 9, laminated_slab: 8,
  };
  return m[technique];
}

export function structuralStrength(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 4, hard_slab: 8, draped_slab: 5, textured_slab: 6, laminated_slab: 9,
  };
  return m[technique];
}

export function moldRequired(technique: SlabTechnique): boolean {
  const m: Record<SlabTechnique, boolean> = {
    soft_slab: false, hard_slab: false, draped_slab: true, textured_slab: false, laminated_slab: false,
  };
  return m[technique];
}

export function joinable(technique: SlabTechnique): boolean {
  const m: Record<SlabTechnique, boolean> = {
    soft_slab: true, hard_slab: true, draped_slab: false, textured_slab: true, laminated_slab: true,
  };
  return m[technique];
}

export function bestProject(technique: SlabTechnique): string {
  const m: Record<SlabTechnique, string> = {
    soft_slab: "organic_vessel", hard_slab: "box_construction", draped_slab: "bowl",
    textured_slab: "wall_art", laminated_slab: "tile_work",
  };
  return m[technique];
}

export function skillRequired(technique: SlabTechnique): number {
  const m: Record<SlabTechnique, number> = {
    soft_slab: 3, hard_slab: 5, draped_slab: 4, textured_slab: 6, laminated_slab: 7,
  };
  return m[technique];
}

export function slabTechniques(): SlabTechnique[] {
  return ["soft_slab", "hard_slab", "draped_slab", "textured_slab", "laminated_slab"];
}

export type ArtPencil = "graphite_drawing" | "charcoal_vine" | "colored_wax" | "watercolor_pencil" | "conte_crayon";

export function darknessRange(a: ArtPencil): number {
  const m: Record<ArtPencil, number> = {
    graphite_drawing: 8, charcoal_vine: 10, colored_wax: 6, watercolor_pencil: 5, conte_crayon: 9,
  };
  return m[a];
}

export function blendability(a: ArtPencil): number {
  const m: Record<ArtPencil, number> = {
    graphite_drawing: 7, charcoal_vine: 10, colored_wax: 5, watercolor_pencil: 9, conte_crayon: 8,
  };
  return m[a];
}

export function lineDetail(a: ArtPencil): number {
  const m: Record<ArtPencil, number> = {
    graphite_drawing: 10, charcoal_vine: 3, colored_wax: 8, watercolor_pencil: 7, conte_crayon: 4,
  };
  return m[a];
}

export function smudgeResistance(a: ArtPencil): number {
  const m: Record<ArtPencil, number> = {
    graphite_drawing: 5, charcoal_vine: 1, colored_wax: 9, watercolor_pencil: 6, conte_crayon: 3,
  };
  return m[a];
}

export function pencilCost(a: ArtPencil): number {
  const m: Record<ArtPencil, number> = {
    graphite_drawing: 3, charcoal_vine: 2, colored_wax: 5, watercolor_pencil: 6, conte_crayon: 4,
  };
  return m[a];
}

export function erasable(a: ArtPencil): boolean {
  const m: Record<ArtPencil, boolean> = {
    graphite_drawing: true, charcoal_vine: true, colored_wax: false, watercolor_pencil: false, conte_crayon: false,
  };
  return m[a];
}

export function waterSoluble(a: ArtPencil): boolean {
  const m: Record<ArtPencil, boolean> = {
    graphite_drawing: false, charcoal_vine: false, colored_wax: false, watercolor_pencil: true, conte_crayon: false,
  };
  return m[a];
}

export function coreMaterial(a: ArtPencil): string {
  const m: Record<ArtPencil, string> = {
    graphite_drawing: "clay_graphite_graded_core", charcoal_vine: "burned_willow_vine_stick",
    colored_wax: "pigment_wax_binder_pressed", watercolor_pencil: "gum_arabic_pigment_core",
    conte_crayon: "compressed_chalk_graphite_clay",
  };
  return m[a];
}

export function bestSubject(a: ArtPencil): string {
  const m: Record<ArtPencil, string> = {
    graphite_drawing: "technical_portrait_sketch", charcoal_vine: "life_drawing_gesture_tone",
    colored_wax: "illustration_layered_color", watercolor_pencil: "mixed_media_wash_detail",
    conte_crayon: "figure_study_tonal_value",
  };
  return m[a];
}

export function artPencils(): ArtPencil[] {
  return ["graphite_drawing", "charcoal_vine", "colored_wax", "watercolor_pencil", "conte_crayon"];
}

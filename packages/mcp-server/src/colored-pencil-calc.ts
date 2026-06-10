export type ColoredPencilType = "wax_based_student" | "oil_based_pro" | "watercolor_aqua" | "pastel_chalk_soft" | "mechanical_color_lead";

export function colorLaydown(t: ColoredPencilType): number {
  const m: Record<ColoredPencilType, number> = {
    wax_based_student: 6, oil_based_pro: 9, watercolor_aqua: 7, pastel_chalk_soft: 10, mechanical_color_lead: 4,
  };
  return m[t];
}

export function blendability(t: ColoredPencilType): number {
  const m: Record<ColoredPencilType, number> = {
    wax_based_student: 5, oil_based_pro: 9, watercolor_aqua: 8, pastel_chalk_soft: 7, mechanical_color_lead: 3,
  };
  return m[t];
}

export function lightfastness(t: ColoredPencilType): number {
  const m: Record<ColoredPencilType, number> = {
    wax_based_student: 4, oil_based_pro: 10, watercolor_aqua: 7, pastel_chalk_soft: 5, mechanical_color_lead: 6,
  };
  return m[t];
}

export function detailWork(t: ColoredPencilType): number {
  const m: Record<ColoredPencilType, number> = {
    wax_based_student: 6, oil_based_pro: 8, watercolor_aqua: 5, pastel_chalk_soft: 3, mechanical_color_lead: 10,
  };
  return m[t];
}

export function pencilCost(t: ColoredPencilType): number {
  const m: Record<ColoredPencilType, number> = {
    wax_based_student: 1, oil_based_pro: 8, watercolor_aqua: 5, pastel_chalk_soft: 4, mechanical_color_lead: 6,
  };
  return m[t];
}

export function waterActivated(t: ColoredPencilType): boolean {
  const m: Record<ColoredPencilType, boolean> = {
    wax_based_student: false, oil_based_pro: false, watercolor_aqua: true, pastel_chalk_soft: false, mechanical_color_lead: false,
  };
  return m[t];
}

export function needsFixative(t: ColoredPencilType): boolean {
  const m: Record<ColoredPencilType, boolean> = {
    wax_based_student: false, oil_based_pro: false, watercolor_aqua: false, pastel_chalk_soft: true, mechanical_color_lead: false,
  };
  return m[t];
}

export function coreBinder(t: ColoredPencilType): string {
  const m: Record<ColoredPencilType, string> = {
    wax_based_student: "paraffin_wax_pigment",
    oil_based_pro: "oil_binder_high_pigment",
    watercolor_aqua: "gum_arabic_water_soluble",
    pastel_chalk_soft: "kaolin_clay_dry_pigment",
    mechanical_color_lead: "polymer_thin_lead_core",
  };
  return m[t];
}

export function bestProject(t: ColoredPencilType): string {
  const m: Record<ColoredPencilType, string> = {
    wax_based_student: "school_coloring_hobby",
    oil_based_pro: "portrait_realism_gallery",
    watercolor_aqua: "botanical_landscape_wash",
    pastel_chalk_soft: "expressive_sketch_texture",
    mechanical_color_lead: "technical_diagram_manga",
  };
  return m[t];
}

export function coloredPencils(): ColoredPencilType[] {
  return ["wax_based_student", "oil_based_pro", "watercolor_aqua", "pastel_chalk_soft", "mechanical_color_lead"];
}

export type GlassStringerType = "thin_1mm_detail" | "medium_2mm_line" | "thick_3mm_accent" | "twisted_pair_deco" | "noodle_flat_ribbon";

export function lineDetail(t: GlassStringerType): number {
  const m: Record<GlassStringerType, number> = {
    thin_1mm_detail: 10, medium_2mm_line: 7, thick_3mm_accent: 4, twisted_pair_deco: 6, noodle_flat_ribbon: 5,
  };
  return m[t];
}

export function colorIntensity(t: GlassStringerType): number {
  const m: Record<GlassStringerType, number> = {
    thin_1mm_detail: 5, medium_2mm_line: 7, thick_3mm_accent: 10, twisted_pair_deco: 8, noodle_flat_ribbon: 9,
  };
  return m[t];
}

export function breakResist(t: GlassStringerType): number {
  const m: Record<GlassStringerType, number> = {
    thin_1mm_detail: 3, medium_2mm_line: 6, thick_3mm_accent: 9, twisted_pair_deco: 5, noodle_flat_ribbon: 7,
  };
  return m[t];
}

export function placeEase(t: GlassStringerType): number {
  const m: Record<GlassStringerType, number> = {
    thin_1mm_detail: 5, medium_2mm_line: 8, thick_3mm_accent: 9, twisted_pair_deco: 4, noodle_flat_ribbon: 7,
  };
  return m[t];
}

export function stringerCost(t: GlassStringerType): number {
  const m: Record<GlassStringerType, number> = {
    thin_1mm_detail: 1, medium_2mm_line: 1, thick_3mm_accent: 1, twisted_pair_deco: 2, noodle_flat_ribbon: 2,
  };
  return m[t];
}

export function decorative(t: GlassStringerType): boolean {
  const m: Record<GlassStringerType, boolean> = {
    thin_1mm_detail: false, medium_2mm_line: false, thick_3mm_accent: false, twisted_pair_deco: true, noodle_flat_ribbon: true,
  };
  return m[t];
}

export function bendable(t: GlassStringerType): boolean {
  const m: Record<GlassStringerType, boolean> = {
    thin_1mm_detail: true, medium_2mm_line: true, thick_3mm_accent: false, twisted_pair_deco: false, noodle_flat_ribbon: true,
  };
  return m[t];
}

export function crossSection(t: GlassStringerType): string {
  const m: Record<GlassStringerType, string> = {
    thin_1mm_detail: "round_solid_1mm",
    medium_2mm_line: "round_solid_2mm",
    thick_3mm_accent: "round_solid_3mm",
    twisted_pair_deco: "twisted_double_strand",
    noodle_flat_ribbon: "flat_ribbon_profile",
  };
  return m[t];
}

export function bestUse(t: GlassStringerType): string {
  const m: Record<GlassStringerType, string> = {
    thin_1mm_detail: "fine_line_drawing",
    medium_2mm_line: "outline_border_work",
    thick_3mm_accent: "bold_accent_stripe",
    twisted_pair_deco: "decorative_swirl_art",
    noodle_flat_ribbon: "flat_surface_band",
  };
  return m[t];
}

export function glassStringers(): GlassStringerType[] {
  return ["thin_1mm_detail", "medium_2mm_line", "thick_3mm_accent", "twisted_pair_deco", "noodle_flat_ribbon"];
}

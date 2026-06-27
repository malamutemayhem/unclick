export type PourOverType = "cone_ceramic" | "flat_bottom_wave" | "chemex_glass" | "dripper_metal" | "clever_immersion";

export function brewClarity(t: PourOverType): number {
  const m: Record<PourOverType, number> = {
    cone_ceramic: 8, flat_bottom_wave: 9, chemex_glass: 10, dripper_metal: 5, clever_immersion: 7,
  };
  return m[t];
}

export function brewBody(t: PourOverType): number {
  const m: Record<PourOverType, number> = {
    cone_ceramic: 6, flat_bottom_wave: 5, chemex_glass: 3, dripper_metal: 10, clever_immersion: 8,
  };
  return m[t];
}

export function forgiveness(t: PourOverType): number {
  const m: Record<PourOverType, number> = {
    cone_ceramic: 5, flat_bottom_wave: 9, chemex_glass: 4, dripper_metal: 6, clever_immersion: 10,
  };
  return m[t];
}

export function brewSpeed(t: PourOverType): number {
  const m: Record<PourOverType, number> = {
    cone_ceramic: 7, flat_bottom_wave: 6, chemex_glass: 5, dripper_metal: 8, clever_immersion: 4,
  };
  return m[t];
}

export function dripperCost(t: PourOverType): number {
  const m: Record<PourOverType, number> = {
    cone_ceramic: 3, flat_bottom_wave: 4, chemex_glass: 7, dripper_metal: 5, clever_immersion: 4,
  };
  return m[t];
}

export function needsPaperFilter(t: PourOverType): boolean {
  const m: Record<PourOverType, boolean> = {
    cone_ceramic: true, flat_bottom_wave: true, chemex_glass: true, dripper_metal: false, clever_immersion: true,
  };
  return m[t];
}

export function heatRetains(t: PourOverType): boolean {
  const m: Record<PourOverType, boolean> = {
    cone_ceramic: true, flat_bottom_wave: false, chemex_glass: false, dripper_metal: false, clever_immersion: true,
  };
  return m[t];
}

export function filterStyle(t: PourOverType): string {
  const m: Record<PourOverType, string> = {
    cone_ceramic: "cone_paper_tab_fold", flat_bottom_wave: "kalita_wave_flat_paper",
    chemex_glass: "thick_bonded_square_paper", dripper_metal: "permanent_stainless_mesh",
    clever_immersion: "melitta_style_steep_release",
  };
  return m[t];
}

export function bestDrinker(t: PourOverType): string {
  const m: Record<PourOverType, string> = {
    cone_ceramic: "enthusiast_dial_in_precision", flat_bottom_wave: "consistent_everyday_easy",
    chemex_glass: "clean_bright_light_roast_fan", dripper_metal: "full_body_oil_rich_prefer",
    clever_immersion: "beginner_no_technique_needed",
  };
  return m[t];
}

export function pourOvers(): PourOverType[] {
  return ["cone_ceramic", "flat_bottom_wave", "chemex_glass", "dripper_metal", "clever_immersion"];
}

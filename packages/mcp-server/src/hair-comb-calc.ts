export type HairCombType = "wide_tooth_detangle" | "fine_tooth_styling" | "rat_tail_sectioning" | "pick_afro_lift" | "wooden_sandalwood";

export function detangling(t: HairCombType): number {
  const m: Record<HairCombType, number> = {
    wide_tooth_detangle: 10, fine_tooth_styling: 4, rat_tail_sectioning: 5, pick_afro_lift: 7, wooden_sandalwood: 8,
  };
  return m[t];
}

export function styling(t: HairCombType): number {
  const m: Record<HairCombType, number> = {
    wide_tooth_detangle: 5, fine_tooth_styling: 10, rat_tail_sectioning: 8, pick_afro_lift: 6, wooden_sandalwood: 7,
  };
  return m[t];
}

export function gentleness(t: HairCombType): number {
  const m: Record<HairCombType, number> = {
    wide_tooth_detangle: 10, fine_tooth_styling: 4, rat_tail_sectioning: 5, pick_afro_lift: 7, wooden_sandalwood: 9,
  };
  return m[t];
}

export function precision(t: HairCombType): number {
  const m: Record<HairCombType, number> = {
    wide_tooth_detangle: 3, fine_tooth_styling: 9, rat_tail_sectioning: 10, pick_afro_lift: 4, wooden_sandalwood: 5,
  };
  return m[t];
}

export function combCost(t: HairCombType): number {
  const m: Record<HairCombType, number> = {
    wide_tooth_detangle: 3, fine_tooth_styling: 3, rat_tail_sectioning: 2, pick_afro_lift: 4, wooden_sandalwood: 7,
  };
  return m[t];
}

export function antiStatic(t: HairCombType): boolean {
  const m: Record<HairCombType, boolean> = {
    wide_tooth_detangle: false, fine_tooth_styling: false, rat_tail_sectioning: false, pick_afro_lift: false, wooden_sandalwood: true,
  };
  return m[t];
}

export function heatResistant(t: HairCombType): boolean {
  const m: Record<HairCombType, boolean> = {
    wide_tooth_detangle: true, fine_tooth_styling: true, rat_tail_sectioning: true, pick_afro_lift: true, wooden_sandalwood: false,
  };
  return m[t];
}

export function combMaterial(t: HairCombType): string {
  const m: Record<HairCombType, string> = {
    wide_tooth_detangle: "abs_plastic_seamless",
    fine_tooth_styling: "cellulose_acetate_smooth",
    rat_tail_sectioning: "carbon_fiber_static_free",
    pick_afro_lift: "stainless_steel_prong",
    wooden_sandalwood: "indian_sandalwood_carved",
  };
  return m[t];
}

export function bestHairType(t: HairCombType): string {
  const m: Record<HairCombType, string> = {
    wide_tooth_detangle: "curly_thick_wet",
    fine_tooth_styling: "straight_thin_sleek",
    rat_tail_sectioning: "all_types_coloring",
    pick_afro_lift: "coily_afro_textured",
    wooden_sandalwood: "all_types_scalp_care",
  };
  return m[t];
}

export function hairCombs(): HairCombType[] {
  return ["wide_tooth_detangle", "fine_tooth_styling", "rat_tail_sectioning", "pick_afro_lift", "wooden_sandalwood"];
}

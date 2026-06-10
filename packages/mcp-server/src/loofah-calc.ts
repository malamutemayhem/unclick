export type LoofahType = "natural_gourd_sponge" | "mesh_nylon_puff" | "silicone_scrubber_pad" | "exfoliating_glove_mitt" | "long_handle_back_brush";

export function exfoliation(t: LoofahType): number {
  const m: Record<LoofahType, number> = {
    natural_gourd_sponge: 8, mesh_nylon_puff: 5, silicone_scrubber_pad: 7, exfoliating_glove_mitt: 9, long_handle_back_brush: 10,
  };
  return m[t];
}

export function latherAbility(t: LoofahType): number {
  const m: Record<LoofahType, number> = {
    natural_gourd_sponge: 7, mesh_nylon_puff: 10, silicone_scrubber_pad: 5, exfoliating_glove_mitt: 6, long_handle_back_brush: 4,
  };
  return m[t];
}

export function hygiene(t: LoofahType): number {
  const m: Record<LoofahType, number> = {
    natural_gourd_sponge: 3, mesh_nylon_puff: 4, silicone_scrubber_pad: 10, exfoliating_glove_mitt: 6, long_handle_back_brush: 7,
  };
  return m[t];
}

export function longevity(t: LoofahType): number {
  const m: Record<LoofahType, number> = {
    natural_gourd_sponge: 3, mesh_nylon_puff: 5, silicone_scrubber_pad: 10, exfoliating_glove_mitt: 6, long_handle_back_brush: 9,
  };
  return m[t];
}

export function loofahCost(t: LoofahType): number {
  const m: Record<LoofahType, number> = {
    natural_gourd_sponge: 2, mesh_nylon_puff: 1, silicone_scrubber_pad: 3, exfoliating_glove_mitt: 2, long_handle_back_brush: 4,
  };
  return m[t];
}

export function ecoFriendly(t: LoofahType): boolean {
  const m: Record<LoofahType, boolean> = {
    natural_gourd_sponge: true, mesh_nylon_puff: false, silicone_scrubber_pad: true, exfoliating_glove_mitt: false, long_handle_back_brush: true,
  };
  return m[t];
}

export function reachesBack(t: LoofahType): boolean {
  const m: Record<LoofahType, boolean> = {
    natural_gourd_sponge: false, mesh_nylon_puff: false, silicone_scrubber_pad: false, exfoliating_glove_mitt: false, long_handle_back_brush: true,
  };
  return m[t];
}

export function bodyMaterial(t: LoofahType): string {
  const m: Record<LoofahType, string> = {
    natural_gourd_sponge: "dried_luffa_gourd_plant",
    mesh_nylon_puff: "nylon_mesh_ribbon_puff",
    silicone_scrubber_pad: "medical_grade_silicone",
    exfoliating_glove_mitt: "nylon_viscose_knit",
    long_handle_back_brush: "natural_bristle_wood_handle",
  };
  return m[t];
}

export function bestSkin(t: LoofahType): string {
  const m: Record<LoofahType, string> = {
    natural_gourd_sponge: "normal_skin_natural_pref",
    mesh_nylon_puff: "quick_lather_daily_wash",
    silicone_scrubber_pad: "sensitive_acne_prone",
    exfoliating_glove_mitt: "rough_dry_skin_scrub",
    long_handle_back_brush: "back_hard_to_reach_area",
  };
  return m[t];
}

export function loofahs(): LoofahType[] {
  return ["natural_gourd_sponge", "mesh_nylon_puff", "silicone_scrubber_pad", "exfoliating_glove_mitt", "long_handle_back_brush"];
}

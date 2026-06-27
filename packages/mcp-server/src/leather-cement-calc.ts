export type LeatherCementType = "contact_cement_instant" | "white_craft_glue" | "barge_all_purpose" | "double_sided_tape" | "hide_glue_natural";

export function bondStrength(t: LeatherCementType): number {
  const m: Record<LeatherCementType, number> = {
    contact_cement_instant: 9, white_craft_glue: 5, barge_all_purpose: 10, double_sided_tape: 4, hide_glue_natural: 7,
  };
  return m[t];
}

export function openTime(t: LeatherCementType): number {
  const m: Record<LeatherCementType, number> = {
    contact_cement_instant: 3, white_craft_glue: 9, barge_all_purpose: 6, double_sided_tape: 10, hide_glue_natural: 7,
  };
  return m[t];
}

export function flexibility(t: LeatherCementType): number {
  const m: Record<LeatherCementType, number> = {
    contact_cement_instant: 7, white_craft_glue: 4, barge_all_purpose: 9, double_sided_tape: 5, hide_glue_natural: 6,
  };
  return m[t];
}

export function easeOfUse(t: LeatherCementType): number {
  const m: Record<LeatherCementType, number> = {
    contact_cement_instant: 6, white_craft_glue: 10, barge_all_purpose: 7, double_sided_tape: 10, hide_glue_natural: 5,
  };
  return m[t];
}

export function cementCost(t: LeatherCementType): number {
  const m: Record<LeatherCementType, number> = {
    contact_cement_instant: 2, white_craft_glue: 1, barge_all_purpose: 3, double_sided_tape: 2, hide_glue_natural: 3,
  };
  return m[t];
}

export function waterResist(t: LeatherCementType): boolean {
  const m: Record<LeatherCementType, boolean> = {
    contact_cement_instant: true, white_craft_glue: false, barge_all_purpose: true, double_sided_tape: false, hide_glue_natural: false,
  };
  return m[t];
}

export function reversible(t: LeatherCementType): boolean {
  const m: Record<LeatherCementType, boolean> = {
    contact_cement_instant: false, white_craft_glue: true, barge_all_purpose: false, double_sided_tape: true, hide_glue_natural: true,
  };
  return m[t];
}

export function applyMethod(t: LeatherCementType): string {
  const m: Record<LeatherCementType, string> = {
    contact_cement_instant: "brush_both_surfaces",
    white_craft_glue: "squeeze_bottle_spread",
    barge_all_purpose: "brush_tack_press",
    double_sided_tape: "peel_stick_press",
    hide_glue_natural: "warm_brush_apply",
  };
  return m[t];
}

export function bestProject(t: LeatherCementType): string {
  const m: Record<LeatherCementType, string> = {
    contact_cement_instant: "sole_attach_shoe",
    white_craft_glue: "light_craft_card",
    barge_all_purpose: "heavy_bag_construct",
    double_sided_tape: "quick_hold_template",
    hide_glue_natural: "restoration_antique",
  };
  return m[t];
}

export function leatherCements(): LeatherCementType[] {
  return ["contact_cement_instant", "white_craft_glue", "barge_all_purpose", "double_sided_tape", "hide_glue_natural"];
}

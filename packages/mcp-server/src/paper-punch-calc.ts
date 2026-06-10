export type PaperPunchType = "single_hole_standard" | "three_hole_binder" | "decorative_shape_craft" | "corner_rounder_trim" | "heavy_duty_stack";

export function punchCapacity(t: PaperPunchType): number {
  const m: Record<PaperPunchType, number> = {
    single_hole_standard: 5, three_hole_binder: 6, decorative_shape_craft: 3, corner_rounder_trim: 4, heavy_duty_stack: 10,
  };
  return m[t];
}

export function precision(t: PaperPunchType): number {
  const m: Record<PaperPunchType, number> = {
    single_hole_standard: 8, three_hole_binder: 9, decorative_shape_craft: 7, corner_rounder_trim: 10, heavy_duty_stack: 6,
  };
  return m[t];
}

export function creativity(t: PaperPunchType): number {
  const m: Record<PaperPunchType, number> = {
    single_hole_standard: 1, three_hole_binder: 2, decorative_shape_craft: 10, corner_rounder_trim: 7, heavy_duty_stack: 1,
  };
  return m[t];
}

export function effortRequired(t: PaperPunchType): number {
  const m: Record<PaperPunchType, number> = {
    single_hole_standard: 8, three_hole_binder: 7, decorative_shape_craft: 6, corner_rounder_trim: 9, heavy_duty_stack: 4,
  };
  return m[t];
}

export function punchCost(t: PaperPunchType): number {
  const m: Record<PaperPunchType, number> = {
    single_hole_standard: 1, three_hole_binder: 3, decorative_shape_craft: 4, corner_rounder_trim: 3, heavy_duty_stack: 6,
  };
  return m[t];
}

export function hasGuide(t: PaperPunchType): boolean {
  const m: Record<PaperPunchType, boolean> = {
    single_hole_standard: false, three_hole_binder: true, decorative_shape_craft: false, corner_rounder_trim: true, heavy_duty_stack: true,
  };
  return m[t];
}

export function confettiUsable(t: PaperPunchType): boolean {
  const m: Record<PaperPunchType, boolean> = {
    single_hole_standard: true, three_hole_binder: true, decorative_shape_craft: true, corner_rounder_trim: false, heavy_duty_stack: false,
  };
  return m[t];
}

export function punchMechanism(t: PaperPunchType): string {
  const m: Record<PaperPunchType, string> = {
    single_hole_standard: "lever_spring_single_die",
    three_hole_binder: "aligned_triple_die_guide",
    decorative_shape_craft: "shaped_die_squeeze_handle",
    corner_rounder_trim: "radius_die_corner_slot",
    heavy_duty_stack: "lever_arm_compound_gear",
  };
  return m[t];
}

export function bestUse(t: PaperPunchType): string {
  const m: Record<PaperPunchType, string> = {
    single_hole_standard: "tag_lanyard_hang_hole",
    three_hole_binder: "office_filing_binder",
    decorative_shape_craft: "scrapbook_card_embellish",
    corner_rounder_trim: "photo_card_round_corner",
    heavy_duty_stack: "print_shop_bulk_punch",
  };
  return m[t];
}

export function paperPunches(): PaperPunchType[] {
  return ["single_hole_standard", "three_hole_binder", "decorative_shape_craft", "corner_rounder_trim", "heavy_duty_stack"];
}

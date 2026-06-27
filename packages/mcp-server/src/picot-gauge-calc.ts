export type PicotGaugeType = "flat_card_multi" | "rod_metal_single" | "slide_adjustable_set" | "ruler_marked_clear" | "wire_loop_tiny";

export function sizeAccuracy(t: PicotGaugeType): number {
  const m: Record<PicotGaugeType, number> = {
    flat_card_multi: 7, rod_metal_single: 9, slide_adjustable_set: 10, ruler_marked_clear: 8, wire_loop_tiny: 6,
  };
  return m[t];
}

export function easeOfUse(t: PicotGaugeType): number {
  const m: Record<PicotGaugeType, number> = {
    flat_card_multi: 8, rod_metal_single: 9, slide_adjustable_set: 7, ruler_marked_clear: 10, wire_loop_tiny: 5,
  };
  return m[t];
}

export function sizeRange(t: PicotGaugeType): number {
  const m: Record<PicotGaugeType, number> = {
    flat_card_multi: 9, rod_metal_single: 4, slide_adjustable_set: 10, ruler_marked_clear: 7, wire_loop_tiny: 3,
  };
  return m[t];
}

export function portability(t: PicotGaugeType): number {
  const m: Record<PicotGaugeType, number> = {
    flat_card_multi: 8, rod_metal_single: 9, slide_adjustable_set: 6, ruler_marked_clear: 7, wire_loop_tiny: 10,
  };
  return m[t];
}

export function gaugeCost(t: PicotGaugeType): number {
  const m: Record<PicotGaugeType, number> = {
    flat_card_multi: 2, rod_metal_single: 1, slide_adjustable_set: 4, ruler_marked_clear: 2, wire_loop_tiny: 1,
  };
  return m[t];
}

export function adjustable(t: PicotGaugeType): boolean {
  const m: Record<PicotGaugeType, boolean> = {
    flat_card_multi: false, rod_metal_single: false, slide_adjustable_set: true, ruler_marked_clear: false, wire_loop_tiny: false,
  };
  return m[t];
}

export function multiSize(t: PicotGaugeType): boolean {
  const m: Record<PicotGaugeType, boolean> = {
    flat_card_multi: true, rod_metal_single: false, slide_adjustable_set: true, ruler_marked_clear: true, wire_loop_tiny: false,
  };
  return m[t];
}

export function gaugeMaterial(t: PicotGaugeType): string {
  const m: Record<PicotGaugeType, string> = {
    flat_card_multi: "plastic_card_notched",
    rod_metal_single: "steel_rod_smooth",
    slide_adjustable_set: "brass_slide_rule",
    ruler_marked_clear: "acrylic_clear_marked",
    wire_loop_tiny: "steel_wire_formed",
  };
  return m[t];
}

export function bestUse(t: PicotGaugeType): string {
  const m: Record<PicotGaugeType, string> = {
    flat_card_multi: "varied_picot_project",
    rod_metal_single: "consistent_single_size",
    slide_adjustable_set: "precision_custom_size",
    ruler_marked_clear: "measure_check_compare",
    wire_loop_tiny: "micro_picot_fine",
  };
  return m[t];
}

export function picotGauges(): PicotGaugeType[] {
  return ["flat_card_multi", "rod_metal_single", "slide_adjustable_set", "ruler_marked_clear", "wire_loop_tiny"];
}

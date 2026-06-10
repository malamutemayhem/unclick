export type CalligraphyPenType = "dip_nib_holder" | "brush_pen_flex" | "parallel_pen_pilot" | "felt_tip_marker" | "glass_dip_pen";

export function lineVariation(t: CalligraphyPenType): number {
  const m: Record<CalligraphyPenType, number> = {
    dip_nib_holder: 10, brush_pen_flex: 9, parallel_pen_pilot: 7, felt_tip_marker: 4, glass_dip_pen: 6,
  };
  return m[t];
}

export function controlEase(t: CalligraphyPenType): number {
  const m: Record<CalligraphyPenType, number> = {
    dip_nib_holder: 4, brush_pen_flex: 6, parallel_pen_pilot: 9, felt_tip_marker: 10, glass_dip_pen: 5,
  };
  return m[t];
}

export function inkCapacity(t: CalligraphyPenType): number {
  const m: Record<CalligraphyPenType, number> = {
    dip_nib_holder: 2, brush_pen_flex: 7, parallel_pen_pilot: 8, felt_tip_marker: 6, glass_dip_pen: 1,
  };
  return m[t];
}

export function cleanupEase(t: CalligraphyPenType): number {
  const m: Record<CalligraphyPenType, number> = {
    dip_nib_holder: 4, brush_pen_flex: 8, parallel_pen_pilot: 7, felt_tip_marker: 10, glass_dip_pen: 6,
  };
  return m[t];
}

export function penCost(t: CalligraphyPenType): number {
  const m: Record<CalligraphyPenType, number> = {
    dip_nib_holder: 3, brush_pen_flex: 4, parallel_pen_pilot: 3, felt_tip_marker: 2, glass_dip_pen: 7,
  };
  return m[t];
}

export function needsDipping(t: CalligraphyPenType): boolean {
  const m: Record<CalligraphyPenType, boolean> = {
    dip_nib_holder: true, brush_pen_flex: false, parallel_pen_pilot: false, felt_tip_marker: false, glass_dip_pen: true,
  };
  return m[t];
}

export function refillable(t: CalligraphyPenType): boolean {
  const m: Record<CalligraphyPenType, boolean> = {
    dip_nib_holder: true, brush_pen_flex: false, parallel_pen_pilot: true, felt_tip_marker: false, glass_dip_pen: true,
  };
  return m[t];
}

export function nibType(t: CalligraphyPenType): string {
  const m: Record<CalligraphyPenType, string> = {
    dip_nib_holder: "pointed_flexible_steel",
    brush_pen_flex: "synthetic_brush_tip",
    parallel_pen_pilot: "parallel_plate_edge",
    felt_tip_marker: "chisel_felt_wedge",
    glass_dip_pen: "twisted_glass_spiral",
  };
  return m[t];
}

export function bestScript(t: CalligraphyPenType): string {
  const m: Record<CalligraphyPenType, string> = {
    dip_nib_holder: "copperplate_spencerian",
    brush_pen_flex: "modern_bounce_letter",
    parallel_pen_pilot: "italic_gothic_blackletter",
    felt_tip_marker: "faux_calligraphy_sign",
    glass_dip_pen: "decorative_ink_sample",
  };
  return m[t];
}

export function calligraphyPens(): CalligraphyPenType[] {
  return ["dip_nib_holder", "brush_pen_flex", "parallel_pen_pilot", "felt_tip_marker", "glass_dip_pen"];
}

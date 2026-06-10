export type SeamGaugeType = "metal_slide_ruler" | "clear_acrylic_grid" | "magnetic_guide_fence" | "digital_caliper_sew" | "curved_hem_template";

export function measureAccuracy(t: SeamGaugeType): number {
  const m: Record<SeamGaugeType, number> = {
    metal_slide_ruler: 9, clear_acrylic_grid: 8, magnetic_guide_fence: 7, digital_caliper_sew: 10, curved_hem_template: 7,
  };
  return m[t];
}

export function easeOfUse(t: SeamGaugeType): number {
  const m: Record<SeamGaugeType, number> = {
    metal_slide_ruler: 9, clear_acrylic_grid: 8, magnetic_guide_fence: 10, digital_caliper_sew: 7, curved_hem_template: 8,
  };
  return m[t];
}

export function durability(t: SeamGaugeType): number {
  const m: Record<SeamGaugeType, number> = {
    metal_slide_ruler: 10, clear_acrylic_grid: 7, magnetic_guide_fence: 9, digital_caliper_sew: 6, curved_hem_template: 8,
  };
  return m[t];
}

export function versatility(t: SeamGaugeType): number {
  const m: Record<SeamGaugeType, number> = {
    metal_slide_ruler: 9, clear_acrylic_grid: 10, magnetic_guide_fence: 6, digital_caliper_sew: 8, curved_hem_template: 7,
  };
  return m[t];
}

export function gaugeCost(t: SeamGaugeType): number {
  const m: Record<SeamGaugeType, number> = {
    metal_slide_ruler: 1, clear_acrylic_grid: 1, magnetic_guide_fence: 2, digital_caliper_sew: 3, curved_hem_template: 1,
  };
  return m[t];
}

export function handsFree(t: SeamGaugeType): boolean {
  const m: Record<SeamGaugeType, boolean> = {
    metal_slide_ruler: false, clear_acrylic_grid: false, magnetic_guide_fence: true, digital_caliper_sew: false, curved_hem_template: false,
  };
  return m[t];
}

export function hasDisplay(t: SeamGaugeType): boolean {
  const m: Record<SeamGaugeType, boolean> = {
    metal_slide_ruler: false, clear_acrylic_grid: false, magnetic_guide_fence: false, digital_caliper_sew: true, curved_hem_template: false,
  };
  return m[t];
}

export function scaleType(t: SeamGaugeType): string {
  const m: Record<SeamGaugeType, string> = {
    metal_slide_ruler: "inch_metric_slide",
    clear_acrylic_grid: "printed_grid_line",
    magnetic_guide_fence: "fixed_offset_magnet",
    digital_caliper_sew: "lcd_digital_readout",
    curved_hem_template: "curved_radius_mark",
  };
  return m[t];
}

export function bestTask(t: SeamGaugeType): string {
  const m: Record<SeamGaugeType, string> = {
    metal_slide_ruler: "seam_allowance_mark",
    clear_acrylic_grid: "quilting_block_cut",
    magnetic_guide_fence: "straight_stitch_guide",
    digital_caliper_sew: "precision_leather_work",
    curved_hem_template: "skirt_hem_curve",
  };
  return m[t];
}

export function seamGauges(): SeamGaugeType[] {
  return ["metal_slide_ruler", "clear_acrylic_grid", "magnetic_guide_fence", "digital_caliper_sew", "curved_hem_template"];
}

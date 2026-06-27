export type BevelGaugeType = "sliding_t_bevel" | "digital_angle_read" | "protractor_head_combo" | "weld_gauge_fillet" | "dovetail_marker_set";

export function angleAccuracy(t: BevelGaugeType): number {
  const m: Record<BevelGaugeType, number> = {
    sliding_t_bevel: 7, digital_angle_read: 10, protractor_head_combo: 8, weld_gauge_fillet: 6, dovetail_marker_set: 9,
  };
  return m[t];
}

export function transferEase(t: BevelGaugeType): number {
  const m: Record<BevelGaugeType, number> = {
    sliding_t_bevel: 10, digital_angle_read: 6, protractor_head_combo: 7, weld_gauge_fillet: 5, dovetail_marker_set: 8,
  };
  return m[t];
}

export function readability(t: BevelGaugeType): number {
  const m: Record<BevelGaugeType, number> = {
    sliding_t_bevel: 4, digital_angle_read: 10, protractor_head_combo: 8, weld_gauge_fillet: 6, dovetail_marker_set: 5,
  };
  return m[t];
}

export function durability(t: BevelGaugeType): number {
  const m: Record<BevelGaugeType, number> = {
    sliding_t_bevel: 9, digital_angle_read: 5, protractor_head_combo: 8, weld_gauge_fillet: 10, dovetail_marker_set: 7,
  };
  return m[t];
}

export function gaugeCost(t: BevelGaugeType): number {
  const m: Record<BevelGaugeType, number> = {
    sliding_t_bevel: 1, digital_angle_read: 2, protractor_head_combo: 2, weld_gauge_fillet: 1, dovetail_marker_set: 2,
  };
  return m[t];
}

export function digital(t: BevelGaugeType): boolean {
  const m: Record<BevelGaugeType, boolean> = {
    sliding_t_bevel: false, digital_angle_read: true, protractor_head_combo: false, weld_gauge_fillet: false, dovetail_marker_set: false,
  };
  return m[t];
}

export function fixedAngle(t: BevelGaugeType): boolean {
  const m: Record<BevelGaugeType, boolean> = {
    sliding_t_bevel: false, digital_angle_read: false, protractor_head_combo: false, weld_gauge_fillet: true, dovetail_marker_set: true,
  };
  return m[t];
}

export function bladeType(t: BevelGaugeType): string {
  const m: Record<BevelGaugeType, string> = {
    sliding_t_bevel: "steel_slide_blade",
    digital_angle_read: "digital_arm_blade",
    protractor_head_combo: "protractor_rule_set",
    weld_gauge_fillet: "stamped_gauge_set",
    dovetail_marker_set: "fixed_ratio_guide",
  };
  return m[t];
}

export function bestUse(t: BevelGaugeType): string {
  const m: Record<BevelGaugeType, string> = {
    sliding_t_bevel: "angle_copy_transfer",
    digital_angle_read: "exact_angle_measure",
    protractor_head_combo: "layout_angle_measure",
    weld_gauge_fillet: "weld_fillet_check",
    dovetail_marker_set: "dovetail_angle_mark",
  };
  return m[t];
}

export function bevelGauges(): BevelGaugeType[] {
  return ["sliding_t_bevel", "digital_angle_read", "protractor_head_combo", "weld_gauge_fillet", "dovetail_marker_set"];
}

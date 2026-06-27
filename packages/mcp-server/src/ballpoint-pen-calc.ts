export type BallpointPenType = "retractable_click_daily" | "capped_fine_tip" | "multi_color_four" | "pressurized_space_pen" | "luxury_metal_executive";

export function writingSmoothness(t: BallpointPenType): number {
  const m: Record<BallpointPenType, number> = {
    retractable_click_daily: 7, capped_fine_tip: 8, multi_color_four: 5, pressurized_space_pen: 9, luxury_metal_executive: 10,
  };
  return m[t];
}

export function lineConsistency(t: BallpointPenType): number {
  const m: Record<BallpointPenType, number> = {
    retractable_click_daily: 7, capped_fine_tip: 9, multi_color_four: 5, pressurized_space_pen: 10, luxury_metal_executive: 9,
  };
  return m[t];
}

export function gripComfort(t: BallpointPenType): number {
  const m: Record<BallpointPenType, number> = {
    retractable_click_daily: 7, capped_fine_tip: 6, multi_color_four: 5, pressurized_space_pen: 7, luxury_metal_executive: 10,
  };
  return m[t];
}

export function inkLife(t: BallpointPenType): number {
  const m: Record<BallpointPenType, number> = {
    retractable_click_daily: 7, capped_fine_tip: 8, multi_color_four: 5, pressurized_space_pen: 9, luxury_metal_executive: 6,
  };
  return m[t];
}

export function penCost(t: BallpointPenType): number {
  const m: Record<BallpointPenType, number> = {
    retractable_click_daily: 2, capped_fine_tip: 3, multi_color_four: 3, pressurized_space_pen: 7, luxury_metal_executive: 10,
  };
  return m[t];
}

export function refillable(t: BallpointPenType): boolean {
  const m: Record<BallpointPenType, boolean> = {
    retractable_click_daily: true, capped_fine_tip: false, multi_color_four: true, pressurized_space_pen: true, luxury_metal_executive: true,
  };
  return m[t];
}

export function writesUpside(t: BallpointPenType): boolean {
  const m: Record<BallpointPenType, boolean> = {
    retractable_click_daily: false, capped_fine_tip: false, multi_color_four: false, pressurized_space_pen: true, luxury_metal_executive: false,
  };
  return m[t];
}

export function inkType(t: BallpointPenType): string {
  const m: Record<BallpointPenType, string> = {
    retractable_click_daily: "oil_based_standard",
    capped_fine_tip: "low_viscosity_hybrid",
    multi_color_four: "oil_based_multi_refill",
    pressurized_space_pen: "pressurized_thixotropic",
    luxury_metal_executive: "premium_oil_smooth_flow",
  };
  return m[t];
}

export function bestWriter(t: BallpointPenType): string {
  const m: Record<BallpointPenType, string> = {
    retractable_click_daily: "office_everyday_notes",
    capped_fine_tip: "detailed_form_precise",
    multi_color_four: "student_color_coding",
    pressurized_space_pen: "outdoor_extreme_any_angle",
    luxury_metal_executive: "executive_signing_gift",
  };
  return m[t];
}

export function ballpointPens(): BallpointPenType[] {
  return ["retractable_click_daily", "capped_fine_tip", "multi_color_four", "pressurized_space_pen", "luxury_metal_executive"];
}

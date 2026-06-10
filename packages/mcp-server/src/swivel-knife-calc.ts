export type SwivelKnifeType = "barrel_yoke_standard" | "fine_line_detail" | "ceramic_blade_sharp" | "adjustable_angle_tilt" | "cushion_grip_ergo";

export function carvePrecision(t: SwivelKnifeType): number {
  const m: Record<SwivelKnifeType, number> = {
    barrel_yoke_standard: 8, fine_line_detail: 10, ceramic_blade_sharp: 9, adjustable_angle_tilt: 7, cushion_grip_ergo: 7,
  };
  return m[t];
}

export function handComfort(t: SwivelKnifeType): number {
  const m: Record<SwivelKnifeType, number> = {
    barrel_yoke_standard: 7, fine_line_detail: 6, ceramic_blade_sharp: 7, adjustable_angle_tilt: 8, cushion_grip_ergo: 10,
  };
  return m[t];
}

export function bladeRetention(t: SwivelKnifeType): number {
  const m: Record<SwivelKnifeType, number> = {
    barrel_yoke_standard: 7, fine_line_detail: 6, ceramic_blade_sharp: 10, adjustable_angle_tilt: 7, cushion_grip_ergo: 7,
  };
  return m[t];
}

export function controlSpin(t: SwivelKnifeType): number {
  const m: Record<SwivelKnifeType, number> = {
    barrel_yoke_standard: 9, fine_line_detail: 10, ceramic_blade_sharp: 8, adjustable_angle_tilt: 9, cushion_grip_ergo: 8,
  };
  return m[t];
}

export function knifeCost(t: SwivelKnifeType): number {
  const m: Record<SwivelKnifeType, number> = {
    barrel_yoke_standard: 2, fine_line_detail: 3, ceramic_blade_sharp: 3, adjustable_angle_tilt: 2, cushion_grip_ergo: 2,
  };
  return m[t];
}

export function replaceBlade(t: SwivelKnifeType): boolean {
  const m: Record<SwivelKnifeType, boolean> = {
    barrel_yoke_standard: true, fine_line_detail: true, ceramic_blade_sharp: false, adjustable_angle_tilt: true, cushion_grip_ergo: true,
  };
  return m[t];
}

export function ceramicEdge(t: SwivelKnifeType): boolean {
  const m: Record<SwivelKnifeType, boolean> = {
    barrel_yoke_standard: false, fine_line_detail: false, ceramic_blade_sharp: true, adjustable_angle_tilt: false, cushion_grip_ergo: false,
  };
  return m[t];
}

export function yokeStyle(t: SwivelKnifeType): string {
  const m: Record<SwivelKnifeType, string> = {
    barrel_yoke_standard: "barrel_saddle_yoke",
    fine_line_detail: "narrow_finger_yoke",
    ceramic_blade_sharp: "barrel_saddle_yoke",
    adjustable_angle_tilt: "tilting_pivot_yoke",
    cushion_grip_ergo: "padded_ball_yoke",
  };
  return m[t];
}

export function bestCarving(t: SwivelKnifeType): string {
  const m: Record<SwivelKnifeType, string> = {
    barrel_yoke_standard: "western_saddle_floral",
    fine_line_detail: "portrait_figure_carve",
    ceramic_blade_sharp: "geometric_pattern_cut",
    adjustable_angle_tilt: "curved_scroll_border",
    cushion_grip_ergo: "long_session_project",
  };
  return m[t];
}

export function swivelKnives(): SwivelKnifeType[] {
  return ["barrel_yoke_standard", "fine_line_detail", "ceramic_blade_sharp", "adjustable_angle_tilt", "cushion_grip_ergo"];
}

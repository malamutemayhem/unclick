export type BurnTipType = "universal_point_basic" | "ball_tip_shade" | "flat_shader_wide" | "knife_edge_line" | "spoon_tip_scoop";

export function lineDetail(t: BurnTipType): number {
  const m: Record<BurnTipType, number> = {
    universal_point_basic: 8, ball_tip_shade: 4, flat_shader_wide: 3, knife_edge_line: 10, spoon_tip_scoop: 5,
  };
  return m[t];
}

export function shadeCover(t: BurnTipType): number {
  const m: Record<BurnTipType, number> = {
    universal_point_basic: 5, ball_tip_shade: 10, flat_shader_wide: 9, knife_edge_line: 3, spoon_tip_scoop: 7,
  };
  return m[t];
}

export function versatility(t: BurnTipType): number {
  const m: Record<BurnTipType, number> = {
    universal_point_basic: 10, ball_tip_shade: 6, flat_shader_wide: 7, knife_edge_line: 5, spoon_tip_scoop: 8,
  };
  return m[t];
}

export function heatControl(t: BurnTipType): number {
  const m: Record<BurnTipType, number> = {
    universal_point_basic: 7, ball_tip_shade: 8, flat_shader_wide: 9, knife_edge_line: 6, spoon_tip_scoop: 8,
  };
  return m[t];
}

export function tipCost(t: BurnTipType): number {
  const m: Record<BurnTipType, number> = {
    universal_point_basic: 1, ball_tip_shade: 2, flat_shader_wide: 2, knife_edge_line: 2, spoon_tip_scoop: 2,
  };
  return m[t];
}

export function forShading(t: BurnTipType): boolean {
  const m: Record<BurnTipType, boolean> = {
    universal_point_basic: false, ball_tip_shade: true, flat_shader_wide: true, knife_edge_line: false, spoon_tip_scoop: true,
  };
  return m[t];
}

export function forLines(t: BurnTipType): boolean {
  const m: Record<BurnTipType, boolean> = {
    universal_point_basic: true, ball_tip_shade: false, flat_shader_wide: false, knife_edge_line: true, spoon_tip_scoop: false,
  };
  return m[t];
}

export function tipShape(t: BurnTipType): string {
  const m: Record<BurnTipType, string> = {
    universal_point_basic: "conical_point_brass",
    ball_tip_shade: "sphere_ball_smooth",
    flat_shader_wide: "flat_paddle_wide",
    knife_edge_line: "thin_blade_edge",
    spoon_tip_scoop: "concave_spoon_cup",
  };
  return m[t];
}

export function bestUse(t: BurnTipType): string {
  const m: Record<BurnTipType, string> = {
    universal_point_basic: "general_burn_outline",
    ball_tip_shade: "smooth_tone_gradient",
    flat_shader_wide: "large_area_fill",
    knife_edge_line: "fine_hair_line",
    spoon_tip_scoop: "texture_dot_stipple",
  };
  return m[t];
}

export function burnTips(): BurnTipType[] {
  return ["universal_point_basic", "ball_tip_shade", "flat_shader_wide", "knife_edge_line", "spoon_tip_scoop"];
}

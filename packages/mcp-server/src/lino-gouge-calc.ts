export type LinoGougeType = "v_gouge_fine_line" | "u_gouge_wide_scoop" | "knife_blade_detail" | "clearance_gouge_flat" | "micro_gouge_stipple";

export function cutPrecision(t: LinoGougeType): number {
  const m: Record<LinoGougeType, number> = {
    v_gouge_fine_line: 10, u_gouge_wide_scoop: 6, knife_blade_detail: 9, clearance_gouge_flat: 5, micro_gouge_stipple: 8,
  };
  return m[t];
}

export function materialRemoval(t: LinoGougeType): number {
  const m: Record<LinoGougeType, number> = {
    v_gouge_fine_line: 4, u_gouge_wide_scoop: 10, knife_blade_detail: 3, clearance_gouge_flat: 9, micro_gouge_stipple: 2,
  };
  return m[t];
}

export function controlFeel(t: LinoGougeType): number {
  const m: Record<LinoGougeType, number> = {
    v_gouge_fine_line: 8, u_gouge_wide_scoop: 7, knife_blade_detail: 9, clearance_gouge_flat: 6, micro_gouge_stipple: 10,
  };
  return m[t];
}

export function edgeRetention(t: LinoGougeType): number {
  const m: Record<LinoGougeType, number> = {
    v_gouge_fine_line: 7, u_gouge_wide_scoop: 8, knife_blade_detail: 6, clearance_gouge_flat: 9, micro_gouge_stipple: 7,
  };
  return m[t];
}

export function gougeCost(t: LinoGougeType): number {
  const m: Record<LinoGougeType, number> = {
    v_gouge_fine_line: 1, u_gouge_wide_scoop: 1, knife_blade_detail: 2, clearance_gouge_flat: 1, micro_gouge_stipple: 2,
  };
  return m[t];
}

export function forOutline(t: LinoGougeType): boolean {
  const m: Record<LinoGougeType, boolean> = {
    v_gouge_fine_line: true, u_gouge_wide_scoop: false, knife_blade_detail: true, clearance_gouge_flat: false, micro_gouge_stipple: false,
  };
  return m[t];
}

export function forClearing(t: LinoGougeType): boolean {
  const m: Record<LinoGougeType, boolean> = {
    v_gouge_fine_line: false, u_gouge_wide_scoop: true, knife_blade_detail: false, clearance_gouge_flat: true, micro_gouge_stipple: false,
  };
  return m[t];
}

export function bladeProfile(t: LinoGougeType): string {
  const m: Record<LinoGougeType, string> = {
    v_gouge_fine_line: "v_shape_narrow_angle",
    u_gouge_wide_scoop: "u_shape_deep_curve",
    knife_blade_detail: "flat_bevel_knife_edge",
    clearance_gouge_flat: "shallow_sweep_flat",
    micro_gouge_stipple: "tiny_round_dot_point",
  };
  return m[t];
}

export function bestCut(t: LinoGougeType): string {
  const m: Record<LinoGougeType, string> = {
    v_gouge_fine_line: "hatching_fine_detail",
    u_gouge_wide_scoop: "large_area_clear",
    knife_blade_detail: "corner_sharp_angle",
    clearance_gouge_flat: "background_remove_fast",
    micro_gouge_stipple: "texture_dot_pattern",
  };
  return m[t];
}

export function linoGouges(): LinoGougeType[] {
  return ["v_gouge_fine_line", "u_gouge_wide_scoop", "knife_blade_detail", "clearance_gouge_flat", "micro_gouge_stipple"];
}

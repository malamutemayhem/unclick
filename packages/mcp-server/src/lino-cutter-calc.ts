export type LinoCutterType = "v_gouge_fine_line" | "u_gouge_scoop_wide" | "knife_blade_outline" | "clearing_gouge_large" | "mushroom_palm_push";

export function lineDetail(t: LinoCutterType): number {
  const m: Record<LinoCutterType, number> = {
    v_gouge_fine_line: 10, u_gouge_scoop_wide: 5, knife_blade_outline: 8, clearing_gouge_large: 3, mushroom_palm_push: 7,
  };
  return m[t];
}

export function clearSpeed(t: LinoCutterType): number {
  const m: Record<LinoCutterType, number> = {
    v_gouge_fine_line: 3, u_gouge_scoop_wide: 8, knife_blade_outline: 4, clearing_gouge_large: 10, mushroom_palm_push: 6,
  };
  return m[t];
}

export function controlFeel(t: LinoCutterType): number {
  const m: Record<LinoCutterType, number> = {
    v_gouge_fine_line: 8, u_gouge_scoop_wide: 7, knife_blade_outline: 9, clearing_gouge_large: 5, mushroom_palm_push: 10,
  };
  return m[t];
}

export function bladeVariety(t: LinoCutterType): number {
  const m: Record<LinoCutterType, number> = {
    v_gouge_fine_line: 6, u_gouge_scoop_wide: 7, knife_blade_outline: 5, clearing_gouge_large: 4, mushroom_palm_push: 10,
  };
  return m[t];
}

export function cutterCost(t: LinoCutterType): number {
  const m: Record<LinoCutterType, number> = {
    v_gouge_fine_line: 1, u_gouge_scoop_wide: 1, knife_blade_outline: 1, clearing_gouge_large: 1, mushroom_palm_push: 2,
  };
  return m[t];
}

export function interchangeable(t: LinoCutterType): boolean {
  const m: Record<LinoCutterType, boolean> = {
    v_gouge_fine_line: false, u_gouge_scoop_wide: false, knife_blade_outline: false, clearing_gouge_large: false, mushroom_palm_push: true,
  };
  return m[t];
}

export function forOutline(t: LinoCutterType): boolean {
  const m: Record<LinoCutterType, boolean> = {
    v_gouge_fine_line: true, u_gouge_scoop_wide: false, knife_blade_outline: true, clearing_gouge_large: false, mushroom_palm_push: false,
  };
  return m[t];
}

export function bladeShape(t: LinoCutterType): string {
  const m: Record<LinoCutterType, string> = {
    v_gouge_fine_line: "v_shape_narrow",
    u_gouge_scoop_wide: "u_shape_wide",
    knife_blade_outline: "flat_knife_angled",
    clearing_gouge_large: "wide_flat_sweep",
    mushroom_palm_push: "interchangeable_set",
  };
  return m[t];
}

export function bestUse(t: LinoCutterType): string {
  const m: Record<LinoCutterType, string> = {
    v_gouge_fine_line: "fine_line_detail",
    u_gouge_scoop_wide: "wide_area_clear",
    knife_blade_outline: "edge_outline_cut",
    clearing_gouge_large: "background_clear",
    mushroom_palm_push: "versatile_palm_carve",
  };
  return m[t];
}

export function linoCutters(): LinoCutterType[] {
  return ["v_gouge_fine_line", "u_gouge_scoop_wide", "knife_blade_outline", "clearing_gouge_large", "mushroom_palm_push"];
}

export type OngletteType = "sharp_point_standard" | "round_heel_smooth" | "flat_bottom_wide" | "knife_edge_fine" | "square_graver_deep";

export function cutDepth(t: OngletteType): number {
  const m: Record<OngletteType, number> = {
    sharp_point_standard: 8, round_heel_smooth: 6, flat_bottom_wide: 7, knife_edge_fine: 5, square_graver_deep: 10,
  };
  return m[t];
}

export function lineDetail(t: OngletteType): number {
  const m: Record<OngletteType, number> = {
    sharp_point_standard: 9, round_heel_smooth: 7, flat_bottom_wide: 5, knife_edge_fine: 10, square_graver_deep: 6,
  };
  return m[t];
}

export function brightCut(t: OngletteType): number {
  const m: Record<OngletteType, number> = {
    sharp_point_standard: 7, round_heel_smooth: 10, flat_bottom_wide: 8, knife_edge_fine: 6, square_graver_deep: 5,
  };
  return m[t];
}

export function controlEase(t: OngletteType): number {
  const m: Record<OngletteType, number> = {
    sharp_point_standard: 8, round_heel_smooth: 9, flat_bottom_wide: 7, knife_edge_fine: 6, square_graver_deep: 5,
  };
  return m[t];
}

export function graverCost(t: OngletteType): number {
  const m: Record<OngletteType, number> = {
    sharp_point_standard: 2, round_heel_smooth: 2, flat_bottom_wide: 2, knife_edge_fine: 3, square_graver_deep: 2,
  };
  return m[t];
}

export function forStoneSeat(t: OngletteType): boolean {
  const m: Record<OngletteType, boolean> = {
    sharp_point_standard: true, round_heel_smooth: false, flat_bottom_wide: true, knife_edge_fine: false, square_graver_deep: true,
  };
  return m[t];
}

export function forLettering(t: OngletteType): boolean {
  const m: Record<OngletteType, boolean> = {
    sharp_point_standard: true, round_heel_smooth: true, flat_bottom_wide: false, knife_edge_fine: true, square_graver_deep: false,
  };
  return m[t];
}

export function steelType(t: OngletteType): string {
  const m: Record<OngletteType, string> = {
    sharp_point_standard: "high_speed_steel",
    round_heel_smooth: "cobalt_alloy_steel",
    flat_bottom_wide: "carbon_tool_steel",
    knife_edge_fine: "carbide_tipped_rod",
    square_graver_deep: "vanadium_tool_steel",
  };
  return m[t];
}

export function bestUse(t: OngletteType): string {
  const m: Record<OngletteType, string> = {
    sharp_point_standard: "bead_raise_set",
    round_heel_smooth: "scroll_bright_cut",
    flat_bottom_wide: "channel_seat_cut",
    knife_edge_fine: "hair_line_engrave",
    square_graver_deep: "deep_relief_carve",
  };
  return m[t];
}

export function onglettes(): OngletteType[] {
  return ["sharp_point_standard", "round_heel_smooth", "flat_bottom_wide", "knife_edge_fine", "square_graver_deep"];
}

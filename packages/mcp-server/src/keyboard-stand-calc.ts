export type KeyboardStandType = "x_style_single_brace" | "z_style_heavy_duty" | "table_top_desktop" | "column_pillar_sleek" | "a_frame_double_tier";

export function stability(t: KeyboardStandType): number {
  const m: Record<KeyboardStandType, number> = {
    x_style_single_brace: 5, z_style_heavy_duty: 9, table_top_desktop: 7, column_pillar_sleek: 8, a_frame_double_tier: 10,
  };
  return m[t];
}

export function heightAdjust(t: KeyboardStandType): number {
  const m: Record<KeyboardStandType, number> = {
    x_style_single_brace: 8, z_style_heavy_duty: 10, table_top_desktop: 3, column_pillar_sleek: 9, a_frame_double_tier: 7,
  };
  return m[t];
}

export function portability(t: KeyboardStandType): number {
  const m: Record<KeyboardStandType, number> = {
    x_style_single_brace: 10, z_style_heavy_duty: 4, table_top_desktop: 6, column_pillar_sleek: 5, a_frame_double_tier: 3,
  };
  return m[t];
}

export function loadCapacity(t: KeyboardStandType): number {
  const m: Record<KeyboardStandType, number> = {
    x_style_single_brace: 5, z_style_heavy_duty: 10, table_top_desktop: 4, column_pillar_sleek: 7, a_frame_double_tier: 9,
  };
  return m[t];
}

export function standCost(t: KeyboardStandType): number {
  const m: Record<KeyboardStandType, number> = {
    x_style_single_brace: 2, z_style_heavy_duty: 6, table_top_desktop: 3, column_pillar_sleek: 7, a_frame_double_tier: 5,
  };
  return m[t];
}

export function multiTier(t: KeyboardStandType): boolean {
  const m: Record<KeyboardStandType, boolean> = {
    x_style_single_brace: false, z_style_heavy_duty: false, table_top_desktop: false, column_pillar_sleek: false, a_frame_double_tier: true,
  };
  return m[t];
}

export function foldFlat(t: KeyboardStandType): boolean {
  const m: Record<KeyboardStandType, boolean> = {
    x_style_single_brace: true, z_style_heavy_duty: true, table_top_desktop: false, column_pillar_sleek: false, a_frame_double_tier: true,
  };
  return m[t];
}

export function frameMaterial(t: KeyboardStandType): string {
  const m: Record<KeyboardStandType, string> = {
    x_style_single_brace: "tubular_steel_light",
    z_style_heavy_duty: "welded_steel_heavy",
    table_top_desktop: "aluminum_desktop_riser",
    column_pillar_sleek: "steel_column_modern",
    a_frame_double_tier: "reinforced_steel_tiered",
  };
  return m[t];
}

export function bestSetup(t: KeyboardStandType): string {
  const m: Record<KeyboardStandType, string> = {
    x_style_single_brace: "gigging_quick_setup",
    z_style_heavy_duty: "studio_weighted_keyboard",
    table_top_desktop: "desk_producer_compact",
    column_pillar_sleek: "stage_digital_piano",
    a_frame_double_tier: "multi_keyboard_rig",
  };
  return m[t];
}

export function keyboardStands(): KeyboardStandType[] {
  return ["x_style_single_brace", "z_style_heavy_duty", "table_top_desktop", "column_pillar_sleek", "a_frame_double_tier"];
}

export type GlueGunType = "mini_low_temp" | "full_size_dual_temp" | "cordless_rechargeable" | "industrial_high_output" | "pen_style_precision";

export function bondStrength(t: GlueGunType): number {
  const m: Record<GlueGunType, number> = {
    mini_low_temp: 4, full_size_dual_temp: 8, cordless_rechargeable: 6, industrial_high_output: 10, pen_style_precision: 5,
  };
  return m[t];
}

export function heatUpSpeed(t: GlueGunType): number {
  const m: Record<GlueGunType, number> = {
    mini_low_temp: 8, full_size_dual_temp: 6, cordless_rechargeable: 7, industrial_high_output: 5, pen_style_precision: 9,
  };
  return m[t];
}

export function precision(t: GlueGunType): number {
  const m: Record<GlueGunType, number> = {
    mini_low_temp: 7, full_size_dual_temp: 5, cordless_rechargeable: 6, industrial_high_output: 3, pen_style_precision: 10,
  };
  return m[t];
}

export function portability(t: GlueGunType): number {
  const m: Record<GlueGunType, number> = {
    mini_low_temp: 8, full_size_dual_temp: 4, cordless_rechargeable: 10, industrial_high_output: 3, pen_style_precision: 9,
  };
  return m[t];
}

export function gunCost(t: GlueGunType): number {
  const m: Record<GlueGunType, number> = {
    mini_low_temp: 2, full_size_dual_temp: 5, cordless_rechargeable: 7, industrial_high_output: 9, pen_style_precision: 6,
  };
  return m[t];
}

export function cordless(t: GlueGunType): boolean {
  const m: Record<GlueGunType, boolean> = {
    mini_low_temp: false, full_size_dual_temp: false, cordless_rechargeable: true, industrial_high_output: false, pen_style_precision: false,
  };
  return m[t];
}

export function kidSafe(t: GlueGunType): boolean {
  const m: Record<GlueGunType, boolean> = {
    mini_low_temp: true, full_size_dual_temp: false, cordless_rechargeable: false, industrial_high_output: false, pen_style_precision: true,
  };
  return m[t];
}

export function stickSize(t: GlueGunType): string {
  const m: Record<GlueGunType, string> = {
    mini_low_temp: "7mm_mini_stick",
    full_size_dual_temp: "11mm_standard_dual",
    cordless_rechargeable: "7mm_mini_lithium",
    industrial_high_output: "11mm_heavy_duty_feed",
    pen_style_precision: "7mm_fine_tip_feed",
  };
  return m[t];
}

export function bestProject(t: GlueGunType): string {
  const m: Record<GlueGunType, string> = {
    mini_low_temp: "kids_craft_lightweight",
    full_size_dual_temp: "general_craft_home_repair",
    cordless_rechargeable: "wreath_decor_on_site",
    industrial_high_output: "woodworking_heavy_assembly",
    pen_style_precision: "jewelry_model_detail_work",
  };
  return m[t];
}

export function glueGuns(): GlueGunType[] {
  return ["mini_low_temp", "full_size_dual_temp", "cordless_rechargeable", "industrial_high_output", "pen_style_precision"];
}

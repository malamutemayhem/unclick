export type TjantingToolType = "single_spout_fine" | "double_spout_wide" | "electric_heat_pen" | "canting_needle_point" | "brush_wax_apply";

export function lineFineness(t: TjantingToolType): number {
  const m: Record<TjantingToolType, number> = {
    single_spout_fine: 9, double_spout_wide: 5, electric_heat_pen: 8, canting_needle_point: 10, brush_wax_apply: 3,
  };
  return m[t];
}

export function waxFlow(t: TjantingToolType): number {
  const m: Record<TjantingToolType, number> = {
    single_spout_fine: 6, double_spout_wide: 9, electric_heat_pen: 8, canting_needle_point: 5, brush_wax_apply: 10,
  };
  return m[t];
}

export function heatControl(t: TjantingToolType): number {
  const m: Record<TjantingToolType, number> = {
    single_spout_fine: 5, double_spout_wide: 5, electric_heat_pen: 10, canting_needle_point: 4, brush_wax_apply: 3,
  };
  return m[t];
}

export function easeOfUse(t: TjantingToolType): number {
  const m: Record<TjantingToolType, number> = {
    single_spout_fine: 6, double_spout_wide: 7, electric_heat_pen: 9, canting_needle_point: 4, brush_wax_apply: 8,
  };
  return m[t];
}

export function toolCost(t: TjantingToolType): number {
  const m: Record<TjantingToolType, number> = {
    single_spout_fine: 1, double_spout_wide: 1, electric_heat_pen: 3, canting_needle_point: 2, brush_wax_apply: 1,
  };
  return m[t];
}

export function electric(t: TjantingToolType): boolean {
  const m: Record<TjantingToolType, boolean> = {
    single_spout_fine: false, double_spout_wide: false, electric_heat_pen: true, canting_needle_point: false, brush_wax_apply: false,
  };
  return m[t];
}

export function forFilling(t: TjantingToolType): boolean {
  const m: Record<TjantingToolType, boolean> = {
    single_spout_fine: false, double_spout_wide: true, electric_heat_pen: false, canting_needle_point: false, brush_wax_apply: true,
  };
  return m[t];
}

export function spoutMaterial(t: TjantingToolType): string {
  const m: Record<TjantingToolType, string> = {
    single_spout_fine: "copper_cup_spout",
    double_spout_wide: "brass_dual_spout",
    electric_heat_pen: "heated_metal_tip",
    canting_needle_point: "fine_copper_needle",
    brush_wax_apply: "natural_bristle_head",
  };
  return m[t];
}

export function bestUse(t: TjantingToolType): string {
  const m: Record<TjantingToolType, string> = {
    single_spout_fine: "detail_wax_line",
    double_spout_wide: "parallel_line_draw",
    electric_heat_pen: "consistent_wax_flow",
    canting_needle_point: "ultra_fine_detail",
    brush_wax_apply: "area_wax_fill",
  };
  return m[t];
}

export function tjantingTools(): TjantingToolType[] {
  return ["single_spout_fine", "double_spout_wide", "electric_heat_pen", "canting_needle_point", "brush_wax_apply"];
}

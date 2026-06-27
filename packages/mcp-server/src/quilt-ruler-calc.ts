export type QuiltRulerType = "square_basic_clear" | "rectangle_long_wide" | "triangle_half_square" | "wedge_dresden_fan" | "circle_curve_set";

export function accuracy(t: QuiltRulerType): number {
  const m: Record<QuiltRulerType, number> = {
    square_basic_clear: 8, rectangle_long_wide: 9, triangle_half_square: 9, wedge_dresden_fan: 7, circle_curve_set: 8,
  };
  return m[t];
}

export function versatility(t: QuiltRulerType): number {
  const m: Record<QuiltRulerType, number> = {
    square_basic_clear: 10, rectangle_long_wide: 9, triangle_half_square: 6, wedge_dresden_fan: 5, circle_curve_set: 7,
  };
  return m[t];
}

export function easeOfUse(t: QuiltRulerType): number {
  const m: Record<QuiltRulerType, number> = {
    square_basic_clear: 10, rectangle_long_wide: 8, triangle_half_square: 7, wedge_dresden_fan: 6, circle_curve_set: 5,
  };
  return m[t];
}

export function markingClarity(t: QuiltRulerType): number {
  const m: Record<QuiltRulerType, number> = {
    square_basic_clear: 9, rectangle_long_wide: 9, triangle_half_square: 8, wedge_dresden_fan: 7, circle_curve_set: 7,
  };
  return m[t];
}

export function rulerCost(t: QuiltRulerType): number {
  const m: Record<QuiltRulerType, number> = {
    square_basic_clear: 2, rectangle_long_wide: 3, triangle_half_square: 3, wedge_dresden_fan: 3, circle_curve_set: 4,
  };
  return m[t];
}

export function nonSlip(t: QuiltRulerType): boolean {
  const m: Record<QuiltRulerType, boolean> = {
    square_basic_clear: true, rectangle_long_wide: true, triangle_half_square: true, wedge_dresden_fan: false, circle_curve_set: true,
  };
  return m[t];
}

export function forSpecialShape(t: QuiltRulerType): boolean {
  const m: Record<QuiltRulerType, boolean> = {
    square_basic_clear: false, rectangle_long_wide: false, triangle_half_square: true, wedge_dresden_fan: true, circle_curve_set: true,
  };
  return m[t];
}

export function rulerMaterial(t: QuiltRulerType): string {
  const m: Record<QuiltRulerType, string> = {
    square_basic_clear: "acrylic_clear_etched",
    rectangle_long_wide: "acrylic_thick_grid",
    triangle_half_square: "acrylic_angle_marked",
    wedge_dresden_fan: "acrylic_wedge_shaped",
    circle_curve_set: "acrylic_curved_template",
  };
  return m[t];
}

export function bestUse(t: QuiltRulerType): string {
  const m: Record<QuiltRulerType, string> = {
    square_basic_clear: "general_cutting_trim",
    rectangle_long_wide: "strip_cutting_border",
    triangle_half_square: "half_square_triangle",
    wedge_dresden_fan: "dresden_plate_fan",
    circle_curve_set: "curved_piecing_circle",
  };
  return m[t];
}

export function quiltRulers(): QuiltRulerType[] {
  return ["square_basic_clear", "rectangle_long_wide", "triangle_half_square", "wedge_dresden_fan", "circle_curve_set"];
}

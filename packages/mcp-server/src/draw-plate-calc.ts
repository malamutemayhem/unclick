export type DrawPlateType = "round_hole_standard" | "square_hole_wire" | "half_round_shape" | "triangle_hole_form" | "oval_hole_flat";

export function holeCount(t: DrawPlateType): number {
  const m: Record<DrawPlateType, number> = {
    round_hole_standard: 10, square_hole_wire: 7, half_round_shape: 6, triangle_hole_form: 6, oval_hole_flat: 5,
  };
  return m[t];
}

export function drawSmooth(t: DrawPlateType): number {
  const m: Record<DrawPlateType, number> = {
    round_hole_standard: 9, square_hole_wire: 7, half_round_shape: 8, triangle_hole_form: 6, oval_hole_flat: 8,
  };
  return m[t];
}

export function sizeRange(t: DrawPlateType): number {
  const m: Record<DrawPlateType, number> = {
    round_hole_standard: 10, square_hole_wire: 8, half_round_shape: 7, triangle_hole_form: 6, oval_hole_flat: 7,
  };
  return m[t];
}

export function durability(t: DrawPlateType): number {
  const m: Record<DrawPlateType, number> = {
    round_hole_standard: 9, square_hole_wire: 8, half_round_shape: 8, triangle_hole_form: 7, oval_hole_flat: 7,
  };
  return m[t];
}

export function plateCost(t: DrawPlateType): number {
  const m: Record<DrawPlateType, number> = {
    round_hole_standard: 2, square_hole_wire: 2, half_round_shape: 3, triangle_hole_form: 3, oval_hole_flat: 3,
  };
  return m[t];
}

export function carbideInsert(t: DrawPlateType): boolean {
  const m: Record<DrawPlateType, boolean> = {
    round_hole_standard: true, square_hole_wire: false, half_round_shape: false, triangle_hole_form: false, oval_hole_flat: false,
  };
  return m[t];
}

export function specialProfile(t: DrawPlateType): boolean {
  const m: Record<DrawPlateType, boolean> = {
    round_hole_standard: false, square_hole_wire: true, half_round_shape: true, triangle_hole_form: true, oval_hole_flat: true,
  };
  return m[t];
}

export function plateMetal(t: DrawPlateType): string {
  const m: Record<DrawPlateType, string> = {
    round_hole_standard: "hardened_tool_steel",
    square_hole_wire: "tempered_carbon_steel",
    half_round_shape: "alloy_steel_ground",
    triangle_hole_form: "high_speed_steel",
    oval_hole_flat: "stainless_steel_plate",
  };
  return m[t];
}

export function bestUse(t: DrawPlateType): string {
  const m: Record<DrawPlateType, string> = {
    round_hole_standard: "round_wire_reduce",
    square_hole_wire: "square_wire_form",
    half_round_shape: "ring_shank_profile",
    triangle_hole_form: "decorative_wire_shape",
    oval_hole_flat: "flat_bezel_strip",
  };
  return m[t];
}

export function drawPlates(): DrawPlateType[] {
  return ["round_hole_standard", "square_hole_wire", "half_round_shape", "triangle_hole_form", "oval_hole_flat"];
}

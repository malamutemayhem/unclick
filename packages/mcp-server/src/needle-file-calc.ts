export type NeedleFileType = "flat_hand_smooth" | "half_round_curve" | "triangle_corner_point" | "square_slot_cut" | "crossing_double_face";

export function cutRate(t: NeedleFileType): number {
  const m: Record<NeedleFileType, number> = {
    flat_hand_smooth: 7, half_round_curve: 6, triangle_corner_point: 8, square_slot_cut: 9, crossing_double_face: 7,
  };
  return m[t];
}

export function finishQuality(t: NeedleFileType): number {
  const m: Record<NeedleFileType, number> = {
    flat_hand_smooth: 9, half_round_curve: 8, triangle_corner_point: 6, square_slot_cut: 5, crossing_double_face: 7,
  };
  return m[t];
}

export function versatility(t: NeedleFileType): number {
  const m: Record<NeedleFileType, number> = {
    flat_hand_smooth: 10, half_round_curve: 9, triangle_corner_point: 6, square_slot_cut: 5, crossing_double_face: 7,
  };
  return m[t];
}

export function detailReach(t: NeedleFileType): number {
  const m: Record<NeedleFileType, number> = {
    flat_hand_smooth: 5, half_round_curve: 7, triangle_corner_point: 10, square_slot_cut: 8, crossing_double_face: 6,
  };
  return m[t];
}

export function fileCost(t: NeedleFileType): number {
  const m: Record<NeedleFileType, number> = {
    flat_hand_smooth: 1, half_round_curve: 1, triangle_corner_point: 2, square_slot_cut: 2, crossing_double_face: 2,
  };
  return m[t];
}

export function doublecut(t: NeedleFileType): boolean {
  const m: Record<NeedleFileType, boolean> = {
    flat_hand_smooth: false, half_round_curve: false, triangle_corner_point: true, square_slot_cut: true, crossing_double_face: true,
  };
  return m[t];
}

export function curvedFace(t: NeedleFileType): boolean {
  const m: Record<NeedleFileType, boolean> = {
    flat_hand_smooth: false, half_round_curve: true, triangle_corner_point: false, square_slot_cut: false, crossing_double_face: true,
  };
  return m[t];
}

export function toothPattern(t: NeedleFileType): string {
  const m: Record<NeedleFileType, string> = {
    flat_hand_smooth: "single_cut_parallel",
    half_round_curve: "single_cut_spiral",
    triangle_corner_point: "double_cut_cross",
    square_slot_cut: "double_cut_diamond",
    crossing_double_face: "rasp_cut_staggered",
  };
  return m[t];
}

export function bestUse(t: NeedleFileType): string {
  const m: Record<NeedleFileType, string> = {
    flat_hand_smooth: "flat_surface_finish",
    half_round_curve: "inside_ring_smooth",
    triangle_corner_point: "sharp_corner_clean",
    square_slot_cut: "slot_keyway_widen",
    crossing_double_face: "concave_convex_shape",
  };
  return m[t];
}

export function needleFiles(): NeedleFileType[] {
  return ["flat_hand_smooth", "half_round_curve", "triangle_corner_point", "square_slot_cut", "crossing_double_face"];
}

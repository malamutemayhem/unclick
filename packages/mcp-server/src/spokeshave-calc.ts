export type SpokeshaveType = "flat_bottom_standard" | "round_bottom_concave" | "adjustable_mouth_brass" | "low_angle_bevel_up" | "travisher_deep_scoop";

export function surfaceFinish(t: SpokeshaveType): number {
  const m: Record<SpokeshaveType, number> = {
    flat_bottom_standard: 8, round_bottom_concave: 7, adjustable_mouth_brass: 10, low_angle_bevel_up: 9, travisher_deep_scoop: 7,
  };
  return m[t];
}

export function curveHandling(t: SpokeshaveType): number {
  const m: Record<SpokeshaveType, number> = {
    flat_bottom_standard: 5, round_bottom_concave: 10, adjustable_mouth_brass: 7, low_angle_bevel_up: 6, travisher_deep_scoop: 10,
  };
  return m[t];
}

export function controlGrip(t: SpokeshaveType): number {
  const m: Record<SpokeshaveType, number> = {
    flat_bottom_standard: 9, round_bottom_concave: 8, adjustable_mouth_brass: 9, low_angle_bevel_up: 8, travisher_deep_scoop: 7,
  };
  return m[t];
}

export function depthAdjust(t: SpokeshaveType): number {
  const m: Record<SpokeshaveType, number> = {
    flat_bottom_standard: 7, round_bottom_concave: 6, adjustable_mouth_brass: 10, low_angle_bevel_up: 8, travisher_deep_scoop: 5,
  };
  return m[t];
}

export function shaveCost(t: SpokeshaveType): number {
  const m: Record<SpokeshaveType, number> = {
    flat_bottom_standard: 2, round_bottom_concave: 2, adjustable_mouth_brass: 3, low_angle_bevel_up: 3, travisher_deep_scoop: 3,
  };
  return m[t];
}

export function forConvex(t: SpokeshaveType): boolean {
  const m: Record<SpokeshaveType, boolean> = {
    flat_bottom_standard: true, round_bottom_concave: false, adjustable_mouth_brass: true, low_angle_bevel_up: true, travisher_deep_scoop: false,
  };
  return m[t];
}

export function forConcave(t: SpokeshaveType): boolean {
  const m: Record<SpokeshaveType, boolean> = {
    flat_bottom_standard: false, round_bottom_concave: true, adjustable_mouth_brass: false, low_angle_bevel_up: false, travisher_deep_scoop: true,
  };
  return m[t];
}

export function soleProfile(t: SpokeshaveType): string {
  const m: Record<SpokeshaveType, string> = {
    flat_bottom_standard: "flat_cast_iron",
    round_bottom_concave: "curved_cast_iron",
    adjustable_mouth_brass: "flat_brass_adjuster",
    low_angle_bevel_up: "flat_ductile_iron",
    travisher_deep_scoop: "deep_curved_scoop",
  };
  return m[t];
}

export function bestProject(t: SpokeshaveType): string {
  const m: Record<SpokeshaveType, string> = {
    flat_bottom_standard: "chair_leg_taper",
    round_bottom_concave: "windsor_seat_bowl",
    adjustable_mouth_brass: "fine_furniture_edge",
    low_angle_bevel_up: "end_grain_handle",
    travisher_deep_scoop: "spoon_bowl_carve",
  };
  return m[t];
}

export function spokeshaves(): SpokeshaveType[] {
  return ["flat_bottom_standard", "round_bottom_concave", "adjustable_mouth_brass", "low_angle_bevel_up", "travisher_deep_scoop"];
}

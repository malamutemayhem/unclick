export type KnitNeedleType = "straight_single_pair" | "circular_cable_loop" | "double_point_set" | "interchangeable_tip" | "square_ergonomic";

export function stitchSpeed(t: KnitNeedleType): number {
  const m: Record<KnitNeedleType, number> = {
    straight_single_pair: 7, circular_cable_loop: 9, double_point_set: 6, interchangeable_tip: 8, square_ergonomic: 5,
  };
  return m[t];
}

export function versatility(t: KnitNeedleType): number {
  const m: Record<KnitNeedleType, number> = {
    straight_single_pair: 5, circular_cable_loop: 9, double_point_set: 7, interchangeable_tip: 10, square_ergonomic: 6,
  };
  return m[t];
}

export function handComfort(t: KnitNeedleType): number {
  const m: Record<KnitNeedleType, number> = {
    straight_single_pair: 6, circular_cable_loop: 8, double_point_set: 5, interchangeable_tip: 8, square_ergonomic: 10,
  };
  return m[t];
}

export function portability(t: KnitNeedleType): number {
  const m: Record<KnitNeedleType, number> = {
    straight_single_pair: 4, circular_cable_loop: 9, double_point_set: 7, interchangeable_tip: 8, square_ergonomic: 5,
  };
  return m[t];
}

export function needleCost(t: KnitNeedleType): number {
  const m: Record<KnitNeedleType, number> = {
    straight_single_pair: 1, circular_cable_loop: 2, double_point_set: 2, interchangeable_tip: 5, square_ergonomic: 3,
  };
  return m[t];
}

export function forCircular(t: KnitNeedleType): boolean {
  const m: Record<KnitNeedleType, boolean> = {
    straight_single_pair: false, circular_cable_loop: true, double_point_set: true, interchangeable_tip: true, square_ergonomic: false,
  };
  return m[t];
}

export function sizeSwap(t: KnitNeedleType): boolean {
  const m: Record<KnitNeedleType, boolean> = {
    straight_single_pair: false, circular_cable_loop: false, double_point_set: false, interchangeable_tip: true, square_ergonomic: false,
  };
  return m[t];
}

export function needleMaterial(t: KnitNeedleType): string {
  const m: Record<KnitNeedleType, string> = {
    straight_single_pair: "aluminum_anodized",
    circular_cable_loop: "nickel_plate_cable",
    double_point_set: "bamboo_wood_set",
    interchangeable_tip: "birch_metal_tip",
    square_ergonomic: "cubic_wood_shape",
  };
  return m[t];
}

export function bestProject(t: KnitNeedleType): string {
  const m: Record<KnitNeedleType, string> = {
    straight_single_pair: "flat_scarf_beginner",
    circular_cable_loop: "seamless_sweater_round",
    double_point_set: "sock_mitten_small",
    interchangeable_tip: "multi_project_swap",
    square_ergonomic: "arthritis_comfort_knit",
  };
  return m[t];
}

export function knitNeedles(): KnitNeedleType[] {
  return ["straight_single_pair", "circular_cable_loop", "double_point_set", "interchangeable_tip", "square_ergonomic"];
}

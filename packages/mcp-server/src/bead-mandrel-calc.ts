export type BeadMandrelType = "steel_straight_round" | "tapered_cone_shape" | "flat_paddle_press" | "graphite_smooth_release" | "stainless_coated_dip";

export function holeSize(t: BeadMandrelType): number {
  const m: Record<BeadMandrelType, number> = {
    steel_straight_round: 7, tapered_cone_shape: 10, flat_paddle_press: 3, graphite_smooth_release: 7, stainless_coated_dip: 8,
  };
  return m[t];
}

export function releaseEase(t: BeadMandrelType): number {
  const m: Record<BeadMandrelType, number> = {
    steel_straight_round: 5, tapered_cone_shape: 6, flat_paddle_press: 7, graphite_smooth_release: 10, stainless_coated_dip: 9,
  };
  return m[t];
}

export function heatResist(t: BeadMandrelType): number {
  const m: Record<BeadMandrelType, number> = {
    steel_straight_round: 9, tapered_cone_shape: 8, flat_paddle_press: 8, graphite_smooth_release: 10, stainless_coated_dip: 9,
  };
  return m[t];
}

export function shapeControl(t: BeadMandrelType): number {
  const m: Record<BeadMandrelType, number> = {
    steel_straight_round: 7, tapered_cone_shape: 9, flat_paddle_press: 10, graphite_smooth_release: 7, stainless_coated_dip: 8,
  };
  return m[t];
}

export function mandrelCost(t: BeadMandrelType): number {
  const m: Record<BeadMandrelType, number> = {
    steel_straight_round: 1, tapered_cone_shape: 2, flat_paddle_press: 3, graphite_smooth_release: 4, stainless_coated_dip: 2,
  };
  return m[t];
}

export function coated(t: BeadMandrelType): boolean {
  const m: Record<BeadMandrelType, boolean> = {
    steel_straight_round: false, tapered_cone_shape: false, flat_paddle_press: false, graphite_smooth_release: true, stainless_coated_dip: true,
  };
  return m[t];
}

export function tapered(t: BeadMandrelType): boolean {
  const m: Record<BeadMandrelType, boolean> = {
    steel_straight_round: false, tapered_cone_shape: true, flat_paddle_press: false, graphite_smooth_release: false, stainless_coated_dip: false,
  };
  return m[t];
}

export function mandrelShape(t: BeadMandrelType): string {
  const m: Record<BeadMandrelType, string> = {
    steel_straight_round: "straight_round_rod",
    tapered_cone_shape: "tapered_cone_rod",
    flat_paddle_press: "flat_paddle_plate",
    graphite_smooth_release: "graphite_coated_rod",
    stainless_coated_dip: "stainless_dip_coated",
  };
  return m[t];
}

export function bestUse(t: BeadMandrelType): string {
  const m: Record<BeadMandrelType, string> = {
    steel_straight_round: "standard_round_bead",
    tapered_cone_shape: "variable_hole_bead",
    flat_paddle_press: "flat_tab_bead",
    graphite_smooth_release: "easy_release_bead",
    stainless_coated_dip: "production_durable",
  };
  return m[t];
}

export function beadMandrels(): BeadMandrelType[] {
  return ["steel_straight_round", "tapered_cone_shape", "flat_paddle_press", "graphite_smooth_release", "stainless_coated_dip"];
}

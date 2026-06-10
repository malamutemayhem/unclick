export type KnittingNeedleType = "straight_single_point" | "circular_cable_loop" | "double_point_dpn_set" | "interchangeable_tip_cable" | "square_ergonomic_grip";

export function versatility(t: KnittingNeedleType): number {
  const m: Record<KnittingNeedleType, number> = {
    straight_single_point: 4, circular_cable_loop: 9, double_point_dpn_set: 7, interchangeable_tip_cable: 10, square_ergonomic_grip: 5,
  };
  return m[t];
}

export function comfort(t: KnittingNeedleType): number {
  const m: Record<KnittingNeedleType, number> = {
    straight_single_point: 6, circular_cable_loop: 8, double_point_dpn_set: 5, interchangeable_tip_cable: 8, square_ergonomic_grip: 10,
  };
  return m[t];
}

export function portability(t: KnittingNeedleType): number {
  const m: Record<KnittingNeedleType, number> = {
    straight_single_point: 4, circular_cable_loop: 8, double_point_dpn_set: 7, interchangeable_tip_cable: 6, square_ergonomic_grip: 4,
  };
  return m[t];
}

export function stitchControl(t: KnittingNeedleType): number {
  const m: Record<KnittingNeedleType, number> = {
    straight_single_point: 7, circular_cable_loop: 8, double_point_dpn_set: 6, interchangeable_tip_cable: 9, square_ergonomic_grip: 9,
  };
  return m[t];
}

export function needleCost(t: KnittingNeedleType): number {
  const m: Record<KnittingNeedleType, number> = {
    straight_single_point: 2, circular_cable_loop: 3, double_point_dpn_set: 3, interchangeable_tip_cable: 8, square_ergonomic_grip: 4,
  };
  return m[t];
}

export function worksInRound(t: KnittingNeedleType): boolean {
  const m: Record<KnittingNeedleType, boolean> = {
    straight_single_point: false, circular_cable_loop: true, double_point_dpn_set: true, interchangeable_tip_cable: true, square_ergonomic_grip: false,
  };
  return m[t];
}

export function swappableTips(t: KnittingNeedleType): boolean {
  const m: Record<KnittingNeedleType, boolean> = {
    straight_single_point: false, circular_cable_loop: false, double_point_dpn_set: false, interchangeable_tip_cable: true, square_ergonomic_grip: false,
  };
  return m[t];
}

export function tipMaterial(t: KnittingNeedleType): string {
  const m: Record<KnittingNeedleType, string> = {
    straight_single_point: "bamboo_wood_classic",
    circular_cable_loop: "nickel_plated_brass",
    double_point_dpn_set: "birch_carbon_fiber",
    interchangeable_tip_cable: "stainless_brass_wood",
    square_ergonomic_grip: "cubic_birch_walnut",
  };
  return m[t];
}

export function bestProject(t: KnittingNeedleType): string {
  const m: Record<KnittingNeedleType, string> = {
    straight_single_point: "scarf_dishcloth_flat",
    circular_cable_loop: "sweater_hat_blanket",
    double_point_dpn_set: "sock_mitten_small_round",
    interchangeable_tip_cable: "any_project_full_range",
    square_ergonomic_grip: "arthritis_grip_relief",
  };
  return m[t];
}

export function knittingNeedles(): KnittingNeedleType[] {
  return ["straight_single_point", "circular_cable_loop", "double_point_dpn_set", "interchangeable_tip_cable", "square_ergonomic_grip"];
}

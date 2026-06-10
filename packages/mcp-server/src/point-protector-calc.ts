export type PointProtectorType = "rubber_cap_basic" | "silicone_grip_color" | "coil_spring_wire" | "bead_decorative_end" | "tube_connector_join";

export function gripStrength(t: PointProtectorType): number {
  const m: Record<PointProtectorType, number> = {
    rubber_cap_basic: 8, silicone_grip_color: 9, coil_spring_wire: 6, bead_decorative_end: 5, tube_connector_join: 7,
  };
  return m[t];
}

export function sizeRange(t: PointProtectorType): number {
  const m: Record<PointProtectorType, number> = {
    rubber_cap_basic: 7, silicone_grip_color: 9, coil_spring_wire: 10, bead_decorative_end: 5, tube_connector_join: 8,
  };
  return m[t];
}

export function durability(t: PointProtectorType): number {
  const m: Record<PointProtectorType, number> = {
    rubber_cap_basic: 6, silicone_grip_color: 8, coil_spring_wire: 9, bead_decorative_end: 4, tube_connector_join: 7,
  };
  return m[t];
}

export function visibility(t: PointProtectorType): number {
  const m: Record<PointProtectorType, number> = {
    rubber_cap_basic: 5, silicone_grip_color: 9, coil_spring_wire: 6, bead_decorative_end: 10, tube_connector_join: 4,
  };
  return m[t];
}

export function protectorCost(t: PointProtectorType): number {
  const m: Record<PointProtectorType, number> = {
    rubber_cap_basic: 1, silicone_grip_color: 2, coil_spring_wire: 3, bead_decorative_end: 4, tube_connector_join: 2,
  };
  return m[t];
}

export function reusable(t: PointProtectorType): boolean {
  const m: Record<PointProtectorType, boolean> = {
    rubber_cap_basic: true, silicone_grip_color: true, coil_spring_wire: true, bead_decorative_end: true, tube_connector_join: true,
  };
  return m[t];
}

export function decorative(t: PointProtectorType): boolean {
  const m: Record<PointProtectorType, boolean> = {
    rubber_cap_basic: false, silicone_grip_color: false, coil_spring_wire: false, bead_decorative_end: true, tube_connector_join: false,
  };
  return m[t];
}

export function protectorMaterial(t: PointProtectorType): string {
  const m: Record<PointProtectorType, string> = {
    rubber_cap_basic: "natural_rubber_molded",
    silicone_grip_color: "food_grade_silicone",
    coil_spring_wire: "stainless_steel_coil",
    bead_decorative_end: "glass_bead_threaded",
    tube_connector_join: "pvc_flexible_tube",
  };
  return m[t];
}

export function bestUse(t: PointProtectorType): string {
  const m: Record<PointProtectorType, string> = {
    rubber_cap_basic: "straight_needle_travel",
    silicone_grip_color: "multiple_project_sort",
    coil_spring_wire: "large_needle_secure",
    bead_decorative_end: "gift_display_fancy",
    tube_connector_join: "circular_cable_extend",
  };
  return m[t];
}

export function pointProtectors(): PointProtectorType[] {
  return ["rubber_cap_basic", "silicone_grip_color", "coil_spring_wire", "bead_decorative_end", "tube_connector_join"];
}

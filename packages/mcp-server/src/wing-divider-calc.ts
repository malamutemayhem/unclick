export type WingDividerType = "steel_point_basic" | "locking_screw_set" | "spring_bow_fine" | "compass_wheel_arc" | "creaser_tip_line";

export function lineAccuracy(t: WingDividerType): number {
  const m: Record<WingDividerType, number> = {
    steel_point_basic: 6, locking_screw_set: 8, spring_bow_fine: 10, compass_wheel_arc: 7, creaser_tip_line: 9,
  };
  return m[t];
}

export function settingHold(t: WingDividerType): number {
  const m: Record<WingDividerType, number> = {
    steel_point_basic: 4, locking_screw_set: 10, spring_bow_fine: 9, compass_wheel_arc: 7, creaser_tip_line: 6,
  };
  return m[t];
}

export function easeOfUse(t: WingDividerType): number {
  const m: Record<WingDividerType, number> = {
    steel_point_basic: 9, locking_screw_set: 7, spring_bow_fine: 6, compass_wheel_arc: 8, creaser_tip_line: 7,
  };
  return m[t];
}

export function maxSpan(t: WingDividerType): number {
  const m: Record<WingDividerType, number> = {
    steel_point_basic: 8, locking_screw_set: 7, spring_bow_fine: 5, compass_wheel_arc: 10, creaser_tip_line: 6,
  };
  return m[t];
}

export function dividerCost(t: WingDividerType): number {
  const m: Record<WingDividerType, number> = {
    steel_point_basic: 1, locking_screw_set: 2, spring_bow_fine: 3, compass_wheel_arc: 2, creaser_tip_line: 2,
  };
  return m[t];
}

export function lockable(t: WingDividerType): boolean {
  const m: Record<WingDividerType, boolean> = {
    steel_point_basic: false, locking_screw_set: true, spring_bow_fine: true, compass_wheel_arc: false, creaser_tip_line: false,
  };
  return m[t];
}

export function forCreasing(t: WingDividerType): boolean {
  const m: Record<WingDividerType, boolean> = {
    steel_point_basic: false, locking_screw_set: false, spring_bow_fine: false, compass_wheel_arc: false, creaser_tip_line: true,
  };
  return m[t];
}

export function legMaterial(t: WingDividerType): string {
  const m: Record<WingDividerType, string> = {
    steel_point_basic: "carbon_steel_forged",
    locking_screw_set: "stainless_steel_knurled",
    spring_bow_fine: "spring_steel_tempered",
    compass_wheel_arc: "brass_steel_hybrid",
    creaser_tip_line: "tool_steel_polished",
  };
  return m[t];
}

export function bestUse(t: WingDividerType): string {
  const m: Record<WingDividerType, string> = {
    steel_point_basic: "quick_edge_mark",
    locking_screw_set: "repeat_measure_set",
    spring_bow_fine: "precise_stitch_space",
    compass_wheel_arc: "large_arc_scribe",
    creaser_tip_line: "edge_crease_line",
  };
  return m[t];
}

export function wingDividers(): WingDividerType[] {
  return ["steel_point_basic", "locking_screw_set", "spring_bow_fine", "compass_wheel_arc", "creaser_tip_line"];
}

export type TempleWeaveType = "steel_pin_expand" | "wood_peg_clamp" | "rubber_grip_roll" | "skeletal_wide_span" | "clip_on_narrow";

export function widthHold(t: TempleWeaveType): number {
  const m: Record<TempleWeaveType, number> = {
    steel_pin_expand: 9, wood_peg_clamp: 7, rubber_grip_roll: 6, skeletal_wide_span: 10, clip_on_narrow: 5,
  };
  return m[t];
}

export function fabricSafe(t: TempleWeaveType): number {
  const m: Record<TempleWeaveType, number> = {
    steel_pin_expand: 5, wood_peg_clamp: 8, rubber_grip_roll: 10, skeletal_wide_span: 6, clip_on_narrow: 7,
  };
  return m[t];
}

export function adjustRange(t: TempleWeaveType): number {
  const m: Record<TempleWeaveType, number> = {
    steel_pin_expand: 9, wood_peg_clamp: 6, rubber_grip_roll: 7, skeletal_wide_span: 10, clip_on_narrow: 5,
  };
  return m[t];
}

export function easeOfUse(t: TempleWeaveType): number {
  const m: Record<TempleWeaveType, number> = {
    steel_pin_expand: 7, wood_peg_clamp: 6, rubber_grip_roll: 9, skeletal_wide_span: 5, clip_on_narrow: 10,
  };
  return m[t];
}

export function templeCost(t: TempleWeaveType): number {
  const m: Record<TempleWeaveType, number> = {
    steel_pin_expand: 2, wood_peg_clamp: 1, rubber_grip_roll: 2, skeletal_wide_span: 3, clip_on_narrow: 1,
  };
  return m[t];
}

export function marksFabric(t: TempleWeaveType): boolean {
  const m: Record<TempleWeaveType, boolean> = {
    steel_pin_expand: true, wood_peg_clamp: false, rubber_grip_roll: false, skeletal_wide_span: true, clip_on_narrow: false,
  };
  return m[t];
}

export function forWide(t: TempleWeaveType): boolean {
  const m: Record<TempleWeaveType, boolean> = {
    steel_pin_expand: true, wood_peg_clamp: false, rubber_grip_roll: false, skeletal_wide_span: true, clip_on_narrow: false,
  };
  return m[t];
}

export function gripType(t: TempleWeaveType): string {
  const m: Record<TempleWeaveType, string> = {
    steel_pin_expand: "sharp_pin_teeth",
    wood_peg_clamp: "wooden_peg_friction",
    rubber_grip_roll: "rubber_coated_roller",
    skeletal_wide_span: "pin_point_skeletal",
    clip_on_narrow: "spring_clip_jaw",
  };
  return m[t];
}

export function bestUse(t: TempleWeaveType): string {
  const m: Record<TempleWeaveType, string> = {
    steel_pin_expand: "sturdy_width_hold",
    wood_peg_clamp: "delicate_fabric_hold",
    rubber_grip_roll: "no_mark_tension",
    skeletal_wide_span: "wide_rug_weave",
    clip_on_narrow: "narrow_band_weave",
  };
  return m[t];
}

export function templeWeaves(): TempleWeaveType[] {
  return ["steel_pin_expand", "wood_peg_clamp", "rubber_grip_roll", "skeletal_wide_span", "clip_on_narrow"];
}

export type KilnConeType = "low_fire_06_cone" | "mid_fire_6_cone" | "high_fire_10_cone" | "self_support_bar" | "pyrometric_witness";

export function targetTemp(t: KilnConeType): number {
  const m: Record<KilnConeType, number> = {
    low_fire_06_cone: 3, mid_fire_6_cone: 6, high_fire_10_cone: 10, self_support_bar: 7, pyrometric_witness: 8,
  };
  return m[t];
}

export function accuracy(t: KilnConeType): number {
  const m: Record<KilnConeType, number> = {
    low_fire_06_cone: 8, mid_fire_6_cone: 8, high_fire_10_cone: 8, self_support_bar: 9, pyrometric_witness: 10,
  };
  return m[t];
}

export function easeOfRead(t: KilnConeType): number {
  const m: Record<KilnConeType, number> = {
    low_fire_06_cone: 7, mid_fire_6_cone: 7, high_fire_10_cone: 7, self_support_bar: 9, pyrometric_witness: 6,
  };
  return m[t];
}

export function availability(t: KilnConeType): number {
  const m: Record<KilnConeType, number> = {
    low_fire_06_cone: 10, mid_fire_6_cone: 10, high_fire_10_cone: 9, self_support_bar: 8, pyrometric_witness: 6,
  };
  return m[t];
}

export function coneCost(t: KilnConeType): number {
  const m: Record<KilnConeType, number> = {
    low_fire_06_cone: 1, mid_fire_6_cone: 1, high_fire_10_cone: 1, self_support_bar: 2, pyrometric_witness: 3,
  };
  return m[t];
}

export function freestanding(t: KilnConeType): boolean {
  const m: Record<KilnConeType, boolean> = {
    low_fire_06_cone: false, mid_fire_6_cone: false, high_fire_10_cone: false, self_support_bar: true, pyrometric_witness: false,
  };
  return m[t];
}

export function reusable(t: KilnConeType): boolean {
  const m: Record<KilnConeType, boolean> = {
    low_fire_06_cone: false, mid_fire_6_cone: false, high_fire_10_cone: false, self_support_bar: false, pyrometric_witness: false,
  };
  return m[t];
}

export function coneShape(t: KilnConeType): string {
  const m: Record<KilnConeType, string> = {
    low_fire_06_cone: "small_pyramid_lean",
    mid_fire_6_cone: "small_pyramid_lean",
    high_fire_10_cone: "small_pyramid_lean",
    self_support_bar: "flat_bar_stand",
    pyrometric_witness: "ring_disc_shrink",
  };
  return m[t];
}

export function bestFiring(t: KilnConeType): string {
  const m: Record<KilnConeType, string> = {
    low_fire_06_cone: "earthenware_bisque",
    mid_fire_6_cone: "stoneware_general",
    high_fire_10_cone: "porcelain_reduction",
    self_support_bar: "electric_kiln_easy",
    pyrometric_witness: "production_quality",
  };
  return m[t];
}

export function kilnCones(): KilnConeType[] {
  return ["low_fire_06_cone", "mid_fire_6_cone", "high_fire_10_cone", "self_support_bar", "pyrometric_witness"];
}

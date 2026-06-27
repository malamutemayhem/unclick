export type PyrometricConeType = "self_supporting_stand" | "small_junior_bar" | "large_senior_tall" | "witness_cone_kiln_sitter" | "pyrometric_bar_guard";

export function tempAccuracy(t: PyrometricConeType): number {
  const m: Record<PyrometricConeType, number> = {
    self_supporting_stand: 9, small_junior_bar: 8, large_senior_tall: 9, witness_cone_kiln_sitter: 10, pyrometric_bar_guard: 8,
  };
  return m[t];
}

export function readability(t: PyrometricConeType): number {
  const m: Record<PyrometricConeType, number> = {
    self_supporting_stand: 10, small_junior_bar: 7, large_senior_tall: 9, witness_cone_kiln_sitter: 6, pyrometric_bar_guard: 7,
  };
  return m[t];
}

export function easeOfUse(t: PyrometricConeType): number {
  const m: Record<PyrometricConeType, number> = {
    self_supporting_stand: 10, small_junior_bar: 8, large_senior_tall: 7, witness_cone_kiln_sitter: 9, pyrometric_bar_guard: 6,
  };
  return m[t];
}

export function tempRange(t: PyrometricConeType): number {
  const m: Record<PyrometricConeType, number> = {
    self_supporting_stand: 8, small_junior_bar: 9, large_senior_tall: 10, witness_cone_kiln_sitter: 7, pyrometric_bar_guard: 9,
  };
  return m[t];
}

export function coneCost(t: PyrometricConeType): number {
  const m: Record<PyrometricConeType, number> = {
    self_supporting_stand: 1, small_junior_bar: 1, large_senior_tall: 1, witness_cone_kiln_sitter: 2, pyrometric_bar_guard: 2,
  };
  return m[t];
}

export function autoShutoff(t: PyrometricConeType): boolean {
  const m: Record<PyrometricConeType, boolean> = {
    self_supporting_stand: false, small_junior_bar: false, large_senior_tall: false, witness_cone_kiln_sitter: true, pyrometric_bar_guard: false,
  };
  return m[t];
}

export function needsPlaque(t: PyrometricConeType): boolean {
  const m: Record<PyrometricConeType, boolean> = {
    self_supporting_stand: false, small_junior_bar: true, large_senior_tall: true, witness_cone_kiln_sitter: false, pyrometric_bar_guard: true,
  };
  return m[t];
}

export function coneShape(t: PyrometricConeType): string {
  const m: Record<PyrometricConeType, string> = {
    self_supporting_stand: "tapered_triangle_base",
    small_junior_bar: "thin_bar_insert",
    large_senior_tall: "tall_pyramid_form",
    witness_cone_kiln_sitter: "notched_trigger_bar",
    pyrometric_bar_guard: "flat_bar_shield",
  };
  return m[t];
}

export function bestFiring(t: PyrometricConeType): string {
  const m: Record<PyrometricConeType, string> = {
    self_supporting_stand: "visual_check_general",
    small_junior_bar: "tight_space_test_tile",
    large_senior_tall: "high_fire_stoneware",
    witness_cone_kiln_sitter: "automatic_kiln_shutoff",
    pyrometric_bar_guard: "kiln_furniture_protect",
  };
  return m[t];
}

export function pyrometricCones(): PyrometricConeType[] {
  return ["self_supporting_stand", "small_junior_bar", "large_senior_tall", "witness_cone_kiln_sitter", "pyrometric_bar_guard"];
}

export type StitchingIronType = "diamond_point_euro" | "round_point_japan" | "flat_chisel_french" | "prong_2_start" | "prong_8_long";

export function holeClean(t: StitchingIronType): number {
  const m: Record<StitchingIronType, number> = {
    diamond_point_euro: 9, round_point_japan: 7, flat_chisel_french: 10, prong_2_start: 8, prong_8_long: 6,
  };
  return m[t];
}

export function stitchAngle(t: StitchingIronType): number {
  const m: Record<StitchingIronType, number> = {
    diamond_point_euro: 8, round_point_japan: 6, flat_chisel_french: 10, prong_2_start: 7, prong_8_long: 9,
  };
  return m[t];
}

export function speedCoverage(t: StitchingIronType): number {
  const m: Record<StitchingIronType, number> = {
    diamond_point_euro: 7, round_point_japan: 6, flat_chisel_french: 7, prong_2_start: 3, prong_8_long: 10,
  };
  return m[t];
}

export function curveAbility(t: StitchingIronType): number {
  const m: Record<StitchingIronType, number> = {
    diamond_point_euro: 6, round_point_japan: 8, flat_chisel_french: 5, prong_2_start: 10, prong_8_long: 3,
  };
  return m[t];
}

export function ironCost(t: StitchingIronType): number {
  const m: Record<StitchingIronType, number> = {
    diamond_point_euro: 2, round_point_japan: 2, flat_chisel_french: 3, prong_2_start: 1, prong_8_long: 2,
  };
  return m[t];
}

export function forCurves(t: StitchingIronType): boolean {
  const m: Record<StitchingIronType, boolean> = {
    diamond_point_euro: false, round_point_japan: true, flat_chisel_french: false, prong_2_start: true, prong_8_long: false,
  };
  return m[t];
}

export function multiProng(t: StitchingIronType): boolean {
  const m: Record<StitchingIronType, boolean> = {
    diamond_point_euro: true, round_point_japan: true, flat_chisel_french: true, prong_2_start: false, prong_8_long: true,
  };
  return m[t];
}

export function toothProfile(t: StitchingIronType): string {
  const m: Record<StitchingIronType, string> = {
    diamond_point_euro: "diamond_cross_section",
    round_point_japan: "round_tapered_point",
    flat_chisel_french: "flat_angled_chisel",
    prong_2_start: "diamond_twin_point",
    prong_8_long: "diamond_eight_row",
  };
  return m[t];
}

export function bestUse(t: StitchingIronType): string {
  const m: Record<StitchingIronType, string> = {
    diamond_point_euro: "general_saddle_stitch",
    round_point_japan: "soft_leather_curve",
    flat_chisel_french: "angled_stitch_line",
    prong_2_start: "corner_turn_start",
    prong_8_long: "straight_run_fast",
  };
  return m[t];
}

export function stitchingIrons(): StitchingIronType[] {
  return ["diamond_point_euro", "round_point_japan", "flat_chisel_french", "prong_2_start", "prong_8_long"];
}

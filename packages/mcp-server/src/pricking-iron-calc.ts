export type PrickingIronType = "french_style_slant" | "japanese_diamond_point" | "european_round_prong" | "chisel_flat_wide" | "spacing_wheel_roll";

export function holeCleanness(t: PrickingIronType): number {
  const m: Record<PrickingIronType, number> = {
    french_style_slant: 10, japanese_diamond_point: 9, european_round_prong: 7, chisel_flat_wide: 6, spacing_wheel_roll: 5,
  };
  return m[t];
}

export function stitchAngle(t: PrickingIronType): number {
  const m: Record<PrickingIronType, number> = {
    french_style_slant: 10, japanese_diamond_point: 8, european_round_prong: 5, chisel_flat_wide: 6, spacing_wheel_roll: 4,
  };
  return m[t];
}

export function durability(t: PrickingIronType): number {
  const m: Record<PrickingIronType, number> = {
    french_style_slant: 8, japanese_diamond_point: 7, european_round_prong: 9, chisel_flat_wide: 10, spacing_wheel_roll: 8,
  };
  return m[t];
}

export function prongCount(t: PrickingIronType): number {
  const m: Record<PrickingIronType, number> = {
    french_style_slant: 8, japanese_diamond_point: 7, european_round_prong: 6, chisel_flat_wide: 5, spacing_wheel_roll: 10,
  };
  return m[t];
}

export function ironCost(t: PrickingIronType): number {
  const m: Record<PrickingIronType, number> = {
    french_style_slant: 3, japanese_diamond_point: 3, european_round_prong: 2, chisel_flat_wide: 1, spacing_wheel_roll: 2,
  };
  return m[t];
}

export function needsAwl(t: PrickingIronType): boolean {
  const m: Record<PrickingIronType, boolean> = {
    french_style_slant: true, japanese_diamond_point: false, european_round_prong: false, chisel_flat_wide: false, spacing_wheel_roll: true,
  };
  return m[t];
}

export function slantedHole(t: PrickingIronType): boolean {
  const m: Record<PrickingIronType, boolean> = {
    french_style_slant: true, japanese_diamond_point: true, european_round_prong: false, chisel_flat_wide: false, spacing_wheel_roll: false,
  };
  return m[t];
}

export function toothProfile(t: PrickingIronType): string {
  const m: Record<PrickingIronType, string> = {
    french_style_slant: "angled_diamond_tip",
    japanese_diamond_point: "sharp_diamond_awl",
    european_round_prong: "round_straight_point",
    chisel_flat_wide: "flat_chisel_edge",
    spacing_wheel_roll: "round_pin_wheel",
  };
  return m[t];
}

export function bestStitch(t: PrickingIronType): string {
  const m: Record<PrickingIronType, string> = {
    french_style_slant: "saddle_stitch_elegant",
    japanese_diamond_point: "fine_wallet_stitch",
    european_round_prong: "heavy_harness_stitch",
    chisel_flat_wide: "thick_belt_stitch",
    spacing_wheel_roll: "long_seam_marking",
  };
  return m[t];
}

export function prickingIrons(): PrickingIronType[] {
  return ["french_style_slant", "japanese_diamond_point", "european_round_prong", "chisel_flat_wide", "spacing_wheel_roll"];
}

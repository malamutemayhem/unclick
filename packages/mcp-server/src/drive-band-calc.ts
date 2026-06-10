export type DriveBandType = "cotton_cord_twist" | "poly_stretch_belt" | "leather_round_band" | "rubber_oring_loop" | "linen_waxed_cord";

export function gripDrive(t: DriveBandType): number {
  const m: Record<DriveBandType, number> = {
    cotton_cord_twist: 7, poly_stretch_belt: 6, leather_round_band: 9, rubber_oring_loop: 10, linen_waxed_cord: 8,
  };
  return m[t];
}

export function slipControl(t: DriveBandType): number {
  const m: Record<DriveBandType, number> = {
    cotton_cord_twist: 8, poly_stretch_belt: 10, leather_round_band: 6, rubber_oring_loop: 5, linen_waxed_cord: 7,
  };
  return m[t];
}

export function durability(t: DriveBandType): number {
  const m: Record<DriveBandType, number> = {
    cotton_cord_twist: 5, poly_stretch_belt: 8, leather_round_band: 9, rubber_oring_loop: 6, linen_waxed_cord: 7,
  };
  return m[t];
}

export function noiseLevel(t: DriveBandType): number {
  const m: Record<DriveBandType, number> = {
    cotton_cord_twist: 9, poly_stretch_belt: 7, leather_round_band: 6, rubber_oring_loop: 8, linen_waxed_cord: 10,
  };
  return m[t];
}

export function bandCost(t: DriveBandType): number {
  const m: Record<DriveBandType, number> = {
    cotton_cord_twist: 1, poly_stretch_belt: 1, leather_round_band: 2, rubber_oring_loop: 1, linen_waxed_cord: 1,
  };
  return m[t];
}

export function stretchy(t: DriveBandType): boolean {
  const m: Record<DriveBandType, boolean> = {
    cotton_cord_twist: false, poly_stretch_belt: true, leather_round_band: false, rubber_oring_loop: true, linen_waxed_cord: false,
  };
  return m[t];
}

export function spliceJoin(t: DriveBandType): boolean {
  const m: Record<DriveBandType, boolean> = {
    cotton_cord_twist: true, poly_stretch_belt: false, leather_round_band: true, rubber_oring_loop: false, linen_waxed_cord: true,
  };
  return m[t];
}

export function bandMaterial(t: DriveBandType): string {
  const m: Record<DriveBandType, string> = {
    cotton_cord_twist: "twisted_cotton_cord",
    poly_stretch_belt: "polyurethane_belt",
    leather_round_band: "round_leather_lace",
    rubber_oring_loop: "nitrile_rubber_ring",
    linen_waxed_cord: "waxed_linen_cord",
  };
  return m[t];
}

export function bestUse(t: DriveBandType): string {
  const m: Record<DriveBandType, string> = {
    cotton_cord_twist: "scotch_tension_drive",
    poly_stretch_belt: "double_drive_stretch",
    leather_round_band: "heavy_duty_drive",
    rubber_oring_loop: "quick_replace_band",
    linen_waxed_cord: "quiet_smooth_drive",
  };
  return m[t];
}

export function driveBands(): DriveBandType[] {
  return ["cotton_cord_twist", "poly_stretch_belt", "leather_round_band", "rubber_oring_loop", "linen_waxed_cord"];
}

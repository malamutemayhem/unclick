export type ShoulderPlaneType = "medium_width_general" | "narrow_bullnose_tight" | "wide_rebate_large" | "skew_angle_clean" | "adjustable_nicker_cross";

export function shoulderFit(t: ShoulderPlaneType): number {
  const m: Record<ShoulderPlaneType, number> = {
    medium_width_general: 9, narrow_bullnose_tight: 8, wide_rebate_large: 7, skew_angle_clean: 10, adjustable_nicker_cross: 8,
  };
  return m[t];
}

export function tightAccess(t: ShoulderPlaneType): number {
  const m: Record<ShoulderPlaneType, number> = {
    medium_width_general: 7, narrow_bullnose_tight: 10, wide_rebate_large: 4, skew_angle_clean: 6, adjustable_nicker_cross: 6,
  };
  return m[t];
}

export function materialRemoval(t: ShoulderPlaneType): number {
  const m: Record<ShoulderPlaneType, number> = {
    medium_width_general: 7, narrow_bullnose_tight: 5, wide_rebate_large: 10, skew_angle_clean: 6, adjustable_nicker_cross: 8,
  };
  return m[t];
}

export function crossGrainCut(t: ShoulderPlaneType): number {
  const m: Record<ShoulderPlaneType, number> = {
    medium_width_general: 7, narrow_bullnose_tight: 6, wide_rebate_large: 6, skew_angle_clean: 10, adjustable_nicker_cross: 9,
  };
  return m[t];
}

export function planeCost(t: ShoulderPlaneType): number {
  const m: Record<ShoulderPlaneType, number> = {
    medium_width_general: 3, narrow_bullnose_tight: 3, wide_rebate_large: 3, skew_angle_clean: 4, adjustable_nicker_cross: 3,
  };
  return m[t];
}

export function hasNicker(t: ShoulderPlaneType): boolean {
  const m: Record<ShoulderPlaneType, boolean> = {
    medium_width_general: false, narrow_bullnose_tight: false, wide_rebate_large: false, skew_angle_clean: false, adjustable_nicker_cross: true,
  };
  return m[t];
}

export function fullWidthBlade(t: ShoulderPlaneType): boolean {
  const m: Record<ShoulderPlaneType, boolean> = {
    medium_width_general: true, narrow_bullnose_tight: true, wide_rebate_large: true, skew_angle_clean: true, adjustable_nicker_cross: true,
  };
  return m[t];
}

export function bodyMaterial(t: ShoulderPlaneType): string {
  const m: Record<ShoulderPlaneType, string> = {
    medium_width_general: "ductile_iron_ground",
    narrow_bullnose_tight: "bronze_precision_cast",
    wide_rebate_large: "cast_iron_heavy",
    skew_angle_clean: "steel_skew_body",
    adjustable_nicker_cross: "iron_nicker_spur",
  };
  return m[t];
}

export function bestJoint(t: ShoulderPlaneType): string {
  const m: Record<ShoulderPlaneType, string> = {
    medium_width_general: "tenon_shoulder_trim",
    narrow_bullnose_tight: "stopped_dado_clean",
    wide_rebate_large: "wide_rabbet_trim",
    skew_angle_clean: "cross_grain_rabbet",
    adjustable_nicker_cross: "cross_grain_dado",
  };
  return m[t];
}

export function shoulderPlanes(): ShoulderPlaneType[] {
  return ["medium_width_general", "narrow_bullnose_tight", "wide_rebate_large", "skew_angle_clean", "adjustable_nicker_cross"];
}

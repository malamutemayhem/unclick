export type LensCapType = "pinch_center_snap" | "snap_on_rim_edge" | "screw_in_metal" | "automatic_retract" | "universal_silicone_stretch";

export function protectionLevel(t: LensCapType): number {
  const m: Record<LensCapType, number> = {
    pinch_center_snap: 8, snap_on_rim_edge: 7, screw_in_metal: 10, automatic_retract: 6, universal_silicone_stretch: 5,
  };
  return m[t];
}

export function onOffSpeed(t: LensCapType): number {
  const m: Record<LensCapType, number> = {
    pinch_center_snap: 9, snap_on_rim_edge: 7, screw_in_metal: 3, automatic_retract: 10, universal_silicone_stretch: 6,
  };
  return m[t];
}

export function staySecure(t: LensCapType): number {
  const m: Record<LensCapType, number> = {
    pinch_center_snap: 7, snap_on_rim_edge: 6, screw_in_metal: 10, automatic_retract: 8, universal_silicone_stretch: 5,
  };
  return m[t];
}

export function universalFit(t: LensCapType): number {
  const m: Record<LensCapType, number> = {
    pinch_center_snap: 5, snap_on_rim_edge: 5, screw_in_metal: 4, automatic_retract: 3, universal_silicone_stretch: 10,
  };
  return m[t];
}

export function capCost(t: LensCapType): number {
  const m: Record<LensCapType, number> = {
    pinch_center_snap: 2, snap_on_rim_edge: 2, screw_in_metal: 6, automatic_retract: 8, universal_silicone_stretch: 3,
  };
  return m[t];
}

export function hasLeash(t: LensCapType): boolean {
  const m: Record<LensCapType, boolean> = {
    pinch_center_snap: true, snap_on_rim_edge: false, screw_in_metal: false, automatic_retract: false, universal_silicone_stretch: false,
  };
  return m[t];
}

export function filterCompatible(t: LensCapType): boolean {
  const m: Record<LensCapType, boolean> = {
    pinch_center_snap: true, snap_on_rim_edge: true, screw_in_metal: false, automatic_retract: true, universal_silicone_stretch: true,
  };
  return m[t];
}

export function capMaterial(t: LensCapType): string {
  const m: Record<LensCapType, string> = {
    pinch_center_snap: "abs_plastic_spring_clip",
    snap_on_rim_edge: "polycarbonate_friction_rim",
    screw_in_metal: "aluminum_threaded_padded",
    automatic_retract: "spring_loaded_iris_blade",
    universal_silicone_stretch: "food_grade_silicone_flex",
  };
  return m[t];
}

export function bestLens(t: LensCapType): string {
  const m: Record<LensCapType, string> = {
    pinch_center_snap: "standard_dslr_mirrorless",
    snap_on_rim_edge: "legacy_vintage_lens",
    screw_in_metal: "premium_lens_long_store",
    automatic_retract: "compact_camera_always_ready",
    universal_silicone_stretch: "oddball_size_multi_lens",
  };
  return m[t];
}

export function lensCaps(): LensCapType[] {
  return ["pinch_center_snap", "snap_on_rim_edge", "screw_in_metal", "automatic_retract", "universal_silicone_stretch"];
}

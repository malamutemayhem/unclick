export type CameraStrapType = "neck_padded_wide" | "sling_cross_body" | "wrist_loop_compact" | "dual_harness_two_cam" | "peak_design_quick";

export function comfort(t: CameraStrapType): number {
  const m: Record<CameraStrapType, number> = {
    neck_padded_wide: 9, sling_cross_body: 8, wrist_loop_compact: 5, dual_harness_two_cam: 7, peak_design_quick: 8,
  };
  return m[t];
}

export function quickAccess(t: CameraStrapType): number {
  const m: Record<CameraStrapType, number> = {
    neck_padded_wide: 7, sling_cross_body: 9, wrist_loop_compact: 10, dual_harness_two_cam: 6, peak_design_quick: 10,
  };
  return m[t];
}

export function security(t: CameraStrapType): number {
  const m: Record<CameraStrapType, number> = {
    neck_padded_wide: 8, sling_cross_body: 7, wrist_loop_compact: 6, dual_harness_two_cam: 10, peak_design_quick: 9,
  };
  return m[t];
}

export function weightDistribution(t: CameraStrapType): number {
  const m: Record<CameraStrapType, number> = {
    neck_padded_wide: 7, sling_cross_body: 8, wrist_loop_compact: 3, dual_harness_two_cam: 10, peak_design_quick: 7,
  };
  return m[t];
}

export function strapCost(t: CameraStrapType): number {
  const m: Record<CameraStrapType, number> = {
    neck_padded_wide: 4, sling_cross_body: 6, wrist_loop_compact: 3, dual_harness_two_cam: 9, peak_design_quick: 8,
  };
  return m[t];
}

export function quickDisconnect(t: CameraStrapType): boolean {
  const m: Record<CameraStrapType, boolean> = {
    neck_padded_wide: false, sling_cross_body: true, wrist_loop_compact: false, dual_harness_two_cam: true, peak_design_quick: true,
  };
  return m[t];
}

export function multiCamera(t: CameraStrapType): boolean {
  const m: Record<CameraStrapType, boolean> = {
    neck_padded_wide: false, sling_cross_body: false, wrist_loop_compact: false, dual_harness_two_cam: true, peak_design_quick: false,
  };
  return m[t];
}

export function strapMaterial(t: CameraStrapType): string {
  const m: Record<CameraStrapType, string> = {
    neck_padded_wide: "neoprene_padded_nylon",
    sling_cross_body: "ballistic_nylon_swivel",
    wrist_loop_compact: "paracord_braided_loop",
    dual_harness_two_cam: "leather_harness_steel_clip",
    peak_design_quick: "seatbelt_weave_anchor_link",
  };
  return m[t];
}

export function bestShooter(t: CameraStrapType): string {
  const m: Record<CameraStrapType, string> = {
    neck_padded_wide: "tourist_casual_all_day",
    sling_cross_body: "street_photo_fast_draw",
    wrist_loop_compact: "mirrorless_light_walk",
    dual_harness_two_cam: "wedding_event_two_body",
    peak_design_quick: "versatile_switch_style",
  };
  return m[t];
}

export function cameraStraps(): CameraStrapType[] {
  return ["neck_padded_wide", "sling_cross_body", "wrist_loop_compact", "dual_harness_two_cam", "peak_design_quick"];
}

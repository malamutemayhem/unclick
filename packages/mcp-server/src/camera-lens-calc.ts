export type CameraLensType = "prime_fast" | "zoom_standard" | "telephoto_long" | "wide_angle" | "macro_close";

export function sharpness(t: CameraLensType): number {
  const m: Record<CameraLensType, number> = {
    prime_fast: 10, zoom_standard: 7, telephoto_long: 8, wide_angle: 8, macro_close: 10,
  };
  return m[t];
}

export function versatility(t: CameraLensType): number {
  const m: Record<CameraLensType, number> = {
    prime_fast: 4, zoom_standard: 10, telephoto_long: 5, wide_angle: 6, macro_close: 3,
  };
  return m[t];
}

export function lowLightPerf(t: CameraLensType): number {
  const m: Record<CameraLensType, number> = {
    prime_fast: 10, zoom_standard: 5, telephoto_long: 4, wide_angle: 7, macro_close: 6,
  };
  return m[t];
}

export function lensWeight(t: CameraLensType): number {
  const m: Record<CameraLensType, number> = {
    prime_fast: 8, zoom_standard: 5, telephoto_long: 2, wide_angle: 6, macro_close: 7,
  };
  return m[t];
}

export function lensCost(t: CameraLensType): number {
  const m: Record<CameraLensType, number> = {
    prime_fast: 6, zoom_standard: 5, telephoto_long: 10, wide_angle: 7, macro_close: 6,
  };
  return m[t];
}

export function imageStabilized(t: CameraLensType): boolean {
  const m: Record<CameraLensType, boolean> = {
    prime_fast: false, zoom_standard: true, telephoto_long: true, wide_angle: false, macro_close: true,
  };
  return m[t];
}

export function weatherSealed(t: CameraLensType): boolean {
  const m: Record<CameraLensType, boolean> = {
    prime_fast: false, zoom_standard: true, telephoto_long: true, wide_angle: true, macro_close: false,
  };
  return m[t];
}

export function focusType(t: CameraLensType): string {
  const m: Record<CameraLensType, string> = {
    prime_fast: "ring_usm_silent_fast", zoom_standard: "stm_smooth_video",
    telephoto_long: "nano_usm_tracking", wide_angle: "linear_motor_snap",
    macro_close: "focus_limiter_precision",
  };
  return m[t];
}

export function bestSubject(t: CameraLensType): string {
  const m: Record<CameraLensType, string> = {
    prime_fast: "portrait_street_low_light", zoom_standard: "travel_event_everyday",
    telephoto_long: "wildlife_sports_distant", wide_angle: "landscape_architecture_interior",
    macro_close: "insect_flower_product_detail",
  };
  return m[t];
}

export function cameraLenses(): CameraLensType[] {
  return ["prime_fast", "zoom_standard", "telephoto_long", "wide_angle", "macro_close"];
}

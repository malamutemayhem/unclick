export type CameraFilterType = "uv_clear_protect" | "circular_polarizer" | "nd_variable" | "graduated_nd" | "infrared_pass";

export function opticalClarity(t: CameraFilterType): number {
  const m: Record<CameraFilterType, number> = {
    uv_clear_protect: 10, circular_polarizer: 8, nd_variable: 6, graduated_nd: 7, infrared_pass: 5,
  };
  return m[t];
}

export function effectStrength(t: CameraFilterType): number {
  const m: Record<CameraFilterType, number> = {
    uv_clear_protect: 2, circular_polarizer: 8, nd_variable: 9, graduated_nd: 7, infrared_pass: 10,
  };
  return m[t];
}

export function versatilityRange(t: CameraFilterType): number {
  const m: Record<CameraFilterType, number> = {
    uv_clear_protect: 10, circular_polarizer: 6, nd_variable: 10, graduated_nd: 5, infrared_pass: 3,
  };
  return m[t];
}

export function easeOfUse(t: CameraFilterType): number {
  const m: Record<CameraFilterType, number> = {
    uv_clear_protect: 10, circular_polarizer: 7, nd_variable: 8, graduated_nd: 5, infrared_pass: 4,
  };
  return m[t];
}

export function filterCostLevel(t: CameraFilterType): number {
  const m: Record<CameraFilterType, number> = {
    uv_clear_protect: 2, circular_polarizer: 5, nd_variable: 8, graduated_nd: 7, infrared_pass: 6,
  };
  return m[t];
}

export function stackable(t: CameraFilterType): boolean {
  const m: Record<CameraFilterType, boolean> = {
    uv_clear_protect: true, circular_polarizer: true, nd_variable: false, graduated_nd: true, infrared_pass: true,
  };
  return m[t];
}

export function needsWhiteBalance(t: CameraFilterType): boolean {
  const m: Record<CameraFilterType, boolean> = {
    uv_clear_protect: false, circular_polarizer: false, nd_variable: true, graduated_nd: false, infrared_pass: true,
  };
  return m[t];
}

export function mountStyle(t: CameraFilterType): string {
  const m: Record<CameraFilterType, string> = {
    uv_clear_protect: "screw_on_slim_ring", circular_polarizer: "screw_on_rotating_ring",
    nd_variable: "screw_on_dual_ring_rotate", graduated_nd: "square_holder_slide",
    infrared_pass: "screw_on_deep_red_glass",
  };
  return m[t];
}

export function bestScene(t: CameraFilterType): string {
  const m: Record<CameraFilterType, string> = {
    uv_clear_protect: "everyday_lens_protection", circular_polarizer: "sky_water_reflection_control",
    nd_variable: "long_exposure_daylight_blur", graduated_nd: "sunset_horizon_balance",
    infrared_pass: "surreal_false_color_foliage",
  };
  return m[t];
}

export function cameraFilters(): CameraFilterType[] {
  return ["uv_clear_protect", "circular_polarizer", "nd_variable", "graduated_nd", "infrared_pass"];
}

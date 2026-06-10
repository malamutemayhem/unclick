export type PrintFrameType = "wood_basic_staple" | "aluminum_retensionable" | "roller_frame_fast" | "self_stretch_clamp" | "newman_pro_tension";

export function tensionEven(t: PrintFrameType): number {
  const m: Record<PrintFrameType, number> = {
    wood_basic_staple: 5, aluminum_retensionable: 9, roller_frame_fast: 8, self_stretch_clamp: 7, newman_pro_tension: 10,
  };
  return m[t];
}

export function durability(t: PrintFrameType): number {
  const m: Record<PrintFrameType, number> = {
    wood_basic_staple: 4, aluminum_retensionable: 9, roller_frame_fast: 8, self_stretch_clamp: 7, newman_pro_tension: 10,
  };
  return m[t];
}

export function setupSpeed(t: PrintFrameType): number {
  const m: Record<PrintFrameType, number> = {
    wood_basic_staple: 7, aluminum_retensionable: 5, roller_frame_fast: 10, self_stretch_clamp: 8, newman_pro_tension: 4,
  };
  return m[t];
}

export function registrationAccuracy(t: PrintFrameType): number {
  const m: Record<PrintFrameType, number> = {
    wood_basic_staple: 5, aluminum_retensionable: 9, roller_frame_fast: 7, self_stretch_clamp: 6, newman_pro_tension: 10,
  };
  return m[t];
}

export function frameCost(t: PrintFrameType): number {
  const m: Record<PrintFrameType, number> = {
    wood_basic_staple: 1, aluminum_retensionable: 2, roller_frame_fast: 2, self_stretch_clamp: 2, newman_pro_tension: 3,
  };
  return m[t];
}

export function retensionable(t: PrintFrameType): boolean {
  const m: Record<PrintFrameType, boolean> = {
    wood_basic_staple: false, aluminum_retensionable: true, roller_frame_fast: true, self_stretch_clamp: true, newman_pro_tension: true,
  };
  return m[t];
}

export function noGlue(t: PrintFrameType): boolean {
  const m: Record<PrintFrameType, boolean> = {
    wood_basic_staple: false, aluminum_retensionable: true, roller_frame_fast: true, self_stretch_clamp: true, newman_pro_tension: true,
  };
  return m[t];
}

export function frameMaterial(t: PrintFrameType): string {
  const m: Record<PrintFrameType, string> = {
    wood_basic_staple: "pine_wood_stapled",
    aluminum_retensionable: "extruded_aluminum",
    roller_frame_fast: "aluminum_roller_bar",
    self_stretch_clamp: "steel_clamp_corner",
    newman_pro_tension: "precision_aluminum_weld",
  };
  return m[t];
}

export function bestUse(t: PrintFrameType): string {
  const m: Record<PrintFrameType, string> = {
    wood_basic_staple: "beginner_single_use",
    aluminum_retensionable: "production_multi_run",
    roller_frame_fast: "quick_change_screen",
    self_stretch_clamp: "home_studio_print",
    newman_pro_tension: "precision_cmyk_print",
  };
  return m[t];
}

export function printFrames(): PrintFrameType[] {
  return ["wood_basic_staple", "aluminum_retensionable", "roller_frame_fast", "self_stretch_clamp", "newman_pro_tension"];
}

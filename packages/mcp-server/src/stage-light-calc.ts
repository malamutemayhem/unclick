export type StageLight = "fresnel" | "ellipsoidal" | "par_can" | "led_wash" | "moving_head";

export function beamControl(s: StageLight): number {
  const m: Record<StageLight, number> = {
    fresnel: 6, ellipsoidal: 10, par_can: 3, led_wash: 5, moving_head: 9,
  };
  return m[s];
}

export function lightOutput(s: StageLight): number {
  const m: Record<StageLight, number> = {
    fresnel: 7, ellipsoidal: 8, par_can: 6, led_wash: 9, moving_head: 10,
  };
  return m[s];
}

export function colorMixing(s: StageLight): number {
  const m: Record<StageLight, number> = {
    fresnel: 3, ellipsoidal: 4, par_can: 2, led_wash: 10, moving_head: 10,
  };
  return m[s];
}

export function versatility(s: StageLight): number {
  const m: Record<StageLight, number> = {
    fresnel: 6, ellipsoidal: 7, par_can: 3, led_wash: 8, moving_head: 10,
  };
  return m[s];
}

export function fixtureCost(s: StageLight): number {
  const m: Record<StageLight, number> = {
    fresnel: 4, ellipsoidal: 6, par_can: 2, led_wash: 7, moving_head: 10,
  };
  return m[s];
}

export function requiresGelFrame(s: StageLight): boolean {
  const m: Record<StageLight, boolean> = {
    fresnel: true, ellipsoidal: true, par_can: true, led_wash: false, moving_head: false,
  };
  return m[s];
}

export function dmxControlled(s: StageLight): boolean {
  const m: Record<StageLight, boolean> = {
    fresnel: false, ellipsoidal: false, par_can: false, led_wash: true, moving_head: true,
  };
  return m[s];
}

export function opticType(s: StageLight): string {
  const m: Record<StageLight, string> = {
    fresnel: "stepped_lens_soft_edge", ellipsoidal: "leko_gobo_shutter_hard_edge",
    par_can: "parabolic_reflector_fixed", led_wash: "multi_chip_array_lens",
    moving_head: "motorized_optic_pan_tilt",
  };
  return m[s];
}

export function bestUse(s: StageLight): string {
  const m: Record<StageLight, string> = {
    fresnel: "wash_fill_general_stage", ellipsoidal: "spotlight_pattern_gobo",
    par_can: "band_concert_simple_wash", led_wash: "architectural_event_color",
    moving_head: "concert_touring_dynamic",
  };
  return m[s];
}

export function stageLights(): StageLight[] {
  return ["fresnel", "ellipsoidal", "par_can", "led_wash", "moving_head"];
}

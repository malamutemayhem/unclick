export type SoftboxType = "rectangular_studio_large" | "octagonal_portrait" | "strip_rim_light" | "lantern_sphere_wrap" | "collapsible_speedlight";

export function lightSpread(t: SoftboxType): number {
  const m: Record<SoftboxType, number> = {
    rectangular_studio_large: 8, octagonal_portrait: 7, strip_rim_light: 3, lantern_sphere_wrap: 10, collapsible_speedlight: 5,
  };
  return m[t];
}

export function softness(t: SoftboxType): number {
  const m: Record<SoftboxType, number> = {
    rectangular_studio_large: 8, octagonal_portrait: 9, strip_rim_light: 6, lantern_sphere_wrap: 10, collapsible_speedlight: 7,
  };
  return m[t];
}

export function portability(t: SoftboxType): number {
  const m: Record<SoftboxType, number> = {
    rectangular_studio_large: 3, octagonal_portrait: 4, strip_rim_light: 5, lantern_sphere_wrap: 6, collapsible_speedlight: 10,
  };
  return m[t];
}

export function controlPrecision(t: SoftboxType): number {
  const m: Record<SoftboxType, number> = {
    rectangular_studio_large: 9, octagonal_portrait: 7, strip_rim_light: 10, lantern_sphere_wrap: 3, collapsible_speedlight: 5,
  };
  return m[t];
}

export function softboxCost(t: SoftboxType): number {
  const m: Record<SoftboxType, number> = {
    rectangular_studio_large: 7, octagonal_portrait: 8, strip_rim_light: 6, lantern_sphere_wrap: 7, collapsible_speedlight: 4,
  };
  return m[t];
}

export function hasGrid(t: SoftboxType): boolean {
  const m: Record<SoftboxType, boolean> = {
    rectangular_studio_large: true, octagonal_portrait: true, strip_rim_light: true, lantern_sphere_wrap: false, collapsible_speedlight: false,
  };
  return m[t];
}

export function quickSetup(t: SoftboxType): boolean {
  const m: Record<SoftboxType, boolean> = {
    rectangular_studio_large: false, octagonal_portrait: false, strip_rim_light: false, lantern_sphere_wrap: true, collapsible_speedlight: true,
  };
  return m[t];
}

export function diffusionLayers(t: SoftboxType): string {
  const m: Record<SoftboxType, string> = {
    rectangular_studio_large: "dual_baffle_outer_nylon",
    octagonal_portrait: "inner_outer_diffusion",
    strip_rim_light: "single_front_panel",
    lantern_sphere_wrap: "full_sphere_silk",
    collapsible_speedlight: "pop_up_translucent",
  };
  return m[t];
}

export function bestShoot(t: SoftboxType): string {
  const m: Record<SoftboxType, string> = {
    rectangular_studio_large: "product_commercial_still",
    octagonal_portrait: "headshot_beauty_portrait",
    strip_rim_light: "edge_accent_dramatic",
    lantern_sphere_wrap: "video_interview_ambient",
    collapsible_speedlight: "event_wedding_onsite",
  };
  return m[t];
}

export function softboxes(): SoftboxType[] {
  return ["rectangular_studio_large", "octagonal_portrait", "strip_rim_light", "lantern_sphere_wrap", "collapsible_speedlight"];
}

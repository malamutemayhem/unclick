export type PopFilterType = "nylon_mesh_dual_layer" | "metal_screen_perforated" | "foam_windscreen_slip" | "fabric_gooseneck_clamp" | "magnetic_clip_on";

export function plosiveBlock(t: PopFilterType): number {
  const m: Record<PopFilterType, number> = {
    nylon_mesh_dual_layer: 9, metal_screen_perforated: 8, foam_windscreen_slip: 6, fabric_gooseneck_clamp: 7, magnetic_clip_on: 7,
  };
  return m[t];
}

export function soundClarity(t: PopFilterType): number {
  const m: Record<PopFilterType, number> = {
    nylon_mesh_dual_layer: 8, metal_screen_perforated: 10, foam_windscreen_slip: 6, fabric_gooseneck_clamp: 7, magnetic_clip_on: 8,
  };
  return m[t];
}

export function durability(t: PopFilterType): number {
  const m: Record<PopFilterType, number> = {
    nylon_mesh_dual_layer: 6, metal_screen_perforated: 10, foam_windscreen_slip: 5, fabric_gooseneck_clamp: 6, magnetic_clip_on: 8,
  };
  return m[t];
}

export function installEase(t: PopFilterType): number {
  const m: Record<PopFilterType, number> = {
    nylon_mesh_dual_layer: 7, metal_screen_perforated: 7, foam_windscreen_slip: 10, fabric_gooseneck_clamp: 8, magnetic_clip_on: 9,
  };
  return m[t];
}

export function filterCost(t: PopFilterType): number {
  const m: Record<PopFilterType, number> = {
    nylon_mesh_dual_layer: 1, metal_screen_perforated: 2, foam_windscreen_slip: 1, fabric_gooseneck_clamp: 1, magnetic_clip_on: 2,
  };
  return m[t];
}

export function washable(t: PopFilterType): boolean {
  const m: Record<PopFilterType, boolean> = {
    nylon_mesh_dual_layer: true, metal_screen_perforated: true, foam_windscreen_slip: true, fabric_gooseneck_clamp: false, magnetic_clip_on: true,
  };
  return m[t];
}

export function universalFit(t: PopFilterType): boolean {
  const m: Record<PopFilterType, boolean> = {
    nylon_mesh_dual_layer: true, metal_screen_perforated: true, foam_windscreen_slip: false, fabric_gooseneck_clamp: true, magnetic_clip_on: false,
  };
  return m[t];
}

export function mountType(t: PopFilterType): string {
  const m: Record<PopFilterType, string> = {
    nylon_mesh_dual_layer: "gooseneck_clamp_arm",
    metal_screen_perforated: "gooseneck_screw_clamp",
    foam_windscreen_slip: "slip_on_direct_fit",
    fabric_gooseneck_clamp: "flexible_arm_clamp",
    magnetic_clip_on: "magnetic_ring_attach",
  };
  return m[t];
}

export function bestMic(t: PopFilterType): string {
  const m: Record<PopFilterType, string> = {
    nylon_mesh_dual_layer: "condenser_vocal_studio",
    metal_screen_perforated: "ribbon_mic_broadcast",
    foam_windscreen_slip: "dynamic_handheld_live",
    fabric_gooseneck_clamp: "usb_podcast_desktop",
    magnetic_clip_on: "shotgun_boom_film",
  };
  return m[t];
}

export function popFilters(): PopFilterType[] {
  return ["nylon_mesh_dual_layer", "metal_screen_perforated", "foam_windscreen_slip", "fabric_gooseneck_clamp", "magnetic_clip_on"];
}

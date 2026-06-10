export type FishingHookType = "j_hook_standard" | "circle_hook_release" | "treble_hook_lure" | "octopus_short_shank" | "worm_hook_offset";

export function hookStrength(t: FishingHookType): number {
  const m: Record<FishingHookType, number> = {
    j_hook_standard: 7, circle_hook_release: 8, treble_hook_lure: 6, octopus_short_shank: 7, worm_hook_offset: 9,
  };
  return m[t];
}

export function hookSetEase(t: FishingHookType): number {
  const m: Record<FishingHookType, number> = {
    j_hook_standard: 9, circle_hook_release: 5, treble_hook_lure: 8, octopus_short_shank: 7, worm_hook_offset: 6,
  };
  return m[t];
}

export function catchRelease(t: FishingHookType): number {
  const m: Record<FishingHookType, number> = {
    j_hook_standard: 4, circle_hook_release: 10, treble_hook_lure: 2, octopus_short_shank: 6, worm_hook_offset: 5,
  };
  return m[t];
}

export function weedless(t: FishingHookType): number {
  const m: Record<FishingHookType, number> = {
    j_hook_standard: 3, circle_hook_release: 4, treble_hook_lure: 1, octopus_short_shank: 5, worm_hook_offset: 10,
  };
  return m[t];
}

export function hookCost(t: FishingHookType): number {
  const m: Record<FishingHookType, number> = {
    j_hook_standard: 2, circle_hook_release: 4, treble_hook_lure: 5, octopus_short_shank: 3, worm_hook_offset: 4,
  };
  return m[t];
}

export function barbless(t: FishingHookType): boolean {
  const m: Record<FishingHookType, boolean> = {
    j_hook_standard: false, circle_hook_release: false, treble_hook_lure: false, octopus_short_shank: false, worm_hook_offset: false,
  };
  return m[t];
}

export function multiPoint(t: FishingHookType): boolean {
  const m: Record<FishingHookType, boolean> = {
    j_hook_standard: false, circle_hook_release: false, treble_hook_lure: true, octopus_short_shank: false, worm_hook_offset: false,
  };
  return m[t];
}

export function wireGauge(t: FishingHookType): string {
  const m: Record<FishingHookType, string> = {
    j_hook_standard: "medium_wire_general",
    circle_hook_release: "heavy_wire_inward_point",
    treble_hook_lure: "light_wire_triple",
    octopus_short_shank: "medium_wire_short_bend",
    worm_hook_offset: "heavy_wire_offset_bend",
  };
  return m[t];
}

export function bestTechnique(t: FishingHookType): string {
  const m: Record<FishingHookType, string> = {
    j_hook_standard: "live_bait_bottom_rig",
    circle_hook_release: "catch_release_saltwater",
    treble_hook_lure: "crankbait_topwater_plug",
    octopus_short_shank: "salmon_steelhead_drift",
    worm_hook_offset: "texas_rig_soft_plastic",
  };
  return m[t];
}

export function fishingHooks(): FishingHookType[] {
  return ["j_hook_standard", "circle_hook_release", "treble_hook_lure", "octopus_short_shank", "worm_hook_offset"];
}

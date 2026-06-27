export type HikingBootType = "trail_runner_low" | "day_hike_mid" | "backpacking_heavy" | "mountaineering_rigid" | "approach_scramble";

export function ankleSupport(t: HikingBootType): number {
  const m: Record<HikingBootType, number> = {
    trail_runner_low: 3, day_hike_mid: 7, backpacking_heavy: 9, mountaineering_rigid: 10, approach_scramble: 5,
  };
  return m[t];
}

export function tractionGrip(t: HikingBootType): number {
  const m: Record<HikingBootType, number> = {
    trail_runner_low: 6, day_hike_mid: 7, backpacking_heavy: 8, mountaineering_rigid: 10, approach_scramble: 9,
  };
  return m[t];
}

export function bootWeight(t: HikingBootType): number {
  const m: Record<HikingBootType, number> = {
    trail_runner_low: 10, day_hike_mid: 7, backpacking_heavy: 3, mountaineering_rigid: 1, approach_scramble: 8,
  };
  return m[t];
}

export function breakInTime(t: HikingBootType): number {
  const m: Record<HikingBootType, number> = {
    trail_runner_low: 10, day_hike_mid: 7, backpacking_heavy: 4, mountaineering_rigid: 2, approach_scramble: 8,
  };
  return m[t];
}

export function bootCost(t: HikingBootType): number {
  const m: Record<HikingBootType, number> = {
    trail_runner_low: 3, day_hike_mid: 5, backpacking_heavy: 7, mountaineering_rigid: 10, approach_scramble: 6,
  };
  return m[t];
}

export function waterproof(t: HikingBootType): boolean {
  const m: Record<HikingBootType, boolean> = {
    trail_runner_low: false, day_hike_mid: true, backpacking_heavy: true, mountaineering_rigid: true, approach_scramble: false,
  };
  return m[t];
}

export function cramponCompatible(t: HikingBootType): boolean {
  const m: Record<HikingBootType, boolean> = {
    trail_runner_low: false, day_hike_mid: false, backpacking_heavy: false, mountaineering_rigid: true, approach_scramble: false,
  };
  return m[t];
}

export function soleType(t: HikingBootType): string {
  const m: Record<HikingBootType, string> = {
    trail_runner_low: "vibram_megagrip_flexible", day_hike_mid: "vibram_contact_grip",
    backpacking_heavy: "vibram_mont_stiff_shank", mountaineering_rigid: "vibram_full_rigid_crampon_welt",
    approach_scramble: "stealth_c4_sticky_rubber",
  };
  return m[t];
}

export function bestTerrain(t: HikingBootType): string {
  const m: Record<HikingBootType, string> = {
    trail_runner_low: "groomed_trail_fast_light", day_hike_mid: "mixed_trail_moderate_load",
    backpacking_heavy: "rugged_multi_day_heavy_pack", mountaineering_rigid: "ice_snow_technical_alpine",
    approach_scramble: "rock_scramble_cliff_base",
  };
  return m[t];
}

export function hikingBoots(): HikingBootType[] {
  return ["trail_runner_low", "day_hike_mid", "backpacking_heavy", "mountaineering_rigid", "approach_scramble"];
}

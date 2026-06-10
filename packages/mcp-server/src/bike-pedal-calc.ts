export type BikePedalType = "flat_platform" | "clipless_road" | "clipless_mountain" | "toe_clip_cage" | "bmx_pin";

export function powerTransfer(t: BikePedalType): number {
  const m: Record<BikePedalType, number> = {
    flat_platform: 5, clipless_road: 10, clipless_mountain: 9, toe_clip_cage: 7, bmx_pin: 6,
  };
  return m[t];
}

export function walkability(t: BikePedalType): number {
  const m: Record<BikePedalType, number> = {
    flat_platform: 10, clipless_road: 3, clipless_mountain: 7, toe_clip_cage: 8, bmx_pin: 9,
  };
  return m[t];
}

export function entryExit(t: BikePedalType): number {
  const m: Record<BikePedalType, number> = {
    flat_platform: 10, clipless_road: 5, clipless_mountain: 7, toe_clip_cage: 6, bmx_pin: 10,
  };
  return m[t];
}

export function grip(t: BikePedalType): number {
  const m: Record<BikePedalType, number> = {
    flat_platform: 6, clipless_road: 10, clipless_mountain: 9, toe_clip_cage: 7, bmx_pin: 8,
  };
  return m[t];
}

export function pedalCost(t: BikePedalType): number {
  const m: Record<BikePedalType, number> = {
    flat_platform: 2, clipless_road: 8, clipless_mountain: 7, toe_clip_cage: 3, bmx_pin: 4,
  };
  return m[t];
}

export function needsSpecialShoe(t: BikePedalType): boolean {
  const m: Record<BikePedalType, boolean> = {
    flat_platform: false, clipless_road: true, clipless_mountain: true, toe_clip_cage: false, bmx_pin: false,
  };
  return m[t];
}

export function dualSided(t: BikePedalType): boolean {
  const m: Record<BikePedalType, boolean> = {
    flat_platform: true, clipless_road: false, clipless_mountain: true, toe_clip_cage: false, bmx_pin: true,
  };
  return m[t];
}

export function cleatSystem(t: BikePedalType): string {
  const m: Record<BikePedalType, string> = {
    flat_platform: "none_any_shoe", clipless_road: "three_bolt_look_delta",
    clipless_mountain: "two_bolt_spd", toe_clip_cage: "strap_retention_cage",
    bmx_pin: "none_concave_pins",
  };
  return m[t];
}

export function bestStyle(t: BikePedalType): string {
  const m: Record<BikePedalType, string> = {
    flat_platform: "casual_commute_beginner", clipless_road: "road_racing_time_trial",
    clipless_mountain: "trail_cross_country", toe_clip_cage: "urban_fixed_gear",
    bmx_pin: "bmx_dirt_jump_park",
  };
  return m[t];
}

export function bikePedals(): BikePedalType[] {
  return ["flat_platform", "clipless_road", "clipless_mountain", "toe_clip_cage", "bmx_pin"];
}

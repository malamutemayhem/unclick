export type FishingReelType = "spinning_open_face" | "baitcasting_low_profile" | "spincast_closed" | "fly_reel" | "conventional_trolling";

export function castDistance(t: FishingReelType): number {
  const m: Record<FishingReelType, number> = {
    spinning_open_face: 8, baitcasting_low_profile: 9, spincast_closed: 5, fly_reel: 4, conventional_trolling: 6,
  };
  return m[t];
}

export function dragPower(t: FishingReelType): number {
  const m: Record<FishingReelType, number> = {
    spinning_open_face: 7, baitcasting_low_profile: 8, spincast_closed: 4, fly_reel: 5, conventional_trolling: 10,
  };
  return m[t];
}

export function lineCapacity(t: FishingReelType): number {
  const m: Record<FishingReelType, number> = {
    spinning_open_face: 7, baitcasting_low_profile: 6, spincast_closed: 4, fly_reel: 5, conventional_trolling: 10,
  };
  return m[t];
}

export function beginnerFriendly(t: FishingReelType): number {
  const m: Record<FishingReelType, number> = {
    spinning_open_face: 9, baitcasting_low_profile: 3, spincast_closed: 10, fly_reel: 4, conventional_trolling: 5,
  };
  return m[t];
}

export function reelCost(t: FishingReelType): number {
  const m: Record<FishingReelType, number> = {
    spinning_open_face: 4, baitcasting_low_profile: 7, spincast_closed: 2, fly_reel: 8, conventional_trolling: 9,
  };
  return m[t];
}

export function antiReverse(t: FishingReelType): boolean {
  const m: Record<FishingReelType, boolean> = {
    spinning_open_face: true, baitcasting_low_profile: true, spincast_closed: true, fly_reel: false, conventional_trolling: true,
  };
  return m[t];
}

export function levelWind(t: FishingReelType): boolean {
  const m: Record<FishingReelType, boolean> = {
    spinning_open_face: false, baitcasting_low_profile: true, spincast_closed: false, fly_reel: false, conventional_trolling: true,
  };
  return m[t];
}

export function gearSystem(t: FishingReelType): string {
  const m: Record<FishingReelType, string> = {
    spinning_open_face: "rotor_bail_oscillating_spool", baitcasting_low_profile: "worm_gear_magnetic_brake",
    spincast_closed: "internal_pickup_pin", fly_reel: "large_arbor_click_drag",
    conventional_trolling: "star_drag_lever_gear",
  };
  return m[t];
}

export function bestFishing(t: FishingReelType): string {
  const m: Record<FishingReelType, string> = {
    spinning_open_face: "versatile_freshwater_light_lure", baitcasting_low_profile: "bass_heavy_cover_precision",
    spincast_closed: "kids_casual_dock_fishing", fly_reel: "trout_stream_fly_presentation",
    conventional_trolling: "offshore_deep_sea_big_game",
  };
  return m[t];
}

export function fishingReels(): FishingReelType[] {
  return ["spinning_open_face", "baitcasting_low_profile", "spincast_closed", "fly_reel", "conventional_trolling"];
}

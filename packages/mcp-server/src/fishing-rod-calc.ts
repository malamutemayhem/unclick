export type FishingRodType = "spinning_medium" | "casting_heavy" | "fly_rod" | "ice_short" | "surf_long";

export function sensitivity(t: FishingRodType): number {
  const m: Record<FishingRodType, number> = {
    spinning_medium: 8, casting_heavy: 7, fly_rod: 9, ice_short: 10, surf_long: 4,
  };
  return m[t];
}

export function castRange(t: FishingRodType): number {
  const m: Record<FishingRodType, number> = {
    spinning_medium: 7, casting_heavy: 8, fly_rod: 6, ice_short: 1, surf_long: 10,
  };
  return m[t];
}

export function rodPower(t: FishingRodType): number {
  const m: Record<FishingRodType, number> = {
    spinning_medium: 5, casting_heavy: 9, fly_rod: 3, ice_short: 4, surf_long: 8,
  };
  return m[t];
}

export function portability(t: FishingRodType): number {
  const m: Record<FishingRodType, number> = {
    spinning_medium: 7, casting_heavy: 5, fly_rod: 6, ice_short: 10, surf_long: 2,
  };
  return m[t];
}

export function rodCost(t: FishingRodType): number {
  const m: Record<FishingRodType, number> = {
    spinning_medium: 4, casting_heavy: 6, fly_rod: 8, ice_short: 3, surf_long: 7,
  };
  return m[t];
}

export function twopiece(t: FishingRodType): boolean {
  const m: Record<FishingRodType, boolean> = {
    spinning_medium: true, casting_heavy: true, fly_rod: true, ice_short: false, surf_long: true,
  };
  return m[t];
}

export function corkGrip(t: FishingRodType): boolean {
  const m: Record<FishingRodType, boolean> = {
    spinning_medium: true, casting_heavy: false, fly_rod: true, ice_short: false, surf_long: false,
  };
  return m[t];
}

export function blankMaterial(t: FishingRodType): string {
  const m: Record<FishingRodType, string> = {
    spinning_medium: "graphite_im7_moderate", casting_heavy: "composite_glass_graphite",
    fly_rod: "high_modulus_graphite_fast", ice_short: "fiberglass_ultra_light",
    surf_long: "carbon_fiber_heavy_blank",
  };
  return m[t];
}

export function bestTarget(t: FishingRodType): string {
  const m: Record<FishingRodType, string> = {
    spinning_medium: "trout_walleye_panfish", casting_heavy: "bass_pike_musky",
    fly_rod: "trout_salmon_fly_stream", ice_short: "perch_crappie_ice_hole",
    surf_long: "striped_bass_shark_beach",
  };
  return m[t];
}

export function fishingRods(): FishingRodType[] {
  return ["spinning_medium", "casting_heavy", "fly_rod", "ice_short", "surf_long"];
}

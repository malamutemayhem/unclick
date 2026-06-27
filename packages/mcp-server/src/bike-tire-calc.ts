export type BikeTire = "road_slick" | "gravel_knobby" | "mtb_aggressive" | "commuter_puncture" | "tubeless_setup";

export function rollingResistance(b: BikeTire): number {
  const m: Record<BikeTire, number> = {
    road_slick: 10, gravel_knobby: 5, mtb_aggressive: 3, commuter_puncture: 7, tubeless_setup: 9,
  };
  return m[b];
}

export function tractionOffroad(b: BikeTire): number {
  const m: Record<BikeTire, number> = {
    road_slick: 1, gravel_knobby: 8, mtb_aggressive: 10, commuter_puncture: 3, tubeless_setup: 6,
  };
  return m[b];
}

export function punctureProtection(b: BikeTire): number {
  const m: Record<BikeTire, number> = {
    road_slick: 4, gravel_knobby: 6, mtb_aggressive: 7, commuter_puncture: 10, tubeless_setup: 8,
  };
  return m[b];
}

export function rideComfort(b: BikeTire): number {
  const m: Record<BikeTire, number> = {
    road_slick: 5, gravel_knobby: 7, mtb_aggressive: 8, commuter_puncture: 6, tubeless_setup: 9,
  };
  return m[b];
}

export function tireCost(b: BikeTire): number {
  const m: Record<BikeTire, number> = {
    road_slick: 6, gravel_knobby: 5, mtb_aggressive: 7, commuter_puncture: 4, tubeless_setup: 8,
  };
  return m[b];
}

export function requiresTube(b: BikeTire): boolean {
  const m: Record<BikeTire, boolean> = {
    road_slick: true, gravel_knobby: true, mtb_aggressive: true, commuter_puncture: true, tubeless_setup: false,
  };
  return m[b];
}

export function reflectiveStrip(b: BikeTire): boolean {
  const m: Record<BikeTire, boolean> = {
    road_slick: false, gravel_knobby: false, mtb_aggressive: false, commuter_puncture: true, tubeless_setup: false,
  };
  return m[b];
}

export function treadPattern(b: BikeTire): string {
  const m: Record<BikeTire, string> = {
    road_slick: "smooth_minimal_herringbone", gravel_knobby: "mixed_small_knob_center",
    mtb_aggressive: "deep_lug_paddle_sidewall", commuter_puncture: "semi_slick_kevlar_belt",
    tubeless_setup: "supple_casing_sealant_bead",
  };
  return m[b];
}

export function bestRiding(b: BikeTire): string {
  const m: Record<BikeTire, string> = {
    road_slick: "road_racing_fast_pavement", gravel_knobby: "mixed_surface_adventure",
    mtb_aggressive: "trail_enduro_downhill", commuter_puncture: "daily_commute_urban",
    tubeless_setup: "race_day_low_pressure",
  };
  return m[b];
}

export function bikeTires(): BikeTire[] {
  return ["road_slick", "gravel_knobby", "mtb_aggressive", "commuter_puncture", "tubeless_setup"];
}

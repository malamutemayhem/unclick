export type WiperBladeType = "conventional_frame_bracket" | "beam_bracketless_curved" | "hybrid_aero_frame" | "rear_specific_short" | "winter_heavy_ice";

export function wipeQuality(t: WiperBladeType): number {
  const m: Record<WiperBladeType, number> = {
    conventional_frame_bracket: 6, beam_bracketless_curved: 9, hybrid_aero_frame: 8, rear_specific_short: 5, winter_heavy_ice: 7,
  };
  return m[t];
}

export function windLift(t: WiperBladeType): number {
  const m: Record<WiperBladeType, number> = {
    conventional_frame_bracket: 4, beam_bracketless_curved: 9, hybrid_aero_frame: 8, rear_specific_short: 7, winter_heavy_ice: 6,
  };
  return m[t];
}

export function durability(t: WiperBladeType): number {
  const m: Record<WiperBladeType, number> = {
    conventional_frame_bracket: 5, beam_bracketless_curved: 8, hybrid_aero_frame: 7, rear_specific_short: 6, winter_heavy_ice: 10,
  };
  return m[t];
}

export function installEase(t: WiperBladeType): number {
  const m: Record<WiperBladeType, number> = {
    conventional_frame_bracket: 7, beam_bracketless_curved: 9, hybrid_aero_frame: 8, rear_specific_short: 6, winter_heavy_ice: 7,
  };
  return m[t];
}

export function bladeCost(t: WiperBladeType): number {
  const m: Record<WiperBladeType, number> = {
    conventional_frame_bracket: 3, beam_bracketless_curved: 7, hybrid_aero_frame: 6, rear_specific_short: 4, winter_heavy_ice: 8,
  };
  return m[t];
}

export function allSeason(t: WiperBladeType): boolean {
  const m: Record<WiperBladeType, boolean> = {
    conventional_frame_bracket: true, beam_bracketless_curved: true, hybrid_aero_frame: true, rear_specific_short: true, winter_heavy_ice: false,
  };
  return m[t];
}

export function rubberCoated(t: WiperBladeType): boolean {
  const m: Record<WiperBladeType, boolean> = {
    conventional_frame_bracket: false, beam_bracketless_curved: false, hybrid_aero_frame: false, rear_specific_short: false, winter_heavy_ice: true,
  };
  return m[t];
}

export function rubberType(t: WiperBladeType): string {
  const m: Record<WiperBladeType, string> = {
    conventional_frame_bracket: "natural_rubber_strip",
    beam_bracketless_curved: "silicone_infused_graphite",
    hybrid_aero_frame: "dual_rubber_silicone",
    rear_specific_short: "standard_rubber_compact",
    winter_heavy_ice: "heavy_duty_rubber_boot",
  };
  return m[t];
}

export function bestCondition(t: WiperBladeType): string {
  const m: Record<WiperBladeType, string> = {
    conventional_frame_bracket: "budget_replacement_basic",
    beam_bracketless_curved: "highway_speed_rain",
    hybrid_aero_frame: "mixed_driving_premium",
    rear_specific_short: "hatchback_suv_rear",
    winter_heavy_ice: "snow_ice_freezing_rain",
  };
  return m[t];
}

export function wiperBlades(): WiperBladeType[] {
  return ["conventional_frame_bracket", "beam_bracketless_curved", "hybrid_aero_frame", "rear_specific_short", "winter_heavy_ice"];
}

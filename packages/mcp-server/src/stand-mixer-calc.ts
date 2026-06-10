export type StandMixerType = "tilt_head_home" | "bowl_lift_pro" | "compact_mini" | "spiral_dough" | "planetary_commercial";

export function mixingPower(t: StandMixerType): number {
  const m: Record<StandMixerType, number> = {
    tilt_head_home: 6, bowl_lift_pro: 9, compact_mini: 4, spiral_dough: 10, planetary_commercial: 10,
  };
  return m[t];
}

export function bowlCapacity(t: StandMixerType): number {
  const m: Record<StandMixerType, number> = {
    tilt_head_home: 6, bowl_lift_pro: 8, compact_mini: 3, spiral_dough: 9, planetary_commercial: 10,
  };
  return m[t];
}

export function versatility(t: StandMixerType): number {
  const m: Record<StandMixerType, number> = {
    tilt_head_home: 9, bowl_lift_pro: 10, compact_mini: 5, spiral_dough: 4, planetary_commercial: 8,
  };
  return m[t];
}

export function counterFootprint(t: StandMixerType): number {
  const m: Record<StandMixerType, number> = {
    tilt_head_home: 5, bowl_lift_pro: 7, compact_mini: 2, spiral_dough: 8, planetary_commercial: 10,
  };
  return m[t];
}

export function mixerCost(t: StandMixerType): number {
  const m: Record<StandMixerType, number> = {
    tilt_head_home: 4, bowl_lift_pro: 7, compact_mini: 3, spiral_dough: 8, planetary_commercial: 10,
  };
  return m[t];
}

export function attachmentHub(t: StandMixerType): boolean {
  const m: Record<StandMixerType, boolean> = {
    tilt_head_home: true, bowl_lift_pro: true, compact_mini: false, spiral_dough: false, planetary_commercial: true,
  };
  return m[t];
}

export function splashGuard(t: StandMixerType): boolean {
  const m: Record<StandMixerType, boolean> = {
    tilt_head_home: false, bowl_lift_pro: true, compact_mini: false, spiral_dough: true, planetary_commercial: true,
  };
  return m[t];
}

export function driveType(t: StandMixerType): string {
  const m: Record<StandMixerType, string> = {
    tilt_head_home: "direct_drive_dc_motor",
    bowl_lift_pro: "gear_driven_ac_motor",
    compact_mini: "belt_drive_compact",
    spiral_dough: "spiral_hook_fixed_bowl",
    planetary_commercial: "planetary_gear_heavy",
  };
  return m[t];
}

export function bestBake(t: StandMixerType): string {
  const m: Record<StandMixerType, string> = {
    tilt_head_home: "cookie_cake_home_baker",
    bowl_lift_pro: "bread_pastry_serious",
    compact_mini: "small_batch_apartment",
    spiral_dough: "pizza_bagel_artisan",
    planetary_commercial: "bakery_production_line",
  };
  return m[t];
}

export function standMixers(): StandMixerType[] {
  return ["tilt_head_home", "bowl_lift_pro", "compact_mini", "spiral_dough", "planetary_commercial"];
}

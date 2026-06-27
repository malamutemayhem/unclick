export type BikeFenderType = "full_wrap_permanent" | "clip_on_quick_release" | "downtube_mudguard_partial" | "fat_tire_wide" | "ass_saver_minimal";

export function coverage(t: BikeFenderType): number {
  const m: Record<BikeFenderType, number> = {
    full_wrap_permanent: 10, clip_on_quick_release: 6, downtube_mudguard_partial: 4, fat_tire_wide: 9, ass_saver_minimal: 3,
  };
  return m[t];
}

export function installEase(t: BikeFenderType): number {
  const m: Record<BikeFenderType, number> = {
    full_wrap_permanent: 3, clip_on_quick_release: 10, downtube_mudguard_partial: 8, fat_tire_wide: 4, ass_saver_minimal: 10,
  };
  return m[t];
}

export function aerodynamics(t: BikeFenderType): number {
  const m: Record<BikeFenderType, number> = {
    full_wrap_permanent: 4, clip_on_quick_release: 6, downtube_mudguard_partial: 8, fat_tire_wide: 3, ass_saver_minimal: 10,
  };
  return m[t];
}

export function durability(t: BikeFenderType): number {
  const m: Record<BikeFenderType, number> = {
    full_wrap_permanent: 10, clip_on_quick_release: 5, downtube_mudguard_partial: 7, fat_tire_wide: 9, ass_saver_minimal: 4,
  };
  return m[t];
}

export function fenderCost(t: BikeFenderType): number {
  const m: Record<BikeFenderType, number> = {
    full_wrap_permanent: 7, clip_on_quick_release: 4, downtube_mudguard_partial: 3, fat_tire_wide: 6, ass_saver_minimal: 2,
  };
  return m[t];
}

export function toolFreeMount(t: BikeFenderType): boolean {
  const m: Record<BikeFenderType, boolean> = {
    full_wrap_permanent: false, clip_on_quick_release: true, downtube_mudguard_partial: true, fat_tire_wide: false, ass_saver_minimal: true,
  };
  return m[t];
}

export function frontAndRear(t: BikeFenderType): boolean {
  const m: Record<BikeFenderType, boolean> = {
    full_wrap_permanent: true, clip_on_quick_release: true, downtube_mudguard_partial: false, fat_tire_wide: true, ass_saver_minimal: false,
  };
  return m[t];
}

export function fenderMaterial(t: BikeFenderType): string {
  const m: Record<BikeFenderType, string> = {
    full_wrap_permanent: "polycarbonate_alloy_stay",
    clip_on_quick_release: "flexible_thermoplastic",
    downtube_mudguard_partial: "rubber_zip_tie_mount",
    fat_tire_wide: "abs_wide_profile",
    ass_saver_minimal: "recycled_pp_slide_in",
  };
  return m[t];
}

export function bestBike(t: BikeFenderType): string {
  const m: Record<BikeFenderType, string> = {
    full_wrap_permanent: "commuter_touring_daily",
    clip_on_quick_release: "road_hybrid_occasional",
    downtube_mudguard_partial: "mountain_gravel_trail",
    fat_tire_wide: "fat_bike_snow_sand",
    ass_saver_minimal: "road_race_weight_save",
  };
  return m[t];
}

export function bikeFenders(): BikeFenderType[] {
  return ["full_wrap_permanent", "clip_on_quick_release", "downtube_mudguard_partial", "fat_tire_wide", "ass_saver_minimal"];
}

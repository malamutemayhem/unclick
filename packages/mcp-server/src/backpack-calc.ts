export type BackpackType = "daypack_light_20l" | "hiking_frame_50l" | "laptop_commuter_padded" | "roll_top_waterproof" | "ultralight_packable_fold";

export function capacity(t: BackpackType): number {
  const m: Record<BackpackType, number> = {
    daypack_light_20l: 4, hiking_frame_50l: 10, laptop_commuter_padded: 5, roll_top_waterproof: 6, ultralight_packable_fold: 3,
  };
  return m[t];
}

export function comfort(t: BackpackType): number {
  const m: Record<BackpackType, number> = {
    daypack_light_20l: 7, hiking_frame_50l: 9, laptop_commuter_padded: 8, roll_top_waterproof: 6, ultralight_packable_fold: 4,
  };
  return m[t];
}

export function weatherResist(t: BackpackType): number {
  const m: Record<BackpackType, number> = {
    daypack_light_20l: 4, hiking_frame_50l: 7, laptop_commuter_padded: 5, roll_top_waterproof: 10, ultralight_packable_fold: 3,
  };
  return m[t];
}

export function organization(t: BackpackType): number {
  const m: Record<BackpackType, number> = {
    daypack_light_20l: 6, hiking_frame_50l: 8, laptop_commuter_padded: 9, roll_top_waterproof: 4, ultralight_packable_fold: 2,
  };
  return m[t];
}

export function packCost(t: BackpackType): number {
  const m: Record<BackpackType, number> = {
    daypack_light_20l: 3, hiking_frame_50l: 8, laptop_commuter_padded: 5, roll_top_waterproof: 6, ultralight_packable_fold: 4,
  };
  return m[t];
}

export function hasFrame(t: BackpackType): boolean {
  const m: Record<BackpackType, boolean> = {
    daypack_light_20l: false, hiking_frame_50l: true, laptop_commuter_padded: false, roll_top_waterproof: false, ultralight_packable_fold: false,
  };
  return m[t];
}

export function laptopSleeve(t: BackpackType): boolean {
  const m: Record<BackpackType, boolean> = {
    daypack_light_20l: false, hiking_frame_50l: false, laptop_commuter_padded: true, roll_top_waterproof: false, ultralight_packable_fold: false,
  };
  return m[t];
}

export function closureType(t: BackpackType): string {
  const m: Record<BackpackType, string> = {
    daypack_light_20l: "dual_zip_main_panel",
    hiking_frame_50l: "top_lid_drawcord",
    laptop_commuter_padded: "clamshell_zip_open",
    roll_top_waterproof: "roll_clip_seal",
    ultralight_packable_fold: "stuff_sack_drawstring",
  };
  return m[t];
}

export function bestUse(t: BackpackType): string {
  const m: Record<BackpackType, string> = {
    daypack_light_20l: "daily_errands_school",
    hiking_frame_50l: "multi_day_backcountry",
    laptop_commuter_padded: "office_commute_travel",
    roll_top_waterproof: "cycling_kayak_rain",
    ultralight_packable_fold: "emergency_spare_summit",
  };
  return m[t];
}

export function backpacks(): BackpackType[] {
  return ["daypack_light_20l", "hiking_frame_50l", "laptop_commuter_padded", "roll_top_waterproof", "ultralight_packable_fold"];
}

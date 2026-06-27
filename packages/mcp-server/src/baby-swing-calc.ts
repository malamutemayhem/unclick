export type BabySwingType = "full_size_plug_in" | "portable_battery" | "cradle_rocker" | "bouncer_vibrate" | "outdoor_bucket_seat";

export function soothingMotion(t: BabySwingType): number {
  const m: Record<BabySwingType, number> = {
    full_size_plug_in: 10, portable_battery: 7, cradle_rocker: 8, bouncer_vibrate: 6, outdoor_bucket_seat: 5,
  };
  return m[t];
}

export function speedSettings(t: BabySwingType): number {
  const m: Record<BabySwingType, number> = {
    full_size_plug_in: 10, portable_battery: 6, cradle_rocker: 4, bouncer_vibrate: 3, outdoor_bucket_seat: 1,
  };
  return m[t];
}

export function portability(t: BabySwingType): number {
  const m: Record<BabySwingType, number> = {
    full_size_plug_in: 2, portable_battery: 9, cradle_rocker: 6, bouncer_vibrate: 8, outdoor_bucket_seat: 4,
  };
  return m[t];
}

export function weightLimit(t: BabySwingType): number {
  const m: Record<BabySwingType, number> = {
    full_size_plug_in: 8, portable_battery: 6, cradle_rocker: 7, bouncer_vibrate: 9, outdoor_bucket_seat: 10,
  };
  return m[t];
}

export function swingCost(t: BabySwingType): number {
  const m: Record<BabySwingType, number> = {
    full_size_plug_in: 8, portable_battery: 5, cradle_rocker: 6, bouncer_vibrate: 4, outdoor_bucket_seat: 3,
  };
  return m[t];
}

export function musicBuiltIn(t: BabySwingType): boolean {
  const m: Record<BabySwingType, boolean> = {
    full_size_plug_in: true, portable_battery: true, cradle_rocker: false, bouncer_vibrate: true, outdoor_bucket_seat: false,
  };
  return m[t];
}

export function foldFlat(t: BabySwingType): boolean {
  const m: Record<BabySwingType, boolean> = {
    full_size_plug_in: false, portable_battery: true, cradle_rocker: true, bouncer_vibrate: true, outdoor_bucket_seat: false,
  };
  return m[t];
}

export function seatType(t: BabySwingType): string {
  const m: Record<BabySwingType, string> = {
    full_size_plug_in: "deep_padded_recline",
    portable_battery: "lightweight_fabric_sling",
    cradle_rocker: "bassinet_cocoon_nest",
    bouncer_vibrate: "ergonomic_bounce_seat",
    outdoor_bucket_seat: "molded_safety_harness",
  };
  return m[t];
}

export function bestAge(t: BabySwingType): string {
  const m: Record<BabySwingType, string> = {
    full_size_plug_in: "newborn_six_month",
    portable_battery: "travel_visit_compact",
    cradle_rocker: "newborn_sleep_nap",
    bouncer_vibrate: "three_month_sit_up",
    outdoor_bucket_seat: "toddler_playground",
  };
  return m[t];
}

export function babySwings(): BabySwingType[] {
  return ["full_size_plug_in", "portable_battery", "cradle_rocker", "bouncer_vibrate", "outdoor_bucket_seat"];
}

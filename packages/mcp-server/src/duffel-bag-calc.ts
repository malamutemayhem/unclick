export type DuffelBagType = "gym_barrel_basic" | "wheeled_rolling_travel" | "waterproof_dry_bag" | "leather_weekender" | "packable_ultralight_fold";

export function capacity(t: DuffelBagType): number {
  const m: Record<DuffelBagType, number> = {
    gym_barrel_basic: 5, wheeled_rolling_travel: 9, waterproof_dry_bag: 6, leather_weekender: 7, packable_ultralight_fold: 4,
  };
  return m[t];
}

export function durability(t: DuffelBagType): number {
  const m: Record<DuffelBagType, number> = {
    gym_barrel_basic: 5, wheeled_rolling_travel: 8, waterproof_dry_bag: 9, leather_weekender: 8, packable_ultralight_fold: 3,
  };
  return m[t];
}

export function portability(t: DuffelBagType): number {
  const m: Record<DuffelBagType, number> = {
    gym_barrel_basic: 8, wheeled_rolling_travel: 6, waterproof_dry_bag: 7, leather_weekender: 5, packable_ultralight_fold: 10,
  };
  return m[t];
}

export function weatherProtect(t: DuffelBagType): number {
  const m: Record<DuffelBagType, number> = {
    gym_barrel_basic: 3, wheeled_rolling_travel: 5, waterproof_dry_bag: 10, leather_weekender: 4, packable_ultralight_fold: 2,
  };
  return m[t];
}

export function bagCost(t: DuffelBagType): number {
  const m: Record<DuffelBagType, number> = {
    gym_barrel_basic: 2, wheeled_rolling_travel: 7, waterproof_dry_bag: 5, leather_weekender: 8, packable_ultralight_fold: 3,
  };
  return m[t];
}

export function hasWheels(t: DuffelBagType): boolean {
  const m: Record<DuffelBagType, boolean> = {
    gym_barrel_basic: false, wheeled_rolling_travel: true, waterproof_dry_bag: false, leather_weekender: false, packable_ultralight_fold: false,
  };
  return m[t];
}

export function waterproof(t: DuffelBagType): boolean {
  const m: Record<DuffelBagType, boolean> = {
    gym_barrel_basic: false, wheeled_rolling_travel: false, waterproof_dry_bag: true, leather_weekender: false, packable_ultralight_fold: false,
  };
  return m[t];
}

export function openingStyle(t: DuffelBagType): string {
  const m: Record<DuffelBagType, string> = {
    gym_barrel_basic: "u_zip_wide_mouth",
    wheeled_rolling_travel: "clamshell_full_open",
    waterproof_dry_bag: "roll_top_buckle_seal",
    leather_weekender: "top_zip_wide_panel",
    packable_ultralight_fold: "drawstring_zip_combo",
  };
  return m[t];
}

export function bestTrip(t: DuffelBagType): string {
  const m: Record<DuffelBagType, string> = {
    gym_barrel_basic: "daily_gym_sport",
    wheeled_rolling_travel: "airport_checked_luggage",
    waterproof_dry_bag: "boat_kayak_adventure",
    leather_weekender: "weekend_getaway_style",
    packable_ultralight_fold: "backup_souvenir_carry",
  };
  return m[t];
}

export function duffelBags(): DuffelBagType[] {
  return ["gym_barrel_basic", "wheeled_rolling_travel", "waterproof_dry_bag", "leather_weekender", "packable_ultralight_fold"];
}

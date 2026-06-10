export type GarmentBagType = "suit_travel_fold" | "hanging_closet_cover" | "rolling_wheeled" | "breathable_cotton" | "vacuum_seal_compress";

export function garmentProtection(t: GarmentBagType): number {
  const m: Record<GarmentBagType, number> = {
    suit_travel_fold: 8, hanging_closet_cover: 6, rolling_wheeled: 9, breathable_cotton: 5, vacuum_seal_compress: 10,
  };
  return m[t];
}

export function travelEase(t: GarmentBagType): number {
  const m: Record<GarmentBagType, number> = {
    suit_travel_fold: 9, hanging_closet_cover: 2, rolling_wheeled: 10, breathable_cotton: 3, vacuum_seal_compress: 4,
  };
  return m[t];
}

export function breathability(t: GarmentBagType): number {
  const m: Record<GarmentBagType, number> = {
    suit_travel_fold: 5, hanging_closet_cover: 7, rolling_wheeled: 4, breathable_cotton: 10, vacuum_seal_compress: 1,
  };
  return m[t];
}

export function capacity(t: GarmentBagType): number {
  const m: Record<GarmentBagType, number> = {
    suit_travel_fold: 3, hanging_closet_cover: 2, rolling_wheeled: 8, breathable_cotton: 2, vacuum_seal_compress: 6,
  };
  return m[t];
}

export function bagCost(t: GarmentBagType): number {
  const m: Record<GarmentBagType, number> = {
    suit_travel_fold: 5, hanging_closet_cover: 2, rolling_wheeled: 8, breathable_cotton: 3, vacuum_seal_compress: 4,
  };
  return m[t];
}

export function waterproof(t: GarmentBagType): boolean {
  const m: Record<GarmentBagType, boolean> = {
    suit_travel_fold: true, hanging_closet_cover: false, rolling_wheeled: true, breathable_cotton: false, vacuum_seal_compress: true,
  };
  return m[t];
}

export function foldable(t: GarmentBagType): boolean {
  const m: Record<GarmentBagType, boolean> = {
    suit_travel_fold: true, hanging_closet_cover: true, rolling_wheeled: false, breathable_cotton: true, vacuum_seal_compress: true,
  };
  return m[t];
}

export function closureType(t: GarmentBagType): string {
  const m: Record<GarmentBagType, string> = {
    suit_travel_fold: "full_zip_bi_fold",
    hanging_closet_cover: "zip_front_clear_window",
    rolling_wheeled: "zip_around_wheels_handle",
    breathable_cotton: "drawstring_shoulder_strap",
    vacuum_seal_compress: "zip_seal_valve_pump",
  };
  return m[t];
}

export function bestUse(t: GarmentBagType): string {
  const m: Record<GarmentBagType, string> = {
    suit_travel_fold: "business_trip_carry_on",
    hanging_closet_cover: "seasonal_closet_storage",
    rolling_wheeled: "multi_outfit_long_trip",
    breathable_cotton: "vintage_dress_preserve",
    vacuum_seal_compress: "off_season_space_save",
  };
  return m[t];
}

export function garmentBags(): GarmentBagType[] {
  return ["suit_travel_fold", "hanging_closet_cover", "rolling_wheeled", "breathable_cotton", "vacuum_seal_compress"];
}

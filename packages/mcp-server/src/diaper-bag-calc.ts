export type DiaperBagType = "backpack_unisex" | "tote_fashion" | "messenger_crossbody" | "convertible_stroller" | "mini_clutch";

export function storageCapacity(t: DiaperBagType): number {
  const m: Record<DiaperBagType, number> = {
    backpack_unisex: 9, tote_fashion: 8, messenger_crossbody: 7, convertible_stroller: 8, mini_clutch: 3,
  };
  return m[t];
}

export function organization(t: DiaperBagType): number {
  const m: Record<DiaperBagType, number> = {
    backpack_unisex: 9, tote_fashion: 7, messenger_crossbody: 6, convertible_stroller: 10, mini_clutch: 4,
  };
  return m[t];
}

export function comfortCarry(t: DiaperBagType): number {
  const m: Record<DiaperBagType, number> = {
    backpack_unisex: 10, tote_fashion: 5, messenger_crossbody: 7, convertible_stroller: 8, mini_clutch: 9,
  };
  return m[t];
}

export function styleAppeal(t: DiaperBagType): number {
  const m: Record<DiaperBagType, number> = {
    backpack_unisex: 6, tote_fashion: 10, messenger_crossbody: 7, convertible_stroller: 5, mini_clutch: 8,
  };
  return m[t];
}

export function bagCost(t: DiaperBagType): number {
  const m: Record<DiaperBagType, number> = {
    backpack_unisex: 5, tote_fashion: 8, messenger_crossbody: 5, convertible_stroller: 7, mini_clutch: 4,
  };
  return m[t];
}

export function insulatedPocket(t: DiaperBagType): boolean {
  const m: Record<DiaperBagType, boolean> = {
    backpack_unisex: true, tote_fashion: true, messenger_crossbody: true, convertible_stroller: true, mini_clutch: false,
  };
  return m[t];
}

export function changingPadIncluded(t: DiaperBagType): boolean {
  const m: Record<DiaperBagType, boolean> = {
    backpack_unisex: true, tote_fashion: true, messenger_crossbody: false, convertible_stroller: true, mini_clutch: false,
  };
  return m[t];
}

export function mainMaterial(t: DiaperBagType): string {
  const m: Record<DiaperBagType, string> = {
    backpack_unisex: "water_resistant_poly",
    tote_fashion: "vegan_leather_quilted",
    messenger_crossbody: "waxed_canvas_flap",
    convertible_stroller: "nylon_clip_on_system",
    mini_clutch: "neoprene_wristlet",
  };
  return m[t];
}

export function bestParent(t: DiaperBagType): string {
  const m: Record<DiaperBagType, string> = {
    backpack_unisex: "hands_free_active_parent",
    tote_fashion: "style_conscious_mom",
    messenger_crossbody: "quick_errand_dad",
    convertible_stroller: "travel_system_organizer",
    mini_clutch: "short_outing_essentials",
  };
  return m[t];
}

export function diaperBags(): DiaperBagType[] {
  return ["backpack_unisex", "tote_fashion", "messenger_crossbody", "convertible_stroller", "mini_clutch"];
}

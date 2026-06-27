export type SaddleSoapType = "glycerin_bar_classic" | "liquid_pump_modern" | "paste_tin_concentrate" | "ph_neutral_gentle" | "lanolin_rich_condition";

export function cleaningPower(t: SaddleSoapType): number {
  const m: Record<SaddleSoapType, number> = {
    glycerin_bar_classic: 8, liquid_pump_modern: 7, paste_tin_concentrate: 10, ph_neutral_gentle: 5, lanolin_rich_condition: 6,
  };
  return m[t];
}

export function leatherSafety(t: SaddleSoapType): number {
  const m: Record<SaddleSoapType, number> = {
    glycerin_bar_classic: 7, liquid_pump_modern: 8, paste_tin_concentrate: 6, ph_neutral_gentle: 10, lanolin_rich_condition: 9,
  };
  return m[t];
}

export function conditioning(t: SaddleSoapType): number {
  const m: Record<SaddleSoapType, number> = {
    glycerin_bar_classic: 6, liquid_pump_modern: 5, paste_tin_concentrate: 4, ph_neutral_gentle: 7, lanolin_rich_condition: 10,
  };
  return m[t];
}

export function easeOfUse(t: SaddleSoapType): number {
  const m: Record<SaddleSoapType, number> = {
    glycerin_bar_classic: 7, liquid_pump_modern: 10, paste_tin_concentrate: 6, ph_neutral_gentle: 9, lanolin_rich_condition: 7,
  };
  return m[t];
}

export function soapCost(t: SaddleSoapType): number {
  const m: Record<SaddleSoapType, number> = {
    glycerin_bar_classic: 1, liquid_pump_modern: 2, paste_tin_concentrate: 2, ph_neutral_gentle: 2, lanolin_rich_condition: 3,
  };
  return m[t];
}

export function conditionsLeather(t: SaddleSoapType): boolean {
  const m: Record<SaddleSoapType, boolean> = {
    glycerin_bar_classic: true, liquid_pump_modern: false, paste_tin_concentrate: false, ph_neutral_gentle: true, lanolin_rich_condition: true,
  };
  return m[t];
}

export function phNeutral(t: SaddleSoapType): boolean {
  const m: Record<SaddleSoapType, boolean> = {
    glycerin_bar_classic: false, liquid_pump_modern: false, paste_tin_concentrate: false, ph_neutral_gentle: true, lanolin_rich_condition: false,
  };
  return m[t];
}

export function baseIngredient(t: SaddleSoapType): string {
  const m: Record<SaddleSoapType, string> = {
    glycerin_bar_classic: "vegetable_glycerin_soap",
    liquid_pump_modern: "surfactant_water_blend",
    paste_tin_concentrate: "beeswax_tallow_mix",
    ph_neutral_gentle: "coconut_oil_neutral",
    lanolin_rich_condition: "wool_fat_lanolin",
  };
  return m[t];
}

export function bestLeather(t: SaddleSoapType): string {
  const m: Record<SaddleSoapType, string> = {
    glycerin_bar_classic: "saddle_tack_equestrian",
    liquid_pump_modern: "shoe_boot_everyday",
    paste_tin_concentrate: "heavy_dirt_work_gear",
    ph_neutral_gentle: "delicate_antique_restore",
    lanolin_rich_condition: "dry_cracked_revival",
  };
  return m[t];
}

export function saddleSoaps(): SaddleSoapType[] {
  return ["glycerin_bar_classic", "liquid_pump_modern", "paste_tin_concentrate", "ph_neutral_gentle", "lanolin_rich_condition"];
}

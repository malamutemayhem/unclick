export type EmulsifierType = "lecithin" | "mono_diglycerides" | "xanthan_gum" | "egg_yolk" | "mustard";

export function emulsionStability(e: EmulsifierType): number {
  const m: Record<EmulsifierType, number> = {
    lecithin: 8, mono_diglycerides: 9, xanthan_gum: 7, egg_yolk: 6, mustard: 4,
  };
  return m[e];
}

export function hlbValue(e: EmulsifierType): number {
  const m: Record<EmulsifierType, number> = {
    lecithin: 4, mono_diglycerides: 3, xanthan_gum: 7, egg_yolk: 8, mustard: 6,
  };
  return m[e];
}

export function heatTolerance(e: EmulsifierType): number {
  const m: Record<EmulsifierType, number> = {
    lecithin: 7, mono_diglycerides: 9, xanthan_gum: 8, egg_yolk: 4, mustard: 5,
  };
  return m[e];
}

export function dosageRequired(e: EmulsifierType): number {
  const m: Record<EmulsifierType, number> = {
    lecithin: 3, mono_diglycerides: 2, xanthan_gum: 1, egg_yolk: 7, mustard: 5,
  };
  return m[e];
}

export function flavorImpact(e: EmulsifierType): number {
  const m: Record<EmulsifierType, number> = {
    lecithin: 2, mono_diglycerides: 1, xanthan_gum: 1, egg_yolk: 6, mustard: 8,
  };
  return m[e];
}

export function isNatural(e: EmulsifierType): boolean {
  const m: Record<EmulsifierType, boolean> = {
    lecithin: true, mono_diglycerides: false, xanthan_gum: true, egg_yolk: true, mustard: true,
  };
  return m[e];
}

export function veganFriendly(e: EmulsifierType): boolean {
  const m: Record<EmulsifierType, boolean> = {
    lecithin: true, mono_diglycerides: false, xanthan_gum: true, egg_yolk: false, mustard: true,
  };
  return m[e];
}

export function commonApplication(e: EmulsifierType): string {
  const m: Record<EmulsifierType, string> = {
    lecithin: "chocolate_margarine", mono_diglycerides: "bread_ice_cream",
    xanthan_gum: "dressings_sauces", egg_yolk: "mayonnaise_custard",
    mustard: "vinaigrettes_marinades",
  };
  return m[e];
}

export function sourceOrigin(e: EmulsifierType): string {
  const m: Record<EmulsifierType, string> = {
    lecithin: "soy_sunflower", mono_diglycerides: "vegetable_animal_fats",
    xanthan_gum: "bacterial_fermentation", egg_yolk: "chicken_eggs",
    mustard: "mustard_seeds",
  };
  return m[e];
}

export function emulsifierTypes(): EmulsifierType[] {
  return ["lecithin", "mono_diglycerides", "xanthan_gum", "egg_yolk", "mustard"];
}

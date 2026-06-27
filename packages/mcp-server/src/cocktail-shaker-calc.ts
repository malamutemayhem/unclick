export type CocktailShakerType = "cobbler_three_piece" | "boston_two_piece" | "french_parisian" | "tin_on_tin" | "electric_auto";

export function shakePower(t: CocktailShakerType): number {
  const m: Record<CocktailShakerType, number> = {
    cobbler_three_piece: 6, boston_two_piece: 9, french_parisian: 8, tin_on_tin: 10, electric_auto: 7,
  };
  return m[t];
}

export function sealReliability(t: CocktailShakerType): number {
  const m: Record<CocktailShakerType, number> = {
    cobbler_three_piece: 9, boston_two_piece: 7, french_parisian: 6, tin_on_tin: 8, electric_auto: 10,
  };
  return m[t];
}

export function pourControl(t: CocktailShakerType): number {
  const m: Record<CocktailShakerType, number> = {
    cobbler_three_piece: 9, boston_two_piece: 6, french_parisian: 7, tin_on_tin: 5, electric_auto: 8,
  };
  return m[t];
}

export function speedService(t: CocktailShakerType): number {
  const m: Record<CocktailShakerType, number> = {
    cobbler_three_piece: 5, boston_two_piece: 9, french_parisian: 7, tin_on_tin: 10, electric_auto: 6,
  };
  return m[t];
}

export function shakerCost(t: CocktailShakerType): number {
  const m: Record<CocktailShakerType, number> = {
    cobbler_three_piece: 4, boston_two_piece: 3, french_parisian: 6, tin_on_tin: 3, electric_auto: 8,
  };
  return m[t];
}

export function builtInStrainer(t: CocktailShakerType): boolean {
  const m: Record<CocktailShakerType, boolean> = {
    cobbler_three_piece: true, boston_two_piece: false, french_parisian: false, tin_on_tin: false, electric_auto: true,
  };
  return m[t];
}

export function dishwasherSafe(t: CocktailShakerType): boolean {
  const m: Record<CocktailShakerType, boolean> = {
    cobbler_three_piece: true, boston_two_piece: true, french_parisian: true, tin_on_tin: true, electric_auto: false,
  };
  return m[t];
}

export function bodyMaterial(t: CocktailShakerType): string {
  const m: Record<CocktailShakerType, string> = {
    cobbler_three_piece: "stainless_steel_cap_strainer",
    boston_two_piece: "tin_glass_combo",
    french_parisian: "brushed_steel_elegant",
    tin_on_tin: "weighted_stainless_dual",
    electric_auto: "bpa_free_motor_base",
  };
  return m[t];
}

export function bestBartender(t: CocktailShakerType): string {
  const m: Record<CocktailShakerType, string> = {
    cobbler_three_piece: "home_bar_beginner",
    boston_two_piece: "pro_bar_high_volume",
    french_parisian: "craft_cocktail_lounge",
    tin_on_tin: "speed_bartending_event",
    electric_auto: "party_host_no_skill",
  };
  return m[t];
}

export function cocktailShakers(): CocktailShakerType[] {
  return ["cobbler_three_piece", "boston_two_piece", "french_parisian", "tin_on_tin", "electric_auto"];
}

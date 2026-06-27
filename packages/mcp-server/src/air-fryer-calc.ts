export type AirFryerType = "basket_compact_basic" | "dual_zone_two_drawer" | "oven_style_rack" | "paddle_auto_stir" | "lid_style_pot_top";

export function crispResult(t: AirFryerType): number {
  const m: Record<AirFryerType, number> = {
    basket_compact_basic: 7, dual_zone_two_drawer: 8, oven_style_rack: 9, paddle_auto_stir: 7, lid_style_pot_top: 6,
  };
  return m[t];
}

export function capacity(t: AirFryerType): number {
  const m: Record<AirFryerType, number> = {
    basket_compact_basic: 4, dual_zone_two_drawer: 8, oven_style_rack: 10, paddle_auto_stir: 6, lid_style_pot_top: 7,
  };
  return m[t];
}

export function versatility(t: AirFryerType): number {
  const m: Record<AirFryerType, number> = {
    basket_compact_basic: 5, dual_zone_two_drawer: 8, oven_style_rack: 10, paddle_auto_stir: 7, lid_style_pot_top: 9,
  };
  return m[t];
}

export function compactSize(t: AirFryerType): number {
  const m: Record<AirFryerType, number> = {
    basket_compact_basic: 10, dual_zone_two_drawer: 4, oven_style_rack: 3, paddle_auto_stir: 5, lid_style_pot_top: 6,
  };
  return m[t];
}

export function fryerCost(t: AirFryerType): number {
  const m: Record<AirFryerType, number> = {
    basket_compact_basic: 2, dual_zone_two_drawer: 6, oven_style_rack: 7, paddle_auto_stir: 5, lid_style_pot_top: 4,
  };
  return m[t];
}

export function autoStir(t: AirFryerType): boolean {
  const m: Record<AirFryerType, boolean> = {
    basket_compact_basic: false, dual_zone_two_drawer: false, oven_style_rack: false, paddle_auto_stir: true, lid_style_pot_top: false,
  };
  return m[t];
}

export function dishwasherSafe(t: AirFryerType): boolean {
  const m: Record<AirFryerType, boolean> = {
    basket_compact_basic: true, dual_zone_two_drawer: true, oven_style_rack: false, paddle_auto_stir: true, lid_style_pot_top: true,
  };
  return m[t];
}

export function heatingMethod(t: AirFryerType): string {
  const m: Record<AirFryerType, string> = {
    basket_compact_basic: "top_element_rapid_fan",
    dual_zone_two_drawer: "dual_element_sync_cook",
    oven_style_rack: "convection_multi_rack",
    paddle_auto_stir: "top_element_stir_paddle",
    lid_style_pot_top: "lid_element_pot_convert",
  };
  return m[t];
}

export function bestFood(t: AirFryerType): string {
  const m: Record<AirFryerType, string> = {
    basket_compact_basic: "fries_wings_quick_snack",
    dual_zone_two_drawer: "two_dish_meal_prep",
    oven_style_rack: "roast_bake_dehydrate",
    paddle_auto_stir: "stir_fry_risotto_curry",
    lid_style_pot_top: "pressure_then_crisp_combo",
  };
  return m[t];
}

export function airFryers(): AirFryerType[] {
  return ["basket_compact_basic", "dual_zone_two_drawer", "oven_style_rack", "paddle_auto_stir", "lid_style_pot_top"];
}

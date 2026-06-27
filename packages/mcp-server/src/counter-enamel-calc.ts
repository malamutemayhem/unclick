export type CounterEnamelType = "clear_flux_base" | "white_opaque_ground" | "black_matte_back" | "matched_color_pair" | "scrap_mixed_recycle";

export function warpPrevent(t: CounterEnamelType): number {
  const m: Record<CounterEnamelType, number> = {
    clear_flux_base: 8, white_opaque_ground: 9, black_matte_back: 9, matched_color_pair: 10, scrap_mixed_recycle: 7,
  };
  return m[t];
}

export function adhesion(t: CounterEnamelType): number {
  const m: Record<CounterEnamelType, number> = {
    clear_flux_base: 9, white_opaque_ground: 8, black_matte_back: 8, matched_color_pair: 10, scrap_mixed_recycle: 6,
  };
  return m[t];
}

export function finishLook(t: CounterEnamelType): number {
  const m: Record<CounterEnamelType, number> = {
    clear_flux_base: 7, white_opaque_ground: 8, black_matte_back: 9, matched_color_pair: 10, scrap_mixed_recycle: 3,
  };
  return m[t];
}

export function fireTemp(t: CounterEnamelType): number {
  const m: Record<CounterEnamelType, number> = {
    clear_flux_base: 8, white_opaque_ground: 7, black_matte_back: 7, matched_color_pair: 9, scrap_mixed_recycle: 6,
  };
  return m[t];
}

export function enamelCost(t: CounterEnamelType): number {
  const m: Record<CounterEnamelType, number> = {
    clear_flux_base: 2, white_opaque_ground: 2, black_matte_back: 2, matched_color_pair: 4, scrap_mixed_recycle: 1,
  };
  return m[t];
}

export function transparent(t: CounterEnamelType): boolean {
  const m: Record<CounterEnamelType, boolean> = {
    clear_flux_base: true, white_opaque_ground: false, black_matte_back: false, matched_color_pair: false, scrap_mixed_recycle: false,
  };
  return m[t];
}

export function forBegin(t: CounterEnamelType): boolean {
  const m: Record<CounterEnamelType, boolean> = {
    clear_flux_base: true, white_opaque_ground: true, black_matte_back: false, matched_color_pair: false, scrap_mixed_recycle: true,
  };
  return m[t];
}

export function enamelBase(t: CounterEnamelType): string {
  const m: Record<CounterEnamelType, string> = {
    clear_flux_base: "clear_leaded_flux",
    white_opaque_ground: "titanium_white_opaque",
    black_matte_back: "iron_oxide_matte",
    matched_color_pair: "matched_coe_pair",
    scrap_mixed_recycle: "mixed_scrap_ground",
  };
  return m[t];
}

export function bestUse(t: CounterEnamelType): string {
  const m: Record<CounterEnamelType, string> = {
    clear_flux_base: "quick_warp_prevent",
    white_opaque_ground: "clean_back_finish",
    black_matte_back: "professional_back",
    matched_color_pair: "show_both_sides",
    scrap_mixed_recycle: "practice_economy",
  };
  return m[t];
}

export function counterEnamels(): CounterEnamelType[] {
  return ["clear_flux_base", "white_opaque_ground", "black_matte_back", "matched_color_pair", "scrap_mixed_recycle"];
}

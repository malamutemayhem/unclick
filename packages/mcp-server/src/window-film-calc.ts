export type WindowFilmType = "privacy_frosted" | "solar_heat_reject" | "uv_block_clear" | "decorative_stained" | "security_shatter_hold";

export function privacyLevel(t: WindowFilmType): number {
  const m: Record<WindowFilmType, number> = {
    privacy_frosted: 10, solar_heat_reject: 4, uv_block_clear: 1, decorative_stained: 7, security_shatter_hold: 3,
  };
  return m[t];
}

export function heatReduction(t: WindowFilmType): number {
  const m: Record<WindowFilmType, number> = {
    privacy_frosted: 3, solar_heat_reject: 10, uv_block_clear: 6, decorative_stained: 4, security_shatter_hold: 5,
  };
  return m[t];
}

export function lightTransmit(t: WindowFilmType): number {
  const m: Record<WindowFilmType, number> = {
    privacy_frosted: 5, solar_heat_reject: 7, uv_block_clear: 10, decorative_stained: 4, security_shatter_hold: 8,
  };
  return m[t];
}

export function installEase(t: WindowFilmType): number {
  const m: Record<WindowFilmType, number> = {
    privacy_frosted: 9, solar_heat_reject: 6, uv_block_clear: 8, decorative_stained: 7, security_shatter_hold: 4,
  };
  return m[t];
}

export function filmCost(t: WindowFilmType): number {
  const m: Record<WindowFilmType, number> = {
    privacy_frosted: 2, solar_heat_reject: 5, uv_block_clear: 3, decorative_stained: 4, security_shatter_hold: 7,
  };
  return m[t];
}

export function removable(t: WindowFilmType): boolean {
  const m: Record<WindowFilmType, boolean> = {
    privacy_frosted: true, solar_heat_reject: true, uv_block_clear: true, decorative_stained: true, security_shatter_hold: false,
  };
  return m[t];
}

export function uvProtection(t: WindowFilmType): boolean {
  const m: Record<WindowFilmType, boolean> = {
    privacy_frosted: false, solar_heat_reject: true, uv_block_clear: true, decorative_stained: false, security_shatter_hold: true,
  };
  return m[t];
}

export function filmType(t: WindowFilmType): string {
  const m: Record<WindowFilmType, string> = {
    privacy_frosted: "static_cling_frost_vinyl",
    solar_heat_reject: "metalized_ceramic_tint",
    uv_block_clear: "nano_ceramic_clear_coat",
    decorative_stained: "printed_vinyl_color_art",
    security_shatter_hold: "thick_polyester_laminate",
  };
  return m[t];
}

export function bestWindow(t: WindowFilmType): string {
  const m: Record<WindowFilmType, string> = {
    privacy_frosted: "bathroom_street_facing",
    solar_heat_reject: "south_west_sun_exposed",
    uv_block_clear: "museum_art_protection",
    decorative_stained: "sidelight_accent_panel",
    security_shatter_hold: "ground_floor_storefront",
  };
  return m[t];
}

export function windowFilms(): WindowFilmType[] {
  return ["privacy_frosted", "solar_heat_reject", "uv_block_clear", "decorative_stained", "security_shatter_hold"];
}

export type RollingPinType = "french_tapered" | "american_handle" | "marble_heavy" | "silicone_nonstick" | "adjustable_ring";

export function doughControl(t: RollingPinType): number {
  const m: Record<RollingPinType, number> = {
    french_tapered: 10, american_handle: 7, marble_heavy: 8, silicone_nonstick: 6, adjustable_ring: 9,
  };
  return m[t];
}

export function rollWeight(t: RollingPinType): number {
  const m: Record<RollingPinType, number> = {
    french_tapered: 4, american_handle: 5, marble_heavy: 10, silicone_nonstick: 3, adjustable_ring: 6,
  };
  return m[t];
}

export function thicknessUniform(t: RollingPinType): number {
  const m: Record<RollingPinType, number> = {
    french_tapered: 6, american_handle: 7, marble_heavy: 8, silicone_nonstick: 7, adjustable_ring: 10,
  };
  return m[t];
}

export function cleanability(t: RollingPinType): number {
  const m: Record<RollingPinType, number> = {
    french_tapered: 7, american_handle: 5, marble_heavy: 8, silicone_nonstick: 10, adjustable_ring: 6,
  };
  return m[t];
}

export function pinCost(t: RollingPinType): number {
  const m: Record<RollingPinType, number> = {
    french_tapered: 3, american_handle: 2, marble_heavy: 7, silicone_nonstick: 5, adjustable_ring: 6,
  };
  return m[t];
}

export function staysCool(t: RollingPinType): boolean {
  const m: Record<RollingPinType, boolean> = {
    french_tapered: false, american_handle: false, marble_heavy: true, silicone_nonstick: false, adjustable_ring: false,
  };
  return m[t];
}

export function nonStickSurface(t: RollingPinType): boolean {
  const m: Record<RollingPinType, boolean> = {
    french_tapered: false, american_handle: false, marble_heavy: true, silicone_nonstick: true, adjustable_ring: false,
  };
  return m[t];
}

export function bodyMaterial(t: RollingPinType): string {
  const m: Record<RollingPinType, string> = {
    french_tapered: "solid_beechwood_dowel",
    american_handle: "maple_wood_ball_bearing",
    marble_heavy: "polished_marble_stone",
    silicone_nonstick: "silicone_over_steel_core",
    adjustable_ring: "stainless_steel_disc_guide",
  };
  return m[t];
}

export function bestDough(t: RollingPinType): string {
  const m: Record<RollingPinType, string> = {
    french_tapered: "pastry_pie_artisan_feel",
    american_handle: "cookie_general_baking",
    marble_heavy: "butter_pastry_cold_laminate",
    silicone_nonstick: "sticky_fondant_sugar",
    adjustable_ring: "uniform_pasta_precise",
  };
  return m[t];
}

export function rollingPins(): RollingPinType[] {
  return ["french_tapered", "american_handle", "marble_heavy", "silicone_nonstick", "adjustable_ring"];
}

export type SewingFrameType = "wood_upright_basic" | "adjustable_metal_pro" | "finishing_press_combo" | "tabletop_clamp_small" | "traditional_cord_key";

export function holdStrength(t: SewingFrameType): number {
  const m: Record<SewingFrameType, number> = {
    wood_upright_basic: 7, adjustable_metal_pro: 10, finishing_press_combo: 8, tabletop_clamp_small: 6, traditional_cord_key: 9,
  };
  return m[t];
}

export function adjustability(t: SewingFrameType): number {
  const m: Record<SewingFrameType, number> = {
    wood_upright_basic: 5, adjustable_metal_pro: 10, finishing_press_combo: 7, tabletop_clamp_small: 6, traditional_cord_key: 8,
  };
  return m[t];
}

export function portability(t: SewingFrameType): number {
  const m: Record<SewingFrameType, number> = {
    wood_upright_basic: 6, adjustable_metal_pro: 4, finishing_press_combo: 3, tabletop_clamp_small: 9, traditional_cord_key: 5,
  };
  return m[t];
}

export function stability(t: SewingFrameType): number {
  const m: Record<SewingFrameType, number> = {
    wood_upright_basic: 8, adjustable_metal_pro: 10, finishing_press_combo: 9, tabletop_clamp_small: 5, traditional_cord_key: 8,
  };
  return m[t];
}

export function frameCost(t: SewingFrameType): number {
  const m: Record<SewingFrameType, number> = {
    wood_upright_basic: 2, adjustable_metal_pro: 4, finishing_press_combo: 5, tabletop_clamp_small: 2, traditional_cord_key: 3,
  };
  return m[t];
}

export function hasPress(t: SewingFrameType): boolean {
  const m: Record<SewingFrameType, boolean> = {
    wood_upright_basic: false, adjustable_metal_pro: false, finishing_press_combo: true, tabletop_clamp_small: false, traditional_cord_key: false,
  };
  return m[t];
}

export function usesCords(t: SewingFrameType): boolean {
  const m: Record<SewingFrameType, boolean> = {
    wood_upright_basic: true, adjustable_metal_pro: true, finishing_press_combo: true, tabletop_clamp_small: false, traditional_cord_key: true,
  };
  return m[t];
}

export function frameMaterial(t: SewingFrameType): string {
  const m: Record<SewingFrameType, string> = {
    wood_upright_basic: "beech_dowel_crossbar",
    adjustable_metal_pro: "steel_threaded_rail",
    finishing_press_combo: "maple_press_screw",
    tabletop_clamp_small: "birch_clamp_base",
    traditional_cord_key: "oak_key_tension",
  };
  return m[t];
}

export function bestUse(t: SewingFrameType): string {
  const m: Record<SewingFrameType, string> = {
    wood_upright_basic: "beginner_raised_cord",
    adjustable_metal_pro: "production_workshop",
    finishing_press_combo: "sew_and_press_combo",
    tabletop_clamp_small: "travel_small_book",
    traditional_cord_key: "traditional_cord_bind",
  };
  return m[t];
}

export function sewingFrames(): SewingFrameType[] {
  return ["wood_upright_basic", "adjustable_metal_pro", "finishing_press_combo", "tabletop_clamp_small", "traditional_cord_key"];
}

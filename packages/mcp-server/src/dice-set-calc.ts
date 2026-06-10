export type DiceSetType = "acrylic_standard" | "metal_heavy" | "gemstone_natural" | "resin_swirl" | "wooden_engraved";

export function rollFairness(t: DiceSetType): number {
  const m: Record<DiceSetType, number> = {
    acrylic_standard: 8, metal_heavy: 9, gemstone_natural: 6, resin_swirl: 7, wooden_engraved: 5,
  };
  return m[t];
}

export function durability(t: DiceSetType): number {
  const m: Record<DiceSetType, number> = {
    acrylic_standard: 7, metal_heavy: 10, gemstone_natural: 4, resin_swirl: 6, wooden_engraved: 5,
  };
  return m[t];
}

export function aestheticScore(t: DiceSetType): number {
  const m: Record<DiceSetType, number> = {
    acrylic_standard: 5, metal_heavy: 8, gemstone_natural: 10, resin_swirl: 9, wooden_engraved: 7,
  };
  return m[t];
}

export function readability(t: DiceSetType): number {
  const m: Record<DiceSetType, number> = {
    acrylic_standard: 9, metal_heavy: 8, gemstone_natural: 5, resin_swirl: 6, wooden_engraved: 7,
  };
  return m[t];
}

export function diceCost(t: DiceSetType): number {
  const m: Record<DiceSetType, number> = {
    acrylic_standard: 1, metal_heavy: 6, gemstone_natural: 10, resin_swirl: 4, wooden_engraved: 5,
  };
  return m[t];
}

export function tableSafe(t: DiceSetType): boolean {
  const m: Record<DiceSetType, boolean> = {
    acrylic_standard: true, metal_heavy: false, gemstone_natural: false, resin_swirl: true, wooden_engraved: true,
  };
  return m[t];
}

export function inkFilled(t: DiceSetType): boolean {
  const m: Record<DiceSetType, boolean> = {
    acrylic_standard: true, metal_heavy: true, gemstone_natural: true, resin_swirl: true, wooden_engraved: false,
  };
  return m[t];
}

export function craftMethod(t: DiceSetType): string {
  const m: Record<DiceSetType, string> = {
    acrylic_standard: "injection_mold_mass", metal_heavy: "zinc_alloy_cast_polish",
    gemstone_natural: "hand_carved_polished_stone", resin_swirl: "layered_resin_pour_cure",
    wooden_engraved: "cnc_mill_laser_engrave",
  };
  return m[t];
}

export function bestGame(t: DiceSetType): string {
  const m: Record<DiceSetType, string> = {
    acrylic_standard: "general_rpg_board_game", metal_heavy: "premium_rpg_satisfying_roll",
    gemstone_natural: "collector_display_special", resin_swirl: "custom_artisan_unique",
    wooden_engraved: "nature_theme_eco_friendly",
  };
  return m[t];
}

export function diceSets(): DiceSetType[] {
  return ["acrylic_standard", "metal_heavy", "gemstone_natural", "resin_swirl", "wooden_engraved"];
}

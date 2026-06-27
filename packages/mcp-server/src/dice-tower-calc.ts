export type DiceTowerType = "wooden_classic" | "3d_printed_custom" | "fold_flat_travel" | "castle_themed" | "acrylic_clear";

export function rollRandomness(t: DiceTowerType): number {
  const m: Record<DiceTowerType, number> = {
    wooden_classic: 8, "3d_printed_custom": 7, fold_flat_travel: 6, castle_themed: 9, acrylic_clear: 8,
  };
  return m[t];
}

export function noiseLevel(t: DiceTowerType): number {
  const m: Record<DiceTowerType, number> = {
    wooden_classic: 6, "3d_printed_custom": 4, fold_flat_travel: 3, castle_themed: 7, acrylic_clear: 8,
  };
  return m[t];
}

export function portability(t: DiceTowerType): number {
  const m: Record<DiceTowerType, number> = {
    wooden_classic: 4, "3d_printed_custom": 5, fold_flat_travel: 10, castle_themed: 2, acrylic_clear: 5,
  };
  return m[t];
}

export function tablePresence(t: DiceTowerType): number {
  const m: Record<DiceTowerType, number> = {
    wooden_classic: 7, "3d_printed_custom": 8, fold_flat_travel: 3, castle_themed: 10, acrylic_clear: 6,
  };
  return m[t];
}

export function towerCost(t: DiceTowerType): number {
  const m: Record<DiceTowerType, number> = {
    wooden_classic: 6, "3d_printed_custom": 4, fold_flat_travel: 3, castle_themed: 8, acrylic_clear: 7,
  };
  return m[t];
}

export function diceContained(t: DiceTowerType): boolean {
  const m: Record<DiceTowerType, boolean> = {
    wooden_classic: true, "3d_printed_custom": true, fold_flat_travel: true, castle_themed: true, acrylic_clear: true,
  };
  return m[t];
}

export function customizable(t: DiceTowerType): boolean {
  const m: Record<DiceTowerType, boolean> = {
    wooden_classic: false, "3d_printed_custom": true, fold_flat_travel: false, castle_themed: false, acrylic_clear: false,
  };
  return m[t];
}

export function buildMaterial(t: DiceTowerType): string {
  const m: Record<DiceTowerType, string> = {
    wooden_classic: "hardwood_walnut_maple",
    "3d_printed_custom": "pla_petg_filament",
    fold_flat_travel: "cardboard_magnetic_fold",
    castle_themed: "resin_sculpted_painted",
    acrylic_clear: "laser_cut_acrylic_sheet",
  };
  return m[t];
}

export function bestGame(t: DiceTowerType): string {
  const m: Record<DiceTowerType, string> = {
    wooden_classic: "euro_board_game_night",
    "3d_printed_custom": "dnd_rpg_campaign",
    fold_flat_travel: "convention_travel_play",
    castle_themed: "fantasy_wargame_display",
    acrylic_clear: "modern_minimalist_table",
  };
  return m[t];
}

export function diceTowers(): DiceTowerType[] {
  return ["wooden_classic", "3d_printed_custom", "fold_flat_travel", "castle_themed", "acrylic_clear"];
}

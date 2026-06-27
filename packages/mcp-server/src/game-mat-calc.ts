export type GameMatType = "neoprene_playmat" | "rubber_scroll" | "felt_card_table" | "grid_battle_map" | "leather_roll_up";

export function surfaceGrip(t: GameMatType): number {
  const m: Record<GameMatType, number> = {
    neoprene_playmat: 10, rubber_scroll: 8, felt_card_table: 6, grid_battle_map: 7, leather_roll_up: 5,
  };
  return m[t];
}

export function cushionThickness(t: GameMatType): number {
  const m: Record<GameMatType, number> = {
    neoprene_playmat: 9, rubber_scroll: 6, felt_card_table: 4, grid_battle_map: 3, leather_roll_up: 7,
  };
  return m[t];
}

export function portability(t: GameMatType): number {
  const m: Record<GameMatType, number> = {
    neoprene_playmat: 5, rubber_scroll: 8, felt_card_table: 4, grid_battle_map: 9, leather_roll_up: 7,
  };
  return m[t];
}

export function cleanability(t: GameMatType): number {
  const m: Record<GameMatType, number> = {
    neoprene_playmat: 8, rubber_scroll: 9, felt_card_table: 3, grid_battle_map: 7, leather_roll_up: 6,
  };
  return m[t];
}

export function matCost(t: GameMatType): number {
  const m: Record<GameMatType, number> = {
    neoprene_playmat: 6, rubber_scroll: 4, felt_card_table: 3, grid_battle_map: 5, leather_roll_up: 9,
  };
  return m[t];
}

export function printable(t: GameMatType): boolean {
  const m: Record<GameMatType, boolean> = {
    neoprene_playmat: true, rubber_scroll: true, felt_card_table: false, grid_battle_map: true, leather_roll_up: false,
  };
  return m[t];
}

export function erasable(t: GameMatType): boolean {
  const m: Record<GameMatType, boolean> = {
    neoprene_playmat: false, rubber_scroll: false, felt_card_table: false, grid_battle_map: true, leather_roll_up: false,
  };
  return m[t];
}

export function surfaceMaterial(t: GameMatType): string {
  const m: Record<GameMatType, string> = {
    neoprene_playmat: "sublimated_neoprene_cloth", rubber_scroll: "natural_rubber_polyester_top",
    felt_card_table: "wool_blend_felt_stretch", grid_battle_map: "vinyl_wet_erase_printed",
    leather_roll_up: "full_grain_leather_stitched",
  };
  return m[t];
}

export function bestUse(t: GameMatType): string {
  const m: Record<GameMatType, string> = {
    neoprene_playmat: "tcg_tournament_card_game", rubber_scroll: "board_game_protection",
    felt_card_table: "poker_night_card_play", grid_battle_map: "rpg_dungeon_map_drawing",
    leather_roll_up: "premium_dice_rolling_zone",
  };
  return m[t];
}

export function gameMats(): GameMatType[] {
  return ["neoprene_playmat", "rubber_scroll", "felt_card_table", "grid_battle_map", "leather_roll_up"];
}

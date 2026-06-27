export type PlaymatType = "rubber_base_cloth_top" | "neoprene_stitched_edge" | "leather_premium_desk" | "vinyl_rollup_budget" | "xl_battle_map_grid";

export function cardProtection(t: PlaymatType): number {
  const m: Record<PlaymatType, number> = {
    rubber_base_cloth_top: 8, neoprene_stitched_edge: 9, leather_premium_desk: 7, vinyl_rollup_budget: 5, xl_battle_map_grid: 8,
  };
  return m[t];
}

export function gripSurface(t: PlaymatType): number {
  const m: Record<PlaymatType, number> = {
    rubber_base_cloth_top: 9, neoprene_stitched_edge: 10, leather_premium_desk: 6, vinyl_rollup_budget: 4, xl_battle_map_grid: 8,
  };
  return m[t];
}

export function durability(t: PlaymatType): number {
  const m: Record<PlaymatType, number> = {
    rubber_base_cloth_top: 7, neoprene_stitched_edge: 9, leather_premium_desk: 8, vinyl_rollup_budget: 4, xl_battle_map_grid: 7,
  };
  return m[t];
}

export function portability(t: PlaymatType): number {
  const m: Record<PlaymatType, number> = {
    rubber_base_cloth_top: 7, neoprene_stitched_edge: 6, leather_premium_desk: 4, vinyl_rollup_budget: 9, xl_battle_map_grid: 5,
  };
  return m[t];
}

export function matCost(t: PlaymatType): number {
  const m: Record<PlaymatType, number> = {
    rubber_base_cloth_top: 3, neoprene_stitched_edge: 5, leather_premium_desk: 7, vinyl_rollup_budget: 1, xl_battle_map_grid: 4,
  };
  return m[t];
}

export function customPrint(t: PlaymatType): boolean {
  const m: Record<PlaymatType, boolean> = {
    rubber_base_cloth_top: true, neoprene_stitched_edge: true, leather_premium_desk: false, vinyl_rollup_budget: false, xl_battle_map_grid: true,
  };
  return m[t];
}

export function hasGrid(t: PlaymatType): boolean {
  const m: Record<PlaymatType, boolean> = {
    rubber_base_cloth_top: false, neoprene_stitched_edge: false, leather_premium_desk: false, vinyl_rollup_budget: false, xl_battle_map_grid: true,
  };
  return m[t];
}

export function surfaceMaterial(t: PlaymatType): string {
  const m: Record<PlaymatType, string> = {
    rubber_base_cloth_top: "polyester_cloth_rubber",
    neoprene_stitched_edge: "neoprene_jersey_stitch",
    leather_premium_desk: "pu_leather_padded",
    vinyl_rollup_budget: "vinyl_pvc_thin",
    xl_battle_map_grid: "rubber_hex_square_grid",
  };
  return m[t];
}

export function bestGame(t: PlaymatType): string {
  const m: Record<PlaymatType, string> = {
    rubber_base_cloth_top: "tcg_card_game_general",
    neoprene_stitched_edge: "premium_tournament_play",
    leather_premium_desk: "desk_pad_dual_use",
    vinyl_rollup_budget: "casual_game_night",
    xl_battle_map_grid: "dnd_wargame_miniatures",
  };
  return m[t];
}

export function playmats(): PlaymatType[] {
  return ["rubber_base_cloth_top", "neoprene_stitched_edge", "leather_premium_desk", "vinyl_rollup_budget", "xl_battle_map_grid"];
}

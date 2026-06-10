export type BoardGameType = "strategy_euro" | "party_social" | "cooperative_team" | "deck_builder" | "war_miniature";

export function complexity(t: BoardGameType): number {
  const m: Record<BoardGameType, number> = {
    strategy_euro: 9, party_social: 2, cooperative_team: 6, deck_builder: 7, war_miniature: 10,
  };
  return m[t];
}

export function replayValue(t: BoardGameType): number {
  const m: Record<BoardGameType, number> = {
    strategy_euro: 9, party_social: 7, cooperative_team: 6, deck_builder: 10, war_miniature: 8,
  };
  return m[t];
}

export function playerInteraction(t: BoardGameType): number {
  const m: Record<BoardGameType, number> = {
    strategy_euro: 5, party_social: 10, cooperative_team: 9, deck_builder: 4, war_miniature: 8,
  };
  return m[t];
}

export function playTimeMinutes(t: BoardGameType): number {
  const m: Record<BoardGameType, number> = {
    strategy_euro: 3, party_social: 9, cooperative_team: 6, deck_builder: 7, war_miniature: 1,
  };
  return m[t];
}

export function gameCost(t: BoardGameType): number {
  const m: Record<BoardGameType, number> = {
    strategy_euro: 7, party_social: 3, cooperative_team: 6, deck_builder: 5, war_miniature: 10,
  };
  return m[t];
}

export function soloMode(t: BoardGameType): boolean {
  const m: Record<BoardGameType, boolean> = {
    strategy_euro: true, party_social: false, cooperative_team: true, deck_builder: true, war_miniature: false,
  };
  return m[t];
}

export function needsExpansion(t: BoardGameType): boolean {
  const m: Record<BoardGameType, boolean> = {
    strategy_euro: false, party_social: false, cooperative_team: false, deck_builder: true, war_miniature: true,
  };
  return m[t];
}

export function mechanicType(t: BoardGameType): string {
  const m: Record<BoardGameType, string> = {
    strategy_euro: "worker_placement_resource", party_social: "voting_bluffing_trivia",
    cooperative_team: "action_point_shared_goal", deck_builder: "draw_buy_optimize_engine",
    war_miniature: "hex_grid_combat_movement",
  };
  return m[t];
}

export function bestGroup(t: BoardGameType): string {
  const m: Record<BoardGameType, string> = {
    strategy_euro: "dedicated_gamer_think_heavy", party_social: "large_group_casual_fun",
    cooperative_team: "family_friends_teamwork", deck_builder: "card_fan_engine_builder",
    war_miniature: "hobbyist_painter_tactician",
  };
  return m[t];
}

export function boardGames(): BoardGameType[] {
  return ["strategy_euro", "party_social", "cooperative_team", "deck_builder", "war_miniature"];
}

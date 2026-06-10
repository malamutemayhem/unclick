export type QueenRearingMethod = "grafting" | "miller" | "doolittle" | "walk_away" | "cloake_board";

export function successRate(q: QueenRearingMethod): number {
  const m: Record<QueenRearingMethod, number> = {
    grafting: 9, miller: 6, doolittle: 8, walk_away: 4, cloake_board: 9,
  };
  return m[q];
}

export function skillRequired(q: QueenRearingMethod): number {
  const m: Record<QueenRearingMethod, number> = {
    grafting: 9, miller: 5, doolittle: 8, walk_away: 2, cloake_board: 7,
  };
  return m[q];
}

export function equipmentCost(q: QueenRearingMethod): number {
  const m: Record<QueenRearingMethod, number> = {
    grafting: 7, miller: 3, doolittle: 6, walk_away: 1, cloake_board: 8,
  };
  return m[q];
}

export function queenQuantity(q: QueenRearingMethod): number {
  const m: Record<QueenRearingMethod, number> = {
    grafting: 10, miller: 5, doolittle: 9, walk_away: 3, cloake_board: 8,
  };
  return m[q];
}

export function geneticControl(q: QueenRearingMethod): number {
  const m: Record<QueenRearingMethod, number> = {
    grafting: 10, miller: 6, doolittle: 9, walk_away: 3, cloake_board: 8,
  };
  return m[q];
}

export function beginnerFriendly(q: QueenRearingMethod): boolean {
  const m: Record<QueenRearingMethod, boolean> = {
    grafting: false, miller: true, doolittle: false, walk_away: true, cloake_board: false,
  };
  return m[q];
}

export function requiresSeparateColony(q: QueenRearingMethod): boolean {
  const m: Record<QueenRearingMethod, boolean> = {
    grafting: true, miller: false, doolittle: true, walk_away: false, cloake_board: false,
  };
  return m[q];
}

export function keyTool(q: QueenRearingMethod): string {
  const m: Record<QueenRearingMethod, string> = {
    grafting: "grafting_needle", miller: "comb_cutting_knife",
    doolittle: "wax_cell_cup", walk_away: "no_special_tool",
    cloake_board: "queen_excluder_board",
  };
  return m[q];
}

export function bestScenario(q: QueenRearingMethod): string {
  const m: Record<QueenRearingMethod, string> = {
    grafting: "commercial_queen_production", miller: "small_scale_hobbyist",
    doolittle: "medium_scale_breeder", walk_away: "emergency_requeening",
    cloake_board: "single_colony_production",
  };
  return m[q];
}

export function queenRearingMethods(): QueenRearingMethod[] {
  return ["grafting", "miller", "doolittle", "walk_away", "cloake_board"];
}

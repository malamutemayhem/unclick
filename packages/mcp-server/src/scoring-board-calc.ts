export type ScoringBoardType = "metric_grid_universal" | "envelope_punch_guide" | "diagonal_score_plate" | "mini_travel_compact" | "magnetic_fence_adjust";

export function scoreAccuracy(t: ScoringBoardType): number {
  const m: Record<ScoringBoardType, number> = {
    metric_grid_universal: 9, envelope_punch_guide: 7, diagonal_score_plate: 8, mini_travel_compact: 6, magnetic_fence_adjust: 10,
  };
  return m[t];
}

export function versatility(t: ScoringBoardType): number {
  const m: Record<ScoringBoardType, number> = {
    metric_grid_universal: 10, envelope_punch_guide: 5, diagonal_score_plate: 7, mini_travel_compact: 6, magnetic_fence_adjust: 9,
  };
  return m[t];
}

export function portability(t: ScoringBoardType): number {
  const m: Record<ScoringBoardType, number> = {
    metric_grid_universal: 5, envelope_punch_guide: 7, diagonal_score_plate: 4, mini_travel_compact: 10, magnetic_fence_adjust: 3,
  };
  return m[t];
}

export function repeatability(t: ScoringBoardType): number {
  const m: Record<ScoringBoardType, number> = {
    metric_grid_universal: 8, envelope_punch_guide: 10, diagonal_score_plate: 7, mini_travel_compact: 6, magnetic_fence_adjust: 9,
  };
  return m[t];
}

export function boardCost(t: ScoringBoardType): number {
  const m: Record<ScoringBoardType, number> = {
    metric_grid_universal: 2, envelope_punch_guide: 2, diagonal_score_plate: 2, mini_travel_compact: 1, magnetic_fence_adjust: 3,
  };
  return m[t];
}

export function makesEnvelopes(t: ScoringBoardType): boolean {
  const m: Record<ScoringBoardType, boolean> = {
    metric_grid_universal: true, envelope_punch_guide: true, diagonal_score_plate: false, mini_travel_compact: false, magnetic_fence_adjust: true,
  };
  return m[t];
}

export function diagonalScore(t: ScoringBoardType): boolean {
  const m: Record<ScoringBoardType, boolean> = {
    metric_grid_universal: false, envelope_punch_guide: false, diagonal_score_plate: true, mini_travel_compact: false, magnetic_fence_adjust: true,
  };
  return m[t];
}

export function guideType(t: ScoringBoardType): string {
  const m: Record<ScoringBoardType, string> = {
    metric_grid_universal: "etched_grid_channel",
    envelope_punch_guide: "pre_marked_slot",
    diagonal_score_plate: "angled_groove_line",
    mini_travel_compact: "folding_hinged_board",
    magnetic_fence_adjust: "sliding_magnet_rail",
  };
  return m[t];
}

export function bestProject(t: ScoringBoardType): string {
  const m: Record<ScoringBoardType, string> = {
    metric_grid_universal: "card_box_general",
    envelope_punch_guide: "custom_envelope_batch",
    diagonal_score_plate: "origami_angle_fold",
    mini_travel_compact: "crop_retreat_travel",
    magnetic_fence_adjust: "precision_book_spine",
  };
  return m[t];
}

export function scoringBoards(): ScoringBoardType[] {
  return ["metric_grid_universal", "envelope_punch_guide", "diagonal_score_plate", "mini_travel_compact", "magnetic_fence_adjust"];
}

export type SpeedLadderType = "flat_rung_standard" | "round_rung_elevated" | "adjustable_spacing_custom" | "double_wide_agility" | "hex_ring_grid";

export function footworkDrill(t: SpeedLadderType): number {
  const m: Record<SpeedLadderType, number> = {
    flat_rung_standard: 8, round_rung_elevated: 7, adjustable_spacing_custom: 9, double_wide_agility: 7, hex_ring_grid: 10,
  };
  return m[t];
}

export function portability(t: SpeedLadderType): number {
  const m: Record<SpeedLadderType, number> = {
    flat_rung_standard: 9, round_rung_elevated: 7, adjustable_spacing_custom: 8, double_wide_agility: 6, hex_ring_grid: 5,
  };
  return m[t];
}

export function durability(t: SpeedLadderType): number {
  const m: Record<SpeedLadderType, number> = {
    flat_rung_standard: 7, round_rung_elevated: 8, adjustable_spacing_custom: 8, double_wide_agility: 7, hex_ring_grid: 9,
  };
  return m[t];
}

export function drillVariety(t: SpeedLadderType): number {
  const m: Record<SpeedLadderType, number> = {
    flat_rung_standard: 8, round_rung_elevated: 6, adjustable_spacing_custom: 9, double_wide_agility: 8, hex_ring_grid: 10,
  };
  return m[t];
}

export function ladderCost(t: SpeedLadderType): number {
  const m: Record<SpeedLadderType, number> = {
    flat_rung_standard: 1, round_rung_elevated: 2, adjustable_spacing_custom: 2, double_wide_agility: 2, hex_ring_grid: 3,
  };
  return m[t];
}

export function laysFlat(t: SpeedLadderType): boolean {
  const m: Record<SpeedLadderType, boolean> = {
    flat_rung_standard: true, round_rung_elevated: false, adjustable_spacing_custom: true, double_wide_agility: true, hex_ring_grid: true,
  };
  return m[t];
}

export function adjustableSpacing(t: SpeedLadderType): boolean {
  const m: Record<SpeedLadderType, boolean> = {
    flat_rung_standard: false, round_rung_elevated: false, adjustable_spacing_custom: true, double_wide_agility: false, hex_ring_grid: true,
  };
  return m[t];
}

export function rungMaterial(t: SpeedLadderType): string {
  const m: Record<SpeedLadderType, string> = {
    flat_rung_standard: "plastic_flat_strip",
    round_rung_elevated: "pvc_tube_round",
    adjustable_spacing_custom: "nylon_clip_slide",
    double_wide_agility: "plastic_wide_plank",
    hex_ring_grid: "polypropylene_hex",
  };
  return m[t];
}

export function bestSport(t: SpeedLadderType): string {
  const m: Record<SpeedLadderType, string> = {
    flat_rung_standard: "soccer_footwork_drill",
    round_rung_elevated: "basketball_court_agility",
    adjustable_spacing_custom: "track_sprint_training",
    double_wide_agility: "football_lateral_move",
    hex_ring_grid: "mma_multi_directional",
  };
  return m[t];
}

export function speedLadders(): SpeedLadderType[] {
  return ["flat_rung_standard", "round_rung_elevated", "adjustable_spacing_custom", "double_wide_agility", "hex_ring_grid"];
}

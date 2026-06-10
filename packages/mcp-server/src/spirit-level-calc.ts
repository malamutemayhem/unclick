export type SpiritLevelType = "box_beam_standard" | "torpedo_short_tight" | "post_level_column" | "line_level_string" | "bullseye_round_flat";

export function readAccuracy(t: SpiritLevelType): number {
  const m: Record<SpiritLevelType, number> = {
    box_beam_standard: 9, torpedo_short_tight: 6, post_level_column: 8, line_level_string: 5, bullseye_round_flat: 7,
  };
  return m[t];
}

export function lengthReach(t: SpiritLevelType): number {
  const m: Record<SpiritLevelType, number> = {
    box_beam_standard: 10, torpedo_short_tight: 3, post_level_column: 5, line_level_string: 8, bullseye_round_flat: 2,
  };
  return m[t];
}

export function portability(t: SpiritLevelType): number {
  const m: Record<SpiritLevelType, number> = {
    box_beam_standard: 4, torpedo_short_tight: 10, post_level_column: 6, line_level_string: 9, bullseye_round_flat: 10,
  };
  return m[t];
}

export function versatility(t: SpiritLevelType): number {
  const m: Record<SpiritLevelType, number> = {
    box_beam_standard: 8, torpedo_short_tight: 9, post_level_column: 5, line_level_string: 6, bullseye_round_flat: 4,
  };
  return m[t];
}

export function levelCost(t: SpiritLevelType): number {
  const m: Record<SpiritLevelType, number> = {
    box_beam_standard: 2, torpedo_short_tight: 1, post_level_column: 2, line_level_string: 1, bullseye_round_flat: 1,
  };
  return m[t];
}

export function magnetic(t: SpiritLevelType): boolean {
  const m: Record<SpiritLevelType, boolean> = {
    box_beam_standard: false, torpedo_short_tight: true, post_level_column: true, line_level_string: false, bullseye_round_flat: false,
  };
  return m[t];
}

export function handsFree(t: SpiritLevelType): boolean {
  const m: Record<SpiritLevelType, boolean> = {
    box_beam_standard: false, torpedo_short_tight: true, post_level_column: true, line_level_string: true, bullseye_round_flat: false,
  };
  return m[t];
}

export function vialCount(t: SpiritLevelType): string {
  const m: Record<SpiritLevelType, string> = {
    box_beam_standard: "three_vial_set",
    torpedo_short_tight: "three_vial_compact",
    post_level_column: "two_vial_column",
    line_level_string: "single_vial_hang",
    bullseye_round_flat: "circular_bubble_disc",
  };
  return m[t];
}

export function bestUse(t: SpiritLevelType): string {
  const m: Record<SpiritLevelType, string> = {
    box_beam_standard: "framing_long_level",
    torpedo_short_tight: "plumbing_tight_space",
    post_level_column: "fence_post_plumb",
    line_level_string: "grade_string_check",
    bullseye_round_flat: "surface_flat_check",
  };
  return m[t];
}

export function spiritLevels(): SpiritLevelType[] {
  return ["box_beam_standard", "torpedo_short_tight", "post_level_column", "line_level_string", "bullseye_round_flat"];
}

export type GolfTeeType = "wooden_standard" | "plastic_castle_step" | "brush_bristle_top" | "rubber_flexible" | "biodegradable_bamboo";

export function consistency(t: GolfTeeType): number {
  const m: Record<GolfTeeType, number> = {
    wooden_standard: 5, plastic_castle_step: 10, brush_bristle_top: 9, rubber_flexible: 7, biodegradable_bamboo: 6,
  };
  return m[t];
}

export function durability(t: GolfTeeType): number {
  const m: Record<GolfTeeType, number> = {
    wooden_standard: 3, plastic_castle_step: 7, brush_bristle_top: 8, rubber_flexible: 10, biodegradable_bamboo: 4,
  };
  return m[t];
}

export function frictionReduction(t: GolfTeeType): number {
  const m: Record<GolfTeeType, number> = {
    wooden_standard: 5, plastic_castle_step: 7, brush_bristle_top: 10, rubber_flexible: 8, biodegradable_bamboo: 5,
  };
  return m[t];
}

export function ecoFriendly(t: GolfTeeType): number {
  const m: Record<GolfTeeType, number> = {
    wooden_standard: 8, plastic_castle_step: 3, brush_bristle_top: 4, rubber_flexible: 6, biodegradable_bamboo: 10,
  };
  return m[t];
}

export function teeCost(t: GolfTeeType): number {
  const m: Record<GolfTeeType, number> = {
    wooden_standard: 2, plastic_castle_step: 5, brush_bristle_top: 8, rubber_flexible: 6, biodegradable_bamboo: 4,
  };
  return m[t];
}

export function heightAdjust(t: GolfTeeType): boolean {
  const m: Record<GolfTeeType, boolean> = {
    wooden_standard: false, plastic_castle_step: true, brush_bristle_top: false, rubber_flexible: true, biodegradable_bamboo: false,
  };
  return m[t];
}

export function reusable(t: GolfTeeType): boolean {
  const m: Record<GolfTeeType, boolean> = {
    wooden_standard: false, plastic_castle_step: true, brush_bristle_top: true, rubber_flexible: true, biodegradable_bamboo: false,
  };
  return m[t];
}

export function teeMaterial(t: GolfTeeType): string {
  const m: Record<GolfTeeType, string> = {
    wooden_standard: "hardwood_birch_painted",
    plastic_castle_step: "injection_molded_abs",
    brush_bristle_top: "nylon_bristle_polymer_base",
    rubber_flexible: "thermoplastic_elastomer_flex",
    biodegradable_bamboo: "moso_bamboo_natural_finish",
  };
  return m[t];
}

export function bestGolfer(t: GolfTeeType): string {
  const m: Record<GolfTeeType, string> = {
    wooden_standard: "traditionalist_casual_round",
    plastic_castle_step: "consistent_height_every_tee",
    brush_bristle_top: "distance_seeker_low_drag",
    rubber_flexible: "practice_range_bulk_use",
    biodegradable_bamboo: "eco_conscious_green_golfer",
  };
  return m[t];
}

export function golfTees(): GolfTeeType[] {
  return ["wooden_standard", "plastic_castle_step", "brush_bristle_top", "rubber_flexible", "biodegradable_bamboo"];
}

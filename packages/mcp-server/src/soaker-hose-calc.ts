export type SoakerHoseType = "flat_weeping_tape" | "round_porous_rubber" | "recycled_tire_rubber" | "drip_line_emitter_built" | "soaker_ring_tree_base";

export function waterDistribution(t: SoakerHoseType): number {
  const m: Record<SoakerHoseType, number> = {
    flat_weeping_tape: 7, round_porous_rubber: 8, recycled_tire_rubber: 6, drip_line_emitter_built: 10, soaker_ring_tree_base: 9,
  };
  return m[t];
}

export function flexibility(t: SoakerHoseType): number {
  const m: Record<SoakerHoseType, number> = {
    flat_weeping_tape: 9, round_porous_rubber: 7, recycled_tire_rubber: 5, drip_line_emitter_built: 6, soaker_ring_tree_base: 3,
  };
  return m[t];
}

export function durability(t: SoakerHoseType): number {
  const m: Record<SoakerHoseType, number> = {
    flat_weeping_tape: 4, round_porous_rubber: 7, recycled_tire_rubber: 8, drip_line_emitter_built: 9, soaker_ring_tree_base: 7,
  };
  return m[t];
}

export function waterEfficiency(t: SoakerHoseType): number {
  const m: Record<SoakerHoseType, number> = {
    flat_weeping_tape: 7, round_porous_rubber: 6, recycled_tire_rubber: 5, drip_line_emitter_built: 10, soaker_ring_tree_base: 8,
  };
  return m[t];
}

export function hoseCost(t: SoakerHoseType): number {
  const m: Record<SoakerHoseType, number> = {
    flat_weeping_tape: 1, round_porous_rubber: 2, recycled_tire_rubber: 2, drip_line_emitter_built: 4, soaker_ring_tree_base: 2,
  };
  return m[t];
}

export function buriable(t: SoakerHoseType): boolean {
  const m: Record<SoakerHoseType, boolean> = {
    flat_weeping_tape: true, round_porous_rubber: true, recycled_tire_rubber: true, drip_line_emitter_built: true, soaker_ring_tree_base: false,
  };
  return m[t];
}

export function pressureRegulated(t: SoakerHoseType): boolean {
  const m: Record<SoakerHoseType, boolean> = {
    flat_weeping_tape: false, round_porous_rubber: false, recycled_tire_rubber: false, drip_line_emitter_built: true, soaker_ring_tree_base: true,
  };
  return m[t];
}

export function wallConstruction(t: SoakerHoseType): string {
  const m: Record<SoakerHoseType, string> = {
    flat_weeping_tape: "laser_perforated_poly",
    round_porous_rubber: "porous_rubber_seep",
    recycled_tire_rubber: "ground_tire_crumb",
    drip_line_emitter_built: "inline_emitter_molded",
    soaker_ring_tree_base: "formed_ring_drip_port",
  };
  return m[t];
}

export function bestGarden(t: SoakerHoseType): string {
  const m: Record<SoakerHoseType, string> = {
    flat_weeping_tape: "veggie_row_annual",
    round_porous_rubber: "flower_bed_perennial",
    recycled_tire_rubber: "eco_garden_budget",
    drip_line_emitter_built: "precision_orchard_drip",
    soaker_ring_tree_base: "fruit_tree_deep_water",
  };
  return m[t];
}

export function soakerHoses(): SoakerHoseType[] {
  return ["flat_weeping_tape", "round_porous_rubber", "recycled_tire_rubber", "drip_line_emitter_built", "soaker_ring_tree_base"];
}

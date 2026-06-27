export type CoilToolType = "extruder_wall_mount" | "slab_roller_coil" | "hand_roll_table" | "coil_cutter_wire" | "scoring_fork_join";

export function coilUniform(t: CoilToolType): number {
  const m: Record<CoilToolType, number> = {
    extruder_wall_mount: 10, slab_roller_coil: 8, hand_roll_table: 5, coil_cutter_wire: 7, scoring_fork_join: 3,
  };
  return m[t];
}

export function speedOutput(t: CoilToolType): number {
  const m: Record<CoilToolType, number> = {
    extruder_wall_mount: 10, slab_roller_coil: 8, hand_roll_table: 4, coil_cutter_wire: 6, scoring_fork_join: 3,
  };
  return m[t];
}

export function sizeRange(t: CoilToolType): number {
  const m: Record<CoilToolType, number> = {
    extruder_wall_mount: 9, slab_roller_coil: 7, hand_roll_table: 10, coil_cutter_wire: 6, scoring_fork_join: 4,
  };
  return m[t];
}

export function portability(t: CoilToolType): number {
  const m: Record<CoilToolType, number> = {
    extruder_wall_mount: 2, slab_roller_coil: 3, hand_roll_table: 10, coil_cutter_wire: 9, scoring_fork_join: 10,
  };
  return m[t];
}

export function toolCost(t: CoilToolType): number {
  const m: Record<CoilToolType, number> = {
    extruder_wall_mount: 4, slab_roller_coil: 3, hand_roll_table: 1, coil_cutter_wire: 1, scoring_fork_join: 1,
  };
  return m[t];
}

export function motorized(t: CoilToolType): boolean {
  const m: Record<CoilToolType, boolean> = {
    extruder_wall_mount: false, slab_roller_coil: false, hand_roll_table: false, coil_cutter_wire: false, scoring_fork_join: false,
  };
  return m[t];
}

export function forJoining(t: CoilToolType): boolean {
  const m: Record<CoilToolType, boolean> = {
    extruder_wall_mount: false, slab_roller_coil: false, hand_roll_table: false, coil_cutter_wire: false, scoring_fork_join: true,
  };
  return m[t];
}

export function toolMaterial(t: CoilToolType): string {
  const m: Record<CoilToolType, string> = {
    extruder_wall_mount: "steel_barrel_die",
    slab_roller_coil: "canvas_roller_frame",
    hand_roll_table: "wood_canvas_surface",
    coil_cutter_wire: "wire_handle_gauge",
    scoring_fork_join: "metal_tine_fork",
  };
  return m[t];
}

export function bestTask(t: CoilToolType): string {
  const m: Record<CoilToolType, string> = {
    extruder_wall_mount: "production_coil_batch",
    slab_roller_coil: "flat_slab_even",
    hand_roll_table: "organic_shape_free",
    coil_cutter_wire: "cut_even_lengths",
    scoring_fork_join: "slip_score_attach",
  };
  return m[t];
}

export function coilTools(): CoilToolType[] {
  return ["extruder_wall_mount", "slab_roller_coil", "hand_roll_table", "coil_cutter_wire", "scoring_fork_join"];
}

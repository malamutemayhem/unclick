export type RodentControl = "snap_trap" | "electronic_trap" | "glue_board" | "bait_station" | "exclusion_seal";

export function captureRate(r: RodentControl): number {
  const m: Record<RodentControl, number> = {
    snap_trap: 8, electronic_trap: 9, glue_board: 5, bait_station: 7, exclusion_seal: 0,
  };
  return m[r];
}

export function humaneness(r: RodentControl): number {
  const m: Record<RodentControl, number> = {
    snap_trap: 7, electronic_trap: 9, glue_board: 1, bait_station: 3, exclusion_seal: 10,
  };
  return m[r];
}

export function safetyAroundPets(r: RodentControl): number {
  const m: Record<RodentControl, number> = {
    snap_trap: 4, electronic_trap: 6, glue_board: 3, bait_station: 8, exclusion_seal: 10,
  };
  return m[r];
}

export function reusability(r: RodentControl): number {
  const m: Record<RodentControl, number> = {
    snap_trap: 8, electronic_trap: 10, glue_board: 1, bait_station: 9, exclusion_seal: 10,
  };
  return m[r];
}

export function unitCost(r: RodentControl): number {
  const m: Record<RodentControl, number> = {
    snap_trap: 2, electronic_trap: 7, glue_board: 1, bait_station: 5, exclusion_seal: 8,
  };
  return m[r];
}

export function requiresChemical(r: RodentControl): boolean {
  const m: Record<RodentControl, boolean> = {
    snap_trap: false, electronic_trap: false, glue_board: false, bait_station: true, exclusion_seal: false,
  };
  return m[r];
}

export function preventative(r: RodentControl): boolean {
  const m: Record<RodentControl, boolean> = {
    snap_trap: false, electronic_trap: false, glue_board: false, bait_station: false, exclusion_seal: true,
  };
  return m[r];
}

export function mechanism(r: RodentControl): string {
  const m: Record<RodentControl, string> = {
    snap_trap: "spring_loaded_bar_strike", electronic_trap: "high_voltage_shock_plate",
    glue_board: "adhesive_surface_immobilize", bait_station: "tamper_resistant_rodenticide",
    exclusion_seal: "copper_mesh_caulk_barrier",
  };
  return m[r];
}

export function bestScenario(r: RodentControl): string {
  const m: Record<RodentControl, string> = {
    snap_trap: "kitchen_attic_single_rodent", electronic_trap: "ongoing_monitoring_cleanup",
    glue_board: "monitoring_detection_only", bait_station: "heavy_infestation_outdoor",
    exclusion_seal: "prevention_entry_point_seal",
  };
  return m[r];
}

export function rodentControls(): RodentControl[] {
  return ["snap_trap", "electronic_trap", "glue_board", "bait_station", "exclusion_seal"];
}

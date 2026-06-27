export type BathPillowType = "suction_cup_foam" | "inflatable_vinyl_air" | "mesh_quick_dry_open" | "memory_foam_contour" | "full_body_tub_mat";

export function neckSupport(t: BathPillowType): number {
  const m: Record<BathPillowType, number> = {
    suction_cup_foam: 7, inflatable_vinyl_air: 6, mesh_quick_dry_open: 5, memory_foam_contour: 10, full_body_tub_mat: 8,
  };
  return m[t];
}

export function comfortLevel(t: BathPillowType): number {
  const m: Record<BathPillowType, number> = {
    suction_cup_foam: 7, inflatable_vinyl_air: 5, mesh_quick_dry_open: 6, memory_foam_contour: 10, full_body_tub_mat: 9,
  };
  return m[t];
}

export function drySpeed(t: BathPillowType): number {
  const m: Record<BathPillowType, number> = {
    suction_cup_foam: 5, inflatable_vinyl_air: 9, mesh_quick_dry_open: 10, memory_foam_contour: 3, full_body_tub_mat: 4,
  };
  return m[t];
}

export function gripStick(t: BathPillowType): number {
  const m: Record<BathPillowType, number> = {
    suction_cup_foam: 9, inflatable_vinyl_air: 6, mesh_quick_dry_open: 7, memory_foam_contour: 8, full_body_tub_mat: 10,
  };
  return m[t];
}

export function pillowCost(t: BathPillowType): number {
  const m: Record<BathPillowType, number> = {
    suction_cup_foam: 2, inflatable_vinyl_air: 1, mesh_quick_dry_open: 2, memory_foam_contour: 4, full_body_tub_mat: 4,
  };
  return m[t];
}

export function machineWash(t: BathPillowType): boolean {
  const m: Record<BathPillowType, boolean> = {
    suction_cup_foam: false, inflatable_vinyl_air: false, mesh_quick_dry_open: true, memory_foam_contour: false, full_body_tub_mat: true,
  };
  return m[t];
}

export function travelFriendly(t: BathPillowType): boolean {
  const m: Record<BathPillowType, boolean> = {
    suction_cup_foam: false, inflatable_vinyl_air: true, mesh_quick_dry_open: false, memory_foam_contour: false, full_body_tub_mat: false,
  };
  return m[t];
}

export function fillMaterial(t: BathPillowType): string {
  const m: Record<BathPillowType, string> = {
    suction_cup_foam: "pu_foam_waterproof",
    inflatable_vinyl_air: "pvc_air_chamber",
    mesh_quick_dry_open: "3d_mesh_open_cell",
    memory_foam_contour: "viscoelastic_foam_gel",
    full_body_tub_mat: "quilted_foam_cushion",
  };
  return m[t];
}

export function bestBath(t: BathPillowType): string {
  const m: Record<BathPillowType, string> = {
    suction_cup_foam: "quick_soak_standard",
    inflatable_vinyl_air: "hotel_travel_portable",
    mesh_quick_dry_open: "humid_bathroom_mold",
    memory_foam_contour: "luxury_long_soak",
    full_body_tub_mat: "spa_day_full_relax",
  };
  return m[t];
}

export function bathPillows(): BathPillowType[] {
  return ["suction_cup_foam", "inflatable_vinyl_air", "mesh_quick_dry_open", "memory_foam_contour", "full_body_tub_mat"];
}

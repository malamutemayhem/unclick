export type FoamRollerType = "smooth_epe" | "textured_grid" | "vibrating_electric" | "travel_collapsible" | "firm_pvc_core";

export function muscleRelease(t: FoamRollerType): number {
  const m: Record<FoamRollerType, number> = {
    smooth_epe: 5, textured_grid: 8, vibrating_electric: 10, travel_collapsible: 4, firm_pvc_core: 9,
  };
  return m[t];
}

export function comfortLevel(t: FoamRollerType): number {
  const m: Record<FoamRollerType, number> = {
    smooth_epe: 10, textured_grid: 6, vibrating_electric: 7, travel_collapsible: 8, firm_pvc_core: 3,
  };
  return m[t];
}

export function durability(t: FoamRollerType): number {
  const m: Record<FoamRollerType, number> = {
    smooth_epe: 4, textured_grid: 8, vibrating_electric: 7, travel_collapsible: 5, firm_pvc_core: 10,
  };
  return m[t];
}

export function portability(t: FoamRollerType): number {
  const m: Record<FoamRollerType, number> = {
    smooth_epe: 5, textured_grid: 5, vibrating_electric: 4, travel_collapsible: 10, firm_pvc_core: 3,
  };
  return m[t];
}

export function rollerCost(t: FoamRollerType): number {
  const m: Record<FoamRollerType, number> = {
    smooth_epe: 1, textured_grid: 3, vibrating_electric: 9, travel_collapsible: 5, firm_pvc_core: 2,
  };
  return m[t];
}

export function waterResistant(t: FoamRollerType): boolean {
  const m: Record<FoamRollerType, boolean> = {
    smooth_epe: false, textured_grid: true, vibrating_electric: false, travel_collapsible: false, firm_pvc_core: true,
  };
  return m[t];
}

export function hasVibration(t: FoamRollerType): boolean {
  const m: Record<FoamRollerType, boolean> = {
    smooth_epe: false, textured_grid: false, vibrating_electric: true, travel_collapsible: false, firm_pvc_core: false,
  };
  return m[t];
}

export function surfaceType(t: FoamRollerType): string {
  const m: Record<FoamRollerType, string> = {
    smooth_epe: "closed_cell_foam_smooth",
    textured_grid: "multi_zone_ridge_grid",
    vibrating_electric: "rechargeable_motor_foam",
    travel_collapsible: "folding_segment_hinge",
    firm_pvc_core: "high_density_solid_core",
  };
  return m[t];
}

export function bestUse(t: FoamRollerType): string {
  const m: Record<FoamRollerType, string> = {
    smooth_epe: "beginner_gentle_recovery",
    textured_grid: "deep_tissue_trigger_point",
    vibrating_electric: "pre_workout_activation",
    travel_collapsible: "gym_bag_hotel_room",
    firm_pvc_core: "it_band_heavy_pressure",
  };
  return m[t];
}

export function foamRollers(): FoamRollerType[] {
  return ["smooth_epe", "textured_grid", "vibrating_electric", "travel_collapsible", "firm_pvc_core"];
}

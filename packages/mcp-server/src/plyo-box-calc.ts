export type PlyoBoxType = "foam_soft_3_in_1" | "wood_solid_single" | "steel_adjustable" | "stackable_riser" | "inflatable_air";

export function heightRange(t: PlyoBoxType): number {
  const m: Record<PlyoBoxType, number> = {
    foam_soft_3_in_1: 8, wood_solid_single: 4, steel_adjustable: 10, stackable_riser: 7, inflatable_air: 3,
  };
  return m[t];
}

export function surfaceGrip(t: PlyoBoxType): number {
  const m: Record<PlyoBoxType, number> = {
    foam_soft_3_in_1: 9, wood_solid_single: 6, steel_adjustable: 8, stackable_riser: 7, inflatable_air: 5,
  };
  return m[t];
}

export function shinSafety(t: PlyoBoxType): number {
  const m: Record<PlyoBoxType, number> = {
    foam_soft_3_in_1: 10, wood_solid_single: 2, steel_adjustable: 4, stackable_riser: 6, inflatable_air: 9,
  };
  return m[t];
}

export function stability(t: PlyoBoxType): number {
  const m: Record<PlyoBoxType, number> = {
    foam_soft_3_in_1: 7, wood_solid_single: 10, steel_adjustable: 9, stackable_riser: 6, inflatable_air: 3,
  };
  return m[t];
}

export function boxCost(t: PlyoBoxType): number {
  const m: Record<PlyoBoxType, number> = {
    foam_soft_3_in_1: 5, wood_solid_single: 3, steel_adjustable: 8, stackable_riser: 4, inflatable_air: 2,
  };
  return m[t];
}

export function multiHeight(t: PlyoBoxType): boolean {
  const m: Record<PlyoBoxType, boolean> = {
    foam_soft_3_in_1: true, wood_solid_single: false, steel_adjustable: true, stackable_riser: true, inflatable_air: false,
  };
  return m[t];
}

export function shockAbsorb(t: PlyoBoxType): boolean {
  const m: Record<PlyoBoxType, boolean> = {
    foam_soft_3_in_1: true, wood_solid_single: false, steel_adjustable: false, stackable_riser: false, inflatable_air: true,
  };
  return m[t];
}

export function coreMaterial(t: PlyoBoxType): string {
  const m: Record<PlyoBoxType, string> = {
    foam_soft_3_in_1: "high_density_foam_vinyl",
    wood_solid_single: "birch_plywood_box",
    steel_adjustable: "powder_coated_steel_frame",
    stackable_riser: "abs_plastic_interlocking",
    inflatable_air: "pvc_bladder_air_fill",
  };
  return m[t];
}

export function bestUser(t: PlyoBoxType): string {
  const m: Record<PlyoBoxType, string> = {
    foam_soft_3_in_1: "crossfit_beginner_safe",
    wood_solid_single: "garage_gym_heavy_use",
    steel_adjustable: "commercial_gym_versatile",
    stackable_riser: "home_step_aerobics",
    inflatable_air: "travel_portable_workout",
  };
  return m[t];
}

export function plyoBoxes(): PlyoBoxType[] {
  return ["foam_soft_3_in_1", "wood_solid_single", "steel_adjustable", "stackable_riser", "inflatable_air"];
}

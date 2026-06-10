export type PestControl = "chemical" | "biological" | "mechanical" | "cultural" | "integrated";

export function effectiveness(p: PestControl): number {
  const m: Record<PestControl, number> = {
    chemical: 9, biological: 6, mechanical: 5, cultural: 4, integrated: 8,
  };
  return m[p];
}

export function environmentalImpact(p: PestControl): number {
  const m: Record<PestControl, number> = {
    chemical: 9, biological: 2, mechanical: 3, cultural: 1, integrated: 4,
  };
  return m[p];
}

export function costPerHectare(p: PestControl): number {
  const m: Record<PestControl, number> = {
    chemical: 7, biological: 6, mechanical: 5, cultural: 2, integrated: 8,
  };
  return m[p];
}

export function resistanceRisk(p: PestControl): number {
  const m: Record<PestControl, number> = {
    chemical: 9, biological: 3, mechanical: 1, cultural: 1, integrated: 3,
  };
  return m[p];
}

export function speedOfAction(p: PestControl): number {
  const m: Record<PestControl, number> = {
    chemical: 10, biological: 4, mechanical: 7, cultural: 2, integrated: 6,
  };
  return m[p];
}

export function organicApproved(p: PestControl): boolean {
  const m: Record<PestControl, boolean> = {
    chemical: false, biological: true, mechanical: true, cultural: true, integrated: false,
  };
  return m[p];
}

export function requiresExpertise(p: PestControl): boolean {
  const m: Record<PestControl, boolean> = {
    chemical: true, biological: true, mechanical: false, cultural: false, integrated: true,
  };
  return m[p];
}

export function exampleMethod(p: PestControl): string {
  const m: Record<PestControl, string> = {
    chemical: "insecticide_spray", biological: "ladybug_release",
    mechanical: "row_covers_traps", cultural: "crop_rotation_timing",
    integrated: "scouting_threshold_combo",
  };
  return m[p];
}

export function targetPest(p: PestControl): string {
  const m: Record<PestControl, string> = {
    chemical: "broad_spectrum", biological: "specific_pest",
    mechanical: "large_insects_weeds", cultural: "soil_pathogens",
    integrated: "multiple_pest_complex",
  };
  return m[p];
}

export function pestControls(): PestControl[] {
  return ["chemical", "biological", "mechanical", "cultural", "integrated"];
}

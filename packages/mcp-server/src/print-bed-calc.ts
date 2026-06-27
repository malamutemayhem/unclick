export type PrintBed = "glass_plate" | "pei_spring_steel" | "buildtak_surface" | "magnetic_flex" | "heated_aluminum";

export function adhesion(p: PrintBed): number {
  const m: Record<PrintBed, number> = {
    glass_plate: 6, pei_spring_steel: 9, buildtak_surface: 8, magnetic_flex: 7, heated_aluminum: 5,
  };
  return m[p];
}

export function surfaceFlatness(p: PrintBed): number {
  const m: Record<PrintBed, number> = {
    glass_plate: 10, pei_spring_steel: 7, buildtak_surface: 6, magnetic_flex: 8, heated_aluminum: 9,
  };
  return m[p];
}

export function partRemoval(p: PrintBed): number {
  const m: Record<PrintBed, number> = {
    glass_plate: 5, pei_spring_steel: 9, buildtak_surface: 7, magnetic_flex: 10, heated_aluminum: 4,
  };
  return m[p];
}

export function durabilityRating(p: PrintBed): number {
  const m: Record<PrintBed, number> = {
    glass_plate: 8, pei_spring_steel: 7, buildtak_surface: 4, magnetic_flex: 6, heated_aluminum: 10,
  };
  return m[p];
}

export function bedCost(p: PrintBed): number {
  const m: Record<PrintBed, number> = {
    glass_plate: 3, pei_spring_steel: 6, buildtak_surface: 4, magnetic_flex: 5, heated_aluminum: 7,
  };
  return m[p];
}

export function needsAdhesive(p: PrintBed): boolean {
  const m: Record<PrintBed, boolean> = {
    glass_plate: true, pei_spring_steel: false, buildtak_surface: false, magnetic_flex: false, heated_aluminum: true,
  };
  return m[p];
}

export function removable(p: PrintBed): boolean {
  const m: Record<PrintBed, boolean> = {
    glass_plate: true, pei_spring_steel: true, buildtak_surface: false, magnetic_flex: true, heated_aluminum: false,
  };
  return m[p];
}

export function surfaceFinish(p: PrintBed): string {
  const m: Record<PrintBed, string> = {
    glass_plate: "smooth_glossy_mirror_bottom", pei_spring_steel: "textured_powder_coat_pei",
    buildtak_surface: "rough_polymer_sheet_bonded", magnetic_flex: "smooth_pei_magnetic_snap",
    heated_aluminum: "anodized_machined_flat_plate",
  };
  return m[p];
}

export function bestFilament(p: PrintBed): string {
  const m: Record<PrintBed, string> = {
    glass_plate: "pla_petg_glass_bottom", pei_spring_steel: "abs_petg_nylon_versatile",
    buildtak_surface: "pla_abs_general_purpose", magnetic_flex: "pla_petg_easy_removal",
    heated_aluminum: "abs_nylon_high_temp",
  };
  return m[p];
}

export function printBeds(): PrintBed[] {
  return ["glass_plate", "pei_spring_steel", "buildtak_surface", "magnetic_flex", "heated_aluminum"];
}

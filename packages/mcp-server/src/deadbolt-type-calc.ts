export type DeadboltType = "single_cylinder" | "double_cylinder" | "keyless" | "smart" | "jimmy_proof";

export function securityLevel(d: DeadboltType): number {
  const m: Record<DeadboltType, number> = {
    single_cylinder: 6, double_cylinder: 8, keyless: 7, smart: 7, jimmy_proof: 9,
  };
  return m[d];
}

export function convenienceScore(d: DeadboltType): number {
  const m: Record<DeadboltType, number> = {
    single_cylinder: 8, double_cylinder: 4, keyless: 9, smart: 10, jimmy_proof: 5,
  };
  return m[d];
}

export function installDifficulty(d: DeadboltType): number {
  const m: Record<DeadboltType, number> = {
    single_cylinder: 4, double_cylinder: 5, keyless: 3, smart: 6, jimmy_proof: 7,
  };
  return m[d];
}

export function fireEgressSafety(d: DeadboltType): number {
  const m: Record<DeadboltType, number> = {
    single_cylinder: 9, double_cylinder: 3, keyless: 8, smart: 8, jimmy_proof: 7,
  };
  return m[d];
}

export function pricePoint(d: DeadboltType): number {
  const m: Record<DeadboltType, number> = {
    single_cylinder: 3, double_cylinder: 4, keyless: 6, smart: 9, jimmy_proof: 5,
  };
  return m[d];
}

export function requiresBattery(d: DeadboltType): boolean {
  const m: Record<DeadboltType, boolean> = {
    single_cylinder: false, double_cylinder: false, keyless: true, smart: true, jimmy_proof: false,
  };
  return m[d];
}

export function remoteAccess(d: DeadboltType): boolean {
  const m: Record<DeadboltType, boolean> = {
    single_cylinder: false, double_cylinder: false, keyless: false, smart: true, jimmy_proof: false,
  };
  return m[d];
}

export function bestUseCase(d: DeadboltType): string {
  const m: Record<DeadboltType, string> = {
    single_cylinder: "standard_residential", double_cylinder: "glass_panel_doors",
    keyless: "rental_property", smart: "home_automation",
    jimmy_proof: "apartment_surface_mount",
  };
  return m[d];
}

export function gradeRating(d: DeadboltType): string {
  const m: Record<DeadboltType, string> = {
    single_cylinder: "ansi_grade_1_to_3", double_cylinder: "ansi_grade_1_to_2",
    keyless: "ansi_grade_2_to_3", smart: "ansi_grade_2",
    jimmy_proof: "commercial_grade",
  };
  return m[d];
}

export function deadboltTypes(): DeadboltType[] {
  return ["single_cylinder", "double_cylinder", "keyless", "smart", "jimmy_proof"];
}

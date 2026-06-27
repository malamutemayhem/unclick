export type MortarType = "type_m" | "type_s" | "type_n" | "type_o" | "type_k";

export function compressiveStrengthPsi(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 2500, type_s: 1800, type_n: 750, type_o: 350, type_k: 75,
  };
  return m[mortar];
}

export function flexuralStrength(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 8, type_s: 10, type_n: 6, type_o: 3, type_k: 1,
  };
  return m[mortar];
}

export function workability(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 4, type_s: 5, type_n: 8, type_o: 10, type_k: 10,
  };
  return m[mortar];
}

export function waterRetention(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 6, type_s: 7, type_n: 8, type_o: 9, type_k: 10,
  };
  return m[mortar];
}

export function cureTimeDays(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 28, type_s: 28, type_n: 21, type_o: 14, type_k: 7,
  };
  return m[mortar];
}

export function loadBearing(mortar: MortarType): boolean {
  const m: Record<MortarType, boolean> = {
    type_m: true, type_s: true, type_n: true, type_o: false, type_k: false,
  };
  return m[mortar];
}

export function belowGrade(mortar: MortarType): boolean {
  const m: Record<MortarType, boolean> = {
    type_m: true, type_s: true, type_n: false, type_o: false, type_k: false,
  };
  return m[mortar];
}

export function bestApplication(mortar: MortarType): string {
  const m: Record<MortarType, string> = {
    type_m: "foundation", type_s: "structural_wall", type_n: "exterior_wall",
    type_o: "interior_non_load", type_k: "tuckpointing",
  };
  return m[mortar];
}

export function costPerBag(mortar: MortarType): number {
  const m: Record<MortarType, number> = {
    type_m: 12, type_s: 11, type_n: 9, type_o: 8, type_k: 7,
  };
  return m[mortar];
}

export function mortarTypes(): MortarType[] {
  return ["type_m", "type_s", "type_n", "type_o", "type_k"];
}

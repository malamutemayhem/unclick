export type BloodstainPattern = "passive_drop" | "impact_spatter" | "cast_off" | "transfer" | "void";

export function velocityIndicator(b: BloodstainPattern): number {
  const m: Record<BloodstainPattern, number> = {
    passive_drop: 2, impact_spatter: 9, cast_off: 7, transfer: 3, void: 1,
  };
  return m[b];
}

export function interpretationDifficulty(b: BloodstainPattern): number {
  const m: Record<BloodstainPattern, number> = {
    passive_drop: 3, impact_spatter: 8, cast_off: 7, transfer: 5, void: 9,
  };
  return m[b];
}

export function sceneReconstructionValue(b: BloodstainPattern): number {
  const m: Record<BloodstainPattern, number> = {
    passive_drop: 5, impact_spatter: 10, cast_off: 8, transfer: 7, void: 9,
  };
  return m[b];
}

export function dropletSize(b: BloodstainPattern): number {
  const m: Record<BloodstainPattern, number> = {
    passive_drop: 8, impact_spatter: 3, cast_off: 5, transfer: 7, void: 0,
  };
  return m[b];
}

export function directionalInfo(b: BloodstainPattern): number {
  const m: Record<BloodstainPattern, number> = {
    passive_drop: 3, impact_spatter: 9, cast_off: 10, transfer: 4, void: 2,
  };
  return m[b];
}

export function requiresExpertWitness(b: BloodstainPattern): boolean {
  const m: Record<BloodstainPattern, boolean> = {
    passive_drop: false, impact_spatter: true, cast_off: true, transfer: false, void: true,
  };
  return m[b];
}

export function indicatesMovement(b: BloodstainPattern): boolean {
  const m: Record<BloodstainPattern, boolean> = {
    passive_drop: false, impact_spatter: false, cast_off: true, transfer: true, void: false,
  };
  return m[b];
}

export function mechanism(b: BloodstainPattern): string {
  const m: Record<BloodstainPattern, string> = {
    passive_drop: "gravity_drip", impact_spatter: "force_applied",
    cast_off: "swinging_object", transfer: "contact_surface",
    void: "object_blocking",
  };
  return m[b];
}

export function typicalShape(b: BloodstainPattern): string {
  const m: Record<BloodstainPattern, string> = {
    passive_drop: "round_circular", impact_spatter: "radial_satellite",
    cast_off: "linear_arc", transfer: "smear_swipe",
    void: "absence_pattern",
  };
  return m[b];
}

export function bloodstainPatterns(): BloodstainPattern[] {
  return ["passive_drop", "impact_spatter", "cast_off", "transfer", "void"];
}

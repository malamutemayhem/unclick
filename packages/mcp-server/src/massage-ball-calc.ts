export type MassageBallType = "lacrosse_solid_rubber" | "peanut_double_spine" | "spiky_trigger_point" | "vibrating_motor_deep" | "cork_natural_firm";

export function pressureDepth(t: MassageBallType): number {
  const m: Record<MassageBallType, number> = {
    lacrosse_solid_rubber: 9, peanut_double_spine: 8, spiky_trigger_point: 7, vibrating_motor_deep: 10, cork_natural_firm: 8,
  };
  return m[t];
}

export function targetPrecision(t: MassageBallType): number {
  const m: Record<MassageBallType, number> = {
    lacrosse_solid_rubber: 9, peanut_double_spine: 7, spiky_trigger_point: 8, vibrating_motor_deep: 7, cork_natural_firm: 8,
  };
  return m[t];
}

export function painTolerance(t: MassageBallType): number {
  const m: Record<MassageBallType, number> = {
    lacrosse_solid_rubber: 5, peanut_double_spine: 6, spiky_trigger_point: 4, vibrating_motor_deep: 7, cork_natural_firm: 6,
  };
  return m[t];
}

export function portability(t: MassageBallType): number {
  const m: Record<MassageBallType, number> = {
    lacrosse_solid_rubber: 10, peanut_double_spine: 7, spiky_trigger_point: 9, vibrating_motor_deep: 6, cork_natural_firm: 9,
  };
  return m[t];
}

export function ballCost(t: MassageBallType): number {
  const m: Record<MassageBallType, number> = {
    lacrosse_solid_rubber: 1, peanut_double_spine: 1, spiky_trigger_point: 1, vibrating_motor_deep: 3, cork_natural_firm: 2,
  };
  return m[t];
}

export function needsBattery(t: MassageBallType): boolean {
  const m: Record<MassageBallType, boolean> = {
    lacrosse_solid_rubber: false, peanut_double_spine: false, spiky_trigger_point: false, vibrating_motor_deep: true, cork_natural_firm: false,
  };
  return m[t];
}

export function ecoFriendly(t: MassageBallType): boolean {
  const m: Record<MassageBallType, boolean> = {
    lacrosse_solid_rubber: false, peanut_double_spine: false, spiky_trigger_point: false, vibrating_motor_deep: false, cork_natural_firm: true,
  };
  return m[t];
}

export function surfaceTexture(t: MassageBallType): string {
  const m: Record<MassageBallType, string> = {
    lacrosse_solid_rubber: "smooth_dense_rubber",
    peanut_double_spine: "smooth_dual_sphere",
    spiky_trigger_point: "nub_studded_tpe",
    vibrating_motor_deep: "silicone_ridged_soft",
    cork_natural_firm: "natural_cork_grain",
  };
  return m[t];
}

export function bestArea(t: MassageBallType): string {
  const m: Record<MassageBallType, string> = {
    lacrosse_solid_rubber: "glute_piriformis_release",
    peanut_double_spine: "thoracic_spine_roll",
    spiky_trigger_point: "plantar_fascia_foot",
    vibrating_motor_deep: "it_band_deep_tissue",
    cork_natural_firm: "shoulder_trap_knot",
  };
  return m[t];
}

export function massageBalls(): MassageBallType[] {
  return ["lacrosse_solid_rubber", "peanut_double_spine", "spiky_trigger_point", "vibrating_motor_deep", "cork_natural_firm"];
}

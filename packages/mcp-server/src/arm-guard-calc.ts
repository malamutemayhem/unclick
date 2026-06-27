export type ArmGuardType = "leather_traditional_long" | "plastic_vented_short" | "fabric_elastic_sleeve" | "carbon_fiber_pro" | "medieval_bracer_style";

export function protection(t: ArmGuardType): number {
  const m: Record<ArmGuardType, number> = {
    leather_traditional_long: 9, plastic_vented_short: 7, fabric_elastic_sleeve: 5, carbon_fiber_pro: 10, medieval_bracer_style: 8,
  };
  return m[t];
}

export function comfort(t: ArmGuardType): number {
  const m: Record<ArmGuardType, number> = {
    leather_traditional_long: 6, plastic_vented_short: 8, fabric_elastic_sleeve: 10, carbon_fiber_pro: 7, medieval_bracer_style: 5,
  };
  return m[t];
}

export function breathability(t: ArmGuardType): number {
  const m: Record<ArmGuardType, number> = {
    leather_traditional_long: 4, plastic_vented_short: 9, fabric_elastic_sleeve: 10, carbon_fiber_pro: 6, medieval_bracer_style: 3,
  };
  return m[t];
}

export function stayInPlace(t: ArmGuardType): number {
  const m: Record<ArmGuardType, number> = {
    leather_traditional_long: 8, plastic_vented_short: 7, fabric_elastic_sleeve: 9, carbon_fiber_pro: 8, medieval_bracer_style: 7,
  };
  return m[t];
}

export function guardCost(t: ArmGuardType): number {
  const m: Record<ArmGuardType, number> = {
    leather_traditional_long: 6, plastic_vented_short: 3, fabric_elastic_sleeve: 4, carbon_fiber_pro: 9, medieval_bracer_style: 7,
  };
  return m[t];
}

export function adjustable(t: ArmGuardType): boolean {
  const m: Record<ArmGuardType, boolean> = {
    leather_traditional_long: true, plastic_vented_short: true, fabric_elastic_sleeve: false, carbon_fiber_pro: true, medieval_bracer_style: true,
  };
  return m[t];
}

export function fullForearm(t: ArmGuardType): boolean {
  const m: Record<ArmGuardType, boolean> = {
    leather_traditional_long: true, plastic_vented_short: false, fabric_elastic_sleeve: true, carbon_fiber_pro: false, medieval_bracer_style: true,
  };
  return m[t];
}

export function guardMaterial(t: ArmGuardType): string {
  const m: Record<ArmGuardType, string> = {
    leather_traditional_long: "full_grain_cowhide",
    plastic_vented_short: "injection_molded_abs",
    fabric_elastic_sleeve: "nylon_spandex_blend",
    carbon_fiber_pro: "carbon_fiber_laminate",
    medieval_bracer_style: "tooled_leather_brass",
  };
  return m[t];
}

export function bestArcher(t: ArmGuardType): string {
  const m: Record<ArmGuardType, string> = {
    leather_traditional_long: "traditional_longbow",
    plastic_vented_short: "compound_target_quick",
    fabric_elastic_sleeve: "beginner_youth_comfort",
    carbon_fiber_pro: "olympic_competitive",
    medieval_bracer_style: "historical_reenactment",
  };
  return m[t];
}

export function armGuards(): ArmGuardType[] {
  return ["leather_traditional_long", "plastic_vented_short", "fabric_elastic_sleeve", "carbon_fiber_pro", "medieval_bracer_style"];
}

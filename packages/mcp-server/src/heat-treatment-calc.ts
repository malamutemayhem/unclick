export type HeatTreatment = "annealing" | "quenching" | "tempering" | "normalizing" | "case_hardening";

export function hardnessIncrease(h: HeatTreatment): number {
  const m: Record<HeatTreatment, number> = {
    annealing: 0, quenching: 10, tempering: 6, normalizing: 3, case_hardening: 9,
  };
  return m[h];
}

export function ductilityEffect(h: HeatTreatment): number {
  const m: Record<HeatTreatment, number> = {
    annealing: 10, quenching: 1, tempering: 7, normalizing: 8, case_hardening: 4,
  };
  return m[h];
}

export function processTemperatureC(h: HeatTreatment): number {
  const m: Record<HeatTreatment, number> = {
    annealing: 800, quenching: 900, tempering: 400, normalizing: 850, case_hardening: 950,
  };
  return m[h];
}

export function coolingRate(h: HeatTreatment): number {
  const m: Record<HeatTreatment, number> = {
    annealing: 1, quenching: 10, tempering: 3, normalizing: 5, case_hardening: 8,
  };
  return m[h];
}

export function costScore(h: HeatTreatment): number {
  const m: Record<HeatTreatment, number> = {
    annealing: 3, quenching: 5, tempering: 4, normalizing: 2, case_hardening: 8,
  };
  return m[h];
}

export function throughHardening(h: HeatTreatment): boolean {
  const m: Record<HeatTreatment, boolean> = {
    annealing: false, quenching: true, tempering: true, normalizing: false, case_hardening: false,
  };
  return m[h];
}

export function requiresQuenchant(h: HeatTreatment): boolean {
  const m: Record<HeatTreatment, boolean> = {
    annealing: false, quenching: true, tempering: false, normalizing: false, case_hardening: true,
  };
  return m[h];
}

export function primaryPurpose(h: HeatTreatment): string {
  const m: Record<HeatTreatment, string> = {
    annealing: "stress_relief", quenching: "maximize_hardness",
    tempering: "reduce_brittleness", normalizing: "refine_grain",
    case_hardening: "hard_surface_tough_core",
  };
  return m[h];
}

export function typicalSteel(h: HeatTreatment): string {
  const m: Record<HeatTreatment, string> = {
    annealing: "low_carbon", quenching: "medium_carbon",
    tempering: "tool_steel", normalizing: "structural_steel",
    case_hardening: "low_carbon_alloy",
  };
  return m[h];
}

export function heatTreatments(): HeatTreatment[] {
  return ["annealing", "quenching", "tempering", "normalizing", "case_hardening"];
}

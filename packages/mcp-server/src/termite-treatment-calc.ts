export type TermiteTreatment = "liquid_barrier" | "bait_system" | "fumigation" | "heat_treatment" | "borate_wood";

export function colonyElimination(t: TermiteTreatment): number {
  const m: Record<TermiteTreatment, number> = {
    liquid_barrier: 6, bait_system: 10, fumigation: 8, heat_treatment: 5, borate_wood: 3,
  };
  return m[t];
}

export function protectionDuration(t: TermiteTreatment): number {
  const m: Record<TermiteTreatment, number> = {
    liquid_barrier: 8, bait_system: 10, fumigation: 2, heat_treatment: 3, borate_wood: 9,
  };
  return m[t];
}

export function disruption(t: TermiteTreatment): number {
  const m: Record<TermiteTreatment, number> = {
    liquid_barrier: 5, bait_system: 1, fumigation: 10, heat_treatment: 7, borate_wood: 4,
  };
  return m[t];
}

export function chemicalExposure(t: TermiteTreatment): number {
  const m: Record<TermiteTreatment, number> = {
    liquid_barrier: 7, bait_system: 2, fumigation: 10, heat_treatment: 1, borate_wood: 4,
  };
  return m[t];
}

export function treatmentCost(t: TermiteTreatment): number {
  const m: Record<TermiteTreatment, number> = {
    liquid_barrier: 6, bait_system: 8, fumigation: 10, heat_treatment: 7, borate_wood: 4,
  };
  return m[t];
}

export function requiresEvacuation(t: TermiteTreatment): boolean {
  const m: Record<TermiteTreatment, boolean> = {
    liquid_barrier: false, bait_system: false, fumigation: true, heat_treatment: true, borate_wood: false,
  };
  return m[t];
}

export function preventative(t: TermiteTreatment): boolean {
  const m: Record<TermiteTreatment, boolean> = {
    liquid_barrier: true, bait_system: true, fumigation: false, heat_treatment: false, borate_wood: true,
  };
  return m[t];
}

export function activeAgent(t: TermiteTreatment): string {
  const m: Record<TermiteTreatment, string> = {
    liquid_barrier: "fipronil_imidacloprid_soil", bait_system: "hexaflumuron_noviflumuron_station",
    fumigation: "sulfuryl_fluoride_tent", heat_treatment: "forced_hot_air_lethal_temp",
    borate_wood: "disodium_octaborate_spray",
  };
  return m[t];
}

export function bestScenario(t: TermiteTreatment): string {
  const m: Record<TermiteTreatment, string> = {
    liquid_barrier: "new_construction_perimeter", bait_system: "active_colony_monitoring",
    fumigation: "drywood_whole_structure", heat_treatment: "localized_spot_chemical_free",
    borate_wood: "preconstruction_wood_treatment",
  };
  return m[t];
}

export function termiteTreatments(): TermiteTreatment[] {
  return ["liquid_barrier", "bait_system", "fumigation", "heat_treatment", "borate_wood"];
}

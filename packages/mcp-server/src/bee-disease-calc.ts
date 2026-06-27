export type BeeDisease = "varroa" | "american_foulbrood" | "nosema" | "chalkbrood" | "deformed_wing";

export function colonyImpact(d: BeeDisease): number {
  const m: Record<BeeDisease, number> = {
    varroa: 10, american_foulbrood: 10, nosema: 7, chalkbrood: 5, deformed_wing: 8,
  };
  return m[d];
}

export function spreadRate(d: BeeDisease): number {
  const m: Record<BeeDisease, number> = {
    varroa: 9, american_foulbrood: 8, nosema: 7, chalkbrood: 5, deformed_wing: 6,
  };
  return m[d];
}

export function treatmentDifficulty(d: BeeDisease): number {
  const m: Record<BeeDisease, number> = {
    varroa: 8, american_foulbrood: 10, nosema: 5, chalkbrood: 3, deformed_wing: 9,
  };
  return m[d];
}

export function detectionEase(d: BeeDisease): number {
  const m: Record<BeeDisease, number> = {
    varroa: 7, american_foulbrood: 8, nosema: 3, chalkbrood: 9, deformed_wing: 8,
  };
  return m[d];
}

export function economicLoss(d: BeeDisease): number {
  const m: Record<BeeDisease, number> = {
    varroa: 10, american_foulbrood: 9, nosema: 6, chalkbrood: 4, deformed_wing: 7,
  };
  return m[d];
}

export function notifiableDisease(d: BeeDisease): boolean {
  const m: Record<BeeDisease, boolean> = {
    varroa: true, american_foulbrood: true, nosema: false, chalkbrood: false, deformed_wing: false,
  };
  return m[d];
}

export function chemicalTreatmentAvailable(d: BeeDisease): boolean {
  const m: Record<BeeDisease, boolean> = {
    varroa: true, american_foulbrood: false, nosema: true, chalkbrood: false, deformed_wing: false,
  };
  return m[d];
}

export function causativeAgent(d: BeeDisease): string {
  const m: Record<BeeDisease, string> = {
    varroa: "varroa_destructor_mite", american_foulbrood: "paenibacillus_larvae",
    nosema: "nosema_ceranae_apis", chalkbrood: "ascosphaera_apis_fungus",
    deformed_wing: "deformed_wing_virus",
  };
  return m[d];
}

export function primaryControl(d: BeeDisease): string {
  const m: Record<BeeDisease, string> = {
    varroa: "miticide_oxalic_acid", american_foulbrood: "burn_infected_equipment",
    nosema: "fumagillin_hygiene", chalkbrood: "requeen_ventilation",
    deformed_wing: "varroa_control_indirect",
  };
  return m[d];
}

export function beeDiseases(): BeeDisease[] {
  return ["varroa", "american_foulbrood", "nosema", "chalkbrood", "deformed_wing"];
}

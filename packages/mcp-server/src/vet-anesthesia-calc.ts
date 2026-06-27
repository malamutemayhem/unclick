export type VetAnesthesia = "injectable" | "inhalant" | "local_block" | "epidural" | "total_iv";

export function anestheticDepth(v: VetAnesthesia): number {
  const m: Record<VetAnesthesia, number> = {
    injectable: 7, inhalant: 10, local_block: 3, epidural: 6, total_iv: 9,
  };
  return m[v];
}

export function controlPrecision(v: VetAnesthesia): number {
  const m: Record<VetAnesthesia, number> = {
    injectable: 4, inhalant: 10, local_block: 5, epidural: 7, total_iv: 9,
  };
  return m[v];
}

export function recoverySpeed(v: VetAnesthesia): number {
  const m: Record<VetAnesthesia, number> = {
    injectable: 4, inhalant: 8, local_block: 10, epidural: 7, total_iv: 6,
  };
  return m[v];
}

export function monitoringComplexity(v: VetAnesthesia): number {
  const m: Record<VetAnesthesia, number> = {
    injectable: 5, inhalant: 9, local_block: 2, epidural: 6, total_iv: 8,
  };
  return m[v];
}

export function drugCost(v: VetAnesthesia): number {
  const m: Record<VetAnesthesia, number> = {
    injectable: 3, inhalant: 7, local_block: 2, epidural: 5, total_iv: 8,
  };
  return m[v];
}

export function requiresIntubation(v: VetAnesthesia): boolean {
  const m: Record<VetAnesthesia, boolean> = {
    injectable: false, inhalant: true, local_block: false, epidural: false, total_iv: true,
  };
  return m[v];
}

export function suitableForFieldUse(v: VetAnesthesia): boolean {
  const m: Record<VetAnesthesia, boolean> = {
    injectable: true, inhalant: false, local_block: true, epidural: true, total_iv: false,
  };
  return m[v];
}

export function deliveryRoute(v: VetAnesthesia): string {
  const m: Record<VetAnesthesia, string> = {
    injectable: "intramuscular_intravenous_bolus", inhalant: "endotracheal_tube_vaporizer",
    local_block: "perineural_infiltration", epidural: "spinal_canal_catheter",
    total_iv: "continuous_iv_infusion_pump",
  };
  return m[v];
}

export function bestProcedure(v: VetAnesthesia): string {
  const m: Record<VetAnesthesia, string> = {
    injectable: "short_procedure_sedation", inhalant: "major_surgery_long_duration",
    local_block: "wound_repair_dental", epidural: "hindlimb_perineal_surgery",
    total_iv: "ophthalmic_neuro_procedure",
  };
  return m[v];
}

export function vetAnesthesias(): VetAnesthesia[] {
  return ["injectable", "inhalant", "local_block", "epidural", "total_iv"];
}

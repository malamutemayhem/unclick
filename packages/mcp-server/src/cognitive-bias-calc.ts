export type CognitiveBias = "confirmation" | "anchoring" | "availability" | "dunning_kruger" | "sunk_cost";

export function prevalence(b: CognitiveBias): number {
  const m: Record<CognitiveBias, number> = {
    confirmation: 10, anchoring: 8, availability: 9, dunning_kruger: 7, sunk_cost: 8,
  };
  return m[b];
}

export function decisionImpact(b: CognitiveBias): number {
  const m: Record<CognitiveBias, number> = {
    confirmation: 9, anchoring: 8, availability: 7, dunning_kruger: 6, sunk_cost: 10,
  };
  return m[b];
}

export function awarenessLevel(b: CognitiveBias): number {
  const m: Record<CognitiveBias, number> = {
    confirmation: 6, anchoring: 4, availability: 5, dunning_kruger: 3, sunk_cost: 7,
  };
  return m[b];
}

export function correctionDifficulty(b: CognitiveBias): number {
  const m: Record<CognitiveBias, number> = {
    confirmation: 9, anchoring: 7, availability: 6, dunning_kruger: 10, sunk_cost: 8,
  };
  return m[b];
}

export function financialRisk(b: CognitiveBias): number {
  const m: Record<CognitiveBias, number> = {
    confirmation: 7, anchoring: 9, availability: 5, dunning_kruger: 6, sunk_cost: 10,
  };
  return m[b];
}

export function affectsGroups(b: CognitiveBias): boolean {
  const m: Record<CognitiveBias, boolean> = {
    confirmation: true, anchoring: true, availability: true, dunning_kruger: false, sunk_cost: true,
  };
  return m[b];
}

export function emotionallyDriven(b: CognitiveBias): boolean {
  const m: Record<CognitiveBias, boolean> = {
    confirmation: true, anchoring: false, availability: true, dunning_kruger: false, sunk_cost: true,
  };
  return m[b];
}

export function category(b: CognitiveBias): string {
  const m: Record<CognitiveBias, string> = {
    confirmation: "belief_perseverance", anchoring: "judgment_heuristic",
    availability: "memory_heuristic", dunning_kruger: "self_assessment",
    sunk_cost: "loss_aversion",
  };
  return m[b];
}

export function debiasStrategy(b: CognitiveBias): string {
  const m: Record<CognitiveBias, string> = {
    confirmation: "seek_disconfirming", anchoring: "consider_alternatives",
    availability: "use_base_rates", dunning_kruger: "seek_feedback",
    sunk_cost: "evaluate_future_only",
  };
  return m[b];
}

export function cognitiveBiases(): CognitiveBias[] {
  return ["confirmation", "anchoring", "availability", "dunning_kruger", "sunk_cost"];
}

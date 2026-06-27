export type EthicalFramework = "utilitarianism" | "deontology" | "virtue_ethics" | "care_ethics" | "contractualism";

export function practicalApplicability(e: EthicalFramework): number {
  const m: Record<EthicalFramework, number> = {
    utilitarianism: 9, deontology: 6, virtue_ethics: 5, care_ethics: 7, contractualism: 8,
  };
  return m[e];
}

export function moralClarityScore(e: EthicalFramework): number {
  const m: Record<EthicalFramework, number> = {
    utilitarianism: 7, deontology: 10, virtue_ethics: 4, care_ethics: 5, contractualism: 8,
  };
  return m[e];
}

export function contextSensitivity(e: EthicalFramework): number {
  const m: Record<EthicalFramework, number> = {
    utilitarianism: 4, deontology: 2, virtue_ethics: 9, care_ethics: 10, contractualism: 6,
  };
  return m[e];
}

export function historicalInfluence(e: EthicalFramework): number {
  const m: Record<EthicalFramework, number> = {
    utilitarianism: 9, deontology: 10, virtue_ethics: 10, care_ethics: 5, contractualism: 7,
  };
  return m[e];
}

export function policyRelevance(e: EthicalFramework): number {
  const m: Record<EthicalFramework, number> = {
    utilitarianism: 10, deontology: 7, virtue_ethics: 4, care_ethics: 6, contractualism: 9,
  };
  return m[e];
}

export function consequenceBased(e: EthicalFramework): boolean {
  const m: Record<EthicalFramework, boolean> = {
    utilitarianism: true, deontology: false, virtue_ethics: false, care_ethics: false, contractualism: false,
  };
  return m[e];
}

export function focusesOnCharacter(e: EthicalFramework): boolean {
  const m: Record<EthicalFramework, boolean> = {
    utilitarianism: false, deontology: false, virtue_ethics: true, care_ethics: false, contractualism: false,
  };
  return m[e];
}

export function keyPhilosopher(e: EthicalFramework): string {
  const m: Record<EthicalFramework, string> = {
    utilitarianism: "mill", deontology: "kant", virtue_ethics: "aristotle",
    care_ethics: "gilligan", contractualism: "rawls",
  };
  return m[e];
}

export function centralPrinciple(e: EthicalFramework): string {
  const m: Record<EthicalFramework, string> = {
    utilitarianism: "greatest_happiness", deontology: "categorical_imperative",
    virtue_ethics: "golden_mean", care_ethics: "relational_responsibility",
    contractualism: "veil_of_ignorance",
  };
  return m[e];
}

export function ethicalFrameworks(): EthicalFramework[] {
  return ["utilitarianism", "deontology", "virtue_ethics", "care_ethics", "contractualism"];
}

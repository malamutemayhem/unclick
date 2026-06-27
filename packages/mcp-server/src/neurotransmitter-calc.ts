export type NeurotransmitterType = "dopamine" | "serotonin" | "gaba" | "glutamate" | "acetylcholine";

export function reuptakeSpeed(n: NeurotransmitterType): number {
  const m: Record<NeurotransmitterType, number> = {
    dopamine: 8, serotonin: 6, gaba: 9, glutamate: 10, acetylcholine: 7,
  };
  return m[n];
}

export function moodInfluence(n: NeurotransmitterType): number {
  const m: Record<NeurotransmitterType, number> = {
    dopamine: 9, serotonin: 10, gaba: 6, glutamate: 3, acetylcholine: 4,
  };
  return m[n];
}

export function concentrationInBrain(n: NeurotransmitterType): number {
  const m: Record<NeurotransmitterType, number> = {
    dopamine: 5, serotonin: 4, gaba: 9, glutamate: 10, acetylcholine: 6,
  };
  return m[n];
}

export function synapseDuration(n: NeurotransmitterType): number {
  const m: Record<NeurotransmitterType, number> = {
    dopamine: 7, serotonin: 8, gaba: 4, glutamate: 3, acetylcholine: 5,
  };
  return m[n];
}

export function addictionPotential(n: NeurotransmitterType): number {
  const m: Record<NeurotransmitterType, number> = {
    dopamine: 10, serotonin: 3, gaba: 6, glutamate: 2, acetylcholine: 1,
  };
  return m[n];
}

export function excitatory(n: NeurotransmitterType): boolean {
  const m: Record<NeurotransmitterType, boolean> = {
    dopamine: true, serotonin: true, gaba: false, glutamate: true, acetylcholine: true,
  };
  return m[n];
}

export function aminoAcidDerived(n: NeurotransmitterType): boolean {
  const m: Record<NeurotransmitterType, boolean> = {
    dopamine: true, serotonin: true, gaba: true, glutamate: true, acetylcholine: false,
  };
  return m[n];
}

export function primaryRole(n: NeurotransmitterType): string {
  const m: Record<NeurotransmitterType, string> = {
    dopamine: "reward", serotonin: "mood_regulation",
    gaba: "inhibition", glutamate: "excitation", acetylcholine: "muscle_activation",
  };
  return m[n];
}

export function deficiencyDisorder(n: NeurotransmitterType): string {
  const m: Record<NeurotransmitterType, string> = {
    dopamine: "parkinsons", serotonin: "depression",
    gaba: "anxiety", glutamate: "epilepsy", acetylcholine: "alzheimers",
  };
  return m[n];
}

export function neurotransmitterTypes(): NeurotransmitterType[] {
  return ["dopamine", "serotonin", "gaba", "glutamate", "acetylcholine"];
}

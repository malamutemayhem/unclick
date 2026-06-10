export type NeuronType = "motor" | "sensory" | "interneuron" | "pyramidal" | "purkinje";

export function firingRateHz(n: NeuronType): number {
  const m: Record<NeuronType, number> = {
    motor: 30, sensory: 50, interneuron: 80, pyramidal: 20, purkinje: 40,
  };
  return m[n];
}

export function axonLengthCm(n: NeuronType): number {
  const m: Record<NeuronType, number> = {
    motor: 100, sensory: 80, interneuron: 5, pyramidal: 15, purkinje: 3,
  };
  return m[n];
}

export function dendriteBranching(n: NeuronType): number {
  const m: Record<NeuronType, number> = {
    motor: 5, sensory: 4, interneuron: 7, pyramidal: 8, purkinje: 10,
  };
  return m[n];
}

export function myelinationLevel(n: NeuronType): number {
  const m: Record<NeuronType, number> = {
    motor: 9, sensory: 8, interneuron: 4, pyramidal: 7, purkinje: 6,
  };
  return m[n];
}

export function signalSpeedMs(n: NeuronType): number {
  const m: Record<NeuronType, number> = {
    motor: 120, sensory: 100, interneuron: 30, pyramidal: 60, purkinje: 50,
  };
  return m[n];
}

export function myelinated(n: NeuronType): boolean {
  const m: Record<NeuronType, boolean> = {
    motor: true, sensory: true, interneuron: false, pyramidal: true, purkinje: true,
  };
  return m[n];
}

export function localCircuit(n: NeuronType): boolean {
  const m: Record<NeuronType, boolean> = {
    motor: false, sensory: false, interneuron: true, pyramidal: false, purkinje: false,
  };
  return m[n];
}

export function primaryLocation(n: NeuronType): string {
  const m: Record<NeuronType, string> = {
    motor: "spinal_cord", sensory: "dorsal_root_ganglia", interneuron: "cortex",
    pyramidal: "hippocampus", purkinje: "cerebellum",
  };
  return m[n];
}

export function neurotransmitterUsed(n: NeuronType): string {
  const m: Record<NeuronType, string> = {
    motor: "acetylcholine", sensory: "glutamate", interneuron: "gaba",
    pyramidal: "glutamate", purkinje: "gaba",
  };
  return m[n];
}

export function neuronTypes(): NeuronType[] {
  return ["motor", "sensory", "interneuron", "pyramidal", "purkinje"];
}

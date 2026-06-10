export type BlackHoleType = "stellar" | "intermediate" | "supermassive" | "primordial" | "micro";

export function massSolarMultiple(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 10, intermediate: 1000, supermassive: 1e9, primordial: 1e-5, micro: 1e-20,
  };
  return m[bh];
}

export function eventHorizonKm(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 30, intermediate: 3000, supermassive: 3e9, primordial: 1e-10, micro: 1e-25,
  };
  return m[bh];
}

export function hawkingRadiation(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 1, intermediate: 0, supermassive: 0, primordial: 8, micro: 10,
  };
  return m[bh];
}

export function tidalForce(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 10, intermediate: 7, supermassive: 1, primordial: 10, micro: 10,
  };
  return m[bh];
}

export function observationalEvidence(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 9, intermediate: 5, supermassive: 10, primordial: 1, micro: 0,
  };
  return m[bh];
}

export function confirmed(bh: BlackHoleType): boolean {
  const m: Record<BlackHoleType, boolean> = {
    stellar: true, intermediate: true, supermassive: true, primordial: false, micro: false,
  };
  return m[bh];
}

export function galacticCenter(bh: BlackHoleType): boolean {
  const m: Record<BlackHoleType, boolean> = {
    stellar: false, intermediate: false, supermassive: true, primordial: false, micro: false,
  };
  return m[bh];
}

export function formationMechanism(bh: BlackHoleType): string {
  const m: Record<BlackHoleType, string> = {
    stellar: "core_collapse", intermediate: "merger_chain",
    supermassive: "galactic_evolution", primordial: "big_bang", micro: "theoretical",
  };
  return m[bh];
}

export function lifetimeYears(bh: BlackHoleType): number {
  const m: Record<BlackHoleType, number> = {
    stellar: 1e67, intermediate: 1e70, supermassive: 1e100, primordial: 1e10, micro: 1e-25,
  };
  return m[bh];
}

export function blackHoleTypes(): BlackHoleType[] {
  return ["stellar", "intermediate", "supermassive", "primordial", "micro"];
}

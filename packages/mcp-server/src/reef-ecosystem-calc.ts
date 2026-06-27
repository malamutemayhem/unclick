export type ReefEcosystem = "barrier" | "fringing" | "atoll" | "patch" | "bank";

export function areaKm2(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 5000, fringing: 100, atoll: 2000, patch: 10, bank: 500,
  };
  return m[reef];
}

export function speciesCount(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 10000, fringing: 3000, atoll: 5000, patch: 500, bank: 2000,
  };
  return m[reef];
}

export function depthMeters(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 60, fringing: 15, atoll: 40, patch: 10, bank: 80,
  };
  return m[reef];
}

export function resilienceScore(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 6, fringing: 4, atoll: 5, patch: 3, bank: 7,
  };
  return m[reef];
}

export function tourismValue(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 10, fringing: 7, atoll: 9, patch: 3, bank: 4,
  };
  return m[reef];
}

export function enclosesLagoon(reef: ReefEcosystem): boolean {
  const m: Record<ReefEcosystem, boolean> = {
    barrier: true, fringing: false, atoll: true, patch: false, bank: false,
  };
  return m[reef];
}

export function attachedToShore(reef: ReefEcosystem): boolean {
  const m: Record<ReefEcosystem, boolean> = {
    barrier: false, fringing: true, atoll: false, patch: false, bank: false,
  };
  return m[reef];
}

export function exampleLocation(reef: ReefEcosystem): string {
  const m: Record<ReefEcosystem, string> = {
    barrier: "great_barrier_reef", fringing: "hawaii", atoll: "maldives",
    patch: "florida_keys", bank: "flower_garden",
  };
  return m[reef];
}

export function protectionLevel(reef: ReefEcosystem): number {
  const m: Record<ReefEcosystem, number> = {
    barrier: 8, fringing: 5, atoll: 7, patch: 3, bank: 6,
  };
  return m[reef];
}

export function reefEcosystems(): ReefEcosystem[] {
  return ["barrier", "fringing", "atoll", "patch", "bank"];
}

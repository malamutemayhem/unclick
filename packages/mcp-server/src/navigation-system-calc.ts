export type NavigationSystem = "gps" | "ins" | "vor" | "ils" | "rnav";

export function accuracyMeters(n: NavigationSystem): number {
  const m: Record<NavigationSystem, number> = {
    gps: 3, ins: 100, vor: 200, ils: 1, rnav: 5,
  };
  return m[n];
}

export function reliability(n: NavigationSystem): number {
  const m: Record<NavigationSystem, number> = {
    gps: 8, ins: 9, vor: 7, ils: 9, rnav: 8,
  };
  return m[n];
}

export function globalCoverage(n: NavigationSystem): number {
  const m: Record<NavigationSystem, number> = {
    gps: 10, ins: 10, vor: 4, ils: 2, rnav: 9,
  };
  return m[n];
}

export function equipmentCost(n: NavigationSystem): number {
  const m: Record<NavigationSystem, number> = {
    gps: 3, ins: 8, vor: 2, ils: 9, rnav: 5,
  };
  return m[n];
}

export function updateRate(n: NavigationSystem): number {
  const m: Record<NavigationSystem, number> = {
    gps: 8, ins: 10, vor: 3, ils: 9, rnav: 7,
  };
  return m[n];
}

export function requiresSatellite(n: NavigationSystem): boolean {
  const m: Record<NavigationSystem, boolean> = {
    gps: true, ins: false, vor: false, ils: false, rnav: true,
  };
  return m[n];
}

export function selfContained(n: NavigationSystem): boolean {
  const m: Record<NavigationSystem, boolean> = {
    gps: false, ins: true, vor: false, ils: false, rnav: false,
  };
  return m[n];
}

export function primaryUse(n: NavigationSystem): string {
  const m: Record<NavigationSystem, string> = {
    gps: "enroute_position", ins: "dead_reckoning",
    vor: "airway_navigation", ils: "precision_approach",
    rnav: "flexible_routing",
  };
  return m[n];
}

export function signalSource(n: NavigationSystem): string {
  const m: Record<NavigationSystem, string> = {
    gps: "satellite_constellation", ins: "internal_gyroscope",
    vor: "ground_station", ils: "runway_transmitter",
    rnav: "satellite_dme",
  };
  return m[n];
}

export function navigationSystems(): NavigationSystem[] {
  return ["gps", "ins", "vor", "ils", "rnav"];
}

export type WarpTensionSystem = "back_beam" | "weighted" | "friction_brake" | "sectional" | "warp_weighted";

export function tensionConsistency(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 7, weighted: 6, friction_brake: 8, sectional: 9, warp_weighted: 5,
  };
  return m[system];
}

export function setupTimeMinutes(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 30, weighted: 15, friction_brake: 25, sectional: 45, warp_weighted: 60,
  };
  return m[system];
}

export function adjustability(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 6, weighted: 8, friction_brake: 7, sectional: 5, warp_weighted: 4,
  };
  return m[system];
}

export function maxWarpLengthMeters(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 10, weighted: 3, friction_brake: 15, sectional: 30, warp_weighted: 2,
  };
  return m[system];
}

export function fineThreadSuitable(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 7, weighted: 5, friction_brake: 8, sectional: 9, warp_weighted: 4,
  };
  return m[system];
}

export function portability(system: WarpTensionSystem): boolean {
  const m: Record<WarpTensionSystem, boolean> = {
    back_beam: false, weighted: true, friction_brake: false, sectional: false, warp_weighted: true,
  };
  return m[system];
}

export function historicalSystem(system: WarpTensionSystem): boolean {
  const m: Record<WarpTensionSystem, boolean> = {
    back_beam: false, weighted: true, friction_brake: false, sectional: false, warp_weighted: true,
  };
  return m[system];
}

export function bestWeaveType(system: WarpTensionSystem): string {
  const m: Record<WarpTensionSystem, string> = {
    back_beam: "twill", weighted: "tapestry", friction_brake: "plain_weave",
    sectional: "complex_pattern", warp_weighted: "tabby",
  };
  return m[system];
}

export function costEstimate(system: WarpTensionSystem): number {
  const m: Record<WarpTensionSystem, number> = {
    back_beam: 200, weighted: 50, friction_brake: 300, sectional: 500, warp_weighted: 30,
  };
  return m[system];
}

export function warpTensionSystems(): WarpTensionSystem[] {
  return ["back_beam", "weighted", "friction_brake", "sectional", "warp_weighted"];
}

export type DuctShape = "round" | "rectangular" | "oval" | "spiral" | "flexible";

export function airflowEfficiency(d: DuctShape): number {
  const m: Record<DuctShape, number> = {
    round: 10, rectangular: 6, oval: 8, spiral: 9, flexible: 4,
  };
  return m[d];
}

export function spaceRequired(d: DuctShape): number {
  const m: Record<DuctShape, number> = {
    round: 7, rectangular: 5, oval: 4, spiral: 7, flexible: 3,
  };
  return m[d];
}

export function fabricationCost(d: DuctShape): number {
  const m: Record<DuctShape, number> = {
    round: 4, rectangular: 6, oval: 7, spiral: 3, flexible: 5,
  };
  return m[d];
}

export function noiseReduction(d: DuctShape): number {
  const m: Record<DuctShape, number> = {
    round: 8, rectangular: 5, oval: 7, spiral: 9, flexible: 6,
  };
  return m[d];
}

export function installationFlexibility(d: DuctShape): number {
  const m: Record<DuctShape, number> = {
    round: 5, rectangular: 6, oval: 7, spiral: 4, flexible: 10,
  };
  return m[d];
}

export function canFitLowCeilings(d: DuctShape): boolean {
  const m: Record<DuctShape, boolean> = {
    round: false, rectangular: true, oval: true, spiral: false, flexible: true,
  };
  return m[d];
}

export function factoryMade(d: DuctShape): boolean {
  const m: Record<DuctShape, boolean> = {
    round: true, rectangular: false, oval: true, spiral: true, flexible: true,
  };
  return m[d];
}

export function bestApplication(d: DuctShape): string {
  const m: Record<DuctShape, string> = {
    round: "commercial_industrial", rectangular: "office_buildings",
    oval: "retrofit_tight_spaces", spiral: "exposed_aesthetic",
    flexible: "short_runs_connections",
  };
  return m[d];
}

export function sealMethod(d: DuctShape): string {
  const m: Record<DuctShape, string> = {
    round: "snap_lock_gasket", rectangular: "flange_mastic",
    oval: "gasket_clamp", spiral: "self_sealing_lock",
    flexible: "clamp_tape",
  };
  return m[d];
}

export function ductShapes(): DuctShape[] {
  return ["round", "rectangular", "oval", "spiral", "flexible"];
}

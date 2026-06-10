export type SodComponent = "wall_sod" | "roof_sod" | "foundation" | "ridge_pole" | "door_frame";

export function thicknessCm(comp: SodComponent): number {
  const t: Record<SodComponent, number> = {
    wall_sod: 90, roof_sod: 30, foundation: 45, ridge_pole: 20, door_frame: 15,
  };
  return t[comp];
}

export function weightKgPerM2(comp: SodComponent): number {
  const w: Record<SodComponent, number> = {
    wall_sod: 1400, roof_sod: 500, foundation: 900, ridge_pole: 25, door_frame: 15,
  };
  return w[comp];
}

export function insulationRValue(comp: SodComponent): number {
  const r: Record<SodComponent, number> = {
    wall_sod: 3.0, roof_sod: 1.5, foundation: 2.0, ridge_pole: 0.2, door_frame: 0.5,
  };
  return r[comp];
}

export function moistureRisk(comp: SodComponent): number {
  const m: Record<SodComponent, number> = {
    wall_sod: 6, roof_sod: 9, foundation: 8, ridge_pole: 4, door_frame: 3,
  };
  return m[comp];
}

export function replacementCycleYears(comp: SodComponent): number {
  const r: Record<SodComponent, number> = {
    wall_sod: 20, roof_sod: 5, foundation: 30, ridge_pole: 15, door_frame: 10,
  };
  return r[comp];
}

export function installLaborHours(comp: SodComponent): number {
  const h: Record<SodComponent, number> = {
    wall_sod: 80, roof_sod: 40, foundation: 30, ridge_pole: 16, door_frame: 8,
  };
  return h[comp];
}

export function toolsRequired(comp: SodComponent): string {
  const t: Record<SodComponent, string> = {
    wall_sod: "breaking_plow", roof_sod: "spade", foundation: "shovel",
    ridge_pole: "axe", door_frame: "saw",
  };
  return t[comp];
}

export function settlingPercent(comp: SodComponent): number {
  const s: Record<SodComponent, number> = {
    wall_sod: 15, roof_sod: 10, foundation: 5, ridge_pole: 0, door_frame: 0,
  };
  return s[comp];
}

export function costEstimate(comp: SodComponent): number {
  const c: Record<SodComponent, number> = {
    wall_sod: 5, roof_sod: 8, foundation: 10, ridge_pole: 50, door_frame: 30,
  };
  return c[comp];
}

export function sodComponents(): SodComponent[] {
  return ["wall_sod", "roof_sod", "foundation", "ridge_pole", "door_frame"];
}

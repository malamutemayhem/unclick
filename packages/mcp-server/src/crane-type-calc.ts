export type CraneType = "tower" | "mobile" | "overhead" | "gantry" | "jib";

export function liftCapacity(c: CraneType): number {
  const m: Record<CraneType, number> = {
    tower: 9, mobile: 7, overhead: 8, gantry: 10, jib: 4,
  };
  return m[c];
}

export function reachRadius(c: CraneType): number {
  const m: Record<CraneType, number> = {
    tower: 10, mobile: 7, overhead: 6, gantry: 8, jib: 5,
  };
  return m[c];
}

export function mobilityScore(c: CraneType): number {
  const m: Record<CraneType, number> = {
    tower: 1, mobile: 10, overhead: 3, gantry: 2, jib: 4,
  };
  return m[c];
}

export function setupTime(c: CraneType): number {
  const m: Record<CraneType, number> = {
    tower: 10, mobile: 3, overhead: 7, gantry: 8, jib: 4,
  };
  return m[c];
}

export function operatorSkillLevel(c: CraneType): number {
  const m: Record<CraneType, number> = {
    tower: 9, mobile: 7, overhead: 6, gantry: 8, jib: 5,
  };
  return m[c];
}

export function requiresFoundation(c: CraneType): boolean {
  const m: Record<CraneType, boolean> = {
    tower: true, mobile: false, overhead: true, gantry: true, jib: true,
  };
  return m[c];
}

export function outdoorUse(c: CraneType): boolean {
  const m: Record<CraneType, boolean> = {
    tower: true, mobile: true, overhead: false, gantry: true, jib: true,
  };
  return m[c];
}

export function primaryIndustry(c: CraneType): string {
  const m: Record<CraneType, string> = {
    tower: "high_rise_construction", mobile: "general_construction",
    overhead: "factory_warehouse", gantry: "shipyard_container_port",
    jib: "workshop_loading_dock",
  };
  return m[c];
}

export function powerSource(c: CraneType): string {
  const m: Record<CraneType, string> = {
    tower: "electric_mains", mobile: "diesel_hydraulic",
    overhead: "electric_rail", gantry: "electric_diesel",
    jib: "electric_manual",
  };
  return m[c];
}

export function craneTypes(): CraneType[] {
  return ["tower", "mobile", "overhead", "gantry", "jib"];
}

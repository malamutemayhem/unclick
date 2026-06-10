export type SailType = "mainsail" | "genoa" | "spinnaker" | "jib" | "staysail";

export function windPowerCapture(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 8, genoa: 9, spinnaker: 10, jib: 6, staysail: 5,
  };
  return m[s];
}

export function pointingAbility(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 8, genoa: 9, spinnaker: 1, jib: 10, staysail: 7,
  };
  return m[s];
}

export function handlingDifficulty(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 5, genoa: 6, spinnaker: 10, jib: 3, staysail: 4,
  };
  return m[s];
}

export function lightWindPerformance(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 5, genoa: 8, spinnaker: 10, jib: 4, staysail: 3,
  };
  return m[s];
}

export function heavyWindSafety(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 6, genoa: 4, spinnaker: 1, jib: 8, staysail: 10,
  };
  return m[s];
}

export function downwindOnly(s: SailType): boolean {
  const m: Record<SailType, boolean> = {
    mainsail: false, genoa: false, spinnaker: true, jib: false, staysail: false,
  };
  return m[s];
}

export function headsail(s: SailType): boolean {
  const m: Record<SailType, boolean> = {
    mainsail: false, genoa: true, spinnaker: true, jib: true, staysail: true,
  };
  return m[s];
}

export function typicalAreaSqm(s: SailType): number {
  const m: Record<SailType, number> = {
    mainsail: 30, genoa: 40, spinnaker: 60, jib: 20, staysail: 15,
  };
  return m[s];
}

export function bestCondition(s: SailType): string {
  const m: Record<SailType, string> = {
    mainsail: "all_conditions", genoa: "light_upwind",
    spinnaker: "downwind_run", jib: "heavy_upwind", staysail: "storm",
  };
  return m[s];
}

export function sailTypes(): SailType[] {
  return ["mainsail", "genoa", "spinnaker", "jib", "staysail"];
}

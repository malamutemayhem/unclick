export type DamType = "gravity" | "arch" | "buttress" | "embankment" | "roller_compacted";

export function heightPotentialM(d: DamType): number {
  const m: Record<DamType, number> = {
    gravity: 200, arch: 300, buttress: 150, embankment: 250, roller_compacted: 180,
  };
  return m[d];
}

export function materialVolume(d: DamType): number {
  const m: Record<DamType, number> = {
    gravity: 9, arch: 3, buttress: 5, embankment: 10, roller_compacted: 7,
  };
  return m[d];
}

export function constructionSpeed(d: DamType): number {
  const m: Record<DamType, number> = {
    gravity: 4, arch: 3, buttress: 5, embankment: 6, roller_compacted: 9,
  };
  return m[d];
}

export function seismicResistance(d: DamType): number {
  const m: Record<DamType, number> = {
    gravity: 8, arch: 6, buttress: 5, embankment: 4, roller_compacted: 7,
  };
  return m[d];
}

export function costPerMegawatt(d: DamType): number {
  const m: Record<DamType, number> = {
    gravity: 6, arch: 8, buttress: 7, embankment: 4, roller_compacted: 3,
  };
  return m[d];
}

export function requiresNarrowValley(d: DamType): boolean {
  const m: Record<DamType, boolean> = {
    gravity: false, arch: true, buttress: false, embankment: false, roller_compacted: false,
  };
  return m[d];
}

export function usesEarthFill(d: DamType): boolean {
  const m: Record<DamType, boolean> = {
    gravity: false, arch: false, buttress: false, embankment: true, roller_compacted: false,
  };
  return m[d];
}

export function famousExample(d: DamType): string {
  const m: Record<DamType, string> = {
    gravity: "grand_coulee", arch: "hoover_dam",
    buttress: "daniel_johnson", embankment: "tarbela",
    roller_compacted: "upper_stillwater",
  };
  return m[d];
}

export function failureMode(d: DamType): string {
  const m: Record<DamType, string> = {
    gravity: "sliding_overturning", arch: "abutment_failure",
    buttress: "buttress_collapse", embankment: "piping_erosion",
    roller_compacted: "joint_seepage",
  };
  return m[d];
}

export function damTypes(): DamType[] {
  return ["gravity", "arch", "buttress", "embankment", "roller_compacted"];
}

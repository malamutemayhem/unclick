export type NeedleType = "universal" | "ballpoint" | "sharp" | "leather" | "twin";

export function penetrationForce(n: NeedleType): number {
  const m: Record<NeedleType, number> = {
    universal: 5, ballpoint: 3, sharp: 8, leather: 10, twin: 5,
  };
  return m[n];
}

export function fabricRange(n: NeedleType): number {
  const m: Record<NeedleType, number> = {
    universal: 9, ballpoint: 5, sharp: 6, leather: 3, twin: 4,
  };
  return m[n];
}

export function skipResistance(n: NeedleType): number {
  const m: Record<NeedleType, number> = {
    universal: 7, ballpoint: 10, sharp: 6, leather: 8, twin: 5,
  };
  return m[n];
}

export function precisionLevel(n: NeedleType): number {
  const m: Record<NeedleType, number> = {
    universal: 6, ballpoint: 5, sharp: 9, leather: 7, twin: 8,
  };
  return m[n];
}

export function durabilityHours(n: NeedleType): number {
  const m: Record<NeedleType, number> = {
    universal: 40, ballpoint: 35, sharp: 25, leather: 20, twin: 15,
  };
  return m[n];
}

export function preventsFabricDamage(n: NeedleType): boolean {
  const m: Record<NeedleType, boolean> = {
    universal: false, ballpoint: true, sharp: false, leather: false, twin: false,
  };
  return m[n];
}

export function specialtyUse(n: NeedleType): boolean {
  const m: Record<NeedleType, boolean> = {
    universal: false, ballpoint: false, sharp: false, leather: true, twin: true,
  };
  return m[n];
}

export function bestFabric(n: NeedleType): string {
  const m: Record<NeedleType, string> = {
    universal: "cotton_blend", ballpoint: "jersey_knit", sharp: "silk",
    leather: "hide", twin: "pintuck_fabric",
  };
  return m[n];
}

export function pointGeometry(n: NeedleType): string {
  const m: Record<NeedleType, string> = {
    universal: "slightly_rounded", ballpoint: "rounded", sharp: "acute",
    leather: "wedge", twin: "dual_point",
  };
  return m[n];
}

export function needleTypes(): NeedleType[] {
  return ["universal", "ballpoint", "sharp", "leather", "twin"];
}

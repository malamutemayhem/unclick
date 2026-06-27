export type ArchType = "semicircular" | "pointed" | "horseshoe" | "flat" | "ogee";

export function loadCapacity(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 8, pointed: 9, horseshoe: 6, flat: 4, ogee: 7,
  };
  return m[arch];
}

export function spanMeters(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 10, pointed: 15, horseshoe: 8, flat: 5, ogee: 12,
  };
  return m[arch];
}

export function heightToSpanRatio(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 0.5, pointed: 0.8, horseshoe: 0.6, flat: 0.1, ogee: 0.7,
  };
  return m[arch];
}

export function thrustDistribution(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 7, pointed: 9, horseshoe: 5, flat: 3, ogee: 8,
  };
  return m[arch];
}

export function buildDifficulty(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 5, pointed: 7, horseshoe: 8, flat: 3, ogee: 9,
  };
  return m[arch];
}

export function centering(arch: ArchType): boolean {
  const m: Record<ArchType, boolean> = {
    semicircular: true, pointed: true, horseshoe: true, flat: false, ogee: true,
  };
  return m[arch];
}

export function decorative(arch: ArchType): boolean {
  const m: Record<ArchType, boolean> = {
    semicircular: false, pointed: false, horseshoe: true, flat: false, ogee: true,
  };
  return m[arch];
}

export function bestEra(arch: ArchType): string {
  const m: Record<ArchType, string> = {
    semicircular: "romanesque", pointed: "gothic", horseshoe: "moorish",
    flat: "modern", ogee: "venetian_gothic",
  };
  return m[arch];
}

export function materialCost(arch: ArchType): number {
  const m: Record<ArchType, number> = {
    semicircular: 500, pointed: 600, horseshoe: 700, flat: 300, ogee: 800,
  };
  return m[arch];
}

export function archTypes(): ArchType[] {
  return ["semicircular", "pointed", "horseshoe", "flat", "ogee"];
}

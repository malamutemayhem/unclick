export type BoneType = "long" | "short" | "flat" | "irregular" | "sesamoid";

export function length(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 10, short: 3, flat: 5, irregular: 4, sesamoid: 1,
  };
  return m[b];
}

export function marrowProduction(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 10, short: 4, flat: 8, irregular: 5, sesamoid: 1,
  };
  return m[b];
}

export function loadBearing(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 9, short: 7, flat: 5, irregular: 6, sesamoid: 3,
  };
  return m[b];
}

export function protectiveFunction(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 3, short: 2, flat: 10, irregular: 8, sesamoid: 4,
  };
  return m[b];
}

export function fractureRecoveryWeeks(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 12, short: 6, flat: 8, irregular: 10, sesamoid: 6,
  };
  return m[b];
}

export function hasMedullaryCanal(b: BoneType): boolean {
  const m: Record<BoneType, boolean> = {
    long: true, short: false, flat: false, irregular: false, sesamoid: false,
  };
  return m[b];
}

export function embeddedInTendon(b: BoneType): boolean {
  const m: Record<BoneType, boolean> = {
    long: false, short: false, flat: false, irregular: false, sesamoid: true,
  };
  return m[b];
}

export function exampleBone(b: BoneType): string {
  const m: Record<BoneType, string> = {
    long: "femur", short: "carpal", flat: "scapula",
    irregular: "vertebra", sesamoid: "patella",
  };
  return m[b];
}

export function countInBody(b: BoneType): number {
  const m: Record<BoneType, number> = {
    long: 90, short: 32, flat: 28, irregular: 33, sesamoid: 8,
  };
  return m[b];
}

export function boneTypes(): BoneType[] {
  return ["long", "short", "flat", "irregular", "sesamoid"];
}

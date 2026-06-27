export type ShadufMaterial = "wood" | "bamboo" | "palm" | "metal" | "composite";

export function beamLengthMeters(material: ShadufMaterial): number {
  const l: Record<ShadufMaterial, number> = {
    wood: 5, bamboo: 4, palm: 3.5, metal: 6, composite: 5.5,
  };
  return l[material];
}

export function counterweightKg(material: ShadufMaterial): number {
  const w: Record<ShadufMaterial, number> = {
    wood: 25, bamboo: 15, palm: 12, metal: 40, composite: 30,
  };
  return w[material];
}

export function bucketCapacityLiters(material: ShadufMaterial): number {
  const c: Record<ShadufMaterial, number> = {
    wood: 20, bamboo: 12, palm: 10, metal: 30, composite: 25,
  };
  return c[material];
}

export function liftHeightMeters(material: ShadufMaterial): number {
  const h: Record<ShadufMaterial, number> = {
    wood: 3, bamboo: 2.5, palm: 2, metal: 4, composite: 3.5,
  };
  return h[material];
}

export function cyclesPerHour(material: ShadufMaterial): number {
  const c: Record<ShadufMaterial, number> = {
    wood: 30, bamboo: 35, palm: 25, metal: 20, composite: 28,
  };
  return c[material];
}

export function operatorRequired(material: ShadufMaterial): boolean {
  return true;
}

export function durabilityYears(material: ShadufMaterial): number {
  const d: Record<ShadufMaterial, number> = {
    wood: 10, bamboo: 5, palm: 4, metal: 25, composite: 15,
  };
  return d[material];
}

export function effortRating(material: ShadufMaterial): number {
  const e: Record<ShadufMaterial, number> = {
    wood: 4, bamboo: 3, palm: 5, metal: 6, composite: 3,
  };
  return e[material];
}

export function costEstimate(material: ShadufMaterial): number {
  const c: Record<ShadufMaterial, number> = {
    wood: 100, bamboo: 50, palm: 30, metal: 300, composite: 200,
  };
  return c[material];
}

export function shadufMaterials(): ShadufMaterial[] {
  return ["wood", "bamboo", "palm", "metal", "composite"];
}

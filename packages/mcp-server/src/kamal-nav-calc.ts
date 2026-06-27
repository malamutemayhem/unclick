export type KamalMaterial = "teak" | "bamboo" | "coconut_shell" | "bone" | "horn";

export function boardWidthCm(material: KamalMaterial): number {
  const w: Record<KamalMaterial, number> = {
    teak: 5, bamboo: 4, coconut_shell: 3, bone: 4.5, horn: 3.5,
  };
  return w[material];
}

export function stringLengthCm(material: KamalMaterial): number {
  const l: Record<KamalMaterial, number> = {
    teak: 35, bamboo: 30, coconut_shell: 25, bone: 32, horn: 28,
  };
  return l[material];
}

export function accuracyDegrees(material: KamalMaterial): number {
  const a: Record<KamalMaterial, number> = {
    teak: 0.5, bamboo: 1.0, coconut_shell: 1.5, bone: 0.7, horn: 0.8,
  };
  return a[material];
}

export function durabilityYears(material: KamalMaterial): number {
  const d: Record<KamalMaterial, number> = {
    teak: 20, bamboo: 5, coconut_shell: 3, bone: 15, horn: 12,
  };
  return d[material];
}

export function waterResistance(material: KamalMaterial): number {
  const w: Record<KamalMaterial, number> = {
    teak: 9, bamboo: 4, coconut_shell: 7, bone: 8, horn: 6,
  };
  return w[material];
}

export function knotMarkers(material: KamalMaterial): number {
  const k: Record<KamalMaterial, number> = {
    teak: 12, bamboo: 8, coconut_shell: 6, bone: 10, horn: 9,
  };
  return k[material];
}

export function nightUsable(material: KamalMaterial): boolean {
  return true;
}

export function craftTimeHours(material: KamalMaterial): number {
  const h: Record<KamalMaterial, number> = {
    teak: 4, bamboo: 2, coconut_shell: 3, bone: 6, horn: 5,
  };
  return h[material];
}

export function costEstimate(material: KamalMaterial): number {
  const c: Record<KamalMaterial, number> = {
    teak: 30, bamboo: 5, coconut_shell: 3, bone: 40, horn: 35,
  };
  return c[material];
}

export function kamalMaterials(): KamalMaterial[] {
  return ["teak", "bamboo", "coconut_shell", "bone", "horn"];
}

export type ThatchMaterial = "water_reed" | "long_straw" | "combed_wheat" | "palm_leaf" | "heather";

export function lifespanYears(material: ThatchMaterial): number {
  const y: Record<ThatchMaterial, number> = {
    water_reed: 40, long_straw: 20, combed_wheat: 30, palm_leaf: 15, heather: 25,
  };
  return y[material];
}

export function thicknessCm(material: ThatchMaterial): number {
  const t: Record<ThatchMaterial, number> = {
    water_reed: 30, long_straw: 35, combed_wheat: 30, palm_leaf: 20, heather: 25,
  };
  return t[material];
}

export function rValuePerCm(material: ThatchMaterial): number {
  const r: Record<ThatchMaterial, number> = {
    water_reed: 0.4, long_straw: 0.5, combed_wheat: 0.45, palm_leaf: 0.3, heather: 0.35,
  };
  return r[material];
}

export function fireResistance(material: ThatchMaterial): number {
  const f: Record<ThatchMaterial, number> = {
    water_reed: 3, long_straw: 2, combed_wheat: 3, palm_leaf: 1, heather: 4,
  };
  return f[material];
}

export function windResistance(material: ThatchMaterial): number {
  const w: Record<ThatchMaterial, number> = {
    water_reed: 8, long_straw: 5, combed_wheat: 7, palm_leaf: 6, heather: 9,
  };
  return w[material];
}

export function ridgeTypeRecommended(material: ThatchMaterial): string {
  const r: Record<ThatchMaterial, string> = {
    water_reed: "flush_ridge", long_straw: "wrap_over",
    combed_wheat: "flush_ridge", palm_leaf: "cap_ridge", heather: "turf_ridge",
  };
  return r[material];
}

export function installDaysPerSquare(material: ThatchMaterial): number {
  const d: Record<ThatchMaterial, number> = {
    water_reed: 4, long_straw: 3, combed_wheat: 5, palm_leaf: 2, heather: 6,
  };
  return d[material];
}

export function maintenanceCycleYears(material: ThatchMaterial): number {
  const m: Record<ThatchMaterial, number> = {
    water_reed: 10, long_straw: 5, combed_wheat: 8, palm_leaf: 3, heather: 7,
  };
  return m[material];
}

export function costPerM2(material: ThatchMaterial): number {
  const c: Record<ThatchMaterial, number> = {
    water_reed: 80, long_straw: 60, combed_wheat: 75, palm_leaf: 40, heather: 90,
  };
  return c[material];
}

export function thatchMaterials(): ThatchMaterial[] {
  return ["water_reed", "long_straw", "combed_wheat", "palm_leaf", "heather"];
}

export type FritMesh = "coarse" | "medium" | "fine" | "powder" | "ultra_fine";

export function particleSizeMm(mesh: FritMesh): number {
  const sizes: Record<FritMesh, number> = {
    coarse: 3.0, medium: 1.5, fine: 0.5, powder: 0.1, ultra_fine: 0.02,
  };
  return sizes[mesh];
}

export function meltingTempCelsius(mesh: FritMesh): number {
  const temps: Record<FritMesh, number> = {
    coarse: 850, medium: 820, fine: 790, powder: 760, ultra_fine: 740,
  };
  return temps[mesh];
}

export function firingTimeMinutes(mesh: FritMesh): number {
  const times: Record<FritMesh, number> = {
    coarse: 30, medium: 25, fine: 20, powder: 15, ultra_fine: 10,
  };
  return times[mesh];
}

export function applicationGPerM2(mesh: FritMesh): number {
  const rates: Record<FritMesh, number> = {
    coarse: 500, medium: 400, fine: 300, powder: 200, ultra_fine: 150,
  };
  return rates[mesh];
}

export function transparencyPercent(mesh: FritMesh): number {
  const trans: Record<FritMesh, number> = {
    coarse: 20, medium: 35, fine: 50, powder: 70, ultra_fine: 85,
  };
  return trans[mesh];
}

export function textureRating(mesh: FritMesh): number {
  const ratings: Record<FritMesh, number> = {
    coarse: 5, medium: 4, fine: 3, powder: 2, ultra_fine: 1,
  };
  return ratings[mesh];
}

export function compatibilityCoeff(): number {
  return 96;
}

export function washingRequired(mesh: FritMesh): boolean {
  return mesh === "coarse" || mesh === "medium";
}

export function costPerKg(mesh: FritMesh): number {
  const costs: Record<FritMesh, number> = {
    coarse: 15, medium: 18, fine: 25, powder: 35, ultra_fine: 50,
  };
  return costs[mesh];
}

export function fritMeshes(): FritMesh[] {
  return ["coarse", "medium", "fine", "powder", "ultra_fine"];
}

export type ShelfMaterial = "cordierite" | "mullite" | "silicon_carbide" | "nitride_bonded" | "alumina";

export function maxLoadKgPerM2(material: ShelfMaterial): number {
  const loads: Record<ShelfMaterial, number> = {
    cordierite: 50, mullite: 80, silicon_carbide: 120, nitride_bonded: 150, alumina: 60,
  };
  return loads[material];
}

export function maxTempCelsius(material: ShelfMaterial): number {
  const temps: Record<ShelfMaterial, number> = {
    cordierite: 1260, mullite: 1400, silicon_carbide: 1500, nitride_bonded: 1400, alumina: 1700,
  };
  return temps[material];
}

export function thicknessMm(material: ShelfMaterial): number {
  const thickness: Record<ShelfMaterial, number> = {
    cordierite: 16, mullite: 12, silicon_carbide: 10, nitride_bonded: 8, alumina: 15,
  };
  return thickness[material];
}

export function kilnWashCoats(): number {
  return 3;
}

export function postHeightCm(shelfSpacingCm: number, shelfThicknessMm: number): number {
  return parseFloat((shelfSpacingCm - shelfThicknessMm / 10).toFixed(1));
}

export function shelvesPerFiring(kilnHeightCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(kilnHeightCm / spacingCm);
}

export function warpResistance(material: ShelfMaterial): number {
  const ratings: Record<ShelfMaterial, number> = {
    cordierite: 2, mullite: 3, silicon_carbide: 5, nitride_bonded: 5, alumina: 4,
  };
  return ratings[material];
}

export function lifespanFirings(material: ShelfMaterial): number {
  const firings: Record<ShelfMaterial, number> = {
    cordierite: 50, mullite: 100, silicon_carbide: 300, nitride_bonded: 500, alumina: 80,
  };
  return firings[material];
}

export function costPerShelf(material: ShelfMaterial): number {
  const costs: Record<ShelfMaterial, number> = {
    cordierite: 30, mullite: 50, silicon_carbide: 80, nitride_bonded: 120, alumina: 45,
  };
  return costs[material];
}

export function shelfMaterials(): ShelfMaterial[] {
  return ["cordierite", "mullite", "silicon_carbide", "nitride_bonded", "alumina"];
}

export type CaulkingMaterial = "oakum" | "cotton" | "marine_sealant" | "tar_pitch" | "linseed_putty";

export function seamWidthMm(plankThicknessMm: number): number {
  return parseFloat((plankThicknessMm * 0.1 + 2).toFixed(1));
}

export function oakumWeightGPerM(seamWidthMm: number): number {
  return Math.round(seamWidthMm * 8);
}

export function caulkingIronWidthMm(seamWidthMm: number): number {
  return parseFloat((seamWidthMm * 0.8).toFixed(1));
}

export function malletWeightKg(): number {
  return 1.5;
}

export function payingCompoundLitersPerM(material: CaulkingMaterial): number {
  const liters: Record<CaulkingMaterial, number> = {
    oakum: 0, cotton: 0, marine_sealant: 0.05, tar_pitch: 0.08, linseed_putty: 0.06,
  };
  return liters[material];
}

export function waterResistanceRating(material: CaulkingMaterial): number {
  const ratings: Record<CaulkingMaterial, number> = {
    oakum: 4, cotton: 3, marine_sealant: 5, tar_pitch: 4, linseed_putty: 3,
  };
  return ratings[material];
}

export function lifespanYears(material: CaulkingMaterial): number {
  const years: Record<CaulkingMaterial, number> = {
    oakum: 10, cotton: 5, marine_sealant: 15, tar_pitch: 8, linseed_putty: 6,
  };
  return years[material];
}

export function applicationTimeMinPerM(material: CaulkingMaterial): number {
  const times: Record<CaulkingMaterial, number> = {
    oakum: 15, cotton: 10, marine_sealant: 5, tar_pitch: 8, linseed_putty: 7,
  };
  return times[material];
}

export function costPerM(material: CaulkingMaterial): number {
  const costs: Record<CaulkingMaterial, number> = {
    oakum: 8, cotton: 5, marine_sealant: 12, tar_pitch: 6, linseed_putty: 7,
  };
  return costs[material];
}

export function caulkingMaterials(): CaulkingMaterial[] {
  return ["oakum", "cotton", "marine_sealant", "tar_pitch", "linseed_putty"];
}

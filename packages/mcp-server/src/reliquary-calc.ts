export type RelicMaterial = "gold" | "silver" | "gilded_wood" | "crystal" | "enamel";

export function chamberVolumeCc(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat((lengthCm * widthCm * heightCm).toFixed(1));
}

export function glassThicknessMm(chamberVolume: number): number {
  if (chamberVolume < 100) return 2;
  if (chamberVolume < 500) return 3;
  return 5;
}

export function sealIntegrity(ageYears: number, material: RelicMaterial): number {
  const base: Record<RelicMaterial, number> = {
    gold: 100, silver: 90, gilded_wood: 70, crystal: 95, enamel: 85,
  };
  return parseFloat(Math.max(0, base[material] - ageYears * 0.5).toFixed(0));
}

export function goldLeafSheets(surfaceAreaCm2: number): number {
  return Math.ceil(surfaceAreaCm2 / 80);
}

export function gemstoneCount(perimeterCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(perimeterCm / spacingCm);
}

export function filigreeWireM(surfaceAreaCm2: number, densityLevel: number): number {
  return parseFloat((surfaceAreaCm2 * densityLevel * 0.05).toFixed(1));
}

export function enamelFiringTemp(material: RelicMaterial): number {
  const temps: Record<RelicMaterial, number> = {
    gold: 800, silver: 750, gilded_wood: 0, crystal: 0, enamel: 820,
  };
  return temps[material];
}

export function conservationInterval(material: RelicMaterial): number {
  const years: Record<RelicMaterial, number> = {
    gold: 50, silver: 10, gilded_wood: 5, crystal: 30, enamel: 15,
  };
  return years[material];
}

export function insuranceValue(material: RelicMaterial, ageYears: number): number {
  const base: Record<RelicMaterial, number> = {
    gold: 50000, silver: 20000, gilded_wood: 10000, crystal: 30000, enamel: 15000,
  };
  return parseFloat((base[material] * (1 + ageYears * 0.02)).toFixed(0));
}

export function relicMaterials(): RelicMaterial[] {
  return ["gold", "silver", "gilded_wood", "crystal", "enamel"];
}

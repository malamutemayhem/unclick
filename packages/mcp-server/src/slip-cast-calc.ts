export type MoldMaterial = "plaster" | "rubber" | "resin" | "fiberglass" | "silicone";

export function slipVolumeMl(moldVolumeMl: number, wallThicknessMm: number): number {
  const ratio = wallThicknessMm * 0.15;
  return parseFloat((moldVolumeMl * ratio).toFixed(1));
}

export function castingTimeMinutes(wallThicknessMm: number): number {
  return Math.round(wallThicknessMm * 8);
}

export function drainTimeMinutes(moldVolumeMl: number): number {
  return Math.round(moldVolumeMl * 0.01 + 5);
}

export function specificGravity(clayType: "earthenware" | "stoneware" | "porcelain"): number {
  const sg: Record<string, number> = { earthenware: 1.70, stoneware: 1.75, porcelain: 1.80 };
  return sg[clayType];
}

export function moldLifeCasts(material: MoldMaterial): number {
  const life: Record<MoldMaterial, number> = {
    plaster: 50, rubber: 200, resin: 100, fiberglass: 300, silicone: 500,
  };
  return life[material];
}

export function moldDryingHours(material: MoldMaterial): number {
  const hours: Record<MoldMaterial, number> = {
    plaster: 24, rubber: 4, resin: 2, fiberglass: 6, silicone: 8,
  };
  return hours[material];
}

export function deflocculantMlPerKg(clayType: "earthenware" | "stoneware" | "porcelain"): number {
  const ml: Record<string, number> = { earthenware: 3, stoneware: 4, porcelain: 5 };
  return ml[clayType];
}

export function shrinkagePercent(clayType: "earthenware" | "stoneware" | "porcelain"): number {
  const shrinkage: Record<string, number> = { earthenware: 7, stoneware: 10, porcelain: 14 };
  return shrinkage[clayType];
}

export function seamCleanupMinutes(partCount: number): number {
  return partCount * 5;
}

export function moldCost(material: MoldMaterial, baseCost: number): number {
  const mult: Record<MoldMaterial, number> = {
    plaster: 1.0, rubber: 3.0, resin: 2.0, fiberglass: 4.0, silicone: 5.0,
  };
  return parseFloat((baseCost * mult[material]).toFixed(2));
}

export function moldMaterials(): MoldMaterial[] {
  return ["plaster", "rubber", "resin", "fiberglass", "silicone"];
}

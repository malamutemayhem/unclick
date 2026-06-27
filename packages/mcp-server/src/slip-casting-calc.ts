export type MoldMaterial = "plaster" | "rubber" | "resin" | "press_mold" | "hump_mold";

export function wallThicknessMm(castingMinutes: number): number {
  return Math.round(castingMinutes * 0.4 * 10) / 10;
}

export function castingTimeMinutes(desiredThicknessMm: number): number {
  return Math.ceil(desiredThicknessMm / 0.4);
}

export function defloccGPerLiter(): number {
  return 3;
}

export function slipSpecificGravity(): number {
  return 1.75;
}

export function moldLifeCasts(material: MoldMaterial): number {
  const life: Record<MoldMaterial, number> = {
    plaster: 50, rubber: 500, resin: 200, press_mold: 100, hump_mold: 80,
  };
  return life[material];
}

export function dryingTimeBetweenCastsHours(material: MoldMaterial): number {
  const hours: Record<MoldMaterial, number> = {
    plaster: 4, rubber: 0.5, resin: 1, press_mold: 3, hump_mold: 3,
  };
  return hours[material];
}

export function detailResolution(material: MoldMaterial): number {
  const detail: Record<MoldMaterial, number> = {
    plaster: 4, rubber: 5, resin: 5, press_mold: 3, hump_mold: 2,
  };
  return detail[material];
}

export function undercutsAllowed(material: MoldMaterial): boolean {
  return material === "rubber";
}

export function costPerMold(material: MoldMaterial): number {
  const costs: Record<MoldMaterial, number> = {
    plaster: 10, rubber: 80, resin: 50, press_mold: 15, hump_mold: 8,
  };
  return costs[material];
}

export function moldMaterials(): MoldMaterial[] {
  return ["plaster", "rubber", "resin", "press_mold", "hump_mold"];
}

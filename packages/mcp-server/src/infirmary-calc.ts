export type InfirmaryWard = "general" | "isolation" | "convalescent" | "surgical" | "apothecary";

export function bedCount(monkCount: number): number {
  return Math.max(4, Math.ceil(monkCount * 0.15));
}

export function floorAreaM2(bedCount: number): number {
  return parseFloat((bedCount * 6 + 15).toFixed(1));
}

export function windowCountPerWard(bedCount: number): number {
  return Math.max(2, Math.ceil(bedCount / 2));
}

export function chapelAreaM2(floorAreaM2: number): number {
  return parseFloat((floorAreaM2 * 0.15).toFixed(1));
}

export function herbGardenAreaM2(bedCount: number): number {
  return parseFloat((bedCount * 2.5).toFixed(1));
}

export function staffCount(bedCount: number): number {
  return Math.max(2, Math.ceil(bedCount / 4));
}

export function hearthCount(floorAreaM2: number): number {
  return Math.max(1, Math.ceil(floorAreaM2 / 30));
}

export function waterSupplyLitersPerDay(bedCount: number): number {
  return parseFloat((bedCount * 25).toFixed(1));
}

export function isolationRoomCount(bedCount: number): number {
  return Math.max(1, Math.ceil(bedCount * 0.2));
}

export function constructionCost(floorAreaM2: number, ward: InfirmaryWard, costPerM2: number): number {
  const multipliers: Record<InfirmaryWard, number> = {
    general: 1.0, isolation: 1.5, convalescent: 1.2, surgical: 1.8, apothecary: 1.3,
  };
  return parseFloat((floorAreaM2 * costPerM2 * multipliers[ward]).toFixed(2));
}

export function infirmaryWards(): InfirmaryWard[] {
  return ["general", "isolation", "convalescent", "surgical", "apothecary"];
}

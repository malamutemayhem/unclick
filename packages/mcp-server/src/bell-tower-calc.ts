export type BellTowerCap = "spire" | "pyramid" | "dome" | "flat" | "helm";

export function heightM(naveHeightM: number): number {
  return parseFloat((naveHeightM * 2.5).toFixed(2));
}

export function baseWidthM(heightM: number): number {
  return parseFloat((heightM * 0.2).toFixed(2));
}

export function bellChamberHeightM(heightM: number): number {
  return parseFloat((heightM * 0.15).toFixed(2));
}

export function wallThicknessCm(heightM: number): number {
  return parseFloat((heightM * 8 + 60).toFixed(1));
}

export function stairCount(heightM: number): number {
  return Math.ceil(heightM * 5);
}

export function bellCount(chamberWidthM: number): number {
  return Math.max(1, Math.floor(chamberWidthM / 0.8));
}

export function soundReachM(heightM: number, bellCount: number): number {
  return parseFloat((heightM * 50 + bellCount * 100).toFixed(1));
}

export function swayLimitCm(heightM: number): number {
  return parseFloat((heightM * 0.3).toFixed(1));
}

export function lightningRodHeightM(towerHeightM: number): number {
  return parseFloat((towerHeightM * 0.05 + 1).toFixed(2));
}

export function constructionCost(heightM: number, cap: BellTowerCap, costPerM: number): number {
  const multipliers: Record<BellTowerCap, number> = {
    spire: 1.5, pyramid: 1.2, dome: 1.8, flat: 1.0, helm: 1.4,
  };
  return parseFloat((heightM * costPerM * multipliers[cap]).toFixed(2));
}

export function bellTowerCaps(): BellTowerCap[] {
  return ["spire", "pyramid", "dome", "flat", "helm"];
}

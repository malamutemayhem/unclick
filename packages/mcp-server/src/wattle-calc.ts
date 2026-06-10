export type WattleWeave = "horizontal" | "diagonal" | "herringbone" | "random" | "close";

export function stakeCount(panelLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(panelLengthCm / spacingCm) + 1;
}

export function witbyLengthM(panelHeightCm: number, panelLengthCm: number): number {
  return parseFloat((panelHeightCm / 100 * (panelLengthCm / 100) * 2.5).toFixed(1));
}

export function panelArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm / 10000).toFixed(2));
}

export function daubThicknessCm(structural: boolean): number {
  return structural ? 8 : 4;
}

export function daubVolumeM3(areaCm2: number, thicknessCm: number): number {
  return parseFloat((areaCm2 / 10000 * thicknessCm / 100).toFixed(3));
}

export function weaveDensity(weave: WattleWeave): number {
  const density: Record<WattleWeave, number> = {
    horizontal: 1.0, diagonal: 1.3, herringbone: 1.5, random: 0.8, close: 1.8,
  };
  return density[weave];
}

export function buildTimeHours(areaCm2: number, weave: WattleWeave): number {
  return parseFloat((areaCm2 / 10000 * weaveDensity(weave) * 2).toFixed(1));
}

export function insulationRValue(daubThicknessCm: number): number {
  return parseFloat((daubThicknessCm * 0.08).toFixed(2));
}

export function lifespanYears(sheltered: boolean): number {
  return sheltered ? 30 : 15;
}

export function materialCost(stakesCount: number, stakePriceEach: number, withyM: number, withyPricePerM: number): number {
  return parseFloat((stakesCount * stakePriceEach + withyM * withyPricePerM).toFixed(2));
}

export function wattleWeaves(): WattleWeave[] {
  return ["horizontal", "diagonal", "herringbone", "random", "close"];
}

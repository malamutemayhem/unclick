export type FanlightPattern = "sunburst" | "spiderweb" | "elliptical" | "gothic" | "plain";

export function radiusCm(doorWidthCm: number): number {
  return parseFloat((doorWidthCm / 2).toFixed(1));
}

export function areaCm2(radiusCm: number): number {
  return parseFloat((Math.PI * radiusCm * radiusCm / 2).toFixed(0));
}

export function glazingBarCount(pattern: FanlightPattern): number {
  const counts: Record<FanlightPattern, number> = {
    sunburst: 13, spiderweb: 20, elliptical: 8, gothic: 6, plain: 0,
  };
  return counts[pattern];
}

export function glazingBarLengthCm(radiusCm: number, barCount: number): number {
  return parseFloat((radiusCm * barCount).toFixed(1));
}

export function leadCameLengthCm(perimeterCm: number, barLengthCm: number): number {
  return parseFloat((perimeterCm + barLengthCm * 2).toFixed(1));
}

export function lightTransmission(areaCm2: number, barCoverPercent: number): number {
  return parseFloat((areaCm2 * (1 - barCoverPercent / 100) / 10000).toFixed(3));
}

export function paneCount(pattern: FanlightPattern): number {
  const counts: Record<FanlightPattern, number> = {
    sunburst: 13, spiderweb: 24, elliptical: 8, gothic: 6, plain: 1,
  };
  return counts[pattern];
}

export function frameMaterialKg(perimeterCm: number, materialKgPerCm: number): number {
  return parseFloat((perimeterCm * materialKgPerCm).toFixed(1));
}

export function uValueWPerM2K(doubleGlazed: boolean): number {
  return doubleGlazed ? 2.8 : 5.5;
}

export function restorationCost(paneCount: number, pricePerPane: number, barCount: number, barRepairCost: number): number {
  return parseFloat((paneCount * pricePerPane + barCount * barRepairCost).toFixed(2));
}

export function fanlightPatterns(): FanlightPattern[] {
  return ["sunburst", "spiderweb", "elliptical", "gothic", "plain"];
}

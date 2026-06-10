export type ChainType = "gunter" | "engineer" | "metric" | "revenue" | "steel_band";

export function chainLengthM(type: ChainType): number {
  const lengths: Record<ChainType, number> = {
    gunter: 20.12, engineer: 30.48, metric: 20, revenue: 10, steel_band: 30,
  };
  return lengths[type];
}

export function linkCount(type: ChainType): number {
  const links: Record<ChainType, number> = {
    gunter: 100, engineer: 100, metric: 100, revenue: 16, steel_band: 0,
  };
  return links[type];
}

export function areaByChainSq(chainsX: number, chainsY: number): number {
  return parseFloat((chainsX * chainsY).toFixed(2));
}

export function areaAcres(chainSquares: number, chainLengthM: number): number {
  const sqMeters = chainSquares * chainLengthM * chainLengthM;
  return parseFloat((sqMeters / 4046.86).toFixed(3));
}

export function offsetMaxM(chainLengthM: number): number {
  return parseFloat((chainLengthM * 0.25).toFixed(1));
}

export function tallyMarkerCount(chainLength: number): number {
  return Math.floor(chainLength / 5);
}

export function temperatureCorrectionMm(lengthM: number, tempDiffCelsius: number): number {
  const coefficient = 0.0000116;
  return parseFloat((lengthM * 1000 * coefficient * tempDiffCelsius).toFixed(2));
}

export function sagCorrectionMm(spanM: number, weightKgPerM: number, tensionKg: number): number {
  if (tensionKg <= 0) return 0;
  return parseFloat((weightKgPerM ** 2 * spanM ** 3 * 1000 / (24 * tensionKg ** 2)).toFixed(2));
}

export function slopeCorrectionM(slopeDistanceM: number, heightDiffM: number): number {
  if (slopeDistanceM <= 0) return 0;
  return parseFloat((slopeDistanceM - Math.sqrt(slopeDistanceM ** 2 - heightDiffM ** 2)).toFixed(3));
}

export function chainTypes(): ChainType[] {
  return ["gunter", "engineer", "metric", "revenue", "steel_band"];
}

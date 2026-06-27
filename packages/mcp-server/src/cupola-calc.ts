export type CupolaShape = "round" | "octagonal" | "square" | "hexagonal" | "onion";

export function baseDiameterCm(roofSpanM: number): number {
  return parseFloat((roofSpanM * 100 * 0.15).toFixed(0));
}

export function heightCm(diameterCm: number, shape: CupolaShape): number {
  const ratios: Record<CupolaShape, number> = {
    round: 0.7, octagonal: 0.8, square: 0.6, hexagonal: 0.75, onion: 1.2,
  };
  return parseFloat((diameterCm * ratios[shape]).toFixed(0));
}

export function windowCount(shape: CupolaShape): number {
  const counts: Record<CupolaShape, number> = {
    round: 8, octagonal: 8, square: 4, hexagonal: 6, onion: 4,
  };
  return counts[shape];
}

export function ventilationCfm(windowCount: number, windowAreaCm2: number): number {
  return parseFloat((windowCount * windowAreaCm2 / 10000 * 35.3 * 2).toFixed(1));
}

export function lightTransmissionPercent(windowAreaCm2: number, floorAreaCm2: number): number {
  if (floorAreaCm2 <= 0) return 0;
  return parseFloat((windowAreaCm2 / floorAreaCm2 * 100).toFixed(1));
}

export function weathervaneHeight(cupolaHeightCm: number): number {
  return parseFloat((cupolaHeightCm * 0.4).toFixed(0));
}

export function roofAreaCm2(diameterCm: number, shape: CupolaShape): number {
  const factors: Record<CupolaShape, number> = {
    round: 1.57, octagonal: 1.2, square: 1.0, hexagonal: 1.3, onion: 2.0,
  };
  const radius = diameterCm / 2;
  return parseFloat((Math.PI * radius * radius * factors[shape]).toFixed(0));
}

export function copperSheetingKg(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 / 10000 * thicknessMm / 1000 * 8960).toFixed(1));
}

export function structuralLoadKn(totalWeightKg: number): number {
  return parseFloat((totalWeightKg * 9.81 / 1000).toFixed(2));
}

export function maintenanceIntervalYears(shape: CupolaShape): number {
  const years: Record<CupolaShape, number> = {
    round: 15, octagonal: 12, square: 10, hexagonal: 12, onion: 8,
  };
  return years[shape];
}

export function cupolaShapes(): CupolaShape[] {
  return ["round", "octagonal", "square", "hexagonal", "onion"];
}

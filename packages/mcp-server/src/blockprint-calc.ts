export type BlockWood = "teak" | "sycamore" | "pear" | "boxwood" | "cherry";

export function blockArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function carvingDepthMm(detailLevel: string): number {
  const depths: Record<string, number> = { coarse: 3, medium: 2, fine: 1.5, ultra: 1 };
  return depths[detailLevel] || 2;
}

export function inkCoverageMl(areaCm2: number, passes: number): number {
  return parseFloat((areaCm2 * 0.01 * passes).toFixed(2));
}

export function pressurePsi(blockArea: number, fabricWeight: string): number {
  const base: Record<string, number> = { light: 5, medium: 10, heavy: 15, canvas: 20 };
  return (base[fabricWeight] || 10) + blockArea * 0.01;
}

export function registrationMarks(colors: number): number {
  return colors > 1 ? (colors - 1) * 2 : 0;
}

export function printRunCapacity(blockWood: BlockWood): number {
  const runs: Record<BlockWood, number> = { teak: 5000, sycamore: 2000, pear: 8000, boxwood: 15000, cherry: 3000 };
  return runs[blockWood];
}

export function dryingTimeMin(inkType: string, humidity: number): number {
  const base: Record<string, number> = { water: 15, oil: 60, pigment: 30 };
  return parseFloat(((base[inkType] || 30) * (1 + humidity / 100)).toFixed(0));
}

export function repeatWidth(blockWidthCm: number, overlapCm: number): number {
  return parseFloat((blockWidthCm - overlapCm).toFixed(1));
}

export function fabricNeededM2(repeatCount: number, repeatWidthCm: number, heightCm: number): number {
  return parseFloat((repeatCount * repeatWidthCm * heightCm / 10000).toFixed(2));
}

export function carvingTimeHours(areaCm2: number, detail: string): number {
  const factor: Record<string, number> = { coarse: 0.1, medium: 0.2, fine: 0.4, ultra: 0.8 };
  return parseFloat((areaCm2 * (factor[detail] || 0.2)).toFixed(1));
}

export function blockWoods(): BlockWood[] {
  return ["teak", "sycamore", "pear", "boxwood", "cherry"];
}

export type DovecotStyle = "tower" | "wall" | "freestanding" | "lean_to" | "cupola";

export function nestBoxes(pairs: number): number {
  return Math.ceil(pairs * 1.2);
}

export function boxSpacingCm(birdType: string): number {
  const spacing: Record<string, number> = { pigeon: 30, dove: 25, fantail: 35, tumbler: 28 };
  return spacing[birdType] || 30;
}

export function floorAreaM2(boxes: number, spacingCm: number): number {
  const boxesPerRow = Math.ceil(Math.sqrt(boxes));
  return parseFloat((Math.pow(boxesPerRow * spacingCm / 100, 2)).toFixed(2));
}

export function ventilationOpenings(volumeM3: number): number {
  return Math.ceil(volumeM3 * 2);
}

export function feedKgPerWeek(birdCount: number): number {
  return parseFloat((birdCount * 0.035 * 7).toFixed(1));
}

export function waterLitersPerDay(birdCount: number): number {
  return parseFloat((birdCount * 0.05).toFixed(1));
}

export function cleaningFrequencyDays(birdCount: number, ventilation: string): number {
  const base = Math.max(3, 30 - birdCount * 0.5);
  const factor: Record<string, number> = { poor: 0.5, average: 1, good: 1.5 };
  return parseFloat((base * (factor[ventilation] || 1)).toFixed(0));
}

export function predatorMesh(openingCm: number): number {
  return parseFloat(Math.max(1, openingCm * 0.4).toFixed(1));
}

export function breedingPairsCapacity(boxes: number): number {
  return Math.floor(boxes / 1.2);
}

export function annualEggProduction(pairs: number, breedsPerYear: number): number {
  return pairs * breedsPerYear * 2;
}

export function dovecotStyles(): DovecotStyle[] {
  return ["tower", "wall", "freestanding", "lean_to", "cupola"];
}

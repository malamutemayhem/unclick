export type DovecoteShape = "round" | "square" | "octagonal" | "rectangular";

export function nestingHoles(pairs: number): number {
  return Math.ceil(pairs * 1.2);
}

export function holeSpacingCm(holeDiameter: number): number {
  return parseFloat((holeDiameter * 2.5).toFixed(1));
}

export function towerHeight(rows: number, rowHeight: number): number {
  return parseFloat((rows * rowHeight + 100).toFixed(0));
}

export function floorArea(shape: DovecoteShape, dim1: number, dim2: number): number {
  if (shape === "round") {
    return parseFloat((Math.PI * (dim1 / 2) * (dim1 / 2)).toFixed(1));
  }
  if (shape === "octagonal") {
    return parseFloat((2 * (1 + Math.SQRT2) * (dim1 / 2) * (dim1 / 2)).toFixed(1));
  }
  return parseFloat((dim1 * (dim2 || dim1)).toFixed(1));
}

export function feedKgPerDay(pairs: number): number {
  return parseFloat((pairs * 0.06).toFixed(2));
}

export function waterLitersPerDay(pairs: number): number {
  return parseFloat((pairs * 0.05).toFixed(2));
}

export function breedingCycles(monthsAvailable: number): number {
  return Math.floor(monthsAvailable / 1.5);
}

export function squabsPerYear(pairs: number, cycles: number): number {
  return pairs * cycles * 2;
}

export function guanoKgPerYear(pairs: number): number {
  return parseFloat((pairs * 12).toFixed(0));
}

export function potholedWall(rows: number, holesPerRow: number, holeDiameter: number): number {
  const wallNeeded = rows * holesPerRow * holeDiameter * holeDiameter;
  return parseFloat((wallNeeded / 10000).toFixed(2));
}

export function dovecoteShapes(): DovecoteShape[] {
  return ["round", "square", "octagonal", "rectangular"];
}

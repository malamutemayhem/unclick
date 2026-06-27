export type PaperShape = "square" | "rectangle" | "circle" | "triangle";

export interface Paper {
  shape: PaperShape;
  widthCm: number;
  heightCm: number;
  weightGsm: number;
}

export interface FoldResult {
  layers: number;
  thickness: number;
  area: number;
}

export function paperArea(paper: Paper): number {
  switch (paper.shape) {
    case "square": return paper.widthCm * paper.widthCm;
    case "rectangle": return paper.widthCm * paper.heightCm;
    case "circle": return Math.PI * (paper.widthCm / 2) ** 2;
    case "triangle": return (paper.widthCm * paper.heightCm) / 2;
  }
}

export function paperWeight(paper: Paper): number {
  const areaM2 = paperArea(paper) / 10000;
  return parseFloat((areaM2 * paper.weightGsm).toFixed(3));
}

export function foldHalf(paper: Paper, folds: number): FoldResult {
  const thickness = parseFloat((0.01 * paper.weightGsm / 80 * Math.pow(2, folds)).toFixed(4));
  const area = parseFloat((paperArea(paper) / Math.pow(2, folds)).toFixed(2));
  return { layers: Math.pow(2, folds), thickness, area };
}

export function maxFolds(paper: Paper): number {
  const t = 0.01 * paper.weightGsm / 80;
  const L = Math.max(paper.widthCm, paper.heightCm);
  let n = 0;
  while (n < 20) {
    const needed = (Math.PI * t / 6) * (Math.pow(2, n) + 4) * (Math.pow(2, n) - 1);
    if (needed > L) break;
    n++;
  }
  return n;
}

export function craneFromSquare(sideCm: number): { wingspanCm: number; heightCm: number; difficulty: string } {
  return {
    wingspanCm: parseFloat((sideCm * 0.6).toFixed(1)),
    heightCm: parseFloat((sideCm * 0.5).toFixed(1)),
    difficulty: sideCm < 10 ? "hard" : sideCm < 20 ? "medium" : "easy",
  };
}

export function paperSizeForModel(modelHeightCm: number, ratio: number = 4): number {
  return parseFloat((modelHeightCm * ratio).toFixed(1));
}

export function wetFoldingStrength(weightGsm: number): string {
  if (weightGsm < 60) return "too light";
  if (weightGsm < 80) return "fragile";
  if (weightGsm <= 120) return "good";
  if (weightGsm <= 160) return "strong";
  return "too heavy";
}

export function creaseAngle(folds: { angle: number }[]): number {
  const sum = folds.reduce((s, f) => s + f.angle, 0) % 360;
  return sum < 0 ? sum + 360 : sum;
}

export function kawasaki(angles: number[]): boolean {
  if (angles.length % 2 !== 0) return false;
  let sumEven = 0;
  let sumOdd = 0;
  for (let i = 0; i < angles.length; i++) {
    if (i % 2 === 0) sumEven += angles[i];
    else sumOdd += angles[i];
  }
  return Math.abs(sumEven - sumOdd) < 0.01;
}

export function maekawa(mountainFolds: number, valleyFolds: number): boolean {
  return Math.abs(mountainFolds - valleyFolds) === 2;
}

export function gridDivisions(sideCm: number, divisions: number): number {
  return parseFloat((sideCm / divisions).toFixed(3));
}

export function diagonalLength(widthCm: number, heightCm: number): number {
  return parseFloat(Math.sqrt(widthCm ** 2 + heightCm ** 2).toFixed(2));
}

export function paperCost(sheets: number, pricePerSheet: number, wastePercent: number = 5): number {
  const needed = Math.ceil(sheets * (1 + wastePercent / 100));
  return parseFloat((needed * pricePerSheet).toFixed(2));
}

export function scaleFactor(originalSide: number, targetSide: number): number {
  return parseFloat((targetSide / originalSide).toFixed(3));
}

export function modulesNeeded(type: "cube" | "stellated_octahedron" | "kusudama" | "sonobe_cube"): number {
  const counts: Record<string, number> = {
    cube: 6,
    stellated_octahedron: 12,
    kusudama: 30,
    sonobe_cube: 6,
  };
  return counts[type];
}

export const STANDARD_SIZES: Record<string, { widthCm: number; heightCm: number }> = {
  kami_15: { widthCm: 15, heightCm: 15 },
  kami_24: { widthCm: 24, heightCm: 24 },
  kami_35: { widthCm: 35, heightCm: 35 },
  tant_15: { widthCm: 15, heightCm: 15 },
  tant_35: { widthCm: 35, heightCm: 35 },
  tissue_foil: { widthCm: 30, heightCm: 30 },
  elephant_hide: { widthCm: 50, heightCm: 70 },
};

export function listStandardSizes(): string[] {
  return Object.keys(STANDARD_SIZES);
}

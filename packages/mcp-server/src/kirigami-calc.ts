export type FoldPattern = "pop_up" | "sliceform" | "origamic" | "kirigami_card" | "modular";

export function cutCount(complexityLevel: number): number {
  return Math.ceil(complexityLevel * 8);
}

export function foldCount(cutCount: number): number {
  return Math.ceil(cutCount * 0.6);
}

export function paperSize(finishedWidthCm: number, finishedHeightCm: number): { width: number; height: number } {
  return {
    width: parseFloat((finishedWidthCm * 2.2).toFixed(1)),
    height: parseFloat((finishedHeightCm * 2.2).toFixed(1)),
  };
}

export function paperWeightGsm(thicknessMm: number): number {
  return parseFloat((thicknessMm * 800).toFixed(0));
}

export function bladeAngle(materialGsm: number): number {
  if (materialGsm <= 80) return 30;
  if (materialGsm <= 160) return 45;
  return 60;
}

export function symmetryAxes(pattern: FoldPattern): number {
  const axes: Record<FoldPattern, number> = {
    pop_up: 1, sliceform: 2, origamic: 1, kirigami_card: 1, modular: 4,
  };
  return axes[pattern];
}

export function layerCount(folds: number): number {
  return Math.pow(2, folds);
}

export function cuttingTime(cuts: number, materialGsm: number): number {
  const factor = materialGsm > 160 ? 1.5 : 1;
  return parseFloat((cuts * 0.5 * factor).toFixed(1));
}

export function popUpAngle(foldAngle: number, tabHeight: number, tabDepth: number): number {
  if (tabDepth <= 0) return 0;
  const ratio = tabHeight / tabDepth;
  return parseFloat((foldAngle * Math.atan(ratio) * 2 / Math.PI).toFixed(1));
}

export function difficulty(cuts: number, folds: number): string {
  const score = cuts + folds * 2;
  if (score < 20) return "beginner";
  if (score < 50) return "intermediate";
  return "advanced";
}

export function foldPatterns(): FoldPattern[] {
  return ["pop_up", "sliceform", "origamic", "kirigami_card", "modular"];
}

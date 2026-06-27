export type PantographType = "enlarger" | "reducer" | "duplicator" | "engraver" | "lazy_tongs";

export function scaleFactor(pivotToTracer: number, pivotToDrawing: number): number {
  if (pivotToTracer <= 0) return 0;
  return parseFloat((pivotToDrawing / pivotToTracer).toFixed(3));
}

export function outputSize(inputSize: number, scale: number): number {
  return parseFloat((inputSize * scale).toFixed(2));
}

export function armLength(maxInputCm: number): number {
  return parseFloat((maxInputCm * 1.3).toFixed(1));
}

export function pivotPosition(armLengthCm: number, scale: number): number {
  if (scale <= 0) return 0;
  return parseFloat((armLengthCm / (1 + scale)).toFixed(2));
}

export function parallelogramArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function jointCount(type: PantographType): number {
  const joints: Record<PantographType, number> = {
    enlarger: 4, reducer: 4, duplicator: 4, engraver: 6, lazy_tongs: 12,
  };
  return joints[type];
}

export function accuracy(scale: number): number {
  return parseFloat((0.5 / scale).toFixed(2));
}

export function materialThicknessMm(maxSpanCm: number): number {
  if (maxSpanCm <= 30) return 3;
  if (maxSpanCm <= 60) return 5;
  return 8;
}

export function workingArea(armLengthCm: number): number {
  return parseFloat((armLengthCm * armLengthCm * 0.6).toFixed(1));
}

export function extensionRatio(type: PantographType): number {
  const ratios: Record<PantographType, number> = {
    enlarger: 3, reducer: 0.5, duplicator: 1, engraver: 0.25, lazy_tongs: 5,
  };
  return ratios[type];
}

export function penPressure(scale: number): string {
  if (scale < 0.5) return "light";
  if (scale <= 2) return "medium";
  return "firm";
}

export function pantographTypes(): PantographType[] {
  return ["enlarger", "reducer", "duplicator", "engraver", "lazy_tongs"];
}

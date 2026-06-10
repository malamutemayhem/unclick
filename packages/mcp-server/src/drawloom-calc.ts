export type FigureWeave = "damask" | "brocade" | "lampas" | "samite" | "velvet";

export function simpleCount(patternWidth: number, threadSpacing: number): number {
  if (threadSpacing <= 0) return 0;
  return Math.ceil(patternWidth / threadSpacing);
}

export function cordCount(figureThreads: number, cordsPerThread: number): number {
  return Math.ceil(figureThreads / cordsPerThread);
}

export function comberBoardHoles(figureThreads: number): number {
  return figureThreads;
}

export function drawBoyLifts(patternRows: number, colorsPerRow: number): number {
  return patternRows * colorsPerRow;
}

export function lashingLength(loomHeight: number, pulleyCount: number): number {
  return parseFloat((loomHeight * 2 + pulleyCount * 0.3).toFixed(1));
}

export function patternRepeatCm(figureRows: number, pickSpacing: number): number {
  return parseFloat((figureRows * pickSpacing).toFixed(1));
}

export function weavingSpeed(weave: FigureWeave): number {
  const speeds: Record<FigureWeave, number> = { damask: 5, brocade: 3, lampas: 2, samite: 4, velvet: 1 };
  return speeds[weave];
}

export function warpBeamWeight(threadCount: number, lengthM: number, texPerThread: number): number {
  return parseFloat((threadCount * lengthM * texPerThread / 1000000).toFixed(2));
}

export function heddles(shafts: number, threadsPerShaft: number): number {
  return shafts * threadsPerShaft;
}

export function setupTimeHours(figureThreads: number): number {
  return parseFloat((figureThreads * 0.02 + 4).toFixed(0));
}

export function figureWeaves(): FigureWeave[] {
  return ["damask", "brocade", "lampas", "samite", "velvet"];
}

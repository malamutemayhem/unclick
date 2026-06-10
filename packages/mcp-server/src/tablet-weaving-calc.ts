export type TabletPattern = "plain" | "threaded_in" | "double_face" | "egyptian_diagonals" | "sulawesi";

export function tabletsNeeded(widthCm: number, threadsPerTablet: number): number {
  if (threadsPerTablet <= 0) return 0;
  return Math.ceil(widthCm * 4 / threadsPerTablet);
}

export function holesPerTablet(pattern: TabletPattern): number {
  const holes: Record<TabletPattern, number> = {
    plain: 4, threaded_in: 4, double_face: 4, egyptian_diagonals: 4, sulawesi: 6,
  };
  return holes[pattern];
}

export function turningSequenceLength(pattern: TabletPattern): number {
  const seq: Record<TabletPattern, number> = {
    plain: 4, threaded_in: 8, double_face: 2, egyptian_diagonals: 16, sulawesi: 12,
  };
  return seq[pattern];
}

export function warpTensionRating(pattern: TabletPattern): number {
  const tension: Record<TabletPattern, number> = {
    plain: 2, threaded_in: 3, double_face: 4, egyptian_diagonals: 5, sulawesi: 4,
  };
  return tension[pattern];
}

export function bandThicknessMm(pattern: TabletPattern): number {
  const thick: Record<TabletPattern, number> = {
    plain: 2, threaded_in: 2.5, double_face: 3, egyptian_diagonals: 2.5, sulawesi: 3,
  };
  return thick[pattern];
}

export function difficultyRating(pattern: TabletPattern): number {
  const diff: Record<TabletPattern, number> = {
    plain: 1, threaded_in: 3, double_face: 4, egyptian_diagonals: 5, sulawesi: 4,
  };
  return diff[pattern];
}

export function rowsPerHour(pattern: TabletPattern): number {
  const rph: Record<TabletPattern, number> = {
    plain: 60, threaded_in: 40, double_face: 30, egyptian_diagonals: 20, sulawesi: 25,
  };
  return rph[pattern];
}

export function reversible(pattern: TabletPattern): boolean {
  return pattern === "double_face";
}

export function warpWastePercent(): number {
  return 15;
}

export function tabletPatterns(): TabletPattern[] {
  return ["plain", "threaded_in", "double_face", "egyptian_diagonals", "sulawesi"];
}

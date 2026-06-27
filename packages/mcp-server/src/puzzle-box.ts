export type PuzzleType = "sequential" | "trick" | "maze" | "assembly" | "disentanglement" | "cryptex";
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export function movesToSolve(steps: number, difficulty: Difficulty): number {
  return Math.round(steps * (1 + (difficulty - 1) * 0.5));
}

export function estimatedMinutes(moves: number, experienceLevel: "novice" | "intermediate" | "expert"): number {
  const minutesPerMove: Record<string, number> = { novice: 2, intermediate: 0.5, expert: 0.1 };
  return parseFloat((moves * minutesPerMove[experienceLevel]).toFixed(1));
}

export function combinations(digits: number, options: number): number {
  return Math.pow(options, digits);
}

export function permutations(n: number, r: number): number {
  let result = 1;
  for (let i = 0; i < r; i++) result *= (n - i);
  return result;
}

export function secretCompartments(boxVolumeCm3: number, compartmentRatio: number = 0.3): number {
  return Math.floor(boxVolumeCm3 * compartmentRatio / 10);
}

export function woodJoints(faces: number, slidingPanels: number): number {
  return faces * 2 + slidingPanels * 3;
}

export function magnetCount(lockPoints: number): number {
  return lockPoints * 2;
}

export function springForce(compressionMm: number, rateNPerMm: number): number {
  return parseFloat((compressionMm * rateNPerMm).toFixed(2));
}

export function toleranceMm(difficulty: Difficulty): number {
  const tol: Record<Difficulty, number> = { 1: 1.0, 2: 0.5, 3: 0.3, 4: 0.15, 5: 0.05 };
  return tol[difficulty];
}

export function woodShrinkage(moistureChange: number, coeffPercent: number, dimensionMm: number): number {
  return parseFloat((moistureChange * coeffPercent / 100 * dimensionMm).toFixed(3));
}

export function resetDifficulty(steps: number): string {
  if (steps <= 5) return "easy";
  if (steps <= 15) return "moderate";
  if (steps <= 30) return "hard";
  return "extreme";
}

export function collectibleValue(age: number, difficulty: Difficulty, condition: number): number {
  return parseFloat((age * difficulty * condition * 5).toFixed(0));
}

export function materialCost(woodPricePerCm3: number, volumeCm3: number, hardwareCount: number, hardwarePriceEach: number): number {
  return parseFloat((woodPricePerCm3 * volumeCm3 + hardwareCount * hardwarePriceEach).toFixed(2));
}

export function puzzleTypes(): PuzzleType[] {
  return ["sequential", "trick", "maze", "assembly", "disentanglement", "cryptex"];
}

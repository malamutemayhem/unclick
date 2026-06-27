export type PuzzleCategory = "logic" | "physical" | "search" | "cipher" | "pattern" | "mechanical";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export function roomDuration(difficulty: Difficulty): number {
  const minutes: Record<Difficulty, number> = {
    beginner: 45, intermediate: 60, advanced: 60, expert: 75,
  };
  return minutes[difficulty];
}

export function teamSize(roomSqM: number): { min: number; max: number } {
  if (roomSqM < 15) return { min: 2, max: 4 };
  if (roomSqM < 25) return { min: 3, max: 6 };
  return { min: 4, max: 8 };
}

export function puzzleCount(difficulty: Difficulty): number {
  const counts: Record<Difficulty, number> = {
    beginner: 6, intermediate: 10, advanced: 14, expert: 18,
  };
  return counts[difficulty];
}

export function timePerPuzzle(totalMinutes: number, puzzles: number): number {
  return parseFloat((totalMinutes / puzzles).toFixed(1));
}

export function hintAllowance(difficulty: Difficulty): number {
  const hints: Record<Difficulty, number> = {
    beginner: 5, intermediate: 3, advanced: 2, expert: 1,
  };
  return hints[difficulty];
}

export function escapeRate(difficulty: Difficulty): number {
  const rates: Record<Difficulty, number> = {
    beginner: 80, intermediate: 50, advanced: 30, expert: 15,
  };
  return rates[difficulty];
}

export function lockCombinations(digits: number, options: number): number {
  return Math.pow(options, digits);
}

export function linearVsNonlinear(parallel: boolean): string {
  return parallel ? "non-linear (multiple simultaneous paths)" : "linear (sequential puzzles)";
}

export function resetTime(puzzleCount: number): number {
  return puzzleCount * 3;
}

export function costPerPerson(totalCost: number, teamSize: number): number {
  if (teamSize === 0) return 0;
  return parseFloat((totalCost / teamSize).toFixed(2));
}

export function immersionScore(lighting: number, sound: number, props: number, actors: number): number {
  return parseFloat(((lighting + sound + props + actors) / 4).toFixed(1));
}

export function repeatability(randomizedPuzzles: number, totalPuzzles: number): number {
  if (totalPuzzles === 0) return 0;
  return parseFloat((randomizedPuzzles / totalPuzzles * 100).toFixed(0));
}

export function bookingCapacity(roomsAvailable: number, slotsPerDay: number): number {
  return roomsAvailable * slotsPerDay;
}

export function puzzleCategories(): PuzzleCategory[] {
  return ["logic", "physical", "search", "cipher", "pattern", "mechanical"];
}

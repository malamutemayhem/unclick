export type GameWeight = "filler" | "light" | "medium" | "heavy" | "epic";
export type TimerMode = "chess_clock" | "egg_timer" | "countdown" | "hourglass";

export function estimatedMinutes(players: number, weight: GameWeight): number {
  const base: Record<GameWeight, number> = {
    filler: 10, light: 25, medium: 45, heavy: 90, epic: 180,
  };
  return Math.round(base[weight] * (1 + (players - 2) * 0.2));
}

export function turnTime(totalMinutes: number, players: number, rounds: number): number {
  if (players === 0 || rounds === 0) return 0;
  return parseFloat((totalMinutes / (players * rounds)).toFixed(1));
}

export function roundCount(weight: GameWeight): number {
  const rounds: Record<GameWeight, number> = {
    filler: 5, light: 8, medium: 12, heavy: 18, epic: 30,
  };
  return rounds[weight];
}

export function setupMinutes(weight: GameWeight): number {
  const mins: Record<GameWeight, number> = {
    filler: 1, light: 5, medium: 10, heavy: 20, epic: 30,
  };
  return mins[weight];
}

export function teardownMinutes(weight: GameWeight): number {
  const mins: Record<GameWeight, number> = {
    filler: 1, light: 3, medium: 7, heavy: 15, epic: 20,
  };
  return mins[weight];
}

export function totalSessionMinutes(players: number, weight: GameWeight): number {
  return setupMinutes(weight) + estimatedMinutes(players, weight) + teardownMinutes(weight);
}

export function chessClockTime(totalMinutes: number, players: number): number {
  if (players === 0) return 0;
  return parseFloat((totalMinutes / players).toFixed(1));
}

export function incrementSeconds(weight: GameWeight): number {
  const secs: Record<GameWeight, number> = {
    filler: 5, light: 10, medium: 15, heavy: 30, epic: 60,
  };
  return secs[weight];
}

export function apScore(players: number, minutes: number): number {
  if (players === 0) return 0;
  return parseFloat((minutes * 60 / players).toFixed(0));
}

export function gamesPerEvening(eveningHours: number, avgGameMinutes: number): number {
  if (avgGameMinutes === 0) return 0;
  return Math.floor(eveningHours * 60 / avgGameMinutes);
}

export function playerDowntime(turnTimeMin: number, players: number): number {
  return parseFloat((turnTimeMin * (players - 1)).toFixed(1));
}

export function optimalPlayerCount(weight: GameWeight): { min: number; max: number } {
  const counts: Record<GameWeight, { min: number; max: number }> = {
    filler: { min: 2, max: 6 }, light: { min: 2, max: 5 }, medium: { min: 2, max: 4 },
    heavy: { min: 2, max: 4 }, epic: { min: 2, max: 3 },
  };
  return counts[weight];
}

export function gameWeights(): GameWeight[] {
  return ["filler", "light", "medium", "heavy", "epic"];
}

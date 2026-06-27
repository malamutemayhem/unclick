export type SemaphorePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const ALPHABET: Record<string, [SemaphorePosition, SemaphorePosition]> = {
  A: [7, 6], B: [8, 6], C: [1, 6], D: [2, 6], E: [6, 3],
  F: [6, 4], G: [6, 5], H: [8, 7], I: [1, 7], J: [2, 4],
  K: [7, 1], L: [7, 2], M: [7, 3], N: [7, 4], O: [8, 1],
  P: [8, 2], Q: [8, 3], R: [8, 4], S: [1, 2], T: [1, 3],
  U: [1, 4], V: [3, 2], W: [4, 2], X: [4, 3], Y: [2, 1],
  Z: [4, 5],
};

export function letterToPositions(letter: string): [number, number] | null {
  const entry = ALPHABET[letter.toUpperCase()];
  return entry ?? null;
}

export function positionsToAngle(position: SemaphorePosition): number {
  return (position - 1) * 45;
}

export function flagLength(distanceM: number): number {
  if (distanceM <= 200) return 45;
  if (distanceM <= 500) return 60;
  return 90;
}

export function signalRate(wordsPerMin: number): number {
  return parseFloat((wordsPerMin * 5).toFixed(0));
}

export function transmissionTime(charCount: number, charsPerMin: number): number {
  if (charsPerMin <= 0) return 0;
  return parseFloat((charCount / charsPerMin).toFixed(2));
}

export function maxRange(flagSizeCm: number, visibility: string): number {
  const base = flagSizeCm * 10;
  if (visibility === "poor") return parseFloat((base * 0.3).toFixed(0));
  if (visibility === "moderate") return parseFloat((base * 0.7).toFixed(0));
  return base;
}

export function alphabetSize(): number {
  return 26;
}

export function errorRate(distanceM: number): number {
  if (distanceM <= 100) return 1;
  if (distanceM <= 300) return 5;
  if (distanceM <= 600) return 15;
  return 30;
}

export function trainingHours(proficiency: string): number {
  if (proficiency === "basic") return 4;
  if (proficiency === "fluent") return 20;
  return 50;
}

export function anglesBetween(pos1: SemaphorePosition, pos2: SemaphorePosition): number {
  const a1 = positionsToAngle(pos1);
  const a2 = positionsToAngle(pos2);
  const diff = Math.abs(a1 - a2);
  return Math.min(diff, 360 - diff);
}

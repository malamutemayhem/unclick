export type BalletPosition = "first" | "second" | "third" | "fourth" | "fifth";

export function difficultyLevel(b: BalletPosition): number {
  const m: Record<BalletPosition, number> = {
    first: 2, second: 3, third: 4, fourth: 7, fifth: 9,
  };
  return m[b];
}

export function turnoutRequired(b: BalletPosition): number {
  const m: Record<BalletPosition, number> = {
    first: 7, second: 7, third: 5, fourth: 8, fifth: 10,
  };
  return m[b];
}

export function stabilityScore(b: BalletPosition): number {
  const m: Record<BalletPosition, number> = {
    first: 8, second: 9, third: 6, fourth: 5, fifth: 4,
  };
  return m[b];
}

export function usageFrequency(b: BalletPosition): number {
  const m: Record<BalletPosition, number> = {
    first: 10, second: 8, third: 3, fourth: 6, fifth: 9,
  };
  return m[b];
}

export function baseWidth(b: BalletPosition): number {
  const m: Record<BalletPosition, number> = {
    first: 5, second: 10, third: 3, fourth: 7, fifth: 1,
  };
  return m[b];
}

export function feetTouching(b: BalletPosition): boolean {
  const m: Record<BalletPosition, boolean> = {
    first: true, second: false, third: true, fourth: false, fifth: true,
  };
  return m[b];
}

export function usedInBarre(b: BalletPosition): boolean {
  const m: Record<BalletPosition, boolean> = {
    first: true, second: true, third: true, fourth: true, fifth: true,
  };
  return m[b];
}

export function feetDescription(b: BalletPosition): string {
  const m: Record<BalletPosition, string> = {
    first: "heels_together_turned_out", second: "feet_apart_shoulder_width",
    third: "one_foot_half_front", fourth: "feet_apart_one_forward",
    fifth: "feet_together_fully_crossed",
  };
  return m[b];
}

export function commonTransitionTo(b: BalletPosition): string {
  const m: Record<BalletPosition, string> = {
    first: "plie_tendu", second: "grande_plie",
    third: "degage", fourth: "pirouette_prep",
    fifth: "releve_jump",
  };
  return m[b];
}

export function balletPositions(): BalletPosition[] {
  return ["first", "second", "third", "fourth", "fifth"];
}

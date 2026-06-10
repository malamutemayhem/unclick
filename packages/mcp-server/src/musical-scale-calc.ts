export type ScaleType = "major" | "minor" | "pentatonic" | "blues" | "chromatic";

export function noteCount(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 7, minor: 7, pentatonic: 5, blues: 6, chromatic: 12,
  };
  return m[s];
}

export function moodBrightness(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 9, minor: 3, pentatonic: 7, blues: 4, chromatic: 5,
  };
  return m[s];
}

export function versatility(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 8, minor: 8, pentatonic: 9, blues: 7, chromatic: 10,
  };
  return m[s];
}

export function learningDifficulty(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 3, minor: 4, pentatonic: 2, blues: 5, chromatic: 8,
  };
  return m[s];
}

export function improvisationScore(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 6, minor: 7, pentatonic: 10, blues: 9, chromatic: 5,
  };
  return m[s];
}

export function diatonic(s: ScaleType): boolean {
  const m: Record<ScaleType, boolean> = {
    major: true, minor: true, pentatonic: false, blues: false, chromatic: false,
  };
  return m[s];
}

export function containsBlueNote(s: ScaleType): boolean {
  const m: Record<ScaleType, boolean> = {
    major: false, minor: false, pentatonic: false, blues: true, chromatic: true,
  };
  return m[s];
}

export function commonGenre(s: ScaleType): string {
  const m: Record<ScaleType, string> = {
    major: "pop", minor: "classical", pentatonic: "rock",
    blues: "blues", chromatic: "jazz",
  };
  return m[s];
}

export function intervalPattern(s: ScaleType): string {
  const m: Record<ScaleType, string> = {
    major: "WWHWWWH", minor: "WHWWHWW", pentatonic: "WW3W3",
    blues: "3HHW3W", chromatic: "HHHHHHHHHHHH",
  };
  return m[s];
}

export function scaleTypes(): ScaleType[] {
  return ["major", "minor", "pentatonic", "blues", "chromatic"];
}

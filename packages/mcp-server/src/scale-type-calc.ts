export type ScaleType = "major" | "minor_natural" | "pentatonic" | "blues" | "chromatic";

export function noteCount(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 7, minor_natural: 7, pentatonic: 5, blues: 6, chromatic: 12,
  };
  return m[s];
}

export function emotionalBrightness(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 9, minor_natural: 3, pentatonic: 7, blues: 4, chromatic: 5,
  };
  return m[s];
}

export function versatility(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 9, minor_natural: 8, pentatonic: 7, blues: 6, chromatic: 10,
  };
  return m[s];
}

export function beginnerFriendly(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 9, minor_natural: 7, pentatonic: 10, blues: 6, chromatic: 3,
  };
  return m[s];
}

export function tensionLevel(s: ScaleType): number {
  const m: Record<ScaleType, number> = {
    major: 3, minor_natural: 5, pentatonic: 2, blues: 7, chromatic: 10,
  };
  return m[s];
}

export function containsBlueNote(s: ScaleType): boolean {
  const m: Record<ScaleType, boolean> = {
    major: false, minor_natural: false, pentatonic: false, blues: true, chromatic: true,
  };
  return m[s];
}

export function symmetrical(s: ScaleType): boolean {
  const m: Record<ScaleType, boolean> = {
    major: false, minor_natural: false, pentatonic: false, blues: false, chromatic: true,
  };
  return m[s];
}

export function commonGenre(s: ScaleType): string {
  const m: Record<ScaleType, string> = {
    major: "pop_classical", minor_natural: "rock_classical",
    pentatonic: "folk_rock_country", blues: "blues_jazz",
    chromatic: "jazz_contemporary",
  };
  return m[s];
}

export function intervalPattern(s: ScaleType): string {
  const m: Record<ScaleType, string> = {
    major: "W_W_H_W_W_W_H", minor_natural: "W_H_W_W_H_W_W",
    pentatonic: "W_W_m3_W_m3", blues: "m3_W_H_H_m3_W",
    chromatic: "H_H_H_H_H_H_H_H_H_H_H_H",
  };
  return m[s];
}

export function scaleTypes(): ScaleType[] {
  return ["major", "minor_natural", "pentatonic", "blues", "chromatic"];
}

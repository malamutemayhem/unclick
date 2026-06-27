export type MusicScale = "major" | "minor" | "pentatonic" | "blues" | "chromatic";

export function noteCount(scale: MusicScale): number {
  const m: Record<MusicScale, number> = {
    major: 7, minor: 7, pentatonic: 5, blues: 6, chromatic: 12,
  };
  return m[scale];
}

export function moodBrightness(scale: MusicScale): number {
  const m: Record<MusicScale, number> = {
    major: 9, minor: 3, pentatonic: 7, blues: 4, chromatic: 5,
  };
  return m[scale];
}

export function versatility(scale: MusicScale): number {
  const m: Record<MusicScale, number> = {
    major: 8, minor: 8, pentatonic: 7, blues: 6, chromatic: 10,
  };
  return m[scale];
}

export function improvisationFriendly(scale: MusicScale): number {
  const m: Record<MusicScale, number> = {
    major: 6, minor: 7, pentatonic: 10, blues: 10, chromatic: 5,
  };
  return m[scale];
}

export function learningDifficulty(scale: MusicScale): number {
  const m: Record<MusicScale, number> = {
    major: 2, minor: 3, pentatonic: 1, blues: 2, chromatic: 5,
  };
  return m[scale];
}

export function hasBlueNote(scale: MusicScale): boolean {
  const m: Record<MusicScale, boolean> = {
    major: false, minor: false, pentatonic: false, blues: true, chromatic: false,
  };
  return m[scale];
}

export function symmetrical(scale: MusicScale): boolean {
  const m: Record<MusicScale, boolean> = {
    major: false, minor: false, pentatonic: false, blues: false, chromatic: true,
  };
  return m[scale];
}

export function bestGenre(scale: MusicScale): string {
  const m: Record<MusicScale, string> = {
    major: "pop", minor: "classical", pentatonic: "folk",
    blues: "blues_jazz", chromatic: "atonal_modern",
  };
  return m[scale];
}

export function intervalPattern(scale: MusicScale): string {
  const m: Record<MusicScale, string> = {
    major: "WWHWWWH", minor: "WHWWHWW", pentatonic: "WW3W3",
    blues: "3HWH3W", chromatic: "HHHHHHHHHHHH",
  };
  return m[scale];
}

export function musicScales(): MusicScale[] {
  return ["major", "minor", "pentatonic", "blues", "chromatic"];
}

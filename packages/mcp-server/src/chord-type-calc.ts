export type ChordType = "major" | "minor" | "diminished" | "augmented" | "seventh";

export function noteCountInChord(c: ChordType): number {
  const m: Record<ChordType, number> = {
    major: 3, minor: 3, diminished: 3, augmented: 3, seventh: 4,
  };
  return m[c];
}

export function tension(c: ChordType): number {
  const m: Record<ChordType, number> = {
    major: 2, minor: 4, diminished: 9, augmented: 8, seventh: 6,
  };
  return m[c];
}

export function stabilityLevel(c: ChordType): number {
  const m: Record<ChordType, number> = {
    major: 10, minor: 8, diminished: 3, augmented: 2, seventh: 5,
  };
  return m[c];
}

export function usageFrequency(c: ChordType): number {
  const m: Record<ChordType, number> = {
    major: 10, minor: 9, diminished: 4, augmented: 3, seventh: 7,
  };
  return m[c];
}

export function colorfulness(c: ChordType): number {
  const m: Record<ChordType, number> = {
    major: 3, minor: 5, diminished: 8, augmented: 9, seventh: 7,
  };
  return m[c];
}

export function consonant(c: ChordType): boolean {
  const m: Record<ChordType, boolean> = {
    major: true, minor: true, diminished: false, augmented: false, seventh: false,
  };
  return m[c];
}

export function symmetrical(c: ChordType): boolean {
  const m: Record<ChordType, boolean> = {
    major: false, minor: false, diminished: true, augmented: true, seventh: false,
  };
  return m[c];
}

export function commonGenre(c: ChordType): string {
  const m: Record<ChordType, string> = {
    major: "pop", minor: "ballad", diminished: "classical",
    augmented: "jazz", seventh: "blues",
  };
  return m[c];
}

export function intervalStructure(c: ChordType): string {
  const m: Record<ChordType, string> = {
    major: "M3_P5", minor: "m3_P5", diminished: "m3_d5",
    augmented: "M3_A5", seventh: "M3_P5_m7",
  };
  return m[c];
}

export function chordTypes(): ChordType[] {
  return ["major", "minor", "diminished", "augmented", "seventh"];
}

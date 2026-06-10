export type ChordQuality = "major_triad" | "minor_triad" | "dominant_7th" | "diminished" | "augmented";

export function noteCount(c: ChordQuality): number {
  const m: Record<ChordQuality, number> = {
    major_triad: 3, minor_triad: 3, dominant_7th: 4, diminished: 3, augmented: 3,
  };
  return m[c];
}

export function consonance(c: ChordQuality): number {
  const m: Record<ChordQuality, number> = {
    major_triad: 10, minor_triad: 8, dominant_7th: 5, diminished: 2, augmented: 3,
  };
  return m[c];
}

export function tension(c: ChordQuality): number {
  const m: Record<ChordQuality, number> = {
    major_triad: 1, minor_triad: 3, dominant_7th: 7, diminished: 9, augmented: 8,
  };
  return m[c];
}

export function usageFrequency(c: ChordQuality): number {
  const m: Record<ChordQuality, number> = {
    major_triad: 10, minor_triad: 9, dominant_7th: 8, diminished: 4, augmented: 3,
  };
  return m[c];
}

export function voiceLeadingPull(c: ChordQuality): number {
  const m: Record<ChordQuality, number> = {
    major_triad: 3, minor_triad: 3, dominant_7th: 9, diminished: 10, augmented: 7,
  };
  return m[c];
}

export function containsTritone(c: ChordQuality): boolean {
  const m: Record<ChordQuality, boolean> = {
    major_triad: false, minor_triad: false, dominant_7th: true, diminished: true, augmented: false,
  };
  return m[c];
}

export function symmetricalStructure(c: ChordQuality): boolean {
  const m: Record<ChordQuality, boolean> = {
    major_triad: false, minor_triad: false, dominant_7th: false, diminished: true, augmented: true,
  };
  return m[c];
}

export function emotionalCharacter(c: ChordQuality): string {
  const m: Record<ChordQuality, string> = {
    major_triad: "happy_bright", minor_triad: "sad_reflective",
    dominant_7th: "tension_resolution", diminished: "suspense_anxiety",
    augmented: "dreamy_unstable",
  };
  return m[c];
}

export function intervalStructure(c: ChordQuality): string {
  const m: Record<ChordQuality, string> = {
    major_triad: "M3_m3", minor_triad: "m3_M3",
    dominant_7th: "M3_m3_m3", diminished: "m3_m3",
    augmented: "M3_M3",
  };
  return m[c];
}

export function chordQualities(): ChordQuality[] {
  return ["major_triad", "minor_triad", "dominant_7th", "diminished", "augmented"];
}

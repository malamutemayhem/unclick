export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

const NOTES: NoteName[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALE_PATTERNS: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
};

const CHORD_INTERVALS: Record<string, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  dom7: [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
};

export class ChordProgressionEngine {
  static getScale(root: NoteName, scaleType: string): NoteName[] {
    const pattern = SCALE_PATTERNS[scaleType];
    if (!pattern) return [];
    const rootIdx = NOTES.indexOf(root);
    return pattern.map((interval) => NOTES[(rootIdx + interval) % 12]);
  }

  static getChord(root: NoteName, chordType: string): NoteName[] {
    const intervals = CHORD_INTERVALS[chordType];
    if (!intervals) return [];
    const rootIdx = NOTES.indexOf(root);
    return intervals.map((interval) => NOTES[(rootIdx + interval) % 12]);
  }

  static diatonicChords(root: NoteName, scaleType = "major"): Array<{ degree: number; root: NoteName; quality: string; notes: NoteName[] }> {
    const scale = ChordProgressionEngine.getScale(root, scaleType);
    if (scale.length === 0) return [];

    const majorQualities = ["major", "minor", "minor", "major", "major", "minor", "diminished"];
    const minorQualities = ["minor", "diminished", "major", "minor", "minor", "major", "major"];
    const qualities = scaleType === "minor" ? minorQualities : majorQualities;

    return scale.slice(0, 7).map((note, i) => ({
      degree: i + 1,
      root: note,
      quality: qualities[i],
      notes: ChordProgressionEngine.getChord(note, qualities[i]),
    }));
  }

  static progression(root: NoteName, degrees: number[], scaleType = "major"): Array<{ degree: number; root: NoteName; quality: string; notes: NoteName[] }> {
    const chords = ChordProgressionEngine.diatonicChords(root, scaleType);
    return degrees
      .map((d) => chords.find((c) => c.degree === d))
      .filter((c): c is NonNullable<typeof c> => c !== undefined);
  }

  static commonProgressions(): Record<string, number[]> {
    return {
      "I-IV-V-I": [1, 4, 5, 1],
      "I-V-vi-IV": [1, 5, 6, 4],
      "ii-V-I": [2, 5, 1],
      "I-vi-IV-V": [1, 6, 4, 5],
      "I-IV-vi-V": [1, 4, 6, 5],
      "vi-IV-I-V": [6, 4, 1, 5],
      "I-V-IV-V": [1, 5, 4, 5],
      "I-iii-IV-V": [1, 3, 4, 5],
    };
  }

  static transpose(notes: NoteName[], semitones: number): NoteName[] {
    return notes.map((note) => {
      const idx = NOTES.indexOf(note);
      return NOTES[(idx + semitones + 12) % 12];
    });
  }

  static interval(a: NoteName, b: NoteName): number {
    const ia = NOTES.indexOf(a);
    const ib = NOTES.indexOf(b);
    return (ib - ia + 12) % 12;
  }

  static availableScales(): string[] {
    return Object.keys(SCALE_PATTERNS);
  }

  static availableChordTypes(): string[] {
    return Object.keys(CHORD_INTERVALS);
  }
}

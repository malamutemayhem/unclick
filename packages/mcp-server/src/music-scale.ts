export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

const NOTE_NAMES: NoteName[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALE_PATTERNS: Record<string, number[]> = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
  melodicMinor: [2, 1, 2, 2, 2, 2, 1],
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  locrian: [1, 2, 2, 1, 2, 2, 2],
  pentatonicMajor: [2, 2, 3, 2, 3],
  pentatonicMinor: [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2],
  chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  wholeTone: [2, 2, 2, 2, 2, 2],
};

export function noteToMidi(name: NoteName, octave: number): number {
  return NOTE_NAMES.indexOf(name) + (octave + 1) * 12;
}

export function midiToNote(midi: number): { name: NoteName; octave: number } {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[midi % 12];
  return { name, octave };
}

export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

export function frequencyToMidi(freq: number, a4 = 440): number {
  return 69 + 12 * Math.log2(freq / a4);
}

export function getScale(root: NoteName, scaleType: string): NoteName[] {
  const pattern = SCALE_PATTERNS[scaleType];
  if (!pattern) return [];

  const rootIdx = NOTE_NAMES.indexOf(root);
  const notes: NoteName[] = [root];
  let current = rootIdx;

  for (const interval of pattern) {
    current = (current + interval) % 12;
    if (notes.length < pattern.length) {
      notes.push(NOTE_NAMES[current]);
    }
  }

  return notes;
}

export function getScaleFrequencies(root: NoteName, octave: number, scaleType: string, a4 = 440): number[] {
  const pattern = SCALE_PATTERNS[scaleType];
  if (!pattern) return [];

  let midi = noteToMidi(root, octave);
  const freqs: number[] = [midiToFrequency(midi, a4)];

  for (const interval of pattern) {
    midi += interval;
    freqs.push(midiToFrequency(midi, a4));
  }

  return freqs;
}

export function interval(semitones: number): string {
  const names: Record<number, string> = {
    0: "unison", 1: "minor 2nd", 2: "major 2nd", 3: "minor 3rd",
    4: "major 3rd", 5: "perfect 4th", 6: "tritone", 7: "perfect 5th",
    8: "minor 6th", 9: "major 6th", 10: "minor 7th", 11: "major 7th",
    12: "octave",
  };
  return names[semitones % 13] ?? `${semitones} semitones`;
}

export function transpose(note: NoteName, semitones: number): NoteName {
  const idx = NOTE_NAMES.indexOf(note);
  return NOTE_NAMES[((idx + semitones) % 12 + 12) % 12];
}

export function isInScale(note: NoteName, root: NoteName, scaleType: string): boolean {
  const scale = getScale(root, scaleType);
  return scale.includes(note);
}

export function getRelativeMinor(majorRoot: NoteName): NoteName {
  return transpose(majorRoot, -3);
}

export function getRelativeMajor(minorRoot: NoteName): NoteName {
  return transpose(minorRoot, 3);
}

export function listScaleTypes(): string[] {
  return Object.keys(SCALE_PATTERNS);
}

export function centsFromEqual(freq: number, targetMidi: number, a4 = 440): number {
  const targetFreq = midiToFrequency(targetMidi, a4);
  return 1200 * Math.log2(freq / targetFreq);
}

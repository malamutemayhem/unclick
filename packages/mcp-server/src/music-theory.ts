const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const SCALE_PATTERNS: Record<string, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  "harmonic-minor": [0, 2, 3, 5, 7, 8, 11],
  "melodic-minor": [0, 2, 3, 5, 7, 9, 11],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  locrian: [0, 1, 3, 5, 6, 8, 10],
};

const CHORD_PATTERNS: Record<string, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  diminished: [0, 3, 6],
  augmented: [0, 4, 8],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  dom7: [0, 4, 7, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  dim7: [0, 3, 6, 9],
};

export function noteToMidi(note: string): number {
  const match = note.match(/^([A-Ga-g][#b]?)(\d+)$/);
  if (!match) throw new Error(`Invalid note: ${note}`);
  const name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const octave = parseInt(match[2], 10);
  let idx = NOTE_NAMES.indexOf(name);
  if (idx === -1) idx = FLAT_NAMES.indexOf(name);
  if (idx === -1) throw new Error(`Unknown note name: ${name}`);
  return (octave + 1) * 12 + idx;
}

export function midiToNote(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[midi % 12];
  return `${name}${octave}`;
}

export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}

export function frequencyToMidi(freq: number, a4 = 440): number {
  return Math.round(12 * Math.log2(freq / a4) + 69);
}

export function scale(root: string, type: string): string[] {
  const pattern = SCALE_PATTERNS[type];
  if (!pattern) throw new Error(`Unknown scale type: ${type}`);
  let rootIdx = NOTE_NAMES.indexOf(root);
  if (rootIdx === -1) rootIdx = FLAT_NAMES.indexOf(root);
  if (rootIdx === -1) throw new Error(`Unknown root: ${root}`);
  return pattern.map((interval) => NOTE_NAMES[(rootIdx + interval) % 12]);
}

export function chord(root: string, type: string): string[] {
  const pattern = CHORD_PATTERNS[type];
  if (!pattern) throw new Error(`Unknown chord type: ${type}`);
  let rootIdx = NOTE_NAMES.indexOf(root);
  if (rootIdx === -1) rootIdx = FLAT_NAMES.indexOf(root);
  if (rootIdx === -1) throw new Error(`Unknown root: ${root}`);
  return pattern.map((interval) => NOTE_NAMES[(rootIdx + interval) % 12]);
}

export function intervalName(semitones: number): string {
  const names = [
    "unison", "minor 2nd", "major 2nd", "minor 3rd", "major 3rd",
    "perfect 4th", "tritone", "perfect 5th", "minor 6th", "major 6th",
    "minor 7th", "major 7th", "octave",
  ];
  const s = ((semitones % 12) + 12) % 12;
  return names[s] ?? `${s} semitones`;
}

export function transpose(note: string, semitones: number): string {
  const midi = noteToMidi(note);
  return midiToNote(midi + semitones);
}

export function scaleTypes(): string[] {
  return Object.keys(SCALE_PATTERNS);
}

export function chordTypes(): string[] {
  return Object.keys(CHORD_PATTERNS);
}

export type TuningName = "standard" | "dropD" | "openG" | "openD" | "DADGAD" | "halfStep";

export interface Tuning {
  name: TuningName;
  strings: number[];
  notes: string[];
}

export interface ChordShape {
  name: string;
  frets: (number | -1)[];
  barFret?: number;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const TUNINGS: Record<TuningName, { midi: number[]; notes: string[] }> = {
  standard: { midi: [40, 45, 50, 55, 59, 64], notes: ["E2", "A2", "D3", "G3", "B3", "E4"] },
  dropD: { midi: [38, 45, 50, 55, 59, 64], notes: ["D2", "A2", "D3", "G3", "B3", "E4"] },
  openG: { midi: [38, 43, 50, 55, 59, 62], notes: ["D2", "G2", "D3", "G3", "B3", "D4"] },
  openD: { midi: [38, 45, 50, 54, 57, 62], notes: ["D2", "A2", "D3", "F#3", "A3", "D4"] },
  DADGAD: { midi: [38, 45, 50, 55, 57, 62], notes: ["D2", "A2", "D3", "G3", "A3", "D4"] },
  halfStep: { midi: [39, 44, 49, 54, 58, 63], notes: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"] },
};

export function getTuning(name: TuningName): Tuning {
  const t = TUNINGS[name];
  return { name, strings: t.midi, notes: t.notes };
}

export function noteAtFret(stringMidi: number, fret: number): string {
  const midi = stringMidi + fret;
  return NOTE_NAMES[midi % 12] + Math.floor(midi / 12 - 1);
}

export function noteName(midi: number): string {
  return NOTE_NAMES[midi % 12];
}

export function midiToFrequency(midi: number): number {
  return parseFloat((440 * Math.pow(2, (midi - 69) / 12)).toFixed(2));
}

export function frequencyToMidi(freq: number): number {
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

export function fretboardNotes(tuning: TuningName, frets = 12): string[][] {
  const t = getTuning(tuning);
  const board: string[][] = [];
  for (const stringMidi of t.strings) {
    const row: string[] = [];
    for (let f = 0; f <= frets; f++) {
      row.push(noteAtFret(stringMidi, f));
    }
    board.push(row);
  }
  return board;
}

export function findNote(tuning: TuningName, note: string, maxFret = 12): { string: number; fret: number }[] {
  const t = getTuning(tuning);
  const results: { string: number; fret: number }[] = [];
  const targetNote = note.replace(/\d+$/, "");

  for (let s = 0; s < t.strings.length; s++) {
    for (let f = 0; f <= maxFret; f++) {
      const n = noteAtFret(t.strings[s], f);
      if (n.replace(/\d+$/, "") === targetNote) {
        results.push({ string: s + 1, fret: f });
      }
    }
  }
  return results;
}

export function chordDiagram(chord: ChordShape): string {
  const lines: string[] = [];
  lines.push(chord.name);
  for (let s = 5; s >= 0; s--) {
    const fret = chord.frets[s];
    if (fret === -1) lines.push(`${s + 1}: X`);
    else if (fret === 0) lines.push(`${s + 1}: O`);
    else lines.push(`${s + 1}: ${fret}`);
  }
  return lines.join("\n");
}

export function tabLine(frets: (number | string | null)[]): string {
  const strings = ["e", "B", "G", "D", "A", "E"];
  const lines: string[] = [];
  for (let s = 0; s < 6; s++) {
    const val = frets[s];
    const display = val === null ? "-" : String(val);
    lines.push(`${strings[s]}|--${display.padEnd(3, "-")}--|`);
  }
  return lines.join("\n");
}

export function scalePattern(root: string, scaleType: "major" | "minor" | "pentatonic" | "blues"): number[] {
  const patterns: Record<string, number[]> = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10],
  };
  const rootIdx = NOTE_NAMES.indexOf(root);
  if (rootIdx === -1) return [];
  return patterns[scaleType].map(interval => (rootIdx + interval) % 12);
}

export function capoEquivalent(tuning: TuningName, capoFret: number): string[] {
  const t = getTuning(tuning);
  return t.strings.map(midi => noteAtFret(midi, capoFret));
}

export function stringTension(gauge: number, scaleLengthInch: number, freqHz: number): number {
  const unitWeight = gauge * gauge * 0.00001036;
  const tension = unitWeight * Math.pow(2 * scaleLengthInch * freqHz, 2) / 386.4;
  return parseFloat(tension.toFixed(2));
}

export function fretPosition(scaleLength: number, fretNumber: number): number {
  return parseFloat((scaleLength - scaleLength / Math.pow(2, fretNumber / 12)).toFixed(2));
}

export function COMMON_CHORDS(): ChordShape[] {
  return [
    { name: "C", frets: [-1, 3, 2, 0, 1, 0] },
    { name: "D", frets: [-1, -1, 0, 2, 3, 2] },
    { name: "E", frets: [0, 2, 2, 1, 0, 0] },
    { name: "G", frets: [3, 2, 0, 0, 0, 3] },
    { name: "A", frets: [-1, 0, 2, 2, 2, 0] },
    { name: "Am", frets: [-1, 0, 2, 2, 1, 0] },
    { name: "Em", frets: [0, 2, 2, 0, 0, 0] },
    { name: "Dm", frets: [-1, -1, 0, 2, 3, 1] },
  ];
}

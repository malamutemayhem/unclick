export type HarmonicaType = "diatonic" | "chromatic" | "tremolo" | "octave" | "bass" | "chord";
export type Key = "C" | "D" | "E" | "F" | "G" | "A" | "Bb";

export function holeCount(type: HarmonicaType): number {
  const holes: Record<HarmonicaType, number> = {
    diatonic: 10, chromatic: 12, tremolo: 24, octave: 16, bass: 29, chord: 48,
  };
  return holes[type];
}

export function reedCount(type: HarmonicaType): number {
  const reeds: Record<HarmonicaType, number> = {
    diatonic: 20, chromatic: 48, tremolo: 48, octave: 32, bass: 58, chord: 384,
  };
  return reeds[type];
}

export function blowNote(hole: number, key: Key): string {
  const cScale = ["C", "E", "G", "C", "E", "G", "C", "E", "G", "C"];
  if (hole < 1 || hole > 10) return "invalid";
  return cScale[hole - 1];
}

export function drawNote(hole: number): string {
  const notes = ["D", "G", "B", "D", "F", "A", "B", "D", "F", "A"];
  if (hole < 1 || hole > 10) return "invalid";
  return notes[hole - 1];
}

export function bendAvailable(hole: number, direction: "blow" | "draw"): number {
  if (direction === "draw" && hole <= 6) return Math.max(0, hole <= 3 ? 3 - hole + 1 : 1);
  if (direction === "blow" && hole >= 7) return 1;
  return 0;
}

export function crossHarpPosition(songKey: Key): Key {
  const circle: Record<Key, Key> = {
    C: "F", D: "G", E: "A", F: "Bb", G: "C", A: "D", Bb: "E",
  };
  return circle[songKey];
}

export function frequency(note: string, octave: number): number {
  const semitones: Record<string, number> = {
    C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2,
  };
  const st = semitones[note];
  if (st === undefined) return 0;
  return parseFloat((440 * Math.pow(2, (st + (octave - 4) * 12) / 12)).toFixed(1));
}

export function reedGap(reedThicknessMm: number): number {
  return parseFloat((reedThicknessMm * 0.5).toFixed(3));
}

export function tuningCents(measuredHz: number, targetHz: number): number {
  if (targetHz <= 0 || measuredHz <= 0) return 0;
  return parseFloat((1200 * Math.log2(measuredHz / targetHz)).toFixed(1));
}

export function practiceMinutes(level: "beginner" | "intermediate" | "advanced"): number {
  const mins: Record<string, number> = { beginner: 15, intermediate: 30, advanced: 60 };
  return mins[level];
}

export function maintenanceInterval(playHoursPerWeek: number): number {
  if (playHoursPerWeek <= 0) return 52;
  return Math.max(1, Math.round(26 / playHoursPerWeek));
}

export function costRange(type: HarmonicaType): { min: number; max: number } {
  const ranges: Record<HarmonicaType, { min: number; max: number }> = {
    diatonic: { min: 5, max: 60 }, chromatic: { min: 50, max: 500 },
    tremolo: { min: 20, max: 100 }, octave: { min: 30, max: 150 },
    bass: { min: 200, max: 800 }, chord: { min: 300, max: 1500 },
  };
  return ranges[type];
}

export function harmonicaTypes(): HarmonicaType[] {
  return ["diatonic", "chromatic", "tremolo", "octave", "bass", "chord"];
}

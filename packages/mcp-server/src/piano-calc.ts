export type PianoType = "grand" | "baby_grand" | "upright" | "digital" | "keyboard";
export type KeyColor = "white" | "black";

export function totalKeys(type: PianoType): number {
  const keys: Record<PianoType, number> = {
    grand: 88, baby_grand: 88, upright: 88, digital: 88, keyboard: 61,
  };
  return keys[type];
}

export function keyColor(midiNote: number): KeyColor {
  const note = midiNote % 12;
  return [1, 3, 6, 8, 10].includes(note) ? "black" : "white";
}

export function frequency(midiNote: number): number {
  return parseFloat((440 * Math.pow(2, (midiNote - 69) / 12)).toFixed(2));
}

export function midiFromFreq(freq: number): number {
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

export function octave(midiNote: number): number {
  return Math.floor(midiNote / 12) - 1;
}

export function noteName(midiNote: number): string {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return names[midiNote % 12] + octave(midiNote);
}

export function tuningCents(measuredHz: number, targetHz: number): number {
  return parseFloat((1200 * Math.log2(measuredHz / targetHz)).toFixed(1));
}

export function stringTension(frequency: number, lengthM: number, massKgPerM: number): number {
  return parseFloat((4 * massKgPerM * (frequency * lengthM) ** 2).toFixed(1));
}

export function hammerWeight(noteIndex: number): number {
  return parseFloat((12 - noteIndex / 88 * 6).toFixed(1));
}

export function practiceMinutes(level: "beginner" | "intermediate" | "advanced" | "professional"): number {
  const mins: Record<string, number> = { beginner: 30, intermediate: 60, advanced: 120, professional: 240 };
  return mins[level];
}

export function tuningInterval(environment: "home" | "studio" | "concert"): number {
  const months: Record<string, number> = { home: 12, studio: 6, concert: 1 };
  return months[environment];
}

export function pedalFunction(pedal: "sustain" | "sostenuto" | "una_corda"): string {
  const desc: Record<string, string> = {
    sustain: "lifts all dampers",
    sostenuto: "sustains held notes only",
    una_corda: "shifts hammers to soften tone",
  };
  return desc[pedal];
}

export function movingWeight(type: PianoType): number {
  const kgs: Record<PianoType, number> = {
    grand: 480, baby_grand: 320, upright: 230, digital: 45, keyboard: 12,
  };
  return kgs[type];
}

export function roomSize(type: PianoType): number {
  const sqm: Record<PianoType, number> = {
    grand: 25, baby_grand: 18, upright: 10, digital: 6, keyboard: 3,
  };
  return sqm[type];
}

export function pianoTypes(): PianoType[] {
  return ["grand", "baby_grand", "upright", "digital", "keyboard"];
}

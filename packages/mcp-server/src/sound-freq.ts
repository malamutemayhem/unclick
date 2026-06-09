export function noteFrequency(note: string, octave: number, a4: number = 440): number {
  const notes: Record<string, number> = {
    C: -9, "C#": -8, Db: -8, D: -7, "D#": -6, Eb: -6,
    E: -5, F: -4, "F#": -3, Gb: -3, G: -2, "G#": -1, Ab: -1,
    A: 0, "A#": 1, Bb: 1, B: 2,
  };
  const semitones = (notes[note] ?? 0) + (octave - 4) * 12;
  return parseFloat((a4 * Math.pow(2, semitones / 12)).toFixed(2));
}

export function frequencyToNote(freq: number, a4: number = 440): { note: string; octave: number; cents: number } {
  const semitones = 12 * Math.log2(freq / a4);
  const rounded = Math.round(semitones);
  const cents = parseFloat(((semitones - rounded) * 100).toFixed(1));
  const noteNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  const idx = ((rounded % 12) + 12) % 12;
  const octave = 4 + Math.floor((rounded + 9) / 12);
  return { note: noteNames[idx], octave, cents };
}

export function interval(freq1: number, freq2: number): number {
  return parseFloat((12 * Math.log2(freq2 / freq1)).toFixed(2));
}

export function intervalName(semitones: number): string {
  const names: Record<number, string> = {
    0: "unison", 1: "minor 2nd", 2: "major 2nd", 3: "minor 3rd",
    4: "major 3rd", 5: "perfect 4th", 6: "tritone", 7: "perfect 5th",
    8: "minor 6th", 9: "major 6th", 10: "minor 7th", 11: "major 7th", 12: "octave",
  };
  const abs = Math.abs(Math.round(semitones)) % 13;
  return names[abs] ?? `${Math.round(semitones)} semitones`;
}

export function harmonicSeries(fundamental: number, count: number): number[] {
  const harmonics: number[] = [];
  for (let n = 1; n <= count; n++) {
    harmonics.push(parseFloat((fundamental * n).toFixed(2)));
  }
  return harmonics;
}

export function beatFrequency(f1: number, f2: number): number {
  return parseFloat(Math.abs(f1 - f2).toFixed(2));
}

export function wavelength(frequency: number, speedOfSound: number = 343): number {
  if (frequency === 0) return Infinity;
  return parseFloat((speedOfSound / frequency).toFixed(4));
}

export function speedOfSound(tempC: number): number {
  return parseFloat((331.3 + 0.606 * tempC).toFixed(1));
}

export function dopplerShift(sourceFreq: number, sourceSpeed: number, observerSpeed: number = 0, soundSpeed: number = 343): number {
  return parseFloat((sourceFreq * (soundSpeed + observerSpeed) / (soundSpeed - sourceSpeed)).toFixed(2));
}

export function decibelAdd(db1: number, db2: number): number {
  const p1 = Math.pow(10, db1 / 10);
  const p2 = Math.pow(10, db2 / 10);
  return parseFloat((10 * Math.log10(p1 + p2)).toFixed(1));
}

export function decibelFromRatio(ratio: number): number {
  return parseFloat((10 * Math.log10(ratio)).toFixed(1));
}

export function ratioFromDecibel(db: number): number {
  return parseFloat(Math.pow(10, db / 10).toFixed(4));
}

export function distanceAttenuation(distanceM: number, referenceM: number = 1): number {
  if (distanceM <= 0 || referenceM <= 0) return 0;
  return parseFloat((-20 * Math.log10(distanceM / referenceM)).toFixed(1));
}

export function reverberationTime(volumeM3: number, totalAbsorption: number): number {
  if (totalAbsorption === 0) return Infinity;
  return parseFloat((0.161 * volumeM3 / totalAbsorption).toFixed(2));
}

export function hearingRange(): { minHz: number; maxHz: number } {
  return { minHz: 20, maxHz: 20000 };
}

export function frequencyBand(freq: number): string {
  if (freq < 20) return "infrasonic";
  if (freq < 250) return "bass";
  if (freq < 2000) return "midrange";
  if (freq < 6000) return "upper midrange";
  if (freq <= 20000) return "treble";
  return "ultrasonic";
}

export function equalTemperament(baseFreq: number, steps: number, divisions: number = 12): number {
  return parseFloat((baseFreq * Math.pow(2, steps / divisions)).toFixed(2));
}

export function justIntonation(baseFreq: number, ratio: [number, number]): number {
  return parseFloat((baseFreq * ratio[0] / ratio[1]).toFixed(2));
}

export function schroederFrequency(rt60: number, volumeM3: number): number {
  return parseFloat((2000 * Math.sqrt(rt60 / volumeM3)).toFixed(1));
}

export type WhistleKey = "C" | "D" | "Eb" | "F" | "G" | "Bb";
export type Material = "tin" | "brass" | "nickel" | "aluminum" | "polymer";

export function tubeLength(key: WhistleKey): number {
  const mm: Record<WhistleKey, number> = {
    C: 370, D: 330, Eb: 310, F: 280, G: 250, Bb: 210,
  };
  return mm[key];
}

export function boreDiameter(key: WhistleKey): number {
  const mm: Record<WhistleKey, number> = {
    C: 14, D: 12, Eb: 12, F: 11, G: 11, Bb: 10,
  };
  return mm[key];
}

export function holeCount(): number {
  return 6;
}

export function holeSpacing(tubeLengthMm: number): number {
  return parseFloat((tubeLengthMm * 0.12).toFixed(1));
}

export function holeDiameter(boreMm: number, holeIndex: number): number {
  const base = boreMm * 0.5;
  const variation = holeIndex * 0.3;
  return parseFloat((base + variation).toFixed(1));
}

export function fippleGap(boreMm: number): number {
  return parseFloat((boreMm * 0.07).toFixed(2));
}

export function windowLength(boreMm: number): number {
  return parseFloat((boreMm * 0.8).toFixed(1));
}

export function fundamentalFreq(key: WhistleKey): number {
  const hz: Record<WhistleKey, number> = {
    C: 523, D: 587, Eb: 622, F: 698, G: 784, Bb: 932,
  };
  return hz[key];
}

export function octaveRange(): number {
  return 2;
}

export function breathPressure(octave: number): string {
  if (octave === 1) return "gentle";
  return "firm";
}

export function crossFingering(note: string): boolean {
  const cross = ["C#", "Eb", "F#", "Bb"];
  return cross.includes(note);
}

export function materialBrightness(material: Material): number {
  const score: Record<Material, number> = {
    tin: 7, brass: 8, nickel: 9, aluminum: 6, polymer: 4,
  };
  return score[material];
}

export function whistleKeys(): WhistleKey[] {
  return ["C", "D", "Eb", "F", "G", "Bb"];
}

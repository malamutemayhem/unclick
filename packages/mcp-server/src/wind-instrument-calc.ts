export type WindInstrument = "flute" | "clarinet" | "trumpet" | "tuba" | "oboe";

export function pitchRangeOctaves(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 3, clarinet: 4, trumpet: 3, tuba: 4, oboe: 3,
  };
  return m[inst];
}

export function airPressureRequired(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 3, clarinet: 5, trumpet: 8, tuba: 9, oboe: 10,
  };
  return m[inst];
}

export function volumeProjection(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 5, clarinet: 6, trumpet: 9, tuba: 10, oboe: 6,
  };
  return m[inst];
}

export function learningDifficulty(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 6, clarinet: 5, trumpet: 7, tuba: 6, oboe: 10,
  };
  return m[inst];
}

export function reedCount(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 0, clarinet: 1, trumpet: 0, tuba: 0, oboe: 2,
  };
  return m[inst];
}

export function brass(inst: WindInstrument): boolean {
  const m: Record<WindInstrument, boolean> = {
    flute: false, clarinet: false, trumpet: true, tuba: true, oboe: false,
  };
  return m[inst];
}

export function transposing(inst: WindInstrument): boolean {
  const m: Record<WindInstrument, boolean> = {
    flute: false, clarinet: true, trumpet: true, tuba: false, oboe: false,
  };
  return m[inst];
}

export function bestGenre(inst: WindInstrument): string {
  const m: Record<WindInstrument, string> = {
    flute: "orchestral", clarinet: "jazz", trumpet: "jazz",
    tuba: "brass_band", oboe: "chamber",
  };
  return m[inst];
}

export function averagePriceUsd(inst: WindInstrument): number {
  const m: Record<WindInstrument, number> = {
    flute: 800, clarinet: 600, trumpet: 1200, tuba: 5000, oboe: 3000,
  };
  return m[inst];
}

export function windInstruments(): WindInstrument[] {
  return ["flute", "clarinet", "trumpet", "tuba", "oboe"];
}

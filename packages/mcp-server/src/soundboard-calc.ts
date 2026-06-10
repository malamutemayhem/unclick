export type SoundboardShape = "guitar_flat" | "violin_arched" | "piano_flat" | "dulcimer_flat" | "oud_bent";

export function thicknessMm(shape: SoundboardShape): number {
  const t: Record<SoundboardShape, number> = {
    guitar_flat: 2.8, violin_arched: 2.5, piano_flat: 8,
    dulcimer_flat: 3, oud_bent: 1.5,
  };
  return t[shape];
}

export function bracingPattern(shape: SoundboardShape): string {
  const b: Record<SoundboardShape, string> = {
    guitar_flat: "x_brace", violin_arched: "bass_bar",
    piano_flat: "ribs", dulcimer_flat: "ladder",
    oud_bent: "radial",
  };
  return b[shape];
}

export function resonantFrequencyHz(shape: SoundboardShape): number {
  const f: Record<SoundboardShape, number> = {
    guitar_flat: 180, violin_arched: 270, piano_flat: 50,
    dulcimer_flat: 200, oud_bent: 160,
  };
  return f[shape];
}

export function projectionRating(shape: SoundboardShape): number {
  const p: Record<SoundboardShape, number> = {
    guitar_flat: 7, violin_arched: 9, piano_flat: 10,
    dulcimer_flat: 5, oud_bent: 6,
  };
  return p[shape];
}

export function responsiveness(shape: SoundboardShape): number {
  const r: Record<SoundboardShape, number> = {
    guitar_flat: 7, violin_arched: 9, piano_flat: 6,
    dulcimer_flat: 8, oud_bent: 8,
  };
  return r[shape];
}

export function carveRequired(shape: SoundboardShape): boolean {
  return shape === "violin_arched";
}

export function grainLinesPerCm(shape: SoundboardShape): number {
  const g: Record<SoundboardShape, number> = {
    guitar_flat: 6, violin_arched: 8, piano_flat: 4,
    dulcimer_flat: 5, oud_bent: 7,
  };
  return g[shape];
}

export function breakInPeriodMonths(shape: SoundboardShape): number {
  const b: Record<SoundboardShape, number> = {
    guitar_flat: 6, violin_arched: 24, piano_flat: 12,
    dulcimer_flat: 3, oud_bent: 6,
  };
  return b[shape];
}

export function costEstimate(shape: SoundboardShape): number {
  const c: Record<SoundboardShape, number> = {
    guitar_flat: 50, violin_arched: 80, piano_flat: 200,
    dulcimer_flat: 30, oud_bent: 60,
  };
  return c[shape];
}

export function soundboardShapes(): SoundboardShape[] {
  return ["guitar_flat", "violin_arched", "piano_flat", "dulcimer_flat", "oud_bent"];
}

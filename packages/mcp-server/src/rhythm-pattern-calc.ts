export type RhythmPattern = "straight" | "swing" | "syncopated" | "polyrhythm" | "rubato";

export function predictability(r: RhythmPattern): number {
  const m: Record<RhythmPattern, number> = {
    straight: 10, swing: 7, syncopated: 5, polyrhythm: 3, rubato: 2,
  };
  return m[r];
}

export function danceDifficulty(r: RhythmPattern): number {
  const m: Record<RhythmPattern, number> = {
    straight: 2, swing: 5, syncopated: 7, polyrhythm: 10, rubato: 8,
  };
  return m[r];
}

export function grooveFeel(r: RhythmPattern): number {
  const m: Record<RhythmPattern, number> = {
    straight: 5, swing: 10, syncopated: 9, polyrhythm: 7, rubato: 4,
  };
  return m[r];
}

export function expressiveness(r: RhythmPattern): number {
  const m: Record<RhythmPattern, number> = {
    straight: 3, swing: 7, syncopated: 8, polyrhythm: 6, rubato: 10,
  };
  return m[r];
}

export function metronomeDependence(r: RhythmPattern): number {
  const m: Record<RhythmPattern, number> = {
    straight: 10, swing: 6, syncopated: 7, polyrhythm: 8, rubato: 1,
  };
  return m[r];
}

export function strictTempo(r: RhythmPattern): boolean {
  const m: Record<RhythmPattern, boolean> = {
    straight: true, swing: true, syncopated: true, polyrhythm: true, rubato: false,
  };
  return m[r];
}

export function accentOnBeat(r: RhythmPattern): boolean {
  const m: Record<RhythmPattern, boolean> = {
    straight: true, swing: true, syncopated: false, polyrhythm: true, rubato: true,
  };
  return m[r];
}

export function bestGenre(r: RhythmPattern): string {
  const m: Record<RhythmPattern, string> = {
    straight: "rock_pop_march", swing: "jazz_blues",
    syncopated: "funk_reggae", polyrhythm: "african_progressive",
    rubato: "classical_ballad",
  };
  return m[r];
}

export function notationComplexity(r: RhythmPattern): string {
  const m: Record<RhythmPattern, string> = {
    straight: "simple_quarter_eighth", swing: "dotted_triplet",
    syncopated: "tied_offbeat", polyrhythm: "multiple_meters",
    rubato: "interpretive_markings",
  };
  return m[r];
}

export function rhythmPatterns(): RhythmPattern[] {
  return ["straight", "swing", "syncopated", "polyrhythm", "rubato"];
}

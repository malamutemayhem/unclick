export type ScentNote = "top" | "heart" | "base" | "linear" | "accord";

export function evaporationSpeed(n: ScentNote): number {
  const m: Record<ScentNote, number> = {
    top: 10, heart: 6, base: 2, linear: 5, accord: 5,
  };
  return m[n];
}

export function perceptionDuration(n: ScentNote): number {
  const m: Record<ScentNote, number> = {
    top: 2, heart: 6, base: 10, linear: 7, accord: 7,
  };
  return m[n];
}

export function characterImpact(n: ScentNote): number {
  const m: Record<ScentNote, number> = {
    top: 6, heart: 10, base: 7, linear: 8, accord: 9,
  };
  return m[n];
}

export function molecularWeight(n: ScentNote): number {
  const m: Record<ScentNote, number> = {
    top: 3, heart: 6, base: 10, linear: 6, accord: 7,
  };
  return m[n];
}

export function blendingDifficulty(n: ScentNote): number {
  const m: Record<ScentNote, number> = {
    top: 4, heart: 6, base: 5, linear: 3, accord: 9,
  };
  return m[n];
}

export function firstImpression(n: ScentNote): boolean {
  const m: Record<ScentNote, boolean> = {
    top: true, heart: false, base: false, linear: true, accord: false,
  };
  return m[n];
}

export function fixative(n: ScentNote): boolean {
  const m: Record<ScentNote, boolean> = {
    top: false, heart: false, base: true, linear: false, accord: false,
  };
  return m[n];
}

export function typicalIngredients(n: ScentNote): string {
  const m: Record<ScentNote, string> = {
    top: "citrus_herbs_light_fruits", heart: "rose_jasmine_spice",
    base: "musk_amber_wood_vanilla", linear: "single_dominant_aroma",
    accord: "balanced_multi_note_blend",
  };
  return m[n];
}

export function developmentTime(n: ScentNote): string {
  const m: Record<ScentNote, string> = {
    top: "first_15_minutes", heart: "15_min_to_4_hours",
    base: "4_hours_to_24_hours", linear: "constant_throughout",
    accord: "emerges_gradually",
  };
  return m[n];
}

export function scentNotes(): ScentNote[] {
  return ["top", "heart", "base", "linear", "accord"];
}

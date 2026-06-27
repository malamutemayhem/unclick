export type WritingSystem = "cuneiform" | "hieroglyphic" | "alphabetic" | "logographic" | "syllabary";

export function characterCount(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 600, hieroglyphic: 700, alphabetic: 30, logographic: 50000, syllabary: 80,
  };
  return m[ws];
}

export function learningDifficulty(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 8, hieroglyphic: 9, alphabetic: 3, logographic: 10, syllabary: 5,
  };
  return m[ws];
}

export function writingSpeed(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 3, hieroglyphic: 2, alphabetic: 9, logographic: 6, syllabary: 7,
  };
  return m[ws];
}

export function informationDensity(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 5, hieroglyphic: 6, alphabetic: 4, logographic: 10, syllabary: 6,
  };
  return m[ws];
}

export function ageYears(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 5400, hieroglyphic: 5200, alphabetic: 3800, logographic: 3300, syllabary: 3500,
  };
  return m[ws];
}

export function stillInUse(ws: WritingSystem): boolean {
  const m: Record<WritingSystem, boolean> = {
    cuneiform: false, hieroglyphic: false, alphabetic: true, logographic: true, syllabary: true,
  };
  return m[ws];
}

export function pictographic(ws: WritingSystem): boolean {
  const m: Record<WritingSystem, boolean> = {
    cuneiform: true, hieroglyphic: true, alphabetic: false, logographic: true, syllabary: false,
  };
  return m[ws];
}

export function exampleLanguage(ws: WritingSystem): string {
  const m: Record<WritingSystem, string> = {
    cuneiform: "sumerian", hieroglyphic: "egyptian", alphabetic: "latin",
    logographic: "chinese", syllabary: "japanese_kana",
  };
  return m[ws];
}

export function digitalAdaptation(ws: WritingSystem): number {
  const m: Record<WritingSystem, number> = {
    cuneiform: 2, hieroglyphic: 3, alphabetic: 10, logographic: 7, syllabary: 8,
  };
  return m[ws];
}

export function writingSystems(): WritingSystem[] {
  return ["cuneiform", "hieroglyphic", "alphabetic", "logographic", "syllabary"];
}

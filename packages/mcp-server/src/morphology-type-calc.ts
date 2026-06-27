export type MorphologyType = "isolating" | "agglutinative" | "fusional" | "polysynthetic" | "introflexive";

export function morphemesPerWord(m_type: MorphologyType): number {
  const m: Record<MorphologyType, number> = {
    isolating: 1, agglutinative: 7, fusional: 4, polysynthetic: 10, introflexive: 3,
  };
  return m[m_type];
}

export function transparencyScore(m_type: MorphologyType): number {
  const m: Record<MorphologyType, number> = {
    isolating: 10, agglutinative: 9, fusional: 4, polysynthetic: 6, introflexive: 3,
  };
  return m[m_type];
}

export function learningDifficulty(m_type: MorphologyType): number {
  const m: Record<MorphologyType, number> = {
    isolating: 3, agglutinative: 5, fusional: 7, polysynthetic: 10, introflexive: 8,
  };
  return m[m_type];
}

export function wordOrderImportance(m_type: MorphologyType): number {
  const m: Record<MorphologyType, number> = {
    isolating: 10, agglutinative: 5, fusional: 6, polysynthetic: 3, introflexive: 7,
  };
  return m[m_type];
}

export function inflectionalComplexity(m_type: MorphologyType): number {
  const m: Record<MorphologyType, number> = {
    isolating: 1, agglutinative: 6, fusional: 9, polysynthetic: 8, introflexive: 10,
  };
  return m[m_type];
}

export function toneUsed(m_type: MorphologyType): boolean {
  const m: Record<MorphologyType, boolean> = {
    isolating: true, agglutinative: false, fusional: false, polysynthetic: false, introflexive: false,
  };
  return m[m_type];
}

export function affixesStackable(m_type: MorphologyType): boolean {
  const m: Record<MorphologyType, boolean> = {
    isolating: false, agglutinative: true, fusional: false, polysynthetic: true, introflexive: false,
  };
  return m[m_type];
}

export function exampleLanguage(m_type: MorphologyType): string {
  const m: Record<MorphologyType, string> = {
    isolating: "mandarin_vietnamese", agglutinative: "turkish_finnish",
    fusional: "latin_russian", polysynthetic: "inuktitut_mohawk",
    introflexive: "arabic_hebrew",
  };
  return m[m_type];
}

export function grammarStrategy(m_type: MorphologyType): string {
  const m: Record<MorphologyType, string> = {
    isolating: "word_order_particles", agglutinative: "suffix_chains",
    fusional: "stem_changes_endings", polysynthetic: "word_as_sentence",
    introflexive: "root_vowel_pattern",
  };
  return m[m_type];
}

export function morphologyTypes(): MorphologyType[] {
  return ["isolating", "agglutinative", "fusional", "polysynthetic", "introflexive"];
}

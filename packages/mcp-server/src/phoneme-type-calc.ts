export type PhonemeType = "plosive" | "fricative" | "nasal" | "approximant" | "affricate";

export function frequencyInLanguages(p: PhonemeType): number {
  const m: Record<PhonemeType, number> = {
    plosive: 10, fricative: 8, nasal: 9, approximant: 7, affricate: 4,
  };
  return m[p];
}

export function articulationEffort(p: PhonemeType): number {
  const m: Record<PhonemeType, number> = {
    plosive: 6, fricative: 7, nasal: 3, approximant: 2, affricate: 9,
  };
  return m[p];
}

export function airflowRestriction(p: PhonemeType): number {
  const m: Record<PhonemeType, number> = {
    plosive: 10, fricative: 7, nasal: 5, approximant: 2, affricate: 9,
  };
  return m[p];
}

export function perceptualSalience(p: PhonemeType): number {
  const m: Record<PhonemeType, number> = {
    plosive: 9, fricative: 7, nasal: 4, approximant: 3, affricate: 8,
  };
  return m[p];
}

export function childAcquisitionOrder(p: PhonemeType): number {
  const m: Record<PhonemeType, number> = {
    plosive: 1, fricative: 3, nasal: 2, approximant: 4, affricate: 5,
  };
  return m[p];
}

export function voiced(p: PhonemeType): boolean {
  const m: Record<PhonemeType, boolean> = {
    plosive: false, fricative: false, nasal: true, approximant: true, affricate: false,
  };
  return m[p];
}

export function continuant(p: PhonemeType): boolean {
  const m: Record<PhonemeType, boolean> = {
    plosive: false, fricative: true, nasal: true, approximant: true, affricate: false,
  };
  return m[p];
}

export function exampleSound(p: PhonemeType): string {
  const m: Record<PhonemeType, string> = {
    plosive: "p_as_in_pat", fricative: "f_as_in_fat",
    nasal: "m_as_in_mat", approximant: "w_as_in_wet",
    affricate: "ch_as_in_chat",
  };
  return m[p];
}

export function articulationManner(p: PhonemeType): string {
  const m: Record<PhonemeType, string> = {
    plosive: "complete_closure", fricative: "narrow_constriction",
    nasal: "oral_closure_nasal_release", approximant: "open_approximation",
    affricate: "closure_then_release",
  };
  return m[p];
}

export function phonemeTypes(): PhonemeType[] {
  return ["plosive", "fricative", "nasal", "approximant", "affricate"];
}

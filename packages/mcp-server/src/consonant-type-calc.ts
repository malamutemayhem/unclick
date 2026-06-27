export type ConsonantType = "plosive" | "fricative" | "nasal" | "lateral" | "affricate";

export function voicingContrast(c: ConsonantType): number {
  const m: Record<ConsonantType, number> = {
    plosive: 10, fricative: 9, nasal: 3, lateral: 4, affricate: 8,
  };
  return m[c];
}

export function airflowRestriction(c: ConsonantType): number {
  const m: Record<ConsonantType, number> = {
    plosive: 10, fricative: 7, nasal: 5, lateral: 4, affricate: 9,
  };
  return m[c];
}

export function durationMs(c: ConsonantType): number {
  const m: Record<ConsonantType, number> = {
    plosive: 20, fricative: 80, nasal: 70, lateral: 60, affricate: 100,
  };
  return m[c];
}

export function crossLinguisticUse(c: ConsonantType): number {
  const m: Record<ConsonantType, number> = {
    plosive: 10, fricative: 8, nasal: 10, lateral: 7, affricate: 5,
  };
  return m[c];
}

export function perceptualSalience(c: ConsonantType): number {
  const m: Record<ConsonantType, number> = {
    plosive: 9, fricative: 7, nasal: 5, lateral: 4, affricate: 8,
  };
  return m[c];
}

export function completeBlockage(c: ConsonantType): boolean {
  const m: Record<ConsonantType, boolean> = {
    plosive: true, fricative: false, nasal: true, lateral: false, affricate: true,
  };
  return m[c];
}

export function nasalAirflow(c: ConsonantType): boolean {
  const m: Record<ConsonantType, boolean> = {
    plosive: false, fricative: false, nasal: true, lateral: false, affricate: false,
  };
  return m[c];
}

export function englishExample(c: ConsonantType): string {
  const m: Record<ConsonantType, string> = {
    plosive: "p_t_k_b_d_g", fricative: "f_s_sh_v_z",
    nasal: "m_n_ng", lateral: "l",
    affricate: "ch_j",
  };
  return m[c];
}

export function articulationMechanism(c: ConsonantType): string {
  const m: Record<ConsonantType, string> = {
    plosive: "stop_then_release", fricative: "narrow_constriction",
    nasal: "velum_lowered", lateral: "side_airflow",
    affricate: "stop_plus_fricative",
  };
  return m[c];
}

export function consonantTypes(): ConsonantType[] {
  return ["plosive", "fricative", "nasal", "lateral", "affricate"];
}

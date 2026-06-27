export type TinnitusTherapy = "sound_masking" | "trt" | "cbt" | "neuromodulation" | "hearing_aid_amplification";

export function effectivenessRating(t: TinnitusTherapy): number {
  const m: Record<TinnitusTherapy, number> = {
    sound_masking: 6, trt: 9, cbt: 8, neuromodulation: 7, hearing_aid_amplification: 8,
  };
  return m[t];
}

export function timeToRelief(t: TinnitusTherapy): number {
  const m: Record<TinnitusTherapy, number> = {
    sound_masking: 2, trt: 8, cbt: 7, neuromodulation: 5, hearing_aid_amplification: 3,
  };
  return m[t];
}

export function sessionCost(t: TinnitusTherapy): number {
  const m: Record<TinnitusTherapy, number> = {
    sound_masking: 3, trt: 7, cbt: 8, neuromodulation: 10, hearing_aid_amplification: 6,
  };
  return m[t];
}

export function longTermBenefit(t: TinnitusTherapy): number {
  const m: Record<TinnitusTherapy, number> = {
    sound_masking: 4, trt: 9, cbt: 10, neuromodulation: 6, hearing_aid_amplification: 7,
  };
  return m[t];
}

export function patientCompliance(t: TinnitusTherapy): number {
  const m: Record<TinnitusTherapy, number> = {
    sound_masking: 9, trt: 6, cbt: 5, neuromodulation: 7, hearing_aid_amplification: 8,
  };
  return m[t];
}

export function requiresClinician(t: TinnitusTherapy): boolean {
  const m: Record<TinnitusTherapy, boolean> = {
    sound_masking: false, trt: true, cbt: true, neuromodulation: true, hearing_aid_amplification: true,
  };
  return m[t];
}

export function deviceBased(t: TinnitusTherapy): boolean {
  const m: Record<TinnitusTherapy, boolean> = {
    sound_masking: true, trt: true, cbt: false, neuromodulation: true, hearing_aid_amplification: true,
  };
  return m[t];
}

export function mechanism(t: TinnitusTherapy): string {
  const m: Record<TinnitusTherapy, string> = {
    sound_masking: "broadband_noise_overlay", trt: "habituation_directive_counseling",
    cbt: "cognitive_restructuring_exposure", neuromodulation: "electrical_magnetic_stimulation",
    hearing_aid_amplification: "ambient_enrichment_gain",
  };
  return m[t];
}

export function bestCandidate(t: TinnitusTherapy): string {
  const m: Record<TinnitusTherapy, string> = {
    sound_masking: "immediate_relief_seeker", trt: "chronic_bothersome_tinnitus",
    cbt: "anxiety_distress_driven", neuromodulation: "treatment_resistant_case",
    hearing_aid_amplification: "tinnitus_with_hearing_loss",
  };
  return m[t];
}

export function tinnitusTherapies(): TinnitusTherapy[] {
  return ["sound_masking", "trt", "cbt", "neuromodulation", "hearing_aid_amplification"];
}

export type AudiometryTest = "pure_tone" | "speech" | "tympanometry" | "otoacoustic_emission" | "auditory_brainstem";

export function diagnosticAccuracy(a: AudiometryTest): number {
  const m: Record<AudiometryTest, number> = {
    pure_tone: 8, speech: 7, tympanometry: 6, otoacoustic_emission: 9, auditory_brainstem: 10,
  };
  return m[a];
}

export function testDuration(a: AudiometryTest): number {
  const m: Record<AudiometryTest, number> = {
    pure_tone: 5, speech: 4, tympanometry: 2, otoacoustic_emission: 3, auditory_brainstem: 8,
  };
  return m[a];
}

export function patientCooperation(a: AudiometryTest): number {
  const m: Record<AudiometryTest, number> = {
    pure_tone: 8, speech: 9, tympanometry: 3, otoacoustic_emission: 2, auditory_brainstem: 1,
  };
  return m[a];
}

export function equipmentCost(a: AudiometryTest): number {
  const m: Record<AudiometryTest, number> = {
    pure_tone: 5, speech: 4, tympanometry: 6, otoacoustic_emission: 8, auditory_brainstem: 10,
  };
  return m[a];
}

export function frequencyRange(a: AudiometryTest): number {
  const m: Record<AudiometryTest, number> = {
    pure_tone: 10, speech: 6, tympanometry: 3, otoacoustic_emission: 8, auditory_brainstem: 7,
  };
  return m[a];
}

export function requiresSoundBooth(a: AudiometryTest): boolean {
  const m: Record<AudiometryTest, boolean> = {
    pure_tone: true, speech: true, tympanometry: false, otoacoustic_emission: false, auditory_brainstem: false,
  };
  return m[a];
}

export function suitableForInfants(a: AudiometryTest): boolean {
  const m: Record<AudiometryTest, boolean> = {
    pure_tone: false, speech: false, tympanometry: true, otoacoustic_emission: true, auditory_brainstem: true,
  };
  return m[a];
}

export function stimulusType(a: AudiometryTest): string {
  const m: Record<AudiometryTest, string> = {
    pure_tone: "calibrated_sine_wave", speech: "recorded_word_list",
    tympanometry: "air_pressure_probe_tone", otoacoustic_emission: "click_tone_burst",
    auditory_brainstem: "click_chirp_electrode",
  };
  return m[a];
}

export function bestDiagnosis(a: AudiometryTest): string {
  const m: Record<AudiometryTest, string> = {
    pure_tone: "threshold_hearing_level", speech: "word_recognition_ability",
    tympanometry: "middle_ear_function", otoacoustic_emission: "outer_hair_cell_health",
    auditory_brainstem: "neural_pathway_integrity",
  };
  return m[a];
}

export function audiometryTests(): AudiometryTest[] {
  return ["pure_tone", "speech", "tympanometry", "otoacoustic_emission", "auditory_brainstem"];
}

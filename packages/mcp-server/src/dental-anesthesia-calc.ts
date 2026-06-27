export type DentalAnesthesia = "local_infiltration" | "nerve_block" | "topical" | "nitrous_oxide" | "iv_sedation";

export function anestheticDepth(d: DentalAnesthesia): number {
  const m: Record<DentalAnesthesia, number> = {
    local_infiltration: 7, nerve_block: 9, topical: 3, nitrous_oxide: 5, iv_sedation: 10,
  };
  return m[d];
}

export function onsetSpeed(d: DentalAnesthesia): number {
  const m: Record<DentalAnesthesia, number> = {
    local_infiltration: 8, nerve_block: 6, topical: 9, nitrous_oxide: 10, iv_sedation: 10,
  };
  return m[d];
}

export function durationMinutes(d: DentalAnesthesia): number {
  const m: Record<DentalAnesthesia, number> = {
    local_infiltration: 5, nerve_block: 9, topical: 2, nitrous_oxide: 1, iv_sedation: 8,
  };
  return m[d];
}

export function patientAnxietyRelief(d: DentalAnesthesia): number {
  const m: Record<DentalAnesthesia, number> = {
    local_infiltration: 3, nerve_block: 3, topical: 2, nitrous_oxide: 8, iv_sedation: 10,
  };
  return m[d];
}

export function riskLevel(d: DentalAnesthesia): number {
  const m: Record<DentalAnesthesia, number> = {
    local_infiltration: 2, nerve_block: 4, topical: 1, nitrous_oxide: 3, iv_sedation: 8,
  };
  return m[d];
}

export function requiresMonitoring(d: DentalAnesthesia): boolean {
  const m: Record<DentalAnesthesia, boolean> = {
    local_infiltration: false, nerve_block: false, topical: false, nitrous_oxide: true, iv_sedation: true,
  };
  return m[d];
}

export function selfAdministered(d: DentalAnesthesia): boolean {
  const m: Record<DentalAnesthesia, boolean> = {
    local_infiltration: false, nerve_block: false, topical: true, nitrous_oxide: false, iv_sedation: false,
  };
  return m[d];
}

export function deliveryMethod(d: DentalAnesthesia): string {
  const m: Record<DentalAnesthesia, string> = {
    local_infiltration: "syringe_injection_tissue", nerve_block: "syringe_injection_nerve_trunk",
    topical: "gel_spray_mucosal_surface", nitrous_oxide: "nasal_mask_inhalation",
    iv_sedation: "intravenous_catheter_drip",
  };
  return m[d];
}

export function bestProcedure(d: DentalAnesthesia): string {
  const m: Record<DentalAnesthesia, string> = {
    local_infiltration: "filling_single_extraction", nerve_block: "molar_extraction_root_canal",
    topical: "surface_numbing_pre_injection", nitrous_oxide: "anxious_patient_mild_procedure",
    iv_sedation: "complex_surgery_phobic_patient",
  };
  return m[d];
}

export function dentalAnesthesias(): DentalAnesthesia[] {
  return ["local_infiltration", "nerve_block", "topical", "nitrous_oxide", "iv_sedation"];
}

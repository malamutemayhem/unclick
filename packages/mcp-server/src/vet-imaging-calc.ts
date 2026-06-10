export type VetImaging = "radiograph" | "ultrasound" | "ct_scan" | "mri" | "fluoroscopy";

export function diagnosticDetail(v: VetImaging): number {
  const m: Record<VetImaging, number> = {
    radiograph: 6, ultrasound: 7, ct_scan: 9, mri: 10, fluoroscopy: 5,
  };
  return m[v];
}

export function acquisitionSpeed(v: VetImaging): number {
  const m: Record<VetImaging, number> = {
    radiograph: 10, ultrasound: 8, ct_scan: 6, mri: 3, fluoroscopy: 9,
  };
  return m[v];
}

export function softTissueContrast(v: VetImaging): number {
  const m: Record<VetImaging, number> = {
    radiograph: 3, ultrasound: 8, ct_scan: 7, mri: 10, fluoroscopy: 4,
  };
  return m[v];
}

export function boneDetail(v: VetImaging): number {
  const m: Record<VetImaging, number> = {
    radiograph: 8, ultrasound: 2, ct_scan: 10, mri: 5, fluoroscopy: 7,
  };
  return m[v];
}

export function equipmentCost(v: VetImaging): number {
  const m: Record<VetImaging, number> = {
    radiograph: 3, ultrasound: 5, ct_scan: 8, mri: 10, fluoroscopy: 6,
  };
  return m[v];
}

export function requiresSedation(v: VetImaging): boolean {
  const m: Record<VetImaging, boolean> = {
    radiograph: false, ultrasound: false, ct_scan: true, mri: true, fluoroscopy: true,
  };
  return m[v];
}

export function realTimeViewing(v: VetImaging): boolean {
  const m: Record<VetImaging, boolean> = {
    radiograph: false, ultrasound: true, ct_scan: false, mri: false, fluoroscopy: true,
  };
  return m[v];
}

export function imagingPhysics(v: VetImaging): string {
  const m: Record<VetImaging, string> = {
    radiograph: "x_ray_film_digital_plate", ultrasound: "piezoelectric_sound_wave",
    ct_scan: "rotating_x_ray_detector", mri: "magnetic_field_radio_pulse",
    fluoroscopy: "continuous_x_ray_screen",
  };
  return m[v];
}

export function bestDiagnosis(v: VetImaging): string {
  const m: Record<VetImaging, string> = {
    radiograph: "fracture_chest_abdomen", ultrasound: "pregnancy_cardiac_abdominal",
    ct_scan: "tumor_nasal_spinal", mri: "brain_spinal_cord_joint",
    fluoroscopy: "swallowing_study_catheter",
  };
  return m[v];
}

export function vetImagings(): VetImaging[] {
  return ["radiograph", "ultrasound", "ct_scan", "mri", "fluoroscopy"];
}

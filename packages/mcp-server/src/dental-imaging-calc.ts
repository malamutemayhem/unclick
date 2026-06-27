export type DentalImaging = "periapical" | "panoramic" | "cbct" | "bitewing" | "cephalometric";

export function diagnosticDetail(d: DentalImaging): number {
  const m: Record<DentalImaging, number> = {
    periapical: 8, panoramic: 6, cbct: 10, bitewing: 7, cephalometric: 5,
  };
  return m[d];
}

export function radiationDose(d: DentalImaging): number {
  const m: Record<DentalImaging, number> = {
    periapical: 2, panoramic: 4, cbct: 10, bitewing: 2, cephalometric: 3,
  };
  return m[d];
}

export function fieldOfView(d: DentalImaging): number {
  const m: Record<DentalImaging, number> = {
    periapical: 2, panoramic: 9, cbct: 10, bitewing: 3, cephalometric: 8,
  };
  return m[d];
}

export function acquisitionSpeed(d: DentalImaging): number {
  const m: Record<DentalImaging, number> = {
    periapical: 9, panoramic: 7, cbct: 5, bitewing: 9, cephalometric: 7,
  };
  return m[d];
}

export function equipmentCost(d: DentalImaging): number {
  const m: Record<DentalImaging, number> = {
    periapical: 3, panoramic: 6, cbct: 10, bitewing: 3, cephalometric: 5,
  };
  return m[d];
}

export function provides3D(d: DentalImaging): boolean {
  const m: Record<DentalImaging, boolean> = {
    periapical: false, panoramic: false, cbct: true, bitewing: false, cephalometric: false,
  };
  return m[d];
}

export function intraoral(d: DentalImaging): boolean {
  const m: Record<DentalImaging, boolean> = {
    periapical: true, panoramic: false, cbct: false, bitewing: true, cephalometric: false,
  };
  return m[d];
}

export function sensorType(d: DentalImaging): string {
  const m: Record<DentalImaging, string> = {
    periapical: "digital_phosphor_plate", panoramic: "rotating_detector_array",
    cbct: "flat_panel_cone_beam", bitewing: "digital_sensor_tab",
    cephalometric: "lateral_skull_detector",
  };
  return m[d];
}

export function bestDiagnosis(d: DentalImaging): string {
  const m: Record<DentalImaging, string> = {
    periapical: "root_canal_periapical_lesion", panoramic: "full_mouth_overview",
    cbct: "implant_planning_pathology", bitewing: "interproximal_caries_detection",
    cephalometric: "orthodontic_skeletal_analysis",
  };
  return m[d];
}

export function dentalImagings(): DentalImaging[] {
  return ["periapical", "panoramic", "cbct", "bitewing", "cephalometric"];
}

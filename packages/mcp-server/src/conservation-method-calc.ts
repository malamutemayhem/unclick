export type ConservationMethod = "preventive" | "stabilization" | "restoration" | "digital_preservation" | "environmental_control";

export function objectIntervention(c: ConservationMethod): number {
  const m: Record<ConservationMethod, number> = {
    preventive: 1, stabilization: 5, restoration: 9, digital_preservation: 2, environmental_control: 1,
  };
  return m[c];
}

export function costPerObject(c: ConservationMethod): number {
  const m: Record<ConservationMethod, number> = {
    preventive: 3, stabilization: 6, restoration: 10, digital_preservation: 5, environmental_control: 4,
  };
  return m[c];
}

export function reversibility(c: ConservationMethod): number {
  const m: Record<ConservationMethod, number> = {
    preventive: 10, stabilization: 7, restoration: 4, digital_preservation: 10, environmental_control: 10,
  };
  return m[c];
}

export function specialistRequired(c: ConservationMethod): number {
  const m: Record<ConservationMethod, number> = {
    preventive: 3, stabilization: 6, restoration: 10, digital_preservation: 5, environmental_control: 4,
  };
  return m[c];
}

export function longTermBenefit(c: ConservationMethod): number {
  const m: Record<ConservationMethod, number> = {
    preventive: 10, stabilization: 7, restoration: 6, digital_preservation: 9, environmental_control: 10,
  };
  return m[c];
}

export function touchesOriginal(c: ConservationMethod): boolean {
  const m: Record<ConservationMethod, boolean> = {
    preventive: false, stabilization: true, restoration: true, digital_preservation: false, environmental_control: false,
  };
  return m[c];
}

export function requiresLab(c: ConservationMethod): boolean {
  const m: Record<ConservationMethod, boolean> = {
    preventive: false, stabilization: true, restoration: true, digital_preservation: false, environmental_control: false,
  };
  return m[c];
}

export function primaryTechnique(c: ConservationMethod): string {
  const m: Record<ConservationMethod, string> = {
    preventive: "pest_management_handling_protocol", stabilization: "consolidant_adhesive_fill",
    restoration: "inpainting_retouching_reconstruction", digital_preservation: "high_res_scan_3d_model",
    environmental_control: "hvac_rh_light_monitoring",
  };
  return m[c];
}

export function bestApplication(c: ConservationMethod): string {
  const m: Record<ConservationMethod, string> = {
    preventive: "entire_collection_care", stabilization: "fragile_artifact_safe_display",
    restoration: "damaged_painting_return_view", digital_preservation: "at_risk_fragile_access",
    environmental_control: "gallery_storage_climate",
  };
  return m[c];
}

export function conservationMethods(): ConservationMethod[] {
  return ["preventive", "stabilization", "restoration", "digital_preservation", "environmental_control"];
}

export type AnesthesiaType = "general" | "regional" | "local" | "sedation" | "spinal";

export function onsetTimeMinutes(a: AnesthesiaType): number {
  const m: Record<AnesthesiaType, number> = {
    general: 5, regional: 15, local: 2, sedation: 3, spinal: 10,
  };
  return m[a];
}

export function durationHours(a: AnesthesiaType): number {
  const m: Record<AnesthesiaType, number> = {
    general: 4, regional: 3, local: 1, sedation: 2, spinal: 3,
  };
  return m[a];
}

export function riskLevel(a: AnesthesiaType): number {
  const m: Record<AnesthesiaType, number> = {
    general: 8, regional: 5, local: 2, sedation: 4, spinal: 6,
  };
  return m[a];
}

export function monitoringLevel(a: AnesthesiaType): number {
  const m: Record<AnesthesiaType, number> = {
    general: 10, regional: 6, local: 3, sedation: 7, spinal: 8,
  };
  return m[a];
}

export function recoveryTimeHours(a: AnesthesiaType): number {
  const m: Record<AnesthesiaType, number> = {
    general: 6, regional: 4, local: 0, sedation: 2, spinal: 4,
  };
  return m[a];
}

export function patientConscious(a: AnesthesiaType): boolean {
  const m: Record<AnesthesiaType, boolean> = {
    general: false, regional: true, local: true, sedation: true, spinal: true,
  };
  return m[a];
}

export function requiresIntubation(a: AnesthesiaType): boolean {
  const m: Record<AnesthesiaType, boolean> = {
    general: true, regional: false, local: false, sedation: false, spinal: false,
  };
  return m[a];
}

export function administrationRoute(a: AnesthesiaType): string {
  const m: Record<AnesthesiaType, string> = {
    general: "iv_or_inhalation", regional: "nerve_block_injection",
    local: "topical_or_injection", sedation: "iv",
    spinal: "lumbar_injection",
  };
  return m[a];
}

export function commonProcedure(a: AnesthesiaType): string {
  const m: Record<AnesthesiaType, string> = {
    general: "major_surgery", regional: "limb_surgery",
    local: "dental_procedure", sedation: "endoscopy",
    spinal: "cesarean_section",
  };
  return m[a];
}

export function anesthesiaTypes(): AnesthesiaType[] {
  return ["general", "regional", "local", "sedation", "spinal"];
}

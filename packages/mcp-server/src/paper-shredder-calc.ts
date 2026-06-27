export type PaperShredderType = "strip_cut_basic" | "cross_cut_standard" | "micro_cut_secure" | "diamond_cut_high" | "disintegrator_gov";

export function securityLevel(t: PaperShredderType): number {
  const m: Record<PaperShredderType, number> = {
    strip_cut_basic: 2, cross_cut_standard: 5, micro_cut_secure: 8, diamond_cut_high: 9, disintegrator_gov: 10,
  };
  return m[t];
}

export function sheetCapacity(t: PaperShredderType): number {
  const m: Record<PaperShredderType, number> = {
    strip_cut_basic: 10, cross_cut_standard: 7, micro_cut_secure: 5, diamond_cut_high: 4, disintegrator_gov: 3,
  };
  return m[t];
}

export function shredSpeed(t: PaperShredderType): number {
  const m: Record<PaperShredderType, number> = {
    strip_cut_basic: 10, cross_cut_standard: 7, micro_cut_secure: 5, diamond_cut_high: 4, disintegrator_gov: 6,
  };
  return m[t];
}

export function binVolume(t: PaperShredderType): number {
  const m: Record<PaperShredderType, number> = {
    strip_cut_basic: 5, cross_cut_standard: 6, micro_cut_secure: 7, diamond_cut_high: 8, disintegrator_gov: 10,
  };
  return m[t];
}

export function shredderCost(t: PaperShredderType): number {
  const m: Record<PaperShredderType, number> = {
    strip_cut_basic: 1, cross_cut_standard: 3, micro_cut_secure: 6, diamond_cut_high: 8, disintegrator_gov: 10,
  };
  return m[t];
}

export function shredsCards(t: PaperShredderType): boolean {
  const m: Record<PaperShredderType, boolean> = {
    strip_cut_basic: false, cross_cut_standard: true, micro_cut_secure: true, diamond_cut_high: true, disintegrator_gov: true,
  };
  return m[t];
}

export function jamProof(t: PaperShredderType): boolean {
  const m: Record<PaperShredderType, boolean> = {
    strip_cut_basic: false, cross_cut_standard: false, micro_cut_secure: true, diamond_cut_high: true, disintegrator_gov: true,
  };
  return m[t];
}

export function cutPattern(t: PaperShredderType): string {
  const m: Record<PaperShredderType, string> = {
    strip_cut_basic: "long_straight_strips",
    cross_cut_standard: "rectangular_confetti",
    micro_cut_secure: "tiny_particle_dust",
    diamond_cut_high: "diamond_shaped_micro",
    disintegrator_gov: "pulverized_fiber_dust",
  };
  return m[t];
}

export function bestOffice(t: PaperShredderType): string {
  const m: Record<PaperShredderType, string> = {
    strip_cut_basic: "home_general_recycling",
    cross_cut_standard: "small_office_daily",
    micro_cut_secure: "financial_data_privacy",
    diamond_cut_high: "legal_medical_hipaa",
    disintegrator_gov: "government_classified_nsa",
  };
  return m[t];
}

export function paperShredders(): PaperShredderType[] {
  return ["strip_cut_basic", "cross_cut_standard", "micro_cut_secure", "diamond_cut_high", "disintegrator_gov"];
}

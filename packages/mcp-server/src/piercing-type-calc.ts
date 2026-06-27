export type PiercingType = "earlobe" | "helix" | "septum" | "nostril" | "navel";

export function healingWeeks(p: PiercingType): number {
  const m: Record<PiercingType, number> = {
    earlobe: 6, helix: 26, septum: 12, nostril: 16, navel: 36,
  };
  return m[p];
}

export function painLevel(p: PiercingType): number {
  const m: Record<PiercingType, number> = {
    earlobe: 2, helix: 5, septum: 6, nostril: 4, navel: 5,
  };
  return m[p];
}

export function infectionRisk(p: PiercingType): number {
  const m: Record<PiercingType, number> = {
    earlobe: 2, helix: 5, septum: 4, nostril: 3, navel: 7,
  };
  return m[p];
}

export function rejectionRisk(p: PiercingType): number {
  const m: Record<PiercingType, number> = {
    earlobe: 1, helix: 3, septum: 2, nostril: 2, navel: 6,
  };
  return m[p];
}

export function aftercareDifficulty(p: PiercingType): number {
  const m: Record<PiercingType, number> = {
    earlobe: 2, helix: 6, septum: 4, nostril: 3, navel: 7,
  };
  return m[p];
}

export function canHideEasily(p: PiercingType): boolean {
  const m: Record<PiercingType, boolean> = {
    earlobe: false, helix: false, septum: true, nostril: false, navel: true,
  };
  return m[p];
}

export function suitableForFirstPiercing(p: PiercingType): boolean {
  const m: Record<PiercingType, boolean> = {
    earlobe: true, helix: true, septum: false, nostril: true, navel: false,
  };
  return m[p];
}

export function recommendedJewelry(p: PiercingType): string {
  const m: Record<PiercingType, string> = {
    earlobe: "stud_hoop", helix: "labret_stud",
    septum: "circular_barbell_clicker", nostril: "l_bend_stud",
    navel: "curved_barbell",
  };
  return m[p];
}

export function tissueType(p: PiercingType): string {
  const m: Record<PiercingType, string> = {
    earlobe: "soft_tissue_lobe", helix: "cartilage",
    septum: "membrane_sweet_spot", nostril: "cartilage_thin",
    navel: "surface_skin_fold",
  };
  return m[p];
}

export function piercingTypes(): PiercingType[] {
  return ["earlobe", "helix", "septum", "nostril", "navel"];
}

export type ParasiteType = "roundworm" | "tapeworm" | "flea" | "tick" | "mite";

export function hostRange(p: ParasiteType): number {
  const m: Record<ParasiteType, number> = {
    roundworm: 7, tapeworm: 6, flea: 9, tick: 10, mite: 8,
  };
  return m[p];
}

export function lifecycleDays(p: ParasiteType): number {
  const m: Record<ParasiteType, number> = {
    roundworm: 60, tapeworm: 90, flea: 30, tick: 730, mite: 21,
  };
  return m[p];
}

export function diseaseTransmissionRisk(p: ParasiteType): number {
  const m: Record<ParasiteType, number> = {
    roundworm: 5, tapeworm: 4, flea: 7, tick: 10, mite: 6,
  };
  return m[p];
}

export function treatmentDifficulty(p: ParasiteType): number {
  const m: Record<ParasiteType, number> = {
    roundworm: 3, tapeworm: 4, flea: 6, tick: 5, mite: 8,
  };
  return m[p];
}

export function prevalenceScore(p: ParasiteType): number {
  const m: Record<ParasiteType, number> = {
    roundworm: 8, tapeworm: 5, flea: 10, tick: 9, mite: 7,
  };
  return m[p];
}

export function internal(p: ParasiteType): boolean {
  const m: Record<ParasiteType, boolean> = {
    roundworm: true, tapeworm: true, flea: false, tick: false, mite: false,
  };
  return m[p];
}

export function zoonotic(p: ParasiteType): boolean {
  const m: Record<ParasiteType, boolean> = {
    roundworm: true, tapeworm: true, flea: false, tick: true, mite: true,
  };
  return m[p];
}

export function primaryTreatment(p: ParasiteType): string {
  const m: Record<ParasiteType, string> = {
    roundworm: "anthelmintic", tapeworm: "praziquantel",
    flea: "fipronil_topical", tick: "permethrin",
    mite: "ivermectin",
  };
  return m[p];
}

export function transmittedDisease(p: ParasiteType): string {
  const m: Record<ParasiteType, string> = {
    roundworm: "visceral_larva_migrans", tapeworm: "cysticercosis",
    flea: "bartonellosis", tick: "lyme_disease",
    mite: "sarcoptic_mange",
  };
  return m[p];
}

export function parasiteTypes(): ParasiteType[] {
  return ["roundworm", "tapeworm", "flea", "tick", "mite"];
}

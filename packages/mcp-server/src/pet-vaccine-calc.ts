export type PetVaccine = "core_canine" | "core_feline" | "rabies" | "bordetella" | "leptospirosis";

export function protectionLevel(p: PetVaccine): number {
  const m: Record<PetVaccine, number> = {
    core_canine: 10, core_feline: 10, rabies: 10, bordetella: 7, leptospirosis: 8,
  };
  return m[p];
}

export function durationOfImmunity(p: PetVaccine): number {
  const m: Record<PetVaccine, number> = {
    core_canine: 9, core_feline: 9, rabies: 8, bordetella: 4, leptospirosis: 5,
  };
  return m[p];
}

export function adverseReactionRisk(p: PetVaccine): number {
  const m: Record<PetVaccine, number> = {
    core_canine: 3, core_feline: 4, rabies: 3, bordetella: 2, leptospirosis: 6,
  };
  return m[p];
}

export function boosterFrequency(p: PetVaccine): number {
  const m: Record<PetVaccine, number> = {
    core_canine: 3, core_feline: 3, rabies: 4, bordetella: 8, leptospirosis: 7,
  };
  return m[p];
}

export function vaccineCost(p: PetVaccine): number {
  const m: Record<PetVaccine, number> = {
    core_canine: 5, core_feline: 5, rabies: 4, bordetella: 3, leptospirosis: 6,
  };
  return m[p];
}

export function legallyRequired(p: PetVaccine): boolean {
  const m: Record<PetVaccine, boolean> = {
    core_canine: false, core_feline: false, rabies: true, bordetella: false, leptospirosis: false,
  };
  return m[p];
}

export function intranasalOption(p: PetVaccine): boolean {
  const m: Record<PetVaccine, boolean> = {
    core_canine: false, core_feline: false, rabies: false, bordetella: true, leptospirosis: false,
  };
  return m[p];
}

export function vaccineType(p: PetVaccine): string {
  const m: Record<PetVaccine, string> = {
    core_canine: "modified_live_combo_dhpp", core_feline: "modified_live_combo_fvrcp",
    rabies: "killed_adjuvanted_recombinant", bordetella: "intranasal_live_avirulent",
    leptospirosis: "killed_bacterin_serovar",
  };
  return m[p];
}

export function protectsAgainst(p: PetVaccine): string {
  const m: Record<PetVaccine, string> = {
    core_canine: "distemper_parvo_hepatitis", core_feline: "herpes_calici_panleukopenia",
    rabies: "rabies_virus_zoonotic", bordetella: "kennel_cough_bronchitis",
    leptospirosis: "leptospira_kidney_liver",
  };
  return m[p];
}

export function petVaccines(): PetVaccine[] {
  return ["core_canine", "core_feline", "rabies", "bordetella", "leptospirosis"];
}

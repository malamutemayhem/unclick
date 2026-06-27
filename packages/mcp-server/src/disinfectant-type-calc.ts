export type DisinfectantType = "quaternary_ammonium" | "hypochlorite" | "hydrogen_peroxide" | "isopropyl_alcohol" | "peracetic_acid";

export function broadSpectrum(d: DisinfectantType): number {
  const m: Record<DisinfectantType, number> = {
    quaternary_ammonium: 5, hypochlorite: 8, hydrogen_peroxide: 9, isopropyl_alcohol: 6, peracetic_acid: 10,
  };
  return m[d];
}

export function contactTime(d: DisinfectantType): number {
  const m: Record<DisinfectantType, number> = {
    quaternary_ammonium: 7, hypochlorite: 5, hydrogen_peroxide: 4, isopropyl_alcohol: 3, peracetic_acid: 3,
  };
  return m[d];
}

export function surfaceCorrosion(d: DisinfectantType): number {
  const m: Record<DisinfectantType, number> = {
    quaternary_ammonium: 2, hypochlorite: 8, hydrogen_peroxide: 5, isopropyl_alcohol: 3, peracetic_acid: 7,
  };
  return m[d];
}

export function costPerLiter(d: DisinfectantType): number {
  const m: Record<DisinfectantType, number> = {
    quaternary_ammonium: 5, hypochlorite: 2, hydrogen_peroxide: 4, isopropyl_alcohol: 3, peracetic_acid: 8,
  };
  return m[d];
}

export function toxicity(d: DisinfectantType): number {
  const m: Record<DisinfectantType, number> = {
    quaternary_ammonium: 4, hypochlorite: 6, hydrogen_peroxide: 3, isopropyl_alcohol: 5, peracetic_acid: 7,
  };
  return m[d];
}

export function environmentallyFriendly(d: DisinfectantType): boolean {
  const m: Record<DisinfectantType, boolean> = {
    quaternary_ammonium: false, hypochlorite: false, hydrogen_peroxide: true, isopropyl_alcohol: false, peracetic_acid: true,
  };
  return m[d];
}

export function sporicidal(d: DisinfectantType): boolean {
  const m: Record<DisinfectantType, boolean> = {
    quaternary_ammonium: false, hypochlorite: true, hydrogen_peroxide: true, isopropyl_alcohol: false, peracetic_acid: true,
  };
  return m[d];
}

export function activeChemistry(d: DisinfectantType): string {
  const m: Record<DisinfectantType, string> = {
    quaternary_ammonium: "cationic_surfactant", hypochlorite: "sodium_hypochlorite_bleach",
    hydrogen_peroxide: "oxidizing_radical", isopropyl_alcohol: "protein_denaturant_70pct",
    peracetic_acid: "acetic_peroxide_mix",
  };
  return m[d];
}

export function bestApplication(d: DisinfectantType): string {
  const m: Record<DisinfectantType, string> = {
    quaternary_ammonium: "general_surface_cleaning", hypochlorite: "blood_spill_decontam",
    hydrogen_peroxide: "wound_care_room_fog", isopropyl_alcohol: "skin_prep_electronics",
    peracetic_acid: "food_processing_equipment",
  };
  return m[d];
}

export function disinfectantTypes(): DisinfectantType[] {
  return ["quaternary_ammonium", "hypochlorite", "hydrogen_peroxide", "isopropyl_alcohol", "peracetic_acid"];
}

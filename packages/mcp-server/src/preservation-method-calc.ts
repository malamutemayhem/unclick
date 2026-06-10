export type PreservationMethod = "canning" | "freezing" | "dehydration" | "smoking" | "pickling";

export function shelfLifeMonths(p: PreservationMethod): number {
  const m: Record<PreservationMethod, number> = {
    canning: 36, freezing: 12, dehydration: 24, smoking: 6, pickling: 18,
  };
  return m[p];
}

export function nutrientRetention(p: PreservationMethod): number {
  const m: Record<PreservationMethod, number> = {
    canning: 6, freezing: 9, dehydration: 5, smoking: 4, pickling: 7,
  };
  return m[p];
}

export function energyCost(p: PreservationMethod): number {
  const m: Record<PreservationMethod, number> = {
    canning: 7, freezing: 8, dehydration: 6, smoking: 5, pickling: 3,
  };
  return m[p];
}

export function flavorChange(p: PreservationMethod): number {
  const m: Record<PreservationMethod, number> = {
    canning: 5, freezing: 2, dehydration: 7, smoking: 9, pickling: 8,
  };
  return m[p];
}

export function textureChange(p: PreservationMethod): number {
  const m: Record<PreservationMethod, number> = {
    canning: 7, freezing: 4, dehydration: 9, smoking: 6, pickling: 5,
  };
  return m[p];
}

export function requiresRefrigeration(p: PreservationMethod): boolean {
  const m: Record<PreservationMethod, boolean> = {
    canning: false, freezing: true, dehydration: false, smoking: true, pickling: false,
  };
  return m[p];
}

export function killsPathogens(p: PreservationMethod): boolean {
  const m: Record<PreservationMethod, boolean> = {
    canning: true, freezing: false, dehydration: false, smoking: true, pickling: true,
  };
  return m[p];
}

export function bestSuitedFood(p: PreservationMethod): string {
  const m: Record<PreservationMethod, string> = {
    canning: "fruits_vegetables", freezing: "meats_prepared_meals",
    dehydration: "herbs_jerky", smoking: "fish_meats",
    pickling: "cucumbers_vegetables",
  };
  return m[p];
}

export function mechanism(p: PreservationMethod): string {
  const m: Record<PreservationMethod, string> = {
    canning: "heat_vacuum_seal", freezing: "low_temperature",
    dehydration: "moisture_removal", smoking: "antimicrobial_compounds",
    pickling: "acid_environment",
  };
  return m[p];
}

export function preservationMethods(): PreservationMethod[] {
  return ["canning", "freezing", "dehydration", "smoking", "pickling"];
}

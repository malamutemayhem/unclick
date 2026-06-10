export type CuisineType = "french" | "japanese" | "indian" | "mexican" | "italian";

export function spiceIntensity(c: CuisineType): number {
  const m: Record<CuisineType, number> = {
    french: 3, japanese: 2, indian: 10, mexican: 8, italian: 4,
  };
  return m[c];
}

export function techniqueComplexity(c: CuisineType): number {
  const m: Record<CuisineType, number> = {
    french: 10, japanese: 9, indian: 7, mexican: 5, italian: 6,
  };
  return m[c];
}

export function ingredientDiversity(c: CuisineType): number {
  const m: Record<CuisineType, number> = {
    french: 8, japanese: 7, indian: 10, mexican: 8, italian: 6,
  };
  return m[c];
}

export function globalPopularity(c: CuisineType): number {
  const m: Record<CuisineType, number> = {
    french: 7, japanese: 9, indian: 8, mexican: 8, italian: 10,
  };
  return m[c];
}

export function vegetarianFriendly(c: CuisineType): number {
  const m: Record<CuisineType, number> = {
    french: 4, japanese: 6, indian: 10, mexican: 7, italian: 8,
  };
  return m[c];
}

export function emphasizesFreshness(c: CuisineType): boolean {
  const m: Record<CuisineType, boolean> = {
    french: true, japanese: true, indian: false, mexican: true, italian: true,
  };
  return m[c];
}

export function riceBasedStaple(c: CuisineType): boolean {
  const m: Record<CuisineType, boolean> = {
    french: false, japanese: true, indian: true, mexican: false, italian: false,
  };
  return m[c];
}

export function signatureDish(c: CuisineType): string {
  const m: Record<CuisineType, string> = {
    french: "coq_au_vin", japanese: "sushi",
    indian: "butter_chicken", mexican: "tacos",
    italian: "pasta_carbonara",
  };
  return m[c];
}

export function cookingPhilosophy(c: CuisineType): string {
  const m: Record<CuisineType, string> = {
    french: "technique_mastery", japanese: "seasonal_harmony",
    indian: "spice_balance", mexican: "bold_flavors",
    italian: "quality_ingredients",
  };
  return m[c];
}

export function cuisineTypes(): CuisineType[] {
  return ["french", "japanese", "indian", "mexican", "italian"];
}

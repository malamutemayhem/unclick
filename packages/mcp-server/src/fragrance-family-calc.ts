export type FragranceFamily = "floral" | "oriental" | "woody" | "fresh" | "gourmand";

export function longevityHours(f: FragranceFamily): number {
  const m: Record<FragranceFamily, number> = {
    floral: 6, oriental: 9, woody: 8, fresh: 4, gourmand: 7,
  };
  return m[f];
}

export function sillage(f: FragranceFamily): number {
  const m: Record<FragranceFamily, number> = {
    floral: 6, oriental: 10, woody: 7, fresh: 4, gourmand: 8,
  };
  return m[f];
}

export function versatility(f: FragranceFamily): number {
  const m: Record<FragranceFamily, number> = {
    floral: 8, oriental: 5, woody: 7, fresh: 10, gourmand: 4,
  };
  return m[f];
}

export function seasonality(f: FragranceFamily): number {
  const m: Record<FragranceFamily, number> = {
    floral: 7, oriental: 4, woody: 6, fresh: 9, gourmand: 3,
  };
  return m[f];
}

export function complexityLevel(f: FragranceFamily): number {
  const m: Record<FragranceFamily, number> = {
    floral: 6, oriental: 10, woody: 7, fresh: 4, gourmand: 8,
  };
  return m[f];
}

export function unisex(f: FragranceFamily): boolean {
  const m: Record<FragranceFamily, boolean> = {
    floral: false, oriental: true, woody: true, fresh: true, gourmand: false,
  };
  return m[f];
}

export function officeAppropriate(f: FragranceFamily): boolean {
  const m: Record<FragranceFamily, boolean> = {
    floral: true, oriental: false, woody: true, fresh: true, gourmand: false,
  };
  return m[f];
}

export function keyIngredient(f: FragranceFamily): string {
  const m: Record<FragranceFamily, string> = {
    floral: "rose_jasmine_lily", oriental: "amber_vanilla_spice",
    woody: "sandalwood_cedar_vetiver", fresh: "citrus_aquatic_green",
    gourmand: "vanilla_chocolate_caramel",
  };
  return m[f];
}

export function bestSeason(f: FragranceFamily): string {
  const m: Record<FragranceFamily, string> = {
    floral: "spring_summer", oriental: "fall_winter",
    woody: "fall_year_round", fresh: "spring_summer",
    gourmand: "fall_winter",
  };
  return m[f];
}

export function fragranceFamilies(): FragranceFamily[] {
  return ["floral", "oriental", "woody", "fresh", "gourmand"];
}

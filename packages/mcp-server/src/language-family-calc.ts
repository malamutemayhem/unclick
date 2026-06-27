export type LanguageFamily = "indo_european" | "sino_tibetan" | "afro_asiatic" | "austronesian" | "niger_congo";

export function speakersBillions(f: LanguageFamily): number {
  const m: Record<LanguageFamily, number> = {
    indo_european: 3.2, sino_tibetan: 1.4, afro_asiatic: 0.6, austronesian: 0.4, niger_congo: 0.5,
  };
  return m[f];
}

export function languageCount(f: LanguageFamily): number {
  const m: Record<LanguageFamily, number> = {
    indo_european: 450, sino_tibetan: 450, afro_asiatic: 375, austronesian: 1250, niger_congo: 1500,
  };
  return m[f];
}

export function geographicSpread(f: LanguageFamily): number {
  const m: Record<LanguageFamily, number> = {
    indo_european: 10, sino_tibetan: 6, afro_asiatic: 7, austronesian: 9, niger_congo: 5,
  };
  return m[f];
}

export function morphologicalComplexity(f: LanguageFamily): number {
  const m: Record<LanguageFamily, number> = {
    indo_european: 7, sino_tibetan: 3, afro_asiatic: 9, austronesian: 6, niger_congo: 8,
  };
  return m[f];
}

export function tonalLanguageRatio(f: LanguageFamily): number {
  const m: Record<LanguageFamily, number> = {
    indo_european: 2, sino_tibetan: 10, afro_asiatic: 4, austronesian: 3, niger_congo: 8,
  };
  return m[f];
}

export function usesAlphabet(f: LanguageFamily): boolean {
  const m: Record<LanguageFamily, boolean> = {
    indo_european: true, sino_tibetan: false, afro_asiatic: true, austronesian: true, niger_congo: true,
  };
  return m[f];
}

export function hasGenderSystem(f: LanguageFamily): boolean {
  const m: Record<LanguageFamily, boolean> = {
    indo_european: true, sino_tibetan: false, afro_asiatic: true, austronesian: false, niger_congo: true,
  };
  return m[f];
}

export function exampleLanguage(f: LanguageFamily): string {
  const m: Record<LanguageFamily, string> = {
    indo_european: "english", sino_tibetan: "mandarin",
    afro_asiatic: "arabic", austronesian: "malay",
    niger_congo: "swahili",
  };
  return m[f];
}

export function originRegion(f: LanguageFamily): string {
  const m: Record<LanguageFamily, string> = {
    indo_european: "pontic_steppe", sino_tibetan: "yellow_river",
    afro_asiatic: "horn_of_africa", austronesian: "taiwan",
    niger_congo: "west_africa",
  };
  return m[f];
}

export function languageFamilies(): LanguageFamily[] {
  return ["indo_european", "sino_tibetan", "afro_asiatic", "austronesian", "niger_congo"];
}

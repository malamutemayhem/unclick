export type MushroomType = "chanterelle" | "morel" | "porcini" | "oyster" | "shiitake" | "lions_mane" | "chicken_of_woods";
export type Season = "spring" | "summer" | "fall" | "winter";

export function peakSeason(type: MushroomType): Season {
  const seasons: Record<MushroomType, Season> = {
    chanterelle: "summer", morel: "spring", porcini: "fall", oyster: "fall",
    shiitake: "fall", lions_mane: "fall", chicken_of_woods: "summer",
  };
  return seasons[type];
}

export function habitatType(type: MushroomType): string {
  const habitats: Record<MushroomType, string> = {
    chanterelle: "hardwood forest floor", morel: "burned or disturbed ground",
    porcini: "conifer and birch forests", oyster: "dead hardwood logs",
    shiitake: "oak and maple logs", lions_mane: "wounded hardwood trees",
    chicken_of_woods: "living or dead hardwood",
  };
  return habitats[type];
}

export function sporePrintColor(type: MushroomType): string {
  const colors: Record<MushroomType, string> = {
    chanterelle: "yellow to white", morel: "cream", porcini: "olive-brown",
    oyster: "white to lilac", shiitake: "white", lions_mane: "white",
    chicken_of_woods: "white",
  };
  return colors[type];
}

export function dryingTempC(type: MushroomType): number {
  const temps: Record<MushroomType, number> = {
    chanterelle: 55, morel: 50, porcini: 55, oyster: 60,
    shiitake: 60, lions_mane: 55, chicken_of_woods: 55,
  };
  return temps[type];
}

export function dryingHours(thicknessMm: number): number {
  return Math.ceil(thicknessMm * 1.5);
}

export function driedWeight(freshWeightG: number): number {
  return parseFloat((freshWeightG * 0.1).toFixed(0));
}

export function rehydrationRatio(): number {
  return 8;
}

export function shelfLifeDays(dried: boolean): number {
  return dried ? 365 : 7;
}

export function toxicityWarning(): string {
  return "Never eat wild mushrooms without expert identification";
}

export function yieldPerHour(experience: "beginner" | "intermediate" | "expert"): number {
  const grams: Record<string, number> = { beginner: 50, intermediate: 200, expert: 500 };
  return grams[experience];
}

export function marketValuePerKg(type: MushroomType): number {
  const prices: Record<MushroomType, number> = {
    chanterelle: 35, morel: 80, porcini: 60, oyster: 15,
    shiitake: 20, lions_mane: 25, chicken_of_woods: 20,
  };
  return prices[type];
}

export function cookingMethod(type: MushroomType): string {
  const methods: Record<MushroomType, string> = {
    chanterelle: "saute in butter", morel: "pan-fry with cream",
    porcini: "risotto or pasta", oyster: "stir-fry",
    shiitake: "soup or stir-fry", lions_mane: "sear like scallops",
    chicken_of_woods: "bread and fry",
  };
  return methods[type];
}

export function mushroomTypes(): MushroomType[] {
  return ["chanterelle", "morel", "porcini", "oyster", "shiitake", "lions_mane", "chicken_of_woods"];
}

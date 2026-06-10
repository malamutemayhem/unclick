export type BiomeType = "rainforest" | "savanna" | "tundra" | "taiga" | "chaparral";

export function annualRainfallMm(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 2500, savanna: 900, tundra: 200, taiga: 500, chaparral: 400,
  };
  return m[biome];
}

export function avgTempCelsius(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 27, savanna: 25, tundra: -15, taiga: -5, chaparral: 18,
  };
  return m[biome];
}

export function speciesRichness(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 10, savanna: 7, tundra: 2, taiga: 4, chaparral: 6,
  };
  return m[biome];
}

export function canopyHeight(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 10, savanna: 4, tundra: 0, taiga: 6, chaparral: 2,
  };
  return m[biome];
}

export function soilFertility(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 3, savanna: 6, tundra: 2, taiga: 4, chaparral: 5,
  };
  return m[biome];
}

export function fireAdapted(biome: BiomeType): boolean {
  const m: Record<BiomeType, boolean> = {
    rainforest: false, savanna: true, tundra: false, taiga: true, chaparral: true,
  };
  return m[biome];
}

export function seasonalDormancy(biome: BiomeType): boolean {
  const m: Record<BiomeType, boolean> = {
    rainforest: false, savanna: true, tundra: true, taiga: true, chaparral: true,
  };
  return m[biome];
}

export function dominantVegetation(biome: BiomeType): string {
  const m: Record<BiomeType, string> = {
    rainforest: "broadleaf_trees", savanna: "grasses_scattered_trees", tundra: "mosses_lichens",
    taiga: "coniferous_trees", chaparral: "shrubs",
  };
  return m[biome];
}

export function carbonStorageTonPerHa(biome: BiomeType): number {
  const m: Record<BiomeType, number> = {
    rainforest: 250, savanna: 50, tundra: 150, taiga: 200, chaparral: 30,
  };
  return m[biome];
}

export function biomeTypes(): BiomeType[] {
  return ["rainforest", "savanna", "tundra", "taiga", "chaparral"];
}

export type TopiaryShape = "sphere" | "cone" | "spiral" | "animal" | "cube" | "pyramid";
export type PlantType = "boxwood" | "yew" | "privet" | "holly" | "myrtle" | "rosemary";

export function growthRate(plant: PlantType): number {
  const cmPerYear: Record<PlantType, number> = {
    boxwood: 10, yew: 15, privet: 30, holly: 20, myrtle: 15, rosemary: 20,
  };
  return cmPerYear[plant];
}

export function trimFrequency(plant: PlantType): number {
  const timesPerYear: Record<PlantType, number> = {
    boxwood: 2, yew: 2, privet: 4, holly: 2, myrtle: 3, rosemary: 3,
  };
  return timesPerYear[plant];
}

export function frameSize(shape: TopiaryShape, heightCm: number): number {
  const factor: Record<TopiaryShape, number> = {
    sphere: 1.1, cone: 1.05, spiral: 1.2, animal: 1.3, cube: 1.05, pyramid: 1.1,
  };
  return parseFloat((heightCm * factor[shape]).toFixed(0));
}

export function maturityYears(shape: TopiaryShape, plant: PlantType): number {
  const complexity: Record<TopiaryShape, number> = {
    sphere: 2, cone: 2, spiral: 4, animal: 6, cube: 3, pyramid: 3,
  };
  const rate = growthRate(plant);
  return Math.ceil(complexity[shape] * 30 / rate);
}

export function wateringLiters(heightCm: number): number {
  return parseFloat((heightCm * 0.1).toFixed(1));
}

export function fertilizerGrams(heightCm: number, season: "spring" | "summer" | "fall"): number {
  const factor: Record<string, number> = { spring: 1.5, summer: 1, fall: 0.5 };
  return parseFloat((heightCm * 0.5 * factor[season]).toFixed(0));
}

export function clippingsVolume(surfaceAreaCm2: number, trimDepthCm: number): number {
  return parseFloat((surfaceAreaCm2 * trimDepthCm / 1000).toFixed(1));
}

export function shearBlade(shapePrecision: "rough" | "medium" | "fine"): string {
  const blades: Record<string, string> = {
    rough: "hedge shears", medium: "hand shears", fine: "topiary scissors",
  };
  return blades[shapePrecision];
}

export function frostProtection(plant: PlantType): boolean {
  return plant === "myrtle" || plant === "rosemary";
}

export function sunlightHours(plant: PlantType): number {
  const hours: Record<PlantType, number> = {
    boxwood: 4, yew: 4, privet: 6, holly: 4, myrtle: 6, rosemary: 8,
  };
  return hours[plant];
}

export function difficulty(shape: TopiaryShape): number {
  const levels: Record<TopiaryShape, number> = {
    sphere: 2, cone: 1, spiral: 4, animal: 5, cube: 3, pyramid: 2,
  };
  return levels[shape];
}

export function topiaryShapes(): TopiaryShape[] {
  return ["sphere", "cone", "spiral", "animal", "cube", "pyramid"];
}

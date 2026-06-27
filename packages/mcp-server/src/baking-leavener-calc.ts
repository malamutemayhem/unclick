export type LeavenerType = "yeast" | "baking_soda" | "baking_powder" | "sourdough" | "steam";

export function riseTime(l: LeavenerType): number {
  const m: Record<LeavenerType, number> = {
    yeast: 7, baking_soda: 1, baking_powder: 2, sourdough: 10, steam: 1,
  };
  return m[l];
}

export function flavorComplexity(l: LeavenerType): number {
  const m: Record<LeavenerType, number> = {
    yeast: 7, baking_soda: 2, baking_powder: 2, sourdough: 10, steam: 1,
  };
  return m[l];
}

export function textureOpenness(l: LeavenerType): number {
  const m: Record<LeavenerType, number> = {
    yeast: 8, baking_soda: 5, baking_powder: 6, sourdough: 9, steam: 7,
  };
  return m[l];
}

export function shelfStability(l: LeavenerType): number {
  const m: Record<LeavenerType, number> = {
    yeast: 4, baking_soda: 10, baking_powder: 9, sourdough: 2, steam: 10,
  };
  return m[l];
}

export function skillRequired(l: LeavenerType): number {
  const m: Record<LeavenerType, number> = {
    yeast: 6, baking_soda: 3, baking_powder: 2, sourdough: 10, steam: 7,
  };
  return m[l];
}

export function biological(l: LeavenerType): boolean {
  const m: Record<LeavenerType, boolean> = {
    yeast: true, baking_soda: false, baking_powder: false, sourdough: true, steam: false,
  };
  return m[l];
}

export function requiresAcid(l: LeavenerType): boolean {
  const m: Record<LeavenerType, boolean> = {
    yeast: false, baking_soda: true, baking_powder: false, sourdough: false, steam: false,
  };
  return m[l];
}

export function bestProduct(l: LeavenerType): string {
  const m: Record<LeavenerType, string> = {
    yeast: "bread", baking_soda: "cookies",
    baking_powder: "muffins", sourdough: "artisan_bread",
    steam: "puff_pastry",
  };
  return m[l];
}

export function gasProduced(l: LeavenerType): string {
  const m: Record<LeavenerType, string> = {
    yeast: "co2_ethanol", baking_soda: "co2",
    baking_powder: "co2", sourdough: "co2_ethanol",
    steam: "water_vapor",
  };
  return m[l];
}

export function leavenerTypes(): LeavenerType[] {
  return ["yeast", "baking_soda", "baking_powder", "sourdough", "steam"];
}

export type FabricWeave = "plain" | "twill" | "satin" | "basket" | "jacquard";

export function threadDensity(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 7, twill: 8, satin: 9, basket: 5, jacquard: 10,
  };
  return m[w];
}

export function drapeQuality(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 4, twill: 7, satin: 10, basket: 3, jacquard: 8,
  };
  return m[w];
}

export function abrasionResistance(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 8, twill: 9, satin: 4, basket: 7, jacquard: 6,
  };
  return m[w];
}

export function patternComplexity(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 1, twill: 4, satin: 3, basket: 2, jacquard: 10,
  };
  return m[w];
}

export function productionSpeed(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 10, twill: 7, satin: 6, basket: 8, jacquard: 3,
  };
  return m[w];
}

export function showsWarpDominant(w: FabricWeave): boolean {
  const m: Record<FabricWeave, boolean> = {
    plain: false, twill: false, satin: true, basket: false, jacquard: false,
  };
  return m[w];
}

export function diagonal(w: FabricWeave): boolean {
  const m: Record<FabricWeave, boolean> = {
    plain: false, twill: true, satin: false, basket: false, jacquard: false,
  };
  return m[w];
}

export function bestApplication(w: FabricWeave): string {
  const m: Record<FabricWeave, string> = {
    plain: "shirts", twill: "denim", satin: "evening_wear",
    basket: "canvas", jacquard: "upholstery",
  };
  return m[w];
}

export function floatLength(w: FabricWeave): number {
  const m: Record<FabricWeave, number> = {
    plain: 1, twill: 2, satin: 4, basket: 2, jacquard: 3,
  };
  return m[w];
}

export function fabricWeaves(): FabricWeave[] {
  return ["plain", "twill", "satin", "basket", "jacquard"];
}

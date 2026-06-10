export type PlasterLayer = "scratch" | "brown" | "finish" | "burnished" | "lime_wash";

export function thicknessMm(layer: PlasterLayer): number {
  const thickness: Record<PlasterLayer, number> = {
    scratch: 12, brown: 8, finish: 3, burnished: 2, lime_wash: 1,
  };
  return thickness[layer];
}

export function sandRatioPercent(layer: PlasterLayer): number {
  const ratios: Record<PlasterLayer, number> = {
    scratch: 70, brown: 60, finish: 30, burnished: 20, lime_wash: 0,
  };
  return ratios[layer];
}

export function fiberRequired(layer: PlasterLayer): boolean {
  return layer === "scratch" || layer === "brown";
}

export function dryingTimeHours(layer: PlasterLayer): number {
  const hours: Record<PlasterLayer, number> = {
    scratch: 48, brown: 36, finish: 24, burnished: 12, lime_wash: 4,
  };
  return hours[layer];
}

export function applicationToolWidth(layer: PlasterLayer): string {
  const tools: Record<PlasterLayer, string> = {
    scratch: "notched_trowel", brown: "flat_trowel", finish: "pool_trowel",
    burnished: "polishing_stone", lime_wash: "brush",
  };
  return tools[layer];
}

export function coverageM2PerKg(layer: PlasterLayer): number {
  const coverage: Record<PlasterLayer, number> = {
    scratch: 0.5, brown: 0.8, finish: 2, burnished: 3, lime_wash: 5,
  };
  return coverage[layer];
}

export function breathabilityRating(layer: PlasterLayer): number {
  const ratings: Record<PlasterLayer, number> = {
    scratch: 5, brown: 5, finish: 4, burnished: 3, lime_wash: 5,
  };
  return ratings[layer];
}

export function repairability(layer: PlasterLayer): number {
  const ratings: Record<PlasterLayer, number> = {
    scratch: 5, brown: 5, finish: 4, burnished: 3, lime_wash: 5,
  };
  return ratings[layer];
}

export function costPerM2(layer: PlasterLayer): number {
  const costs: Record<PlasterLayer, number> = {
    scratch: 5, brown: 4, finish: 8, burnished: 15, lime_wash: 2,
  };
  return costs[layer];
}

export function plasterLayers(): PlasterLayer[] {
  return ["scratch", "brown", "finish", "burnished", "lime_wash"];
}

export type PointingStyle = "flush" | "weathered" | "recessed" | "struck" | "tuck";

export function jointDepthMm(style: PointingStyle): number {
  const depths: Record<PointingStyle, number> = {
    flush: 0, weathered: 3, recessed: 5, struck: 3, tuck: 8,
  };
  return depths[style];
}

export function toolRequired(style: PointingStyle): string {
  const tools: Record<PointingStyle, string> = {
    flush: "trowel", weathered: "slicker", recessed: "raker", struck: "trowel", tuck: "jointer",
  };
  return tools[style];
}

export function mortarConsumptionKgPerM2(jointWidthMm: number, jointSpacingCm: number): number {
  if (jointSpacingCm <= 0) return 0;
  return parseFloat(((jointWidthMm * 100 / jointSpacingCm) * 0.02).toFixed(2));
}

export function weatherResistance(style: PointingStyle): number {
  const ratings: Record<PointingStyle, number> = {
    flush: 3, weathered: 5, recessed: 2, struck: 4, tuck: 4,
  };
  return ratings[style];
}

export function aestheticRating(style: PointingStyle): number {
  const ratings: Record<PointingStyle, number> = {
    flush: 2, weathered: 3, recessed: 4, struck: 3, tuck: 5,
  };
  return ratings[style];
}

export function difficultyRating(style: PointingStyle): number {
  const ratings: Record<PointingStyle, number> = {
    flush: 1, weathered: 2, recessed: 2, struck: 3, tuck: 5,
  };
  return ratings[style];
}

export function repointIntervalYears(style: PointingStyle): number {
  const years: Record<PointingStyle, number> = {
    flush: 15, weathered: 25, recessed: 10, struck: 20, tuck: 30,
  };
  return years[style];
}

export function rakeOutDepthMm(): number {
  return 20;
}

export function costPerM2(style: PointingStyle): number {
  const costs: Record<PointingStyle, number> = {
    flush: 15, weathered: 20, recessed: 18, struck: 22, tuck: 35,
  };
  return costs[style];
}

export function pointingStyles(): PointingStyle[] {
  return ["flush", "weathered", "recessed", "struck", "tuck"];
}

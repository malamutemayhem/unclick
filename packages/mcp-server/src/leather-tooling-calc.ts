export type ToolingStyle = "sheridan" | "floral" | "geometric" | "celtic" | "basket_weave";

export function casingTimeMinutes(thicknessMm: number): number {
  return Math.round(thicknessMm * 10);
}

export function toolCount(style: ToolingStyle): number {
  const counts: Record<ToolingStyle, number> = {
    sheridan: 15, floral: 12, geometric: 8, celtic: 10, basket_weave: 5,
  };
  return counts[style];
}

export function detailLevel(style: ToolingStyle): number {
  const levels: Record<ToolingStyle, number> = {
    sheridan: 5, floral: 4, geometric: 3, celtic: 4, basket_weave: 2,
  };
  return levels[style];
}

export function workingTimeHoursPerDm2(style: ToolingStyle): number {
  const hours: Record<ToolingStyle, number> = {
    sheridan: 4, floral: 3, geometric: 2, celtic: 3.5, basket_weave: 1,
  };
  return hours[style];
}

export function idealThicknessMm(style: ToolingStyle): number {
  const thickness: Record<ToolingStyle, number> = {
    sheridan: 3.5, floral: 3.0, geometric: 2.5, celtic: 3.0, basket_weave: 2.5,
  };
  return thickness[style];
}

export function swivelKnifeAngleDeg(): number {
  return 45;
}

export function malletWeightOz(style: ToolingStyle): number {
  const weights: Record<ToolingStyle, number> = {
    sheridan: 16, floral: 12, geometric: 10, celtic: 14, basket_weave: 10,
  };
  return weights[style];
}

export function dyeCoats(style: ToolingStyle): number {
  const coats: Record<ToolingStyle, number> = {
    sheridan: 3, floral: 2, geometric: 1, celtic: 2, basket_weave: 1,
  };
  return coats[style];
}

export function costPerHour(style: ToolingStyle): number {
  const costs: Record<ToolingStyle, number> = {
    sheridan: 80, floral: 60, geometric: 40, celtic: 70, basket_weave: 30,
  };
  return costs[style];
}

export function toolingStyles(): ToolingStyle[] {
  return ["sheridan", "floral", "geometric", "celtic", "basket_weave"];
}

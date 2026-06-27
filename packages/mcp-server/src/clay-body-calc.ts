export type ClayType = "earthenware" | "stoneware" | "porcelain" | "ball_clay" | "terracotta";

export function firingRangeCelsius(clay: ClayType): { min: number; max: number } {
  const ranges: Record<ClayType, { min: number; max: number }> = {
    earthenware: { min: 900, max: 1150 },
    stoneware: { min: 1200, max: 1300 },
    porcelain: { min: 1260, max: 1400 },
    ball_clay: { min: 1100, max: 1300 },
    terracotta: { min: 900, max: 1060 },
  };
  return ranges[clay];
}

export function shrinkagePercent(clay: ClayType): number {
  const shrink: Record<ClayType, number> = {
    earthenware: 5, stoneware: 10, porcelain: 15, ball_clay: 12, terracotta: 6,
  };
  return shrink[clay];
}

export function absorptionPercent(clay: ClayType): number {
  const absorb: Record<ClayType, number> = {
    earthenware: 10, stoneware: 2, porcelain: 0, ball_clay: 3, terracotta: 12,
  };
  return absorb[clay];
}

export function plasticity(clay: ClayType): number {
  const plast: Record<ClayType, number> = {
    earthenware: 4, stoneware: 4, porcelain: 2, ball_clay: 5, terracotta: 3,
  };
  return plast[clay];
}

export function colorAfterFiring(clay: ClayType): string {
  const colors: Record<ClayType, string> = {
    earthenware: "buff", stoneware: "grey_brown", porcelain: "white",
    ball_clay: "cream", terracotta: "red_orange",
  };
  return colors[clay];
}

export function translucency(clay: ClayType): boolean {
  return clay === "porcelain";
}

export function strengthRating(clay: ClayType): number {
  const strength: Record<ClayType, number> = {
    earthenware: 2, stoneware: 4, porcelain: 5, ball_clay: 3, terracotta: 2,
  };
  return strength[clay];
}

export function glazeRequired(clay: ClayType): boolean {
  return clay === "earthenware" || clay === "terracotta";
}

export function costPerKg(clay: ClayType): number {
  const costs: Record<ClayType, number> = {
    earthenware: 1, stoneware: 2, porcelain: 5, ball_clay: 1.5, terracotta: 0.8,
  };
  return costs[clay];
}

export function clayTypes(): ClayType[] {
  return ["earthenware", "stoneware", "porcelain", "ball_clay", "terracotta"];
}

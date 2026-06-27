export type ClayType = "red_earthenware" | "white_earthenware" | "ball_clay" | "kaolin" | "fireclay";

export function settleDays(clayType: ClayType): number {
  const days: Record<ClayType, number> = {
    red_earthenware: 2, white_earthenware: 3, ball_clay: 4, kaolin: 5, fireclay: 3,
  };
  return days[clayType];
}

export function defloccWaterRatio(clayType: ClayType): number {
  const ratios: Record<ClayType, number> = {
    red_earthenware: 1.5, white_earthenware: 1.8, ball_clay: 2.0, kaolin: 2.5, fireclay: 1.7,
  };
  return ratios[clayType];
}

export function sodiumSilicateGPerLiter(clayType: ClayType): number {
  const g: Record<ClayType, number> = {
    red_earthenware: 2, white_earthenware: 3, ball_clay: 4, kaolin: 5, fireclay: 3,
  };
  return g[clayType];
}

export function applicationCoats(): number {
  return 3;
}

export function burnishRequired(): boolean {
  return true;
}

export function firingTempCelsius(clayType: ClayType): number {
  const temps: Record<ClayType, number> = {
    red_earthenware: 900, white_earthenware: 950, ball_clay: 1000, kaolin: 1050, fireclay: 1100,
  };
  return temps[clayType];
}

export function sheenRating(clayType: ClayType): number {
  const ratings: Record<ClayType, number> = {
    red_earthenware: 5, white_earthenware: 4, ball_clay: 3, kaolin: 2, fireclay: 2,
  };
  return ratings[clayType];
}

export function colorRange(clayType: ClayType): string {
  const colors: Record<ClayType, string> = {
    red_earthenware: "red_orange", white_earthenware: "cream", ball_clay: "tan",
    kaolin: "white", fireclay: "buff",
  };
  return colors[clayType];
}

export function costPerKg(clayType: ClayType): number {
  const costs: Record<ClayType, number> = {
    red_earthenware: 3, white_earthenware: 4, ball_clay: 5, kaolin: 8, fireclay: 3,
  };
  return costs[clayType];
}

export function clayTypes(): ClayType[] {
  return ["red_earthenware", "white_earthenware", "ball_clay", "kaolin", "fireclay"];
}

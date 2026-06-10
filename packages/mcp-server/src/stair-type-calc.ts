export type StairType = "straight" | "l_shaped" | "u_shaped" | "spiral" | "floating";

export function footprint(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 8, l_shaped: 6, u_shaped: 5, spiral: 2, floating: 7,
  };
  return m[s];
}

export function safetyRating(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 9, l_shaped: 8, u_shaped: 8, spiral: 4, floating: 5,
  };
  return m[s];
}

export function aestheticScore(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 5, l_shaped: 6, u_shaped: 7, spiral: 9, floating: 10,
  };
  return m[s];
}

export function buildComplexity(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 2, l_shaped: 5, u_shaped: 6, spiral: 8, floating: 9,
  };
  return m[s];
}

export function accessibilityScore(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 8, l_shaped: 7, u_shaped: 7, spiral: 2, floating: 4,
  };
  return m[s];
}

export function hasLanding(s: StairType): boolean {
  const m: Record<StairType, boolean> = {
    straight: false, l_shaped: true, u_shaped: true, spiral: false, floating: false,
  };
  return m[s];
}

export function openRiser(s: StairType): boolean {
  const m: Record<StairType, boolean> = {
    straight: false, l_shaped: false, u_shaped: false, spiral: false, floating: true,
  };
  return m[s];
}

export function bestSetting(s: StairType): string {
  const m: Record<StairType, string> = {
    straight: "traditional_home", l_shaped: "split_level",
    u_shaped: "commercial", spiral: "loft", floating: "modern_gallery",
  };
  return m[s];
}

export function costPerStep(s: StairType): number {
  const m: Record<StairType, number> = {
    straight: 80, l_shaped: 120, u_shaped: 130, spiral: 200, floating: 350,
  };
  return m[s];
}

export function stairTypes(): StairType[] {
  return ["straight", "l_shaped", "u_shaped", "spiral", "floating"];
}

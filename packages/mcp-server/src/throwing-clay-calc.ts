export type ThrowingClay = "stoneware" | "porcelain" | "earthenware" | "terracotta" | "raku_body";

export function plasticityRating(clay: ThrowingClay): number {
  const m: Record<ThrowingClay, number> = {
    stoneware: 8, porcelain: 5, earthenware: 7, terracotta: 6, raku_body: 7,
  };
  return m[clay];
}

export function firingTempCelsius(clay: ThrowingClay): number {
  const m: Record<ThrowingClay, number> = {
    stoneware: 1280, porcelain: 1350, earthenware: 1050, terracotta: 1000, raku_body: 950,
  };
  return m[clay];
}

export function shrinkagePercent(clay: ThrowingClay): number {
  const m: Record<ThrowingClay, number> = {
    stoneware: 12, porcelain: 15, earthenware: 8, terracotta: 7, raku_body: 10,
  };
  return m[clay];
}

export function strengthFired(clay: ThrowingClay): number {
  const m: Record<ThrowingClay, number> = {
    stoneware: 8, porcelain: 9, earthenware: 4, terracotta: 3, raku_body: 3,
  };
  return m[clay];
}

export function colorFired(clay: ThrowingClay): string {
  const m: Record<ThrowingClay, string> = {
    stoneware: "gray_brown", porcelain: "white", earthenware: "buff",
    terracotta: "red_orange", raku_body: "off_white",
  };
  return m[clay];
}

export function translucent(clay: ThrowingClay): boolean {
  const m: Record<ThrowingClay, boolean> = {
    stoneware: false, porcelain: true, earthenware: false, terracotta: false, raku_body: false,
  };
  return m[clay];
}

export function waterproof(clay: ThrowingClay): boolean {
  const m: Record<ThrowingClay, boolean> = {
    stoneware: true, porcelain: true, earthenware: false, terracotta: false, raku_body: false,
  };
  return m[clay];
}

export function bestTechnique(clay: ThrowingClay): string {
  const m: Record<ThrowingClay, string> = {
    stoneware: "wheel_throwing", porcelain: "trimming", earthenware: "hand_building",
    terracotta: "press_molding", raku_body: "raku_firing",
  };
  return m[clay];
}

export function costPerKg(clay: ThrowingClay): number {
  const m: Record<ThrowingClay, number> = {
    stoneware: 3, porcelain: 8, earthenware: 2, terracotta: 1.5, raku_body: 5,
  };
  return m[clay];
}

export function throwingClays(): ThrowingClay[] {
  return ["stoneware", "porcelain", "earthenware", "terracotta", "raku_body"];
}

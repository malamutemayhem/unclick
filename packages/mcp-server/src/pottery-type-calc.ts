export type PotteryType = "earthenware" | "stoneware" | "porcelain" | "bone_china" | "raku";

export function firingTempCelsius(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 1000, stoneware: 1200, porcelain: 1400, bone_china: 1250, raku: 900,
  };
  return m[pot];
}

export function durability(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 4, stoneware: 8, porcelain: 7, bone_china: 6, raku: 3,
  };
  return m[pot];
}

export function translucency(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 0, stoneware: 1, porcelain: 9, bone_china: 10, raku: 0,
  };
  return m[pot];
}

export function craftDifficulty(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 3, stoneware: 5, porcelain: 9, bone_china: 8, raku: 7,
  };
  return m[pot];
}

export function waterAbsorption(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 10, stoneware: 2, porcelain: 0, bone_china: 1, raku: 8,
  };
  return m[pot];
}

export function vitrified(pot: PotteryType): boolean {
  const m: Record<PotteryType, boolean> = {
    earthenware: false, stoneware: true, porcelain: true, bone_china: true, raku: false,
  };
  return m[pot];
}

export function needsGlaze(pot: PotteryType): boolean {
  const m: Record<PotteryType, boolean> = {
    earthenware: true, stoneware: false, porcelain: false, bone_china: false, raku: true,
  };
  return m[pot];
}

export function originRegion(pot: PotteryType): string {
  const m: Record<PotteryType, string> = {
    earthenware: "global", stoneware: "china", porcelain: "china",
    bone_china: "england", raku: "japan",
  };
  return m[pot];
}

export function collectorsValue(pot: PotteryType): number {
  const m: Record<PotteryType, number> = {
    earthenware: 3, stoneware: 5, porcelain: 9, bone_china: 7, raku: 8,
  };
  return m[pot];
}

export function potteryTypes(): PotteryType[] {
  return ["earthenware", "stoneware", "porcelain", "bone_china", "raku"];
}

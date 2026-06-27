export type WeftPattern = "tabby" | "twill" | "satin" | "basket" | "leno";

export function picksPerCm(pattern: WeftPattern): number {
  const ppc: Record<WeftPattern, number> = {
    tabby: 10, twill: 12, satin: 15, basket: 8, leno: 6,
  };
  return ppc[pattern];
}

export function weftLengthM(widthCm: number, lengthCm: number, picksPerCm: number): number {
  return parseFloat((widthCm * lengthCm * picksPerCm / 100 / 100).toFixed(2));
}

export function weftYarnWeightG(lengthM: number, yarnCountNm: number): number {
  if (yarnCountNm <= 0) return 0;
  return parseFloat((lengthM * 1000 / yarnCountNm).toFixed(1));
}

export function colorChanges(pattern: WeftPattern): number {
  const changes: Record<WeftPattern, number> = {
    tabby: 1, twill: 1, satin: 1, basket: 2, leno: 1,
  };
  return changes[pattern];
}

export function beatForce(pattern: WeftPattern): number {
  const force: Record<WeftPattern, number> = {
    tabby: 3, twill: 4, satin: 2, basket: 5, leno: 1,
  };
  return force[pattern];
}

export function coveragePercent(pattern: WeftPattern): number {
  const coverage: Record<WeftPattern, number> = {
    tabby: 50, twill: 60, satin: 80, basket: 45, leno: 30,
  };
  return coverage[pattern];
}

export function drawInPercent(pattern: WeftPattern): number {
  const drawIn: Record<WeftPattern, number> = {
    tabby: 8, twill: 6, satin: 4, basket: 10, leno: 3,
  };
  return drawIn[pattern];
}

export function weavingSpeedCmPerHour(pattern: WeftPattern): number {
  const speeds: Record<WeftPattern, number> = {
    tabby: 30, twill: 25, satin: 20, basket: 35, leno: 15,
  };
  return speeds[pattern];
}

export function costFactor(pattern: WeftPattern): number {
  const factors: Record<WeftPattern, number> = {
    tabby: 1.0, twill: 1.2, satin: 1.5, basket: 0.9, leno: 1.8,
  };
  return factors[pattern];
}

export function weftPatterns(): WeftPattern[] {
  return ["tabby", "twill", "satin", "basket", "leno"];
}

export type RibbonMaterial = "silk" | "cotton" | "satin" | "nylon" | "linen";

export function poleHeight(participantCount: number): number {
  return parseFloat((3 + Math.log2(Math.max(1, participantCount)) * 1.5).toFixed(1));
}

export function ribbonCount(participants: number): number {
  return participants;
}

export function ribbonLength(poleHeightM: number, danceRadiusM: number): number {
  return parseFloat((Math.sqrt(poleHeightM * poleHeightM + danceRadiusM * danceRadiusM) + 1).toFixed(1));
}

export function danceCircleRadiusM(participants: number): number {
  return parseFloat((participants * 0.4).toFixed(1));
}

export function wrappingTurns(ribbonLength: number, poleDiameterCm: number): number {
  if (poleDiameterCm <= 0) return 0;
  const circumference = Math.PI * poleDiameterCm / 100;
  return Math.floor(ribbonLength / circumference);
}

export function braidPatterns(ribbonCount: number): number {
  if (ribbonCount < 4) return 1;
  return Math.floor(ribbonCount / 2);
}

export function musicBpm(danceStyle: string): number {
  const bpm: Record<string, number> = { slow: 80, moderate: 110, fast: 140, jig: 160 };
  return bpm[danceStyle] || 110;
}

export function setupTimeMin(poleHeightM: number, ribbonCount: number): number {
  return parseFloat((poleHeightM * 5 + ribbonCount * 2).toFixed(0));
}

export function flowerGarlands(poleHeightM: number, garlandSpacingCm: number): number {
  if (garlandSpacingCm <= 0) return 0;
  return Math.floor(poleHeightM * 100 / garlandSpacingCm);
}

export function ribbonCostTotal(count: number, lengthM: number, material: RibbonMaterial): number {
  const pricePerM: Record<RibbonMaterial, number> = { silk: 8, cotton: 2, satin: 5, nylon: 1.5, linen: 3 };
  return parseFloat((count * lengthM * pricePerM[material]).toFixed(2));
}

export function ribbonMaterials(): RibbonMaterial[] {
  return ["silk", "cotton", "satin", "nylon", "linen"];
}

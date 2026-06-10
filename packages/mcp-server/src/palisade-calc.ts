export type WoodType = "oak" | "pine" | "cedar" | "chestnut" | "birch";

export function postCount(perimeterM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(perimeterM * 100 / spacingCm);
}

export function postHeight(defenseHeight: number, buriedDepth: number): number {
  return parseFloat((defenseHeight + buriedDepth).toFixed(0));
}

export function timberVolumeM3(postCount: number, heightCm: number, diameterCm: number): number {
  return parseFloat((postCount * Math.PI * Math.pow(diameterCm / 2 / 100, 2) * heightCm / 100).toFixed(2));
}

export function pointAngle(postDiameterCm: number): number {
  return parseFloat(Math.min(60, 20 + postDiameterCm).toFixed(0));
}

export function trenchDepthCm(postHeightCm: number): number {
  return parseFloat((postHeightCm * 0.33).toFixed(0));
}

export function trenchLengthM(perimeterM: number): number {
  return perimeterM;
}

export function laborDays(postCount: number, crewSize: number): number {
  if (crewSize <= 0) return 0;
  return parseFloat((postCount * 0.15 / crewSize).toFixed(1));
}

export function lifespanYears(wood: WoodType, treated: boolean): number {
  const base: Record<WoodType, number> = { oak: 20, pine: 8, cedar: 25, chestnut: 15, birch: 6 };
  return treated ? base[wood] * 1.5 : base[wood];
}

export function defensiveStrength(postDiameterCm: number, spacingCm: number): string {
  const ratio = postDiameterCm / spacingCm;
  if (ratio > 0.8) return "strong";
  if (ratio > 0.5) return "moderate";
  return "weak";
}

export function gateWidth(vehicleAccess: boolean): number {
  return vehicleAccess ? 360 : 120;
}

export function woodTypes(): WoodType[] {
  return ["oak", "pine", "cedar", "chestnut", "birch"];
}

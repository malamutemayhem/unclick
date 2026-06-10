export type NiddySize = "standard" | "mini" | "jumbo" | "adjustable" | "travel";

export function skeinLengthM(armLengthCm: number): number {
  return parseFloat((armLengthCm * 4 / 100).toFixed(2));
}

export function wrapsPerSkein(totalYarnM: number, circumferenceM: number): number {
  if (circumferenceM <= 0) return 0;
  return Math.ceil(totalYarnM / circumferenceM);
}

export function armLengthCm(size: NiddySize): number {
  const lengths: Record<NiddySize, number> = {
    standard: 45, mini: 25, jumbo: 60, adjustable: 50, travel: 30,
  };
  return lengths[size];
}

export function circumferenceM(size: NiddySize): number {
  return parseFloat((armLengthCm(size) * 4 / 100).toFixed(2));
}

export function windingTimeMinutes(wraps: number): number {
  return Math.round(wraps * 0.05 + 2);
}

export function skeinWeightG(yarnCountNm: number, lengthM: number): number {
  if (yarnCountNm <= 0) return 0;
  return parseFloat((lengthM * 1000 / yarnCountNm).toFixed(1));
}

export function tyingPointsPerSkein(): number {
  return 4;
}

export function materialType(size: NiddySize): string {
  const materials: Record<NiddySize, string> = {
    standard: "birch", mini: "maple", jumbo: "oak", adjustable: "beech", travel: "bamboo",
  };
  return materials[size];
}

export function costEstimate(size: NiddySize): number {
  const costs: Record<NiddySize, number> = {
    standard: 25, mini: 18, jumbo: 35, adjustable: 45, travel: 20,
  };
  return costs[size];
}

export function niddySizes(): NiddySize[] {
  return ["standard", "mini", "jumbo", "adjustable", "travel"];
}

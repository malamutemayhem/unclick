export type BoneArrangement = "stacked" | "patterned" | "chandelier" | "vault" | "wall";

export function chamberVolume(lengthM: number, widthM: number, heightM: number): number {
  return parseFloat((lengthM * widthM * heightM).toFixed(1));
}

export function bonesCapacity(volumeM3: number): number {
  return Math.floor(volumeM3 * 200);
}

export function skullNiches(wallAreaM2: number, nicheSpacingCm: number): number {
  if (nicheSpacingCm <= 0) return 0;
  return Math.floor(wallAreaM2 * 10000 / (nicheSpacingCm * nicheSpacingCm));
}

export function arrangementTime(boneCount: number, arrangement: BoneArrangement): number {
  const factor: Record<BoneArrangement, number> = { stacked: 0.01, patterned: 0.05, chandelier: 0.1, vault: 0.03, wall: 0.02 };
  return parseFloat((boneCount * factor[arrangement]).toFixed(0));
}

export function ventilationOpenings(volumeM3: number): number {
  return Math.ceil(volumeM3 * 0.5);
}

export function humidity(ventilationOpenings: number, volumeM3: number): number {
  if (volumeM3 <= 0) return 100;
  const ratio = ventilationOpenings / volumeM3;
  return parseFloat(Math.max(40, 90 - ratio * 50).toFixed(0));
}

export function lightingFixtures(floorAreaM2: number): number {
  return Math.ceil(floorAreaM2 / 4);
}

export function preservationCostPerYear(boneCount: number, humidity: number): number {
  return parseFloat((boneCount * 0.1 * (humidity / 60)).toFixed(0));
}

export function visitorCapacity(floorAreaM2: number, pathWidthM: number): number {
  if (pathWidthM <= 0) return 0;
  return Math.floor(floorAreaM2 / (pathWidthM * 2));
}

export function boneArrangements(): BoneArrangement[] {
  return ["stacked", "patterned", "chandelier", "vault", "wall"];
}

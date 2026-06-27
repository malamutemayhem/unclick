export type ChapterHousePlan = "circular" | "octagonal" | "rectangular" | "decagonal" | "hexagonal";

export function diameterM(monkCount: number): number {
  return parseFloat((Math.sqrt(monkCount * 2.5) + 2).toFixed(2));
}

export function floorAreaM2(diameterM: number, plan: ChapterHousePlan): number {
  const r = diameterM / 2;
  if (plan === "circular") return parseFloat((Math.PI * r ** 2).toFixed(1));
  if (plan === "rectangular") return parseFloat((diameterM * diameterM * 0.8).toFixed(1));
  const sides = plan === "octagonal" ? 8 : plan === "decagonal" ? 10 : 6;
  const area = (sides * r ** 2 * Math.sin((2 * Math.PI) / sides)) / 2;
  return parseFloat(area.toFixed(1));
}

export function seatCount(monkCount: number): number {
  return monkCount + 2;
}

export function centralPillarRequired(plan: ChapterHousePlan): boolean {
  return plan !== "rectangular";
}

export function vaultRibCount(plan: ChapterHousePlan): number {
  const ribs: Record<ChapterHousePlan, number> = {
    circular: 12, octagonal: 8, rectangular: 4, decagonal: 10, hexagonal: 6,
  };
  return ribs[plan];
}

export function windowCount(plan: ChapterHousePlan): number {
  const windows: Record<ChapterHousePlan, number> = {
    circular: 8, octagonal: 7, rectangular: 4, decagonal: 9, hexagonal: 5,
  };
  return windows[plan];
}

export function wallHeightM(diameterM: number): number {
  return parseFloat((diameterM * 0.6 + 3).toFixed(2));
}

export function acousticQuality(plan: ChapterHousePlan): number {
  const quality: Record<ChapterHousePlan, number> = {
    circular: 9, octagonal: 8, rectangular: 6, decagonal: 7, hexagonal: 7,
  };
  return quality[plan];
}

export function stoneVolumeM3(floorAreaM2: number, wallHeightM: number): number {
  return parseFloat((floorAreaM2 * wallHeightM * 0.15).toFixed(2));
}

export function constructionYears(stoneVolumeM3: number): number {
  return Math.max(1, Math.ceil(stoneVolumeM3 / 50));
}

export function chapterHousePlans(): ChapterHousePlan[] {
  return ["circular", "octagonal", "rectangular", "decagonal", "hexagonal"];
}

export type SandType = "beach" | "desert" | "play" | "silica" | "volcanic";
export type StructureType = "tower" | "wall" | "arch" | "moat" | "bridge" | "dome";

export function waterRatio(sandType: SandType): number {
  const ratios: Record<SandType, number> = {
    beach: 0.08, desert: 0.12, play: 0.1, silica: 0.06, volcanic: 0.09,
  };
  return ratios[sandType];
}

export function compactStrength(waterRatio: number): string {
  if (waterRatio < 0.05) return "poor (too dry)";
  if (waterRatio > 0.15) return "poor (too wet)";
  if (waterRatio >= 0.07 && waterRatio <= 0.1) return "optimal";
  return "good";
}

export function towerHeight(baseDiameterCm: number): number {
  return parseFloat((baseDiameterCm * 2.5).toFixed(0));
}

export function wallThickness(heightCm: number): number {
  return parseFloat((heightCm * 0.4).toFixed(1));
}

export function sandVolumeLiters(widthCm: number, depthCm: number, heightCm: number): number {
  return parseFloat((widthCm * depthCm * heightCm / 1000).toFixed(1));
}

export function bucketsFull(totalLiters: number, bucketLiters: number = 10): number {
  return Math.ceil(totalLiters / bucketLiters);
}

export function moatDepth(wallHeightCm: number): number {
  return parseFloat((wallHeightCm * 0.3).toFixed(1));
}

export function moatWidth(wallHeightCm: number): number {
  return parseFloat((wallHeightCm * 0.5).toFixed(1));
}

export function archSpan(heightCm: number): number {
  return parseFloat((heightCm * 1.2).toFixed(1));
}

export function buildTime(structures: number, complexity: number): number {
  return Math.round(structures * complexity * 5);
}

export function tideWindow(highTideHours: number): number {
  return Math.max(0, parseFloat((highTideHours - 1.5).toFixed(1)));
}

export function toolsNeeded(structures: number): string[] {
  const tools = ["bucket", "shovel"];
  if (structures > 2) tools.push("sculpting knife");
  if (structures > 4) tools.push("spray bottle", "straw");
  return tools;
}

export function competitionScore(height: number, detail: number, creativity: number): number {
  return parseFloat((height * 2 + detail * 3 + creativity * 5).toFixed(1));
}

export function structureTypes(): StructureType[] {
  return ["tower", "wall", "arch", "moat", "bridge", "dome"];
}

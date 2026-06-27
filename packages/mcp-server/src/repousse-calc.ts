export type RepousseTool = "chasing" | "embossing" | "liner" | "matting" | "planishing";

export function metalThicknessMm(complexity: "low" | "medium" | "high"): number {
  const thickness: Record<string, number> = { low: 0.8, medium: 1.2, high: 1.5 };
  return thickness[complexity];
}

export function pitchType(temperature: "warm" | "cold"): string {
  return temperature === "warm" ? "burgundy" : "german_black";
}

export function toolCountForProject(complexity: "low" | "medium" | "high"): number {
  const counts: Record<string, number> = { low: 5, medium: 15, high: 30 };
  return counts[complexity];
}

export function annealingCycles(depth: "shallow" | "medium" | "deep"): number {
  const cycles: Record<string, number> = { shallow: 2, medium: 5, deep: 10 };
  return cycles[depth];
}

export function hammerBlowsPerCm2(tool: RepousseTool): number {
  const blows: Record<RepousseTool, number> = {
    chasing: 12, embossing: 8, liner: 20, matting: 25, planishing: 15,
  };
  return blows[tool];
}

export function workingTimeHoursPerCm2(tool: RepousseTool): number {
  const hours: Record<RepousseTool, number> = {
    chasing: 0.5, embossing: 0.3, liner: 0.8, matting: 0.4, planishing: 0.2,
  };
  return hours[tool];
}

export function reliefDepthMm(metalThicknessMm: number): number {
  return parseFloat((metalThicknessMm * 3).toFixed(1));
}

export function pitchBowlDiameterCm(projectDiameterCm: number): number {
  return Math.round(projectDiameterCm + 10);
}

export function costPerHour(): number {
  return 60;
}

export function repousseTools(): RepousseTool[] {
  return ["chasing", "embossing", "liner", "matting", "planishing"];
}

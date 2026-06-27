export type ChasingTool = "liner" | "planisher" | "matting" | "doming" | "tracer";

export function tipWidthMm(tool: ChasingTool): number {
  const widths: Record<ChasingTool, number> = {
    liner: 1, planisher: 8, matting: 5, doming: 6, tracer: 0.5,
  };
  return widths[tool];
}

export function hammerWeightOz(tool: ChasingTool): number {
  const weights: Record<ChasingTool, number> = {
    liner: 4, planisher: 6, matting: 4, doming: 8, tracer: 3,
  };
  return weights[tool];
}

export function strokesPerMinute(tool: ChasingTool): number {
  const spm: Record<ChasingTool, number> = {
    liner: 120, planisher: 60, matting: 80, doming: 40, tracer: 150,
  };
  return spm[tool];
}

export function pitchRequired(tool: ChasingTool): boolean {
  return tool !== "planisher";
}

export function detailLevel(tool: ChasingTool): number {
  const detail: Record<ChasingTool, number> = {
    liner: 4, planisher: 2, matting: 3, doming: 3, tracer: 5,
  };
  return detail[tool];
}

export function surfaceFinish(tool: ChasingTool): string {
  const finish: Record<ChasingTool, string> = {
    liner: "grooved", planisher: "smooth", matting: "textured",
    doming: "raised", tracer: "outlined",
  };
  return finish[tool];
}

export function metalThicknessMaxMm(tool: ChasingTool): number {
  const max: Record<ChasingTool, number> = {
    liner: 1.5, planisher: 2.0, matting: 1.5, doming: 2.5, tracer: 1.0,
  };
  return max[tool];
}

export function annealingRequired(passCount: number): boolean {
  return passCount >= 3;
}

export function costPerTool(tool: ChasingTool): number {
  const costs: Record<ChasingTool, number> = {
    liner: 15, planisher: 20, matting: 12, doming: 18, tracer: 25,
  };
  return costs[tool];
}

export function chasingTools(): ChasingTool[] {
  return ["liner", "planisher", "matting", "doming", "tracer"];
}

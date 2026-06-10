export type CuttingTool = "carbide_wheel" | "diamond_wheel" | "oil_cutter" | "strip_cutter" | "circle_cutter";

export function cutQualityRating(tool: CuttingTool): number {
  const q: Record<CuttingTool, number> = {
    carbide_wheel: 6, diamond_wheel: 9, oil_cutter: 7,
    strip_cutter: 8, circle_cutter: 7,
  };
  return q[tool];
}

export function maxThicknessMm(tool: CuttingTool): number {
  const t: Record<CuttingTool, number> = {
    carbide_wheel: 6, diamond_wheel: 12, oil_cutter: 8,
    strip_cutter: 6, circle_cutter: 6,
  };
  return t[tool];
}

export function pressureRequired(tool: CuttingTool): number {
  const p: Record<CuttingTool, number> = {
    carbide_wheel: 7, diamond_wheel: 5, oil_cutter: 6,
    strip_cutter: 6, circle_cutter: 5,
  };
  return p[tool];
}

export function oilRequired(tool: CuttingTool): boolean {
  return tool === "oil_cutter";
}

export function curvesCapable(tool: CuttingTool): boolean {
  return tool === "carbide_wheel" || tool === "diamond_wheel" || tool === "circle_cutter";
}

export function straightLinesOnly(tool: CuttingTool): boolean {
  return tool === "strip_cutter";
}

export function wheelLifeCuts(tool: CuttingTool): number {
  const l: Record<CuttingTool, number> = {
    carbide_wheel: 5000, diamond_wheel: 20000, oil_cutter: 10000,
    strip_cutter: 8000, circle_cutter: 8000,
  };
  return l[tool];
}

export function beginnerFriendly(tool: CuttingTool): boolean {
  return tool === "oil_cutter" || tool === "strip_cutter";
}

export function costEstimate(tool: CuttingTool): number {
  const c: Record<CuttingTool, number> = {
    carbide_wheel: 5, diamond_wheel: 25, oil_cutter: 15,
    strip_cutter: 30, circle_cutter: 20,
  };
  return c[tool];
}

export function cuttingTools(): CuttingTool[] {
  return ["carbide_wheel", "diamond_wheel", "oil_cutter", "strip_cutter", "circle_cutter"];
}

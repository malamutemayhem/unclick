export type StencilMaterial = "mylar" | "acetate" | "cardboard" | "vinyl" | "metal" | "freezer_paper";
export type PaintType = "spray" | "roller" | "brush" | "airbrush" | "sponge";

export function stencilThickness(material: StencilMaterial): number {
  const mm: Record<StencilMaterial, number> = {
    mylar: 0.2, acetate: 0.15, cardboard: 1.5, vinyl: 0.1, metal: 0.5, freezer_paper: 0.3,
  };
  return mm[material];
}

export function reuses(material: StencilMaterial): number {
  const uses: Record<StencilMaterial, number> = {
    mylar: 100, acetate: 50, cardboard: 5, vinyl: 1, metal: 500, freezer_paper: 3,
  };
  return uses[material];
}

export function bridgeWidth(designSizeCm: number): number {
  return parseFloat((designSizeCm * 0.02 + 0.5).toFixed(2));
}

export function cutterBladeAngle(material: StencilMaterial): number {
  if (material === "metal") return 60;
  if (material === "cardboard") return 30;
  return 45;
}

export function paintCoverage(areaCm2: number, coats: number, mlPerCm2: number = 0.01): number {
  return parseFloat((areaCm2 * coats * mlPerCm2).toFixed(1));
}

export function dryingTime(paintType: PaintType): number {
  const mins: Record<PaintType, number> = {
    spray: 10, roller: 30, brush: 45, airbrush: 5, sponge: 20,
  };
  return mins[paintType];
}

export function layerCount(colors: number): number {
  return colors;
}

export function registrationMarks(layers: number): number {
  return layers >= 2 ? 3 : 0;
}

export function adhesiveNeeded(areaCm2: number, material: StencilMaterial): boolean {
  return material !== "vinyl" && material !== "freezer_paper" && areaCm2 > 200;
}

export function bleedRisk(paintType: PaintType): string {
  if (paintType === "spray") return "high - use light coats";
  if (paintType === "airbrush") return "moderate - control pressure";
  if (paintType === "brush") return "moderate - minimal paint on brush";
  return "low";
}

export function maskingTapeM(perimeterCm: number): number {
  return parseFloat((perimeterCm / 100 * 1.2).toFixed(2));
}

export function projectTime(areaCm2: number, layers: number, dryingMin: number): number {
  const cutMin = areaCm2 * 0.1;
  const paintMin = layers * 5;
  const totalDrying = layers * dryingMin;
  return Math.round(cutMin + paintMin + totalDrying);
}

export function costPerPrint(paintMl: number, paintCostPerMl: number, stencilCost: number, reuses: number): number {
  return parseFloat((paintMl * paintCostPerMl + stencilCost / reuses).toFixed(2));
}

export function stencilMaterials(): StencilMaterial[] {
  return ["mylar", "acetate", "cardboard", "vinyl", "metal", "freezer_paper"];
}

export type GlassType = "soda_lime" | "borosilicate" | "crystal" | "tempered" | "fused";
export type EtchMethod = "acid" | "sandblast" | "cream" | "rotary" | "laser";

export function etchDepth(method: EtchMethod, durationMin: number): number {
  const ratePerMin: Record<EtchMethod, number> = {
    acid: 0.05, sandblast: 0.2, cream: 0.02, rotary: 0.1, laser: 0.01,
  };
  return parseFloat((ratePerMin[method] * durationMin).toFixed(3));
}

export function creamAmount(areaCm2: number): number {
  return parseFloat((areaCm2 * 0.03).toFixed(1));
}

export function acidConcentration(glassType: GlassType): number {
  const pct: Record<GlassType, number> = {
    soda_lime: 5, borosilicate: 10, crystal: 3, tempered: 0, fused: 8,
  };
  return pct[glassType];
}

export function canEtch(glassType: GlassType): boolean {
  return glassType !== "tempered";
}

export function sandblastPressure(glassType: GlassType): number {
  const psi: Record<GlassType, number> = {
    soda_lime: 30, borosilicate: 40, crystal: 25, tempered: 50, fused: 35,
  };
  return psi[glassType];
}

export function gritSize(detail: "fine" | "medium" | "coarse"): number {
  const mesh: Record<string, number> = { fine: 220, medium: 120, coarse: 80 };
  return mesh[detail];
}

export function maskingTape(perimeterCm: number): number {
  return parseFloat((perimeterCm * 1.1 / 100).toFixed(2));
}

export function stencilArea(designWidthCm: number, designHeightCm: number): number {
  return parseFloat((designWidthCm * designHeightCm).toFixed(1));
}

export function safetyGear(method: EtchMethod): string[] {
  const gear = ["gloves", "safety glasses"];
  if (method === "acid") gear.push("fume hood", "apron");
  if (method === "sandblast") gear.push("respirator", "blast cabinet");
  if (method === "rotary") gear.push("face shield");
  return gear;
}

export function processingTime(areaCm2: number, method: EtchMethod): number {
  const minPerCm2: Record<EtchMethod, number> = {
    acid: 0.1, sandblast: 0.05, cream: 0.08, rotary: 0.2, laser: 0.03,
  };
  return Math.round(areaCm2 * minPerCm2[method]);
}

export function costPerPiece(method: EtchMethod, areaCm2: number): number {
  const costPerCm2: Record<EtchMethod, number> = {
    acid: 0.1, sandblast: 0.05, cream: 0.15, rotary: 0.2, laser: 0.3,
  };
  return parseFloat((areaCm2 * costPerCm2[method]).toFixed(2));
}

export function etchMethods(): EtchMethod[] {
  return ["acid", "sandblast", "cream", "rotary", "laser"];
}

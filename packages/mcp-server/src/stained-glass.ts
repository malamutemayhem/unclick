export type GlassType = "cathedral" | "opalescent" | "iridescent" | "textured" | "streaky" | "wispy";
export type TechniqueType = "copper_foil" | "lead_came" | "fused" | "mosaic";

export function panelArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function pieceCount(areaCm2: number, avgPieceCm2: number): number {
  if (avgPieceCm2 <= 0) return 0;
  return Math.ceil(areaCm2 / avgPieceCm2);
}

export function glassNeeded(areaCm2: number, wastePercent: number = 25): number {
  return parseFloat((areaCm2 * (1 + wastePercent / 100)).toFixed(0));
}

export function sheetsNeeded(totalCm2: number, sheetWidthCm: number = 50, sheetHeightCm: number = 60): number {
  const sheetArea = sheetWidthCm * sheetHeightCm;
  return Math.ceil(totalCm2 / sheetArea);
}

export function solderLength(pieces: number, avgEdgeCm: number): number {
  const totalEdgeCm = pieces * avgEdgeCm * 0.5;
  return parseFloat((totalEdgeCm / 100).toFixed(1));
}

export function solderWeight(lengthM: number, technique: TechniqueType): number {
  const gramsPerM: Record<TechniqueType, number> = {
    copper_foil: 30,
    lead_came: 0,
    fused: 0,
    mosaic: 0,
  };
  return parseFloat((lengthM * gramsPerM[technique]).toFixed(0));
}

export function cameLength(pieces: number, avgEdgeCm: number): number {
  return parseFloat((pieces * avgEdgeCm * 0.6 / 100).toFixed(1));
}

export function copperFoilLength(pieces: number, avgPerimeterCm: number): number {
  return parseFloat((pieces * avgPerimeterCm / 100).toFixed(1));
}

export function foilWidth(glassThicknessMm: number): number {
  if (glassThicknessMm <= 2.5) return 5.5;
  if (glassThicknessMm <= 3.5) return 6.4;
  return 7.9;
}

export function fluxAmount(solderGrams: number): number {
  return parseFloat((solderGrams * 0.1).toFixed(0));
}

export function patinaAmount(solderAreaCm2: number): number {
  return parseFloat((solderAreaCm2 * 0.05).toFixed(0));
}

export function cuttingTime(pieces: number, difficulty: "simple" | "moderate" | "complex"): number {
  const minutesPerPiece: Record<string, number> = { simple: 2, moderate: 5, complex: 10 };
  return parseFloat((pieces * (minutesPerPiece[difficulty] ?? 5) / 60).toFixed(1));
}

export function solderingTime(pieces: number, technique: TechniqueType): number {
  const minutesPerPiece: Record<TechniqueType, number> = {
    copper_foil: 3,
    lead_came: 2,
    fused: 0,
    mosaic: 1,
  };
  return parseFloat((pieces * minutesPerPiece[technique] / 60).toFixed(1));
}

export function totalProjectTime(pieces: number, technique: TechniqueType, difficulty: "simple" | "moderate" | "complex"): number {
  const cutting = cuttingTime(pieces, difficulty);
  const grinding = pieces * 2 / 60;
  const foiling = technique === "copper_foil" ? pieces * 3 / 60 : 0;
  const soldering = solderingTime(pieces, technique);
  return parseFloat((cutting + grinding + foiling + soldering).toFixed(1));
}

export function panelWeight(areaCm2: number, glassThicknessMm: number = 3, densityGPerCm3: number = 2.5): number {
  const volumeCm3 = areaCm2 * glassThicknessMm * 0.1;
  return parseFloat((volumeCm3 * densityGPerCm3 / 1000).toFixed(2));
}

export function reinforcementBar(heightCm: number): boolean {
  return heightCm > 60;
}

export function lightTransmission(glassType: GlassType): number {
  const transmission: Record<GlassType, number> = {
    cathedral: 85,
    opalescent: 30,
    iridescent: 70,
    textured: 75,
    streaky: 60,
    wispy: 50,
  };
  return transmission[glassType];
}

export function glassTypes(): GlassType[] {
  return ["cathedral", "opalescent", "iridescent", "textured", "streaky", "wispy"];
}

export type GlassType = "antique" | "cathedral" | "opalescent" | "flashed" | "dalle";

export function cutSizeToleranceMm(glassType: GlassType): number {
  const tolerances: Record<GlassType, number> = {
    antique: 1.5, cathedral: 1.0, opalescent: 1.2, flashed: 1.5, dalle: 2.0,
  };
  return tolerances[glassType];
}

export function leadCameWidthMm(pieceCount: number): number {
  if (pieceCount <= 0) return 0;
  return pieceCount > 100 ? 4 : 6;
}

export function solderJointCount(pieceCount: number): number {
  return Math.round(pieceCount * 2.5);
}

export function cameWeightKgPerM(cameWidthMm: number): number {
  return parseFloat((cameWidthMm * 0.15).toFixed(2));
}

export function cementingTimeHours(panelAreaM2: number): number {
  return parseFloat((panelAreaM2 * 2).toFixed(1));
}

export function lightTransmissionPercent(glassType: GlassType): number {
  const transmission: Record<GlassType, number> = {
    antique: 70, cathedral: 85, opalescent: 40, flashed: 65, dalle: 30,
  };
  return transmission[glassType];
}

export function thermalExpansionCoeff(glassType: GlassType): number {
  const coeff: Record<GlassType, number> = {
    antique: 9.0, cathedral: 8.5, opalescent: 8.8, flashed: 9.0, dalle: 7.5,
  };
  return coeff[glassType];
}

export function annealingTempCelsius(glassType: GlassType): number {
  const temps: Record<GlassType, number> = {
    antique: 510, cathedral: 490, opalescent: 500, flashed: 510, dalle: 520,
  };
  return temps[glassType];
}

export function costPerM2(glassType: GlassType): number {
  const costs: Record<GlassType, number> = {
    antique: 120, cathedral: 40, opalescent: 60, flashed: 90, dalle: 80,
  };
  return costs[glassType];
}

export function glassTypes(): GlassType[] {
  return ["antique", "cathedral", "opalescent", "flashed", "dalle"];
}

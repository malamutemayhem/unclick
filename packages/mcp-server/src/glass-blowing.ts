export type GlassType = "soda_lime" | "borosilicate" | "lead_crystal" | "fused_silica";
export type Technique = "free_blown" | "mold_blown" | "lampwork" | "kiln_cast" | "fusing";

export function meltingTempC(glass: GlassType): number {
  const t: Record<GlassType, number> = {
    soda_lime: 1050, borosilicate: 1250, lead_crystal: 900, fused_silica: 1700,
  };
  return t[glass];
}

export function workingTempC(glass: GlassType): number {
  const t: Record<GlassType, number> = {
    soda_lime: 900, borosilicate: 1100, lead_crystal: 800, fused_silica: 1500,
  };
  return t[glass];
}

export function annealingTempC(glass: GlassType): number {
  const t: Record<GlassType, number> = {
    soda_lime: 480, borosilicate: 560, lead_crystal: 420, fused_silica: 1050,
  };
  return t[glass];
}

export function annealingHours(thicknessInch: number): number {
  return parseFloat((thicknessInch * thicknessInch * 2).toFixed(1));
}

export function expansionCoeff(glass: GlassType): number {
  const coe: Record<GlassType, number> = {
    soda_lime: 90, borosilicate: 33, lead_crystal: 85, fused_silica: 5.5,
  };
  return coe[glass];
}

export function gatherWeight(diameterCm: number, glass: GlassType): number {
  const density: Record<GlassType, number> = {
    soda_lime: 2.5, borosilicate: 2.23, lead_crystal: 3.1, fused_silica: 2.2,
  };
  const vol = (4 / 3) * Math.PI * Math.pow(diameterCm / 2, 3);
  return parseFloat((vol * density[glass] / 1000).toFixed(2));
}

export function blowpipeLength(technique: Technique): number {
  if (technique === "lampwork") return 30;
  if (technique === "free_blown" || technique === "mold_blown") return 120;
  return 0;
}

export function colorTemperature(colorant: string): number {
  const temps: Record<string, number> = {
    cobalt: 1100, copper: 1050, gold: 600, manganese: 1000, iron: 1100,
  };
  return temps[colorant] ?? 1000;
}

export function coolingRatePerHour(glass: GlassType): number {
  const rate: Record<GlassType, number> = {
    soda_lime: 50, borosilicate: 30, lead_crystal: 40, fused_silica: 20,
  };
  return rate[glass];
}

export function safetyGear(): string[] {
  return ["didymium glasses", "heat gloves", "leather apron", "closed shoes", "face shield"];
}

export function glassTypes(): GlassType[] {
  return ["soda_lime", "borosilicate", "lead_crystal", "fused_silica"];
}

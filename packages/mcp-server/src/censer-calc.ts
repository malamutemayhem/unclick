export type CenserMetal = "brass" | "bronze" | "silver" | "gold" | "iron";

export function bowlVolumeMl(diameterCm: number, depthCm: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2) * depthCm).toFixed(0));
}

export function charcoalWeightG(bowlVolumeMl: number): number {
  return parseFloat((bowlVolumeMl * 0.4).toFixed(0));
}

export function burnTimeMin(charcoalG: number, resinG: number): number {
  return parseFloat((charcoalG * 1.5 + resinG * 3).toFixed(0));
}

export function chainLength(ceilingHeightCm: number, swingHeightCm: number): number {
  return parseFloat((ceilingHeightCm - swingHeightCm).toFixed(0));
}

export function ventHoleCount(diameterCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  const circumference = Math.PI * diameterCm;
  return Math.floor(circumference / spacingCm);
}

export function smokeOutputLph(resinG: number, ventHoles: number): number {
  return parseFloat((resinG * 0.2 * (1 + ventHoles * 0.05)).toFixed(1));
}

export function swingPeriodS(chainLengthCm: number): number {
  if (chainLengthCm <= 0) return 0;
  return parseFloat((2 * Math.PI * Math.sqrt(chainLengthCm / 100 / 9.81)).toFixed(2));
}

export function metalWeightKg(diameterCm: number, wallThicknessMm: number, metal: CenserMetal): number {
  const density: Record<CenserMetal, number> = { brass: 8.5, bronze: 8.8, silver: 10.5, gold: 19.3, iron: 7.9 };
  const vol = Math.PI * diameterCm * (wallThicknessMm / 10) * diameterCm * 0.01;
  return parseFloat((vol * density[metal] / 1000).toFixed(2));
}

export function fragranceRadiusM(smokeOutput: number, airflow: string): number {
  const factors: Record<string, number> = { still: 2, light: 3, moderate: 5, strong: 1 };
  return parseFloat((smokeOutput * (factors[airflow] || 3)).toFixed(1));
}

export function censerMetals(): CenserMetal[] {
  return ["brass", "bronze", "silver", "gold", "iron"];
}

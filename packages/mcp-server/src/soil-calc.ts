export type SoilTexture = "sand" | "loamy sand" | "sandy loam" | "loam" | "silt loam" | "silt" | "sandy clay loam" | "clay loam" | "silty clay loam" | "sandy clay" | "silty clay" | "clay";

export interface SoilComposition {
  sand: number;
  silt: number;
  clay: number;
}

export interface SoilProperties {
  texture: SoilTexture;
  fieldCapacity: number;
  wiltingPoint: number;
  bulkDensity: number;
  porosity: number;
  saturatedConductivity: number;
}

export function classifySoil(sand: number, silt: number, clay: number): SoilTexture {
  if (clay >= 40 && sand <= 45 && silt <= 40) return "clay";
  if (clay >= 40 && silt > 40) return "silty clay";
  if (clay >= 35 && sand > 45) return "sandy clay";
  if (clay >= 27 && clay < 40 && sand > 20 && sand <= 45) return "clay loam";
  if (clay >= 27 && clay < 40 && sand <= 20) return "silty clay loam";
  if (clay >= 20 && clay < 35 && sand > 45) return "sandy clay loam";
  if (silt >= 80) return "silt";
  if (silt >= 50 && clay < 27) return "silt loam";
  if (clay >= 7 && clay < 27 && sand <= 52 && silt >= 28) return "loam";
  if (sand >= 70 && sand < 85) return "sandy loam";
  if (sand >= 85 && sand < 90) return "loamy sand";
  if (sand >= 90) return "sand";
  return "loam";
}

export function soilProperties(sand: number, silt: number, clay: number): SoilProperties {
  const texture = classifySoil(sand, silt, clay);
  const fieldCapacity = 0.2576 - 0.002 * sand + 0.0036 * clay + 0.0299 * (silt / 10);
  const wiltingPoint = 0.026 + 0.005 * clay - 0.0015 * sand;
  const bulkDensity = 1.6 - 0.004 * clay - 0.001 * silt;
  const porosity = 1 - bulkDensity / 2.65;
  const saturatedConductivity = Math.exp(1.5 - 0.05 * clay + 0.02 * sand);
  return {
    texture,
    fieldCapacity: parseFloat(Math.max(0.05, fieldCapacity).toFixed(3)),
    wiltingPoint: parseFloat(Math.max(0.02, wiltingPoint).toFixed(3)),
    bulkDensity: parseFloat(Math.max(1.0, Math.min(1.8, bulkDensity)).toFixed(2)),
    porosity: parseFloat(Math.max(0.3, Math.min(0.7, porosity)).toFixed(3)),
    saturatedConductivity: parseFloat(saturatedConductivity.toFixed(2)),
  };
}

export function availableWater(fieldCapacity: number, wiltingPoint: number, rootDepthCm: number): number {
  return (fieldCapacity - wiltingPoint) * rootDepthCm * 10;
}

export function irrigationNeed(currentMoisture: number, fieldCapacity: number, rootDepthCm: number): number {
  if (currentMoisture >= fieldCapacity) return 0;
  return (fieldCapacity - currentMoisture) * rootDepthCm * 10;
}

export function phCategory(ph: number): string {
  if (ph < 4.5) return "extremely acidic";
  if (ph < 5.5) return "strongly acidic";
  if (ph < 6.0) return "moderately acidic";
  if (ph < 6.5) return "slightly acidic";
  if (ph < 7.0) return "near neutral";
  if (ph < 7.5) return "neutral";
  if (ph < 8.0) return "slightly alkaline";
  if (ph < 8.5) return "moderately alkaline";
  return "strongly alkaline";
}

export function limeNeeded(currentPh: number, targetPh: number, areaSqm: number, cec: number): number {
  if (currentPh >= targetPh) return 0;
  const phDiff = targetPh - currentPh;
  const kgPerHectare = phDiff * cec * 100;
  return parseFloat((kgPerHectare * areaSqm / 10000).toFixed(1));
}

export function organicMatterRatio(organicGrams: number, totalGrams: number): number {
  if (totalGrams === 0) return 0;
  return parseFloat(((organicGrams / totalGrams) * 100).toFixed(1));
}

export function compactionRisk(bulkDensity: number, texture: SoilTexture): string {
  const thresholds: Record<string, number> = {
    sand: 1.80, "loamy sand": 1.75, "sandy loam": 1.70, loam: 1.65,
    "silt loam": 1.60, silt: 1.55, "sandy clay loam": 1.55,
    "clay loam": 1.50, "silty clay loam": 1.45, "sandy clay": 1.45,
    "silty clay": 1.40, clay: 1.40,
  };
  const threshold = thresholds[texture] ?? 1.60;
  if (bulkDensity >= threshold) return "high";
  if (bulkDensity >= threshold - 0.1) return "moderate";
  return "low";
}

export function drainageClass(saturatedConductivity: number): string {
  if (saturatedConductivity > 50) return "excessively drained";
  if (saturatedConductivity > 15) return "well drained";
  if (saturatedConductivity > 5) return "moderately well drained";
  if (saturatedConductivity > 1.5) return "somewhat poorly drained";
  if (saturatedConductivity > 0.5) return "poorly drained";
  return "very poorly drained";
}

export function waterHoldingCapacity(texture: SoilTexture): string {
  const high: SoilTexture[] = ["silt loam", "silt", "silty clay loam", "loam"];
  const low: SoilTexture[] = ["sand", "loamy sand"];
  if (high.includes(texture)) return "high";
  if (low.includes(texture)) return "low";
  return "medium";
}

export function percolationRate(sand: number, clay: number): number {
  return parseFloat((0.5 * sand / 100 - 0.3 * clay / 100 + 0.1).toFixed(3));
}

export function soilTemperature(airTempC: number, depthCm: number, dayOfYear: number): number {
  const meanAir = 15;
  const amplitude = 12;
  const dampingDepth = 100;
  const phase = dayOfYear - 15;
  const damping = Math.exp(-depthCm / dampingDepth);
  const temp = meanAir + amplitude * damping * Math.sin((2 * Math.PI * phase) / 365 - depthCm / dampingDepth);
  return parseFloat(temp.toFixed(1));
}

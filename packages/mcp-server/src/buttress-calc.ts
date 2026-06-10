export type ButtressType = "clasping" | "diagonal" | "setback" | "angled" | "flying";

export function projectionM(wallHeightM: number): number {
  return parseFloat((wallHeightM * 0.33).toFixed(2));
}

export function widthM(projectionM: number): number {
  return parseFloat((projectionM * 0.6).toFixed(2));
}

export function stageCount(wallHeightM: number): number {
  return Math.max(1, Math.ceil(wallHeightM / 3));
}

export function offsetPerStageCm(projectionM: number, stages: number): number {
  if (stages <= 1) return 0;
  return parseFloat((projectionM * 100 / (stages * 2)).toFixed(1));
}

export function volumeM3(projectionM: number, widthM: number, wallHeightM: number): number {
  return parseFloat((projectionM * widthM * wallHeightM * 0.7).toFixed(2));
}

export function weightKg(volumeM3: number, densityKgPerM3: number): number {
  return parseFloat((volumeM3 * densityKgPerM3).toFixed(1));
}

export function thrustResistanceKn(weightKg: number, frictionCoeff: number): number {
  return parseFloat((weightKg * 9.81 * frictionCoeff / 1000).toFixed(1));
}

export function pinnacleWeightKg(buttressWidthM: number, densityKgPerM3: number): number {
  const height = buttressWidthM * 1.5;
  const base = buttressWidthM * 0.4;
  const volume = (1 / 3) * base * base * height;
  return parseFloat((volume * densityKgPerM3).toFixed(1));
}

export function flyingArchSpanM(naveWidthM: number): number {
  return parseFloat((naveWidthM * 0.45).toFixed(2));
}

export function constructionDays(volumeM3: number, type: ButtressType): number {
  const rates: Record<ButtressType, number> = {
    clasping: 1.5, diagonal: 2.0, setback: 2.5, angled: 2.2, flying: 4.0,
  };
  return Math.ceil(volumeM3 * rates[type]);
}

export function buttressTypes(): ButtressType[] {
  return ["clasping", "diagonal", "setback", "angled", "flying"];
}

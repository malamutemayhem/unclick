export type CofferShape = "square" | "octagonal" | "circular" | "hexagonal" | "diamond";

export function panelArea(widthCm: number, depthCm: number): number {
  return parseFloat((widthCm * depthCm / 10000).toFixed(3));
}

export function panelCount(ceilingAreaM2: number, panelAreaM2: number): number {
  if (panelAreaM2 <= 0) return 0;
  return Math.ceil(ceilingAreaM2 / panelAreaM2);
}

export function recessDepthCm(ceilingThicknessCm: number): number {
  return parseFloat((ceilingThicknessCm * 0.4).toFixed(1));
}

export function ribWidthCm(panelWidthCm: number): number {
  return parseFloat((panelWidthCm * 0.15).toFixed(1));
}

export function rosetteCount(panelCount: number): number {
  return panelCount;
}

export function weightReductionPercent(recessDepthCm: number, totalThicknessCm: number): number {
  if (totalThicknessCm <= 0) return 0;
  return parseFloat((recessDepthCm / totalThicknessCm * 100).toFixed(1));
}

export function gildingGrams(panelCount: number, rosetteAreaCm2: number): number {
  return parseFloat((panelCount * rosetteAreaCm2 * 0.001).toFixed(1));
}

export function paintArea(panelCount: number, panelPerimeterCm: number, recessDepthCm: number, panelAreaCm2: number): number {
  const sidesArea = panelCount * panelPerimeterCm * recessDepthCm;
  const bottomArea = panelCount * panelAreaCm2;
  return parseFloat(((sidesArea + bottomArea) / 10000).toFixed(2));
}

export function acousticAbsorption(recessDepthCm: number, panelCount: number): number {
  return parseFloat((recessDepthCm * panelCount * 0.02).toFixed(2));
}

export function installTimeHours(panelCount: number, shape: CofferShape): number {
  const hoursPerPanel: Record<CofferShape, number> = {
    square: 1.5, octagonal: 2.5, circular: 3, hexagonal: 2, diamond: 2.2,
  };
  return parseFloat((panelCount * hoursPerPanel[shape]).toFixed(1));
}

export function cofferShapes(): CofferShape[] {
  return ["square", "octagonal", "circular", "hexagonal", "diamond"];
}

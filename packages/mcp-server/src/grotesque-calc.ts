export type GrotesqueStyle = "arabesque" | "candelabra" | "rinceaux" | "scrollwork" | "trophy";

export function motifDensity(areaM2: number, motifCount: number): number {
  if (areaM2 <= 0) return 0;
  return parseFloat((motifCount / areaM2).toFixed(1));
}

export function symmetryAxes(style: GrotesqueStyle): number {
  const axes: Record<GrotesqueStyle, number> = {
    arabesque: 2, candelabra: 1, rinceaux: 1, scrollwork: 2, trophy: 1,
  };
  return axes[style];
}

export function repeatUnit(panelWidthCm: number, motifWidthCm: number): number {
  if (motifWidthCm <= 0) return 0;
  return Math.ceil(panelWidthCm / motifWidthCm);
}

export function gildingLeaves(areaM2: number, coveragePercent: number): number {
  return Math.ceil(areaM2 * coveragePercent / 100 * 120);
}

export function reliefDepthMm(style: GrotesqueStyle): number {
  const depths: Record<GrotesqueStyle, number> = {
    arabesque: 3, candelabra: 5, rinceaux: 4, scrollwork: 6, trophy: 8,
  };
  return depths[style];
}

export function carvingComplexity(elements: number, curves: number): number {
  return parseFloat((elements * 2 + curves * 3).toFixed(0));
}

export function plasterLayers(reliefDepth: number): number {
  return Math.ceil(reliefDepth / 3) + 1;
}

export function paintColors(style: GrotesqueStyle): number {
  const colors: Record<GrotesqueStyle, number> = {
    arabesque: 5, candelabra: 8, rinceaux: 4, scrollwork: 3, trophy: 10,
  };
  return colors[style];
}

export function restorationHours(ageYears: number, areaM2: number): number {
  return parseFloat((areaM2 * (1 + ageYears * 0.01) * 10).toFixed(0));
}

export function grotesqueStyles(): GrotesqueStyle[] {
  return ["arabesque", "candelabra", "rinceaux", "scrollwork", "trophy"];
}

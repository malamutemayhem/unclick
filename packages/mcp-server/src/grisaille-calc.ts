export type GrisailleStyle = "geometric" | "foliate" | "diaper" | "crosshatch" | "strapwork";

export function panelArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm / 10000).toFixed(3));
}

export function paintLayers(style: GrisailleStyle): number {
  const layers: Record<GrisailleStyle, number> = {
    geometric: 3, foliate: 5, diaper: 4, crosshatch: 3, strapwork: 4,
  };
  return layers[style];
}

export function silverStainFiringTemp(intensity: number): number {
  return parseFloat((500 + intensity * 10).toFixed(0));
}

export function leadCameLengthCm(panelWidthCm: number, panelHeightCm: number, linesPer10Cm: number): number {
  const horizontalLines = panelHeightCm / 10 * linesPer10Cm;
  const verticalLines = panelWidthCm / 10 * linesPer10Cm;
  return parseFloat((horizontalLines * panelWidthCm + verticalLines * panelHeightCm).toFixed(0));
}

export function glassWeight(areaCm2: number, thicknessMm: number): number {
  return parseFloat((areaCm2 / 10000 * thicknessMm / 1000 * 2500).toFixed(2));
}

export function brushStrokesPerCm2(style: GrisailleStyle): number {
  const strokes: Record<GrisailleStyle, number> = {
    geometric: 2, foliate: 8, diaper: 5, crosshatch: 10, strapwork: 6,
  };
  return strokes[style];
}

export function paintingHours(areaCm2: number, style: GrisailleStyle): number {
  return parseFloat((areaCm2 * brushStrokesPerCm2(style) / 500).toFixed(1));
}

export function firingCycles(layers: number): number {
  return Math.ceil(layers / 2);
}

export function lightTransmissionPercent(style: GrisailleStyle): number {
  const pct: Record<GrisailleStyle, number> = {
    geometric: 65, foliate: 50, diaper: 55, crosshatch: 45, strapwork: 60,
  };
  return pct[style];
}

export function costPerM2(style: GrisailleStyle): number {
  const cost: Record<GrisailleStyle, number> = {
    geometric: 800, foliate: 1500, diaper: 1100, crosshatch: 900, strapwork: 1200,
  };
  return cost[style];
}

export function grisailleStyles(): GrisailleStyle[] {
  return ["geometric", "foliate", "diaper", "crosshatch", "strapwork"];
}

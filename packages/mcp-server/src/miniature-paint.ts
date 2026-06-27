export type PaintType = "acrylic" | "enamel" | "oil" | "contrast" | "speed_paint" | "ink";
export type BrushSize = "000" | "00" | "0" | "1" | "2" | "3" | "drybrush";
export type ScaleSize = "6mm" | "10mm" | "15mm" | "28mm" | "32mm" | "54mm" | "75mm";

export function paintCoverage(mlPerModel: number, modelCount: number): number {
  return parseFloat((mlPerModel * modelCount).toFixed(1));
}

export function thinningRatio(paintType: PaintType): string {
  const ratios: Record<PaintType, string> = {
    acrylic: "1:1 paint to water",
    enamel: "3:1 paint to thinner",
    oil: "no thinning needed",
    contrast: "ready to use",
    speed_paint: "ready to use",
    ink: "1:2 ink to medium",
  };
  return ratios[paintType];
}

export function dryingTime(paintType: PaintType): number {
  const minutes: Record<PaintType, number> = {
    acrylic: 15, enamel: 120, oil: 1440, contrast: 20, speed_paint: 15, ink: 10,
  };
  return minutes[paintType];
}

export function layersNeeded(paintType: PaintType, baseColor: "white" | "black" | "grey"): number {
  const base: Record<PaintType, number> = {
    acrylic: 2, enamel: 2, oil: 1, contrast: 1, speed_paint: 1, ink: 1,
  };
  const extra = baseColor === "black" ? 1 : 0;
  return base[paintType] + extra;
}

export function brushForArea(areaMm2: number): BrushSize {
  if (areaMm2 < 2) return "000";
  if (areaMm2 < 5) return "00";
  if (areaMm2 < 15) return "0";
  if (areaMm2 < 40) return "1";
  if (areaMm2 < 100) return "2";
  return "3";
}

export function modelSurface(scaleMm: number): number {
  const heightCm = scaleMm / 10;
  return parseFloat((heightCm ** 2 * 6).toFixed(1));
}

export function primerAmount(surfaceAreaCm2: number): number {
  return parseFloat((surfaceAreaCm2 * 0.02).toFixed(2));
}

export function varnishCoats(finish: "matte" | "satin" | "gloss"): number {
  const coats: Record<string, number> = { matte: 1, satin: 2, gloss: 2 };
  return coats[finish];
}

export function wetPaletteDuration(): number {
  return 48;
}

export function paintPotLife(mlRemaining: number, modelsPerWeek: number, mlPerModel: number): number {
  if (modelsPerWeek === 0 || mlPerModel === 0) return Infinity;
  return parseFloat((mlRemaining / (modelsPerWeek * mlPerModel)).toFixed(1));
}

export function assemblyTime(partCount: number): number {
  return partCount * 3;
}

export function paintTime(surfaceAreaCm2: number, detail: "tabletop" | "display" | "competition"): number {
  const minutesPerCm2: Record<string, number> = { tabletop: 2, display: 8, competition: 20 };
  return parseFloat((surfaceAreaCm2 * minutesPerCm2[detail]).toFixed(0));
}

export function colorSchemeCount(primaryColors: number, accentColors: number): number {
  return primaryColors + accentColors;
}

export function batchSize(availableHours: number, minutesPerModel: number): number {
  return Math.floor(availableHours * 60 / minutesPerModel);
}

export function paintTypes(): PaintType[] {
  return ["acrylic", "enamel", "oil", "contrast", "speed_paint", "ink"];
}

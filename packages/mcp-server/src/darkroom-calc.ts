export type FilmFormat = "35mm" | "120" | "4x5" | "8x10";
export type PaperSize = "5x7" | "8x10" | "11x14" | "16x20" | "20x24";

export function enlargementFactor(filmMm: number, printMm: number): number {
  return parseFloat((printMm / filmMm).toFixed(1));
}

export function filmArea(format: FilmFormat): { widthMm: number; heightMm: number } {
  const areas: Record<FilmFormat, { widthMm: number; heightMm: number }> = {
    "35mm": { widthMm: 36, heightMm: 24 },
    "120": { widthMm: 60, heightMm: 60 },
    "4x5": { widthMm: 102, heightMm: 127 },
    "8x10": { widthMm: 203, heightMm: 254 },
  };
  return areas[format];
}

export function paperDimensions(size: PaperSize): { widthMm: number; heightMm: number } {
  const dims: Record<PaperSize, { widthMm: number; heightMm: number }> = {
    "5x7": { widthMm: 127, heightMm: 178 },
    "8x10": { widthMm: 203, heightMm: 254 },
    "11x14": { widthMm: 279, heightMm: 356 },
    "16x20": { widthMm: 406, heightMm: 508 },
    "20x24": { widthMm: 508, heightMm: 610 },
  };
  return dims[size];
}

export function developerAmount(filmRolls: number, mlPerRoll: number = 300): number {
  return filmRolls * mlPerRoll;
}

export function stopBathAmount(filmRolls: number, mlPerRoll: number = 300): number {
  return filmRolls * mlPerRoll;
}

export function fixerAmount(filmRolls: number, mlPerRoll: number = 300): number {
  return filmRolls * mlPerRoll;
}

export function developmentTime(filmISO: number, devType: "D76" | "HC110" | "Rodinal" | "XTOL"): number {
  const base: Record<string, number> = { D76: 8, HC110: 6, Rodinal: 9, XTOL: 7.5 };
  const isoFactor = Math.log2(filmISO / 100) * 1.5;
  return parseFloat((base[devType] + isoFactor).toFixed(1));
}

export function pushPullAdjustment(stops: number): number {
  return parseFloat((stops * 20).toFixed(0));
}

export function agitationInterval(devType: "continuous" | "intermittent"): number {
  return devType === "continuous" ? 0 : 60;
}

export function exposureTime(baseSeconds: number, filterFactor: number): number {
  return parseFloat((baseSeconds * filterFactor).toFixed(1));
}

export function fStopPrinting(baseTime: number, stops: number): number {
  return parseFloat((baseTime * Math.pow(2, stops)).toFixed(1));
}

export function testStripExposures(baseTime: number, strips: number = 5, increment: number = 0.5): number[] {
  const exposures: number[] = [];
  for (let i = 0; i < strips; i++) {
    exposures.push(parseFloat((baseTime * Math.pow(2, i * increment)).toFixed(1)));
  }
  return exposures;
}

export function safelightDistance(watts: number): number {
  if (watts <= 7) return 120;
  if (watts <= 15) return 150;
  return 200;
}

export function washTime(printType: "RC" | "fiber"): number {
  return printType === "RC" ? 5 : 30;
}

export function dryingTime(printType: "RC" | "fiber"): number {
  return printType === "RC" ? 30 : 480;
}

export function chemicalCost(rolls: number, devPricePerL: number, fixerPricePerL: number): number {
  const devL = rolls * 0.3;
  const fixerL = rolls * 0.3;
  return parseFloat((devL * devPricePerL + fixerL * fixerPricePerL).toFixed(2));
}

export function filmFormats(): FilmFormat[] {
  return ["35mm", "120", "4x5", "8x10"];
}

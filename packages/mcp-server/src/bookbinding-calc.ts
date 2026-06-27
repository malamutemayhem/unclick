export type BindingStyle = "perfect" | "case" | "coptic" | "japanese_stab" | "saddle_stitch" | "kettle_stitch";
export type PaperSize = "A4" | "A5" | "A6" | "letter" | "half_letter" | "B5";

const PAPER_DIMENSIONS: Record<PaperSize, { widthMm: number; heightMm: number }> = {
  A4: { widthMm: 210, heightMm: 297 },
  A5: { widthMm: 148, heightMm: 210 },
  A6: { widthMm: 105, heightMm: 148 },
  letter: { widthMm: 216, heightMm: 279 },
  half_letter: { widthMm: 140, heightMm: 216 },
  B5: { widthMm: 176, heightMm: 250 },
};

export function paperDimensions(size: PaperSize): { widthMm: number; heightMm: number } {
  return { ...PAPER_DIMENSIONS[size] };
}

export function sheetsToPages(sheets: number): number {
  return sheets * 2;
}

export function pagesToSheets(pages: number): number {
  return Math.ceil(pages / 2);
}

export function signatures(sheets: number, sheetsPerSignature: number = 4): number {
  return Math.ceil(sheets / sheetsPerSignature);
}

export function spineThickness(sheets: number, paperGsm: number): number {
  const mmPerSheet = paperGsm * 0.001;
  return parseFloat((sheets * mmPerSheet).toFixed(1));
}

export function boardThickness(spineThicknessMm: number): number {
  if (spineThicknessMm < 5) return 1.5;
  if (spineThicknessMm < 15) return 2.0;
  return 2.5;
}

export function coverSize(textBlockWidthMm: number, textBlockHeightMm: number, spineThicknessMm: number, overhangMm: number = 3): {
  width: number;
  height: number;
  spineWidth: number;
} {
  return {
    width: parseFloat((textBlockWidthMm + overhangMm * 2).toFixed(0)),
    height: parseFloat((textBlockHeightMm + overhangMm * 2).toFixed(0)),
    spineWidth: parseFloat((spineThicknessMm + 6).toFixed(0)),
  };
}

export function clothNeeded(coverWidthMm: number, coverHeightMm: number, turnInMm: number = 15): { widthMm: number; heightMm: number } {
  return {
    widthMm: coverWidthMm * 2 + turnInMm * 2 + 20,
    heightMm: coverHeightMm + turnInMm * 2,
  };
}

export function threadLength(signatures: number, signatureHeightMm: number, stations: number = 5): number {
  const perSig = signatureHeightMm * 2 + stations * 10;
  const totalMm = signatures * perSig;
  return parseFloat((totalMm / 1000).toFixed(1));
}

export function glueAmount(spineAreaMm2: number, coats: number = 2): number {
  const mlPerMm2 = 0.0001;
  return parseFloat((spineAreaMm2 * mlPerMm2 * coats).toFixed(1));
}

export function endpapersNeeded(style: BindingStyle): number {
  if (style === "case" || style === "perfect") return 4;
  if (style === "coptic" || style === "kettle_stitch") return 2;
  return 0;
}

export function sewingStations(heightMm: number): number {
  if (heightMm < 150) return 3;
  if (heightMm < 250) return 5;
  return 7;
}

export function pressTime(style: BindingStyle): number {
  const hours: Record<BindingStyle, number> = {
    perfect: 24,
    case: 24,
    coptic: 0,
    japanese_stab: 0,
    saddle_stitch: 0,
    kettle_stitch: 12,
  };
  return hours[style];
}

export function dryingTime(style: BindingStyle): number {
  const hours: Record<BindingStyle, number> = {
    perfect: 48,
    case: 72,
    coptic: 0,
    japanese_stab: 0,
    saddle_stitch: 0,
    kettle_stitch: 24,
  };
  return hours[style];
}

export function costEstimate(sheets: number, paperPricePerSheet: number, boardPricePerBoard: number, boardCount: number = 2): number {
  return parseFloat((sheets * paperPricePerSheet + boardCount * boardPricePerBoard).toFixed(2));
}

export function bindingStyles(): BindingStyle[] {
  return ["perfect", "case", "coptic", "japanese_stab", "saddle_stitch", "kettle_stitch"];
}

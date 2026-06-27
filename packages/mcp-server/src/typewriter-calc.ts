export type TypewriterType = "manual" | "electric" | "portable" | "standard" | "executive";
export type RibbonType = "fabric" | "carbon" | "correctable" | "multi_strike";

export function charsPerLine(carriageWidthCm: number, pitchCpi: number = 10): number {
  const widthInches = carriageWidthCm / 2.54;
  return Math.floor(widthInches * pitchCpi);
}

export function linesPerPage(pageHeightCm: number, lineSpacing: number = 6): number {
  const heightInches = pageHeightCm / 2.54;
  return Math.floor(heightInches * lineSpacing);
}

export function wordsPerPage(charsPerLine: number, linesPerPage: number, avgWordLen: number = 5): number {
  return Math.floor(charsPerLine * linesPerPage / (avgWordLen + 1));
}

export function ribbonLife(ribbonType: RibbonType): number {
  const pages: Record<RibbonType, number> = {
    fabric: 200, carbon: 50, correctable: 80, multi_strike: 120,
  };
  return pages[ribbonType];
}

export function typingSpeed(wpm: number): number {
  return parseFloat((wpm * 5).toFixed(0));
}

export function pagesPerHour(wpm: number, wordsPerPage: number): number {
  if (wordsPerPage === 0) return 0;
  return parseFloat((wpm * 60 / wordsPerPage).toFixed(1));
}

export function plattenDiameter(carriageWidthCm: number): number {
  return parseFloat((carriageWidthCm * 1.1).toFixed(1));
}

export function keyForce(type: TypewriterType): number {
  const grams: Record<TypewriterType, number> = {
    manual: 250, electric: 50, portable: 200, standard: 230, executive: 180,
  };
  return grams[type];
}

export function maintenanceInterval(type: TypewriterType): string {
  if (type === "electric") return "annual service, oil every 6 months";
  return "oil every 3 months, service annually";
}

export function erasureMethod(ribbonType: RibbonType): string {
  const methods: Record<RibbonType, string> = {
    fabric: "correction fluid", carbon: "razor blade scraping",
    correctable: "lift-off tape", multi_strike: "correction fluid",
  };
  return methods[ribbonType];
}

export function marginWidth(carriageWidthCm: number, textWidthCm: number): number {
  return parseFloat(((carriageWidthCm - textWidthCm) / 2).toFixed(1));
}

export function tabStops(textWidthCm: number, intervalCm: number = 1.27): number {
  return Math.floor(textWidthCm / intervalCm);
}

export function collectibleValue(type: TypewriterType, yearMade: number): string {
  const age = 2026 - yearMade;
  if (age > 80) return "high collectible value";
  if (age > 50) return "moderate collectible value";
  if (age > 30) return "some collector interest";
  return "primarily functional value";
}

export function typewriterTypes(): TypewriterType[] {
  return ["manual", "electric", "portable", "standard", "executive"];
}

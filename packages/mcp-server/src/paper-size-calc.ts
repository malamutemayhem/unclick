export type PaperSize = "a4" | "letter" | "a3" | "legal" | "tabloid";

export function widthMm(p: PaperSize): number {
  const m: Record<PaperSize, number> = {
    a4: 210, letter: 216, a3: 297, legal: 216, tabloid: 279,
  };
  return m[p];
}

export function heightMm(p: PaperSize): number {
  const m: Record<PaperSize, number> = {
    a4: 297, letter: 279, a3: 420, legal: 356, tabloid: 432,
  };
  return m[p];
}

export function areaSqCm(p: PaperSize): number {
  const m: Record<PaperSize, number> = {
    a4: 624, letter: 603, a3: 1247, legal: 769, tabloid: 1205,
  };
  return m[p];
}

export function globalUsage(p: PaperSize): number {
  const m: Record<PaperSize, number> = {
    a4: 10, letter: 7, a3: 5, legal: 4, tabloid: 3,
  };
  return m[p];
}

export function printerCompatibility(p: PaperSize): number {
  const m: Record<PaperSize, number> = {
    a4: 9, letter: 9, a3: 6, legal: 7, tabloid: 5,
  };
  return m[p];
}

export function isoStandard(p: PaperSize): boolean {
  const m: Record<PaperSize, boolean> = {
    a4: true, letter: false, a3: true, legal: false, tabloid: false,
  };
  return m[p];
}

export function standardDesktop(p: PaperSize): boolean {
  const m: Record<PaperSize, boolean> = {
    a4: true, letter: true, a3: false, legal: true, tabloid: false,
  };
  return m[p];
}

export function primaryRegion(p: PaperSize): string {
  const m: Record<PaperSize, string> = {
    a4: "international", letter: "north_america",
    a3: "international", legal: "north_america",
    tabloid: "north_america",
  };
  return m[p];
}

export function commonUse(p: PaperSize): string {
  const m: Record<PaperSize, string> = {
    a4: "documents_letters", letter: "documents_letters",
    a3: "drawings_posters", legal: "contracts_legal",
    tabloid: "newspapers_spreads",
  };
  return m[p];
}

export function paperSizes(): PaperSize[] {
  return ["a4", "letter", "a3", "legal", "tabloid"];
}

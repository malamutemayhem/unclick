// apps/jobsmith/src/lib/pdfText.ts
//
// PDF text extraction for the cover-letter corpus.
// Wraps pdf-parse (cross-platform: works in Node and the browser) and applies
// heuristic clean-up: repeated headers/footers and page numbers are stripped so
// the voice profile sees letter prose, not layout furniture.

import { PDFParse } from "pdf-parse";

export interface PdfExtraction {
  text: string;
  pageCount: number;
}

const PAGE_NUMBER_PATTERNS: RegExp[] = [
  /^\d{1,3}$/,
  /^page\s+\d+(?:\s+of\s+\d+)?$/i,
  /^\d+\s*(?:\/|of)\s*\d+$/i,
  /^[-–—]\s*\d+\s*[-–—]$/,
];

function isPageNumberLine(line: string): boolean {
  const t = line.trim();
  if (!t) return false;
  return PAGE_NUMBER_PATTERNS.some((re) => re.test(t));
}

// Normalised key so "Page 1 of 4" and "Page 2 of 4" collapse to one header.
function normalizeLine(line: string): string {
  return line.trim().toLowerCase().replace(/\d+/g, "#").replace(/\s+/g, " ");
}

// Lines that recur at the top or bottom edge of at least half the pages are
// treated as running headers/footers and removed.
function findRepeatedEdgeLines(pageLines: string[][]): Set<string> {
  const repeated = new Set<string>();
  if (pageLines.length < 2) return repeated;

  const counts = new Map<string, number>();
  for (const lines of pageLines) {
    const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
    const edge = [...nonEmpty.slice(0, 3), ...nonEmpty.slice(-3)];
    const seen = new Set<string>();
    for (const line of edge) {
      const norm = normalizeLine(line);
      if (!norm || seen.has(norm)) continue;
      seen.add(norm);
      counts.set(norm, (counts.get(norm) ?? 0) + 1);
    }
  }

  const threshold = Math.max(2, Math.ceil(pageLines.length / 2));
  for (const [norm, count] of counts) {
    if (count >= threshold) repeated.add(norm);
  }
  return repeated;
}

export function stripPdfArtifacts(pages: string[]): string {
  const pageLines = pages.map((p) =>
    p.split(/\r?\n/).map((l) => l.replace(/\s+$/g, "")),
  );
  const repeated = findRepeatedEdgeLines(pageLines);

  const cleanedPages = pageLines.map((lines) => {
    const kept = lines.filter((line) => {
      if (isPageNumberLine(line)) return false;
      const norm = normalizeLine(line);
      if (norm && repeated.has(norm)) return false;
      return true;
    });
    return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  });

  return cleanedPages
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function extractPdfText(data: Uint8Array): Promise<PdfExtraction> {
  const parser = new PDFParse({ data });
  try {
    const result = await parser.getText();
    const pages = result.pages.map((p) => p.text ?? "");
    return { text: stripPdfArtifacts(pages), pageCount: result.total };
  } finally {
    await parser.destroy();
  }
}

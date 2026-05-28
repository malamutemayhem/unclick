// apps/jobsmith/src/lib/pdfText.ts
//
// Node-side PDF text extraction for the cover-letter corpus.
// Wraps pdf-parse and applies the shared artifact clean-up from pdfArtifacts.
// The browser path lives in parsePdfBrowser.ts (pdfjs-dist + bundled worker).

import { PDFParse } from "pdf-parse";

import { stripPdfArtifacts } from "./pdfArtifacts";

export { stripPdfArtifacts } from "./pdfArtifacts";

export interface PdfExtraction {
  text: string;
  pageCount: number;
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

// src/lib/jobsmith/parsePdfBrowser.ts
//
// Browser-side PDF text extraction. Uses pdfjs-dist with its bundled worker so
// everything runs locally in the user's browser: no upload, no external call.
// Shares the artifact clean-up heuristics with the Node path.

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import { stripPdfArtifacts } from "@jobsmith/lib/pdfArtifacts";

GlobalWorkerOptions.workerSrc = workerUrl;

export interface PdfExtraction {
  text: string;
  pageCount: number;
}

interface TextItemLike {
  str?: string;
  hasEOL?: boolean;
}

export async function extractPdfTextBrowser(
  data: Uint8Array,
): Promise<PdfExtraction> {
  const doc = await getDocument({ data }).promise;
  try {
    const pages: string[] = [];
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      const lines: string[] = [];
      let line = "";
      for (const raw of content.items as TextItemLike[]) {
        if (typeof raw.str !== "string") continue;
        line += raw.str;
        if (raw.hasEOL) {
          lines.push(line);
          line = "";
        }
      }
      if (line) lines.push(line);
      pages.push(lines.join("\n"));
    }
    return { text: stripPdfArtifacts(pages), pageCount: doc.numPages };
  } finally {
    await doc.destroy();
  }
}

// src/lib/jobsmith/buildBrowserCorpus.ts
//
// Turns a set of files the user picks in the browser into a Corpus object that
// buildVoiceProfile() can consume. PDF cover letters are parsed in-browser;
// .txt/.md letters are read directly. Nothing leaves the browser.

import type { Corpus, CoverLetter } from "@jobsmith/lib/ingestCvCorpus";

export interface CorpusFileResult {
  fileName: string;
  format: CoverLetter["format"];
  ok: boolean;
  chars: number;
  error?: string;
}

export interface BrowserCorpusResult {
  corpus: Corpus;
  files: CorpusFileResult[];
}

function classifyFormat(name: string): CoverLetter["format"] {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1) return "other";
  const ext = name.toLowerCase().slice(dotIndex);
  if (ext === ".txt" || ext === ".md") return "txt";
  if (ext === ".pdf") return "pdf";
  if (ext === ".indd") return "indd";
  return "other";
}

export async function buildBrowserCorpus(
  files: File[],
): Promise<BrowserCorpusResult> {
  const coverLetters: CoverLetter[] = [];
  const results: CorpusFileResult[] = [];

  for (const file of files) {
    const format = classifyFormat(file.name);
    let textContent: string | null = null;
    let error: string | undefined;

    try {
      if (format === "pdf") {
        // Lazy-loaded so pdfjs-dist stays out of the main bundle.
        const { extractPdfTextBrowser } = await import("./parsePdfBrowser");
        const buf = new Uint8Array(await file.arrayBuffer());
        textContent = (await extractPdfTextBrowser(buf)).text;
      } else if (format === "txt") {
        textContent = await file.text();
      } else {
        error = "Unsupported file type (use .pdf, .txt, or .md)";
      }
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    }

    if (textContent !== null && textContent.trim().length === 0) {
      textContent = null;
      error = error ?? "No readable text found in this file";
    }

    coverLetters.push({
      fileName: file.name,
      filePath: file.name,
      format,
      date: null,
      company: null,
      role: null,
      textContent,
    });
    results.push({
      fileName: file.name,
      format,
      ok: textContent !== null,
      chars: textContent?.length ?? 0,
      error,
    });
  }

  return {
    corpus: {
      rootPath: "(browser upload)",
      cvDated: [],
      coverLetters,
      jobsApplied: [],
      promptTemplate: null,
      ingestedAt: new Date().toISOString(),
    },
    files: results,
  };
}

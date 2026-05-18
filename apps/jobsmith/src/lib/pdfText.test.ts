// apps/jobsmith/src/lib/pdfText.test.ts

import { describe, test, expect } from "vitest";

import { extractPdfText, stripPdfArtifacts } from "./pdfText";
import { makeMinimalPdf } from "../test/makePdf";

describe("stripPdfArtifacts", () => {
  test("preserves a single page unchanged apart from trimming", () => {
    const out = stripPdfArtifacts([
      "Dear Hiring Manager,\n\nI am writing to express my interest.\n\nSincerely,\nChristopher Byrne",
    ]);
    expect(out).toContain("Dear Hiring Manager,");
    expect(out).toContain("Christopher Byrne");
  });

  test("strips bare page-number lines", () => {
    const out = stripPdfArtifacts(["First body line\n2\nSecond body line"]);
    expect(out).toContain("First body line");
    expect(out).toContain("Second body line");
    expect(out.split(/\r?\n/)).not.toContain("2");
  });

  test("strips 'Page X of Y' style footers", () => {
    const out = stripPdfArtifacts(["Body content here\nPage 1 of 3"]);
    expect(out).toContain("Body content here");
    expect(out).not.toMatch(/Page 1 of 3/);
  });

  test("strips running headers that repeat across pages", () => {
    const pages = [
      "Christopher Byrne CV\nProfile summary line one\nMore detail",
      "Christopher Byrne CV\nWork experience section\nEven more detail",
      "Christopher Byrne CV\nEducation section\nClosing detail",
    ];
    const out = stripPdfArtifacts(pages);
    expect(out).toContain("Profile summary line one");
    expect(out).toContain("Education section");
    expect(out).not.toMatch(/Christopher Byrne CV/);
  });

  test("keeps a line that only appears on one page", () => {
    const pages = [
      "Shared footer\nUnique opening paragraph",
      "Shared footer\nA different paragraph",
    ];
    const out = stripPdfArtifacts(pages);
    expect(out).toContain("Unique opening paragraph");
    expect(out).not.toMatch(/Shared footer/);
  });
});

describe("extractPdfText", () => {
  test("extracts text from a real generated PDF", async () => {
    const pdf = makeMinimalPdf([
      "Dear Hiring Manager,",
      "I am writing to express my interest in the role.",
      "Sincerely, Christopher Byrne",
    ]);
    const { text, pageCount } = await extractPdfText(pdf);
    expect(pageCount).toBe(1);
    expect(text).toMatch(/Dear Hiring Manager/);
    expect(text).toMatch(/express my interest/);
    expect(text).toMatch(/Christopher Byrne/);
  });

  test("rejects on input that is not a PDF", async () => {
    const notPdf = new TextEncoder().encode("this is plain text, not a pdf");
    await expect(extractPdfText(notPdf)).rejects.toBeDefined();
  });
});

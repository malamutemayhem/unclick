// apps/jobsmith/src/lib/exportDocx.ts
//
// Renders a Jobsmith draft to an ATS-safe .docx: single column, one standard
// font, standard section headings, real bullet lists. No tables, no text
// boxes, no headers/footers, nothing that an applicant tracking system parser
// trips over.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  type IParagraphOptions,
} from "docx";

export type DocxKind = "letter" | "cv";

export interface DocxBuildOptions {
  kind: DocxKind;
}

const BASE_FONT = "Calibri";
const BASE_SIZE = 22; // half-points => 11pt
const HEADING_SIZE = 26; // 13pt
const NAME_SIZE = 32; // 16pt

const CV_HEADINGS = new Set(["Summary", "Work Experience", "Education", "Skills"]);

function plainParagraph(text: string, extra: IParagraphOptions = {}): Paragraph {
  return new Paragraph({ children: [new TextRun(text)], ...extra });
}

function cvParagraphs(text: string): Paragraph[] {
  const lines = text.split(/\r?\n/);
  const out: Paragraph[] = [];
  let seenName = false;
  let seenContact = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (!seenName) {
      out.push(
        new Paragraph({
          children: [new TextRun({ text: line, bold: true, size: NAME_SIZE })],
        }),
      );
      seenName = true;
      continue;
    }
    if (!seenContact) {
      out.push(plainParagraph(line, { spacing: { after: 160 } }));
      seenContact = true;
      continue;
    }
    if (CV_HEADINGS.has(line)) {
      out.push(
        new Paragraph({
          children: [new TextRun({ text: line, bold: true, size: HEADING_SIZE })],
          spacing: { before: 240, after: 80 },
        }),
      );
      continue;
    }
    if (line.startsWith("- ")) {
      out.push(
        new Paragraph({ text: line.slice(2), bullet: { level: 0 } }),
      );
      continue;
    }
    out.push(plainParagraph(line, { spacing: { after: 60 } }));
  }
  return out;
}

function letterParagraphs(text: string): Paragraph[] {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.map((block) => {
    const innerLines = block.split(/\r?\n/);
    const children = innerLines.flatMap((line, idx) =>
      idx === 0
        ? [new TextRun(line)]
        : [new TextRun({ text: line, break: 1 })],
    );
    return new Paragraph({ children, spacing: { after: 200 } });
  });
}

export function buildJobsmithDocx(
  text: string,
  options: DocxBuildOptions,
): Document {
  const children =
    options.kind === "cv" ? cvParagraphs(text) : letterParagraphs(text);
  return new Document({
    styles: {
      default: {
        document: { run: { font: BASE_FONT, size: BASE_SIZE } },
      },
    },
    sections: [
      {
        properties: {},
        children: children.length > 0 ? children : [plainParagraph("")],
      },
    ],
  });
}

export async function toDocxBlob(
  text: string,
  options: DocxBuildOptions,
): Promise<Blob> {
  return Packer.toBlob(buildJobsmithDocx(text, options));
}

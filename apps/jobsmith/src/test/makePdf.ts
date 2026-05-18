// apps/jobsmith/src/test/makePdf.ts
//
// Test-only helper: builds a minimal valid single-page PDF carrying the given
// text lines. Lets the PDF-parsing tests run without committing binary fixtures.
// Not matched by the vitest include glob (it is not a *.test.ts file).

function escapePdfText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function makeMinimalPdf(lines: string[]): Uint8Array {
  const contentLines = lines.length > 0 ? lines : [" "];
  const textOps = contentLines
    .map((line, i) =>
      i === 0
        ? `(${escapePdfText(line)}) Tj`
        : `0 -18 Td (${escapePdfText(line)}) Tj`,
    )
    .join("\n");
  const stream = `BT\n/F1 14 Tf\n72 720 Td\n${textOps}\nET`;

  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let body = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, idx) => {
    offsets.push(body.length);
    body += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = body.length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    xref += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(body + xref + trailer);
}

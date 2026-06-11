import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function markdowntableConvert(args: Record<string, unknown>) {
  const input = typeof args.input === "string" ? args.input.trim() : "";
  if (!input) return { error: "input is required (CSV or TSV text)" };

  const delimiter = args.delimiter === "tab" || args.delimiter === "\t" ? "\t" : ",";
  const hasHeader = args.has_header !== false;

  const lines = input.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { error: "No data rows found" };

  const rows = lines.map((line) => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        cells.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());
    return cells;
  });

  const maxCols = Math.max(...rows.map((r) => r.length));
  const padded = rows.map((r) => {
    while (r.length < maxCols) r.push("");
    return r;
  });

  const mdLines: string[] = [];
  const header = hasHeader ? padded[0] : padded[0].map((_, i) => `Col ${i + 1}`);
  mdLines.push("| " + header.join(" | ") + " |");
  mdLines.push("| " + header.map(() => "---").join(" | ") + " |");

  const dataRows = hasHeader ? padded.slice(1) : padded;
  for (const row of dataRows) {
    mdLines.push("| " + row.join(" | ") + " |");
  }

  const markdown = mdLines.join("\n");

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Set delimiter to 'tab' for TSV input", "Set has_header to false if no header row"],
  };
  return stampMeta({ markdown, rows: dataRows.length, columns: maxCols }, meta);
}

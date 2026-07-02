import { stampMeta } from "./connector-meta.js";

export async function csvParse(args: Record<string, unknown>) {
  const csv = String(args.csv ?? "").trim();
  if (!csv) return { error: "csv (CSV text) is required" };
  const delimiter = String(args.delimiter ?? ",");
  const lines = csv.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return { error: "Empty CSV" };
  const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ""));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] ?? "";
    }
    rows.push(row);
  }
  return stampMeta({ headers, rows, row_count: rows.length, column_count: headers.length }, {
    source: "local CSV parser",
    fetched_at: new Date().toISOString(),
    next_steps: ["access rows as array of objects keyed by header", "check row_count and column_count"],
  });
}

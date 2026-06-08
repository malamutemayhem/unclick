export interface CSVOptions {
  delimiter?: string;
  quote?: string;
  escape?: string;
  header?: boolean;
}

export function parseCSV(input: string, options?: CSVOptions): string[][] {
  const { delimiter = ",", quote = '"', escape = '"' } = options || {};
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === escape && i + 1 < input.length && input[i + 1] === quote) {
        field += quote;
        i += 2;
      } else if (ch === quote) {
        inQuotes = false;
        i++;
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === quote) {
        inQuotes = true;
        i++;
      } else if (ch === delimiter) {
        row.push(field);
        field = "";
        i++;
      } else if (ch === "\r" && i + 1 < input.length && input[i + 1] === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
        i += 2;
      } else if (ch === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

export function parseCSVWithHeaders(input: string, options?: CSVOptions): Record<string, string>[] {
  const rows = parseCSV(input, options);
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ""; });
    return obj;
  });
}

export function toCSV(data: string[][], options?: CSVOptions): string {
  const { delimiter = ",", quote = '"' } = options || {};
  return data.map((row) =>
    row.map((field) => {
      if (field.includes(delimiter) || field.includes(quote) || field.includes("\n")) {
        return `${quote}${field.replace(new RegExp(quote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), quote + quote)}${quote}`;
      }
      return field;
    }).join(delimiter)
  ).join("\n");
}

export function objectsToCSV(data: Record<string, unknown>[], keys?: string[]): string {
  if (data.length === 0) return "";
  const headers = keys || Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((h) => String(obj[h] ?? "")));
  return toCSV([headers, ...rows]);
}

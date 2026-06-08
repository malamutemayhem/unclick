export interface CSVOptions {
  delimiter?: string;
  quote?: string;
  header?: boolean;
}

export function parseCSV(input: string, options?: CSVOptions): string[][] | Record<string, string>[] {
  const delimiter = options?.delimiter ?? ",";
  const quote = options?.quote ?? '"';
  const hasHeader = options?.header ?? false;

  const rows = parseRows(input, delimiter, quote);
  if (!hasHeader) return rows;
  if (rows.length === 0) return [];

  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] ?? "";
    }
    return obj;
  });
}

export function stringifyCSV(data: string[][] | Record<string, string>[], options?: CSVOptions): string {
  const delimiter = options?.delimiter ?? ",";
  const quote = options?.quote ?? '"';

  if (data.length === 0) return "";

  if (Array.isArray(data[0])) {
    return (data as string[][]).map((row) => formatRow(row, delimiter, quote)).join("\n");
  }

  const records = data as Record<string, string>[];
  const headers = Object.keys(records[0]);
  const lines = [formatRow(headers, delimiter, quote)];
  for (const record of records) {
    lines.push(formatRow(headers.map((h) => record[h] ?? ""), delimiter, quote));
  }
  return lines.join("\n");
}

function parseRows(input: string, delimiter: string, quote: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (inQuotes) {
      if (ch === quote) {
        if (i + 1 < input.length && input[i + 1] === quote) {
          currentField += quote;
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        currentField += ch;
        i++;
      }
    } else {
      if (ch === quote) {
        inQuotes = true;
        i++;
      } else if (ch === delimiter) {
        currentRow.push(currentField);
        currentField = "";
        i++;
      } else if (ch === "\n" || (ch === "\r" && input[i + 1] === "\n")) {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
        i += ch === "\r" ? 2 : 1;
      } else {
        currentField += ch;
        i++;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function formatRow(row: string[], delimiter: string, quote: string): string {
  return row.map((field) => {
    if (field.includes(delimiter) || field.includes(quote) || field.includes("\n")) {
      return `${quote}${field.replace(new RegExp(escapeRegex(quote), "g"), quote + quote)}${quote}`;
    }
    return field;
  }).join(delimiter);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

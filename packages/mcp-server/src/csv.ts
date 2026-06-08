export interface CsvOptions {
  delimiter?: string;
  quote?: string;
  header?: boolean;
}

export function parse(input: string, options: CsvOptions = {}): string[][] {
  const delimiter = options.delimiter ?? ",";
  const quote = options.quote ?? '"';
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const ch = input[i];
    if (inQuotes) {
      if (ch === quote) {
        if (i + 1 < input.length && input[i + 1] === quote) {
          field += quote;
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
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
      } else if (ch === "\r") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
        i++;
        if (i < input.length && input[i] === "\n") i++;
      } else if (ch === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
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

export function parseWithHeader(input: string, options: CsvOptions = {}): Record<string, string>[] {
  const rows = parse(input, options);
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map((row: string[]) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] ?? "";
    }
    return obj;
  });
}

export function stringify(rows: string[][], options: CsvOptions = {}): string {
  const delimiter = options.delimiter ?? ",";
  const quote = options.quote ?? '"';
  return rows.map((row: string[]) =>
    row.map((field: string) => {
      if (field.includes(delimiter) || field.includes(quote) || field.includes("\n") || field.includes("\r")) {
        return quote + field.replace(new RegExp(escapeRegex(quote), "g"), quote + quote) + quote;
      }
      return field;
    }).join(delimiter)
  ).join("\n");
}

export function stringifyWithHeader(data: Record<string, string>[], options: CsvOptions = {}): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map((obj: Record<string, string>) => headers.map((h: string) => obj[h] ?? ""));
  return stringify([headers, ...rows], options);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

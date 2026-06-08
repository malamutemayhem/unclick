export interface CSVOptions {
  delimiter?: string;
  quote?: string;
  header?: boolean;
}

export function parseCSV(input: string, options?: CSVOptions): string[][] {
  const delim = options?.delimiter || ",";
  const quote = options?.quote || '"';
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuote = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (inQuote) {
      if (ch === quote) {
        if (i + 1 < input.length && input[i + 1] === quote) {
          cell += quote;
          i++;
        } else {
          inQuote = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === quote) {
        inQuote = true;
      } else if (ch === delim) {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        cell = "";
        rows.push(row);
        row = [];
      } else if (ch === "\r") {
        if (i + 1 < input.length && input[i + 1] === "\n") i++;
        row.push(cell);
        cell = "";
        rows.push(row);
        row = [];
      } else {
        cell += ch;
      }
    }
  }

  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

export function parseCSVWithHeader(input: string, options?: CSVOptions): Record<string, string>[] {
  const rows = parseCSV(input, options);
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] || "";
    }
    return obj;
  });
}

export function stringifyCSV(data: string[][], options?: CSVOptions): string {
  const delim = options?.delimiter || ",";
  const quote = options?.quote || '"';
  return data
    .map((row) =>
      row
        .map((cell) => {
          if (cell.includes(delim) || cell.includes(quote) || cell.includes("\n") || cell.includes("\r")) {
            return `${quote}${cell.replace(new RegExp(escapeRegex(quote), "g"), quote + quote)}${quote}`;
          }
          return cell;
        })
        .join(delim)
    )
    .join("\n");
}

export function stringifyCSVWithHeader(
  data: Record<string, string>[],
  headers?: string[],
  options?: CSVOptions
): string {
  const cols = headers || (data.length > 0 ? Object.keys(data[0]) : []);
  const rows = data.map((obj) => cols.map((h) => obj[h] || ""));
  return stringifyCSV([cols, ...rows], options);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface CsvOptions {
  delimiter?: string;
  quote?: string;
  header?: boolean;
}

export function parseCsv(input: string, options: CsvOptions = {}): string[][] {
  const { delimiter = ",", quote = '"' } = options;
  const rows: string[][] = [];
  let i = 0;

  while (i < input.length) {
    const row: string[] = [];
    while (i < input.length) {
      let cell: string;
      if (input[i] === quote) {
        i++;
        let val = "";
        while (i < input.length) {
          if (input[i] === quote) {
            if (i + 1 < input.length && input[i + 1] === quote) {
              val += quote;
              i += 2;
            } else {
              i++;
              break;
            }
          } else {
            val += input[i];
            i++;
          }
        }
        cell = val;
      } else {
        const start = i;
        while (i < input.length && input[i] !== delimiter && input[i] !== "\n" && input[i] !== "\r") {
          i++;
        }
        cell = input.slice(start, i);
      }
      row.push(cell);
      if (i < input.length && input[i] === delimiter) {
        i++;
      } else {
        break;
      }
    }
    if (i < input.length && input[i] === "\r") i++;
    if (i < input.length && input[i] === "\n") i++;
    rows.push(row);
  }
  return rows;
}

export function parseCsvObjects(
  input: string,
  options: CsvOptions = {}
): Record<string, string>[] {
  const rows = parseCsv(input, options);
  if (rows.length < 1) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
}

export function toCsv(
  rows: unknown[][],
  options: CsvOptions = {}
): string {
  const { delimiter = ",", quote = '"' } = options;
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const str = String(cell ?? "");
          if (str.includes(delimiter) || str.includes(quote) || str.includes("\n")) {
            return quote + str.replace(new RegExp(escapeRegExp(quote), "g"), quote + quote) + quote;
          }
          return str;
        })
        .join(delimiter)
    )
    .join("\n");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

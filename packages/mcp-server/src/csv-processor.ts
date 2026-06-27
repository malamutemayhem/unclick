export interface CSVOptions {
  delimiter?: string;
  quote?: string;
  escape?: string;
  header?: boolean;
}

export function parseCSV(input: string, options: CSVOptions = {}): string[][] {
  const delim = options.delimiter ?? ",";
  const quote = options.quote ?? '"';
  const escape = options.escape ?? '"';
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
      } else if (ch === delim) {
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

export function parseCSVToObjects(input: string, options: CSVOptions = {}): Record<string, string>[] {
  const rows = parseCSV(input, options);
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] ?? "";
    }
    return obj;
  });
}

export function toCSV(data: string[][], options: CSVOptions = {}): string {
  const delim = options.delimiter ?? ",";
  const quote = options.quote ?? '"';

  return data.map(row =>
    row.map(field => {
      if (field.includes(delim) || field.includes(quote) || field.includes("\n")) {
        return quote + field.replace(new RegExp(quote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g"), quote + quote) + quote;
      }
      return field;
    }).join(delim)
  ).join("\n");
}

export function objectsToCSV(data: Record<string, string>[], options: CSVOptions = {}): string {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = [headers, ...data.map(obj => headers.map(h => obj[h] ?? ""))];
  return toCSV(rows, options);
}

export function filterRows(data: string[][], columnIndex: number, predicate: (value: string) => boolean): string[][] {
  return data.filter(row => columnIndex < row.length && predicate(row[columnIndex]));
}

export function sortRows(data: string[][], columnIndex: number, numeric = false, ascending = true): string[][] {
  const sorted = [...data].sort((a, b) => {
    const va = a[columnIndex] ?? "";
    const vb = b[columnIndex] ?? "";
    let cmp: number;
    if (numeric) {
      cmp = parseFloat(va) - parseFloat(vb);
    } else {
      cmp = va.localeCompare(vb);
    }
    return ascending ? cmp : -cmp;
  });
  return sorted;
}

export function selectColumns(data: string[][], indices: number[]): string[][] {
  return data.map(row => indices.map(i => row[i] ?? ""));
}

export function aggregateColumn(data: string[][], columnIndex: number): { count: number; sum: number; avg: number; min: number; max: number } {
  const values = data.map(row => parseFloat(row[columnIndex])).filter(v => !isNaN(v));
  if (values.length === 0) return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
  const sum = values.reduce((a, b) => a + b, 0);
  return {
    count: values.length,
    sum,
    avg: sum / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

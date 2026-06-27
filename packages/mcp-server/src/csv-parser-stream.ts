export interface CsvOptions {
  delimiter: string;
  quote: string;
  escape: string;
  header: boolean;
  trim: boolean;
}

const DEFAULT_OPTIONS: CsvOptions = {
  delimiter: ",",
  quote: '"',
  escape: '"',
  header: true,
  trim: false,
};

export class CsvParser {
  private readonly options: CsvOptions;

  constructor(options?: Partial<CsvOptions>) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  parse(input: string): Record<string, string>[] | string[][] {
    const rows = this.parseRows(input);
    if (!this.options.header || rows.length === 0) return rows;
    const headers = rows[0] as string[];
    return rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = (row as string[])[i] ?? "";
      }
      return obj;
    });
  }

  parseRows(input: string): string[][] {
    const rows: string[][] = [];
    let current: string[] = [];
    let field = "";
    let inQuotes = false;
    const { delimiter, quote, escape, trim: trimFields } = this.options;
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
          current.push(trimFields ? field.trim() : field);
          field = "";
          i++;
        } else if (ch === "\n" || (ch === "\r" && input[i + 1] === "\n")) {
          current.push(trimFields ? field.trim() : field);
          field = "";
          rows.push(current);
          current = [];
          i += ch === "\r" ? 2 : 1;
        } else {
          field += ch;
          i++;
        }
      }
    }
    if (field.length > 0 || current.length > 0) {
      current.push(trimFields ? field.trim() : field);
      rows.push(current);
    }
    return rows;
  }

  stringify(data: Record<string, string>[] | string[][], headers?: string[]): string {
    const { delimiter, quote } = this.options;
    const escapeField = (value: string): string => {
      if (value.includes(delimiter) || value.includes(quote) || value.includes("\n")) {
        return quote + value.replace(new RegExp(quote, "g"), quote + quote) + quote;
      }
      return value;
    };
    const lines: string[] = [];
    if (Array.isArray(data[0]) || data.length === 0) {
      if (headers) lines.push(headers.map(escapeField).join(delimiter));
      for (const row of data as string[][]) {
        lines.push(row.map(escapeField).join(delimiter));
      }
    } else {
      const keys = headers ?? Object.keys(data[0] as Record<string, string>);
      lines.push(keys.map(escapeField).join(delimiter));
      for (const row of data as Record<string, string>[]) {
        lines.push(keys.map((k) => escapeField(row[k] ?? "")).join(delimiter));
      }
    }
    return lines.join("\n");
  }

  static columnCount(input: string, delimiter: string = ","): number {
    const firstLine = input.split("\n")[0];
    return firstLine.split(delimiter).length;
  }

  static rowCount(input: string): number {
    return input.split("\n").filter((l) => l.trim().length > 0).length;
  }
}

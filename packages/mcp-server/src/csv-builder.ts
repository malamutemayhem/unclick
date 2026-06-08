export interface CsvOptions {
  delimiter?: string;
  quote?: string;
  lineEnding?: string;
  includeHeader?: boolean;
}

export class CsvBuilder {
  private columns: string[] = [];
  private rows: string[][] = [];
  private options: Required<CsvOptions>;

  constructor(options: CsvOptions = {}) {
    this.options = {
      delimiter: options.delimiter ?? ",",
      quote: options.quote ?? '"',
      lineEnding: options.lineEnding ?? "\n",
      includeHeader: options.includeHeader ?? true,
    };
  }

  setColumns(columns: string[]): this {
    this.columns = [...columns];
    return this;
  }

  addRow(values: string[]): this {
    this.rows.push([...values]);
    return this;
  }

  addRows(rows: string[][]): this {
    for (const row of rows) {
      this.rows.push([...row]);
    }
    return this;
  }

  addObject(obj: Record<string, string | number | boolean | null>): this {
    if (this.columns.length === 0) {
      this.columns = Object.keys(obj);
    }
    const row = this.columns.map((col) => {
      const val = obj[col];
      return val === null || val === undefined ? "" : String(val);
    });
    this.rows.push(row);
    return this;
  }

  addObjects(objs: Array<Record<string, string | number | boolean | null>>): this {
    for (const obj of objs) {
      this.addObject(obj);
    }
    return this;
  }

  build(): string {
    const { delimiter, lineEnding, includeHeader } = this.options;
    const lines: string[] = [];

    if (includeHeader && this.columns.length > 0) {
      lines.push(this.columns.map((c) => this.escapeField(c)).join(delimiter));
    }

    for (const row of this.rows) {
      lines.push(row.map((v) => this.escapeField(v)).join(delimiter));
    }

    return lines.join(lineEnding);
  }

  private escapeField(field: string): string {
    const { delimiter, quote } = this.options;
    if (
      field.includes(delimiter) ||
      field.includes(quote) ||
      field.includes("\n") ||
      field.includes("\r")
    ) {
      const escaped = field.replace(new RegExp(quote.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), quote + quote);
      return `${quote}${escaped}${quote}`;
    }
    return field;
  }

  rowCount(): number {
    return this.rows.length;
  }

  columnCount(): number {
    return this.columns.length;
  }

  getColumns(): string[] {
    return [...this.columns];
  }

  clear(): this {
    this.rows = [];
    return this;
  }

  static parse(csv: string, options: CsvOptions = {}): string[][] {
    const delimiter = options.delimiter ?? ",";
    const lines = csv.split(/\r?\n/).filter((l) => l.length > 0);
    return lines.map((line) => CsvBuilder.parseLine(line, delimiter));
  }

  private static parseLine(line: string, delimiter: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      if (inQuotes) {
        if (line[i] === '"' && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else if (line[i] === '"') {
          inQuotes = false;
          i++;
        } else {
          current += line[i++];
        }
      } else {
        if (line[i] === '"') {
          inQuotes = true;
          i++;
        } else if (line[i] === delimiter) {
          result.push(current);
          current = "";
          i++;
        } else {
          current += line[i++];
        }
      }
    }
    result.push(current);
    return result;
  }
}

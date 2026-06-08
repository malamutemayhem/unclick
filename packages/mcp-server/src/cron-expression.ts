export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

export class CronExpression {
  private readonly fields: CronFields;
  private readonly expression: string;

  constructor(expression: string) {
    this.expression = expression;
    this.fields = this.parse(expression);
  }

  private parse(expr: string): CronFields {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) throw new Error("Cron expression must have 5 fields");
    return {
      minute: this.parseField(parts[0], 0, 59),
      hour: this.parseField(parts[1], 0, 23),
      dayOfMonth: this.parseField(parts[2], 1, 31),
      month: this.parseField(parts[3], 1, 12),
      dayOfWeek: this.parseField(parts[4], 0, 6),
    };
  }

  private parseField(field: string, min: number, max: number): number[] {
    const values = new Set<number>();
    for (const part of field.split(",")) {
      if (part === "*") {
        for (let i = min; i <= max; i++) values.add(i);
      } else if (part.includes("/")) {
        const [range, stepStr] = part.split("/");
        const step = parseInt(stepStr);
        let start = min;
        let end = max;
        if (range !== "*") {
          if (range.includes("-")) {
            [start, end] = range.split("-").map(Number);
          } else {
            start = parseInt(range);
          }
        }
        for (let i = start; i <= end; i += step) values.add(i);
      } else if (part.includes("-")) {
        const [s, e] = part.split("-").map(Number);
        for (let i = s; i <= e; i++) values.add(i);
      } else {
        values.add(parseInt(part));
      }
    }
    return [...values].sort((a, b) => a - b);
  }

  matches(date: Date): boolean {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dom = date.getDate();
    const month = date.getMonth() + 1;
    const dow = date.getDay();
    return (
      this.fields.minute.includes(minute) &&
      this.fields.hour.includes(hour) &&
      this.fields.dayOfMonth.includes(dom) &&
      this.fields.month.includes(month) &&
      this.fields.dayOfWeek.includes(dow)
    );
  }

  next(from: Date, count: number = 1): Date[] {
    const results: Date[] = [];
    const current = new Date(from.getTime());
    current.setSeconds(0, 0);
    current.setTime(current.getTime() + 60000);
    const limit = 366 * 24 * 60;
    let iterations = 0;
    while (results.length < count && iterations < limit) {
      if (this.matches(current)) {
        results.push(new Date(current.getTime()));
      }
      current.setTime(current.getTime() + 60000);
      iterations++;
    }
    return results;
  }

  getFields(): CronFields {
    return { ...this.fields };
  }

  toString(): string {
    return this.expression;
  }

  static isValid(expression: string): boolean {
    try {
      new CronExpression(expression);
      return true;
    } catch {
      return false;
    }
  }

  describe(): string {
    const parts: string[] = [];
    const f = this.fields;
    if (f.minute.length === 60) parts.push("every minute");
    else if (f.minute.length === 1) parts.push(`at minute ${f.minute[0]}`);
    else parts.push(`at minutes ${f.minute.join(",")}`);
    if (f.hour.length === 24) parts.push("of every hour");
    else if (f.hour.length === 1) parts.push(`of hour ${f.hour[0]}`);
    else parts.push(`of hours ${f.hour.join(",")}`);
    return parts.join(" ");
  }
}

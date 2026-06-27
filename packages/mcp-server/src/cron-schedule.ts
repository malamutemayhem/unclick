export interface CronField {
  type: "wildcard" | "value" | "range" | "step" | "list";
  values: number[];
}

export interface ParsedCron {
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
}

export class CronSchedule {
  private fields: ParsedCron;
  private expression: string;

  constructor(expression: string) {
    this.expression = expression;
    this.fields = CronSchedule.parse(expression);
  }

  static parse(expression: string): ParsedCron {
    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) {
      throw new Error("Invalid cron: expected 5 fields");
    }

    return {
      minute: CronSchedule.parseField(parts[0], 0, 59),
      hour: CronSchedule.parseField(parts[1], 0, 23),
      dayOfMonth: CronSchedule.parseField(parts[2], 1, 31),
      month: CronSchedule.parseField(parts[3], 1, 12),
      dayOfWeek: CronSchedule.parseField(parts[4], 0, 6),
    };
  }

  static parseField(field: string, min: number, max: number): CronField {
    if (field === "*") {
      const values: number[] = [];
      for (let i = min; i <= max; i++) values.push(i);
      return { type: "wildcard", values };
    }

    if (field.includes(",")) {
      const values = field.split(",").map(Number).filter((n) => !isNaN(n));
      return { type: "list", values };
    }

    if (field.includes("/")) {
      const [base, stepStr] = field.split("/");
      const step = parseInt(stepStr, 10);
      const start = base === "*" ? min : parseInt(base, 10);
      const values: number[] = [];
      for (let i = start; i <= max; i += step) values.push(i);
      return { type: "step", values };
    }

    if (field.includes("-")) {
      const [startStr, endStr] = field.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      const values: number[] = [];
      for (let i = start; i <= end; i++) values.push(i);
      return { type: "range", values };
    }

    return { type: "value", values: [parseInt(field, 10)] };
  }

  matches(date: Date): boolean {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return (
      this.fields.minute.values.includes(minute) &&
      this.fields.hour.values.includes(hour) &&
      this.fields.dayOfMonth.values.includes(dayOfMonth) &&
      this.fields.month.values.includes(month) &&
      this.fields.dayOfWeek.values.includes(dayOfWeek)
    );
  }

  next(from: Date, limit = 525600): Date | null {
    const candidate = new Date(from.getTime());
    candidate.setSeconds(0, 0);
    candidate.setMinutes(candidate.getMinutes() + 1);

    for (let i = 0; i < limit; i++) {
      if (this.matches(candidate)) {
        return new Date(candidate.getTime());
      }
      candidate.setMinutes(candidate.getMinutes() + 1);
    }
    return null;
  }

  nextN(from: Date, count: number): Date[] {
    const results: Date[] = [];
    let current = from;
    for (let i = 0; i < count; i++) {
      const n = this.next(current);
      if (!n) break;
      results.push(n);
      current = n;
    }
    return results;
  }

  describe(): string {
    const parts: string[] = [];
    const f = this.fields;

    if (f.minute.type === "value") {
      parts.push(`at minute ${f.minute.values[0]}`);
    } else if (f.minute.type === "wildcard") {
      parts.push("every minute");
    }

    if (f.hour.type === "value") {
      parts.push(`of hour ${f.hour.values[0]}`);
    } else if (f.hour.type === "wildcard" && f.minute.type !== "wildcard") {
      parts.push("of every hour");
    }

    return parts.join(" ") || this.expression;
  }

  getExpression(): string {
    return this.expression;
  }

  getFields(): ParsedCron {
    return this.fields;
  }

  static isValid(expression: string): boolean {
    try {
      CronSchedule.parse(expression);
      return true;
    } catch {
      return false;
    }
  }

  static common = {
    everyMinute: "* * * * *",
    hourly: "0 * * * *",
    daily: "0 0 * * *",
    weekly: "0 0 * * 0",
    monthly: "0 0 1 * *",
    yearly: "0 0 1 1 *",
  };
}

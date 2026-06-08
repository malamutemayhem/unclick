export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

export function parseCron(expression: string): CronFields {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error(`Invalid cron: expected 5 fields, got ${parts.length}`);
  return {
    minute: parseField(parts[0], 0, 59),
    hour: parseField(parts[1], 0, 23),
    dayOfMonth: parseField(parts[2], 1, 31),
    month: parseField(parts[3], 1, 12),
    dayOfWeek: parseField(parts[4], 0, 6),
  };
}

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    if (part === "*") {
      for (let i = min; i <= max; i++) values.add(i);
    } else if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      let start = min;
      let end = max;
      if (range !== "*") {
        if (range.includes("-")) {
          [start, end] = range.split("-").map(Number);
        } else {
          start = parseInt(range, 10);
        }
      }
      for (let i = start; i <= end; i += step) values.add(i);
    } else if (part.includes("-")) {
      const [s, e] = part.split("-").map(Number);
      for (let i = s; i <= e; i++) values.add(i);
    } else {
      values.add(parseInt(part, 10));
    }
  }
  return [...values].sort((a, b) => a - b);
}

export function matches(fields: CronFields, date: Date): boolean {
  return (
    fields.minute.includes(date.getMinutes()) &&
    fields.hour.includes(date.getHours()) &&
    fields.dayOfMonth.includes(date.getDate()) &&
    fields.month.includes(date.getMonth() + 1) &&
    fields.dayOfWeek.includes(date.getDay())
  );
}

export function nextMatch(fields: CronFields, after: Date): Date {
  const d = new Date(after.getTime());
  d.setSeconds(0, 0);
  d.setTime(d.getTime() + 60000);
  for (let i = 0; i < 525960; i++) {
    if (matches(fields, d)) return d;
    d.setTime(d.getTime() + 60000);
  }
  throw new Error("No match found within one year");
}

export function describe(fields: CronFields): string {
  const parts: string[] = [];
  if (fields.minute.length === 60) parts.push("every minute");
  else if (fields.minute.length === 1 && fields.minute[0] === 0) parts.push("at the start of the hour");
  else parts.push(`at minute ${fields.minute.join(",")}`);

  if (fields.hour.length < 24) parts.push(`during hour ${fields.hour.join(",")}`);
  if (fields.dayOfMonth.length < 31) parts.push(`on day ${fields.dayOfMonth.join(",")}`);
  if (fields.month.length < 12) parts.push(`in month ${fields.month.join(",")}`);
  if (fields.dayOfWeek.length < 7) parts.push(`on weekday ${fields.dayOfWeek.join(",")}`);

  return parts.join(" ");
}

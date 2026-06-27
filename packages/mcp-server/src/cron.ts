export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range: string;
    let step = 1;
    if (stepMatch) {
      range = stepMatch[1];
      step = parseInt(stepMatch[2], 10);
    } else {
      range = part;
    }
    if (range === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (range.includes("-")) {
      const [startStr, endStr] = range.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      for (let i = start; i <= end; i += step) values.add(i);
    } else {
      values.add(parseInt(range, 10));
    }
  }
  return [...values].sort((a: number, b: number) => a - b);
}

export function parseCron(expression: string): CronFields {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron expression must have 5 fields");
  return {
    minute: parseField(parts[0], 0, 59),
    hour: parseField(parts[1], 0, 23),
    dayOfMonth: parseField(parts[2], 1, 31),
    month: parseField(parts[3], 1, 12),
    dayOfWeek: parseField(parts[4], 0, 6),
  };
}

export function nextRun(expression: string, after: Date = new Date()): Date {
  const fields = parseCron(expression);
  const d = new Date(after.getTime());
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  for (let i = 0; i < 525960; i++) {
    if (
      fields.month.includes(d.getMonth() + 1) &&
      fields.dayOfMonth.includes(d.getDate()) &&
      fields.dayOfWeek.includes(d.getDay()) &&
      fields.hour.includes(d.getHours()) &&
      fields.minute.includes(d.getMinutes())
    ) {
      return d;
    }
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No matching time found within a year");
}

export function matches(expression: string, date: Date): boolean {
  const fields = parseCron(expression);
  return (
    fields.minute.includes(date.getMinutes()) &&
    fields.hour.includes(date.getHours()) &&
    fields.dayOfMonth.includes(date.getDate()) &&
    fields.month.includes(date.getMonth() + 1) &&
    fields.dayOfWeek.includes(date.getDay())
  );
}

export function describe(expression: string): string {
  const fields = parseCron(expression);
  const parts: string[] = [];
  if (fields.minute.length === 60) parts.push("every minute");
  else if (fields.minute.length === 1) parts.push(`at minute ${fields.minute[0]}`);
  else parts.push(`at minutes ${fields.minute.join(",")}`);

  if (fields.hour.length === 24) parts.push("of every hour");
  else if (fields.hour.length === 1) parts.push(`of hour ${fields.hour[0]}`);
  else parts.push(`of hours ${fields.hour.join(",")}`);

  return parts.join(" ");
}

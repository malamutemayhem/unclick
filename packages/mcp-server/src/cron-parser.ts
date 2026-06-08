export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

export function parseCron(expr: string): CronFields {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron expression must have 5 fields");
  return {
    minute: parseField(parts[0], 0, 59),
    hour: parseField(parts[1], 0, 23),
    dayOfMonth: parseField(parts[2], 1, 31),
    month: parseField(parts[3], 1, 12),
    dayOfWeek: parseField(parts[4], 0, 6),
  };
}

export function nextRun(expr: string, from = new Date()): Date {
  const fields = parseCron(expr);
  const d = new Date(from);
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  for (let i = 0; i < 366 * 24 * 60; i++) {
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

export function matches(expr: string, date: Date): boolean {
  const fields = parseCron(expr);
  return (
    fields.minute.includes(date.getMinutes()) &&
    fields.hour.includes(date.getHours()) &&
    fields.dayOfMonth.includes(date.getDate()) &&
    fields.month.includes(date.getMonth() + 1) &&
    fields.dayOfWeek.includes(date.getDay())
  );
}

export function describe(expr: string): string {
  const fields = parseCron(expr);
  const parts: string[] = [];
  if (fields.minute.length === 60) parts.push("every minute");
  else parts.push(`at minute ${fields.minute.join(",")}`);
  if (fields.hour.length < 24) parts.push(`hour ${fields.hour.join(",")}`);
  if (fields.dayOfMonth.length < 31) parts.push(`day ${fields.dayOfMonth.join(",")}`);
  if (fields.month.length < 12) parts.push(`month ${fields.month.join(",")}`);
  if (fields.dayOfWeek.length < 7) parts.push(`weekday ${fields.dayOfWeek.join(",")}`);
  return parts.join(", ");
}

function parseField(field: string, min: number, max: number): number[] {
  if (field === "*") return range(min, max);
  const values = new Set<number>();
  for (const part of field.split(",")) {
    if (part.includes("/")) {
      const [rangeStr, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      const [start, end] = rangeStr === "*" ? [min, max] : parseRange(rangeStr, min, max);
      for (let i = start; i <= end; i += step) values.add(i);
    } else if (part.includes("-")) {
      const [start, end] = parseRange(part, min, max);
      for (let i = start; i <= end; i++) values.add(i);
    } else {
      values.add(parseInt(part, 10));
    }
  }
  return [...values].sort((a, b) => a - b);
}

function parseRange(rangeStr: string, _min: number, _max: number): [number, number] {
  const [a, b] = rangeStr.split("-").map(Number);
  return [a, b];
}

function range(min: number, max: number): number[] {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

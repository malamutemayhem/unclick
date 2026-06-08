export interface CronParts {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

export function parseCron(expression: string): CronParts {
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

export function matches(expression: string, date: Date): boolean {
  const cron = parseCron(expression);
  return (
    cron.minute.includes(date.getMinutes()) &&
    cron.hour.includes(date.getHours()) &&
    cron.dayOfMonth.includes(date.getDate()) &&
    cron.month.includes(date.getMonth() + 1) &&
    cron.dayOfWeek.includes(date.getDay())
  );
}

export function nextMatch(expression: string, after: Date): Date {
  const d = new Date(after.getTime());
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  for (let i = 0; i < 525960; i++) {
    if (matches(expression, d)) return d;
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No match found within one year");
}

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    if (part === "*") {
      for (let i = min; i <= max; i++) values.add(i);
    } else if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      const [start, end] = range === "*" ? [min, max] : parseRange(range, min, max);
      for (let i = start; i <= end; i += step) values.add(i);
    } else if (part.includes("-")) {
      const [start, end] = parseRange(part, min, max);
      for (let i = start; i <= end; i++) values.add(i);
    } else {
      const n = parseInt(part, 10);
      if (n < min || n > max) throw new Error(`Value ${n} out of range ${min}-${max}`);
      values.add(n);
    }
  }
  return [...values].sort((a, b) => a - b);
}

function parseRange(range: string, min: number, max: number): [number, number] {
  const [a, b] = range.split("-").map((s) => parseInt(s, 10));
  if (a < min || b > max || a > b) throw new Error(`Invalid range: ${range}`);
  return [a, b];
}

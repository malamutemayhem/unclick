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
    const [rangeStr, stepStr] = part.split("/");
    const step = stepStr ? parseInt(stepStr, 10) : 1;

    if (rangeStr === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
    } else if (rangeStr.includes("-")) {
      const [lo, hi] = rangeStr.split("-").map(Number);
      for (let i = lo; i <= hi; i += step) values.add(i);
    } else {
      values.add(parseInt(rangeStr, 10));
    }
  }
  return [...values].sort((a, b) => a - b);
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

export function cronMatches(expr: string, date: Date): boolean {
  const fields = parseCron(expr);
  return fields.minute.includes(date.getMinutes())
    && fields.hour.includes(date.getHours())
    && fields.dayOfMonth.includes(date.getDate())
    && fields.month.includes(date.getMonth() + 1)
    && fields.dayOfWeek.includes(date.getDay());
}

export function nextCronDate(expr: string, after: Date): Date {
  const d = new Date(after.getTime());
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  for (let i = 0; i < 525960; i++) {
    if (cronMatches(expr, d)) return d;
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No matching date found within one year");
}

export function describeCron(expr: string): string {
  const fields = parseCron(expr);
  const parts: string[] = [];
  if (fields.minute.length === 60) parts.push("every minute");
  else parts.push("at minute " + fields.minute.join(","));
  if (fields.hour.length < 24) parts.push("hour " + fields.hour.join(","));
  return parts.join(", ");
}

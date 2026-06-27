export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
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

export function nextRun(expression: string, after?: Date): Date {
  const fields = parseCron(expression);
  const start = after ? new Date(after.getTime() + 60000) : new Date();
  start.setSeconds(0, 0);

  for (let i = 0; i < 525960; i++) {
    const candidate = new Date(start.getTime() + i * 60000);
    if (
      fields.minute.includes(candidate.getMinutes()) &&
      fields.hour.includes(candidate.getHours()) &&
      fields.dayOfMonth.includes(candidate.getDate()) &&
      fields.month.includes(candidate.getMonth() + 1) &&
      fields.dayOfWeek.includes(candidate.getDay())
    ) {
      return candidate;
    }
  }
  throw new Error("No matching time found within one year");
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
  else parts.push(`at minute ${fields.minute.join(",")}`);
  if (fields.hour.length < 24) parts.push(`hour ${fields.hour.join(",")}`);
  return parts.join(", ");
}

function parseField(field: string, min: number, max: number): number[] {
  const values: number[] = [];
  for (const part of field.split(",")) {
    if (part === "*") {
      for (let i = min; i <= max; i++) values.push(i);
    } else if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      const start = range === "*" ? min : parseInt(range, 10);
      for (let i = start; i <= max; i += step) values.push(i);
    } else if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      for (let i = start; i <= end; i++) values.push(i);
    } else {
      values.push(parseInt(part, 10));
    }
  }
  return [...new Set(values)].sort((a, b) => a - b);
}

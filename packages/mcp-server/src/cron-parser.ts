export interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

export function parseCron(expression: string): CronFields {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error(`Expected 5 fields, got ${parts.length}`);
  return {
    minute: parseField(parts[0], 0, 59),
    hour: parseField(parts[1], 0, 23),
    dayOfMonth: parseField(parts[2], 1, 31),
    month: parseField(parts[3], 1, 12),
    dayOfWeek: parseField(parts[4], 0, 6),
  };
}

export function matches(expression: string, date: Date): boolean {
  const fields = parseCron(expression);
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dom = date.getDate();
  const month = date.getMonth() + 1;
  const dow = date.getDay();

  return (
    fields.minute.includes(minute) &&
    fields.hour.includes(hour) &&
    fields.dayOfMonth.includes(dom) &&
    fields.month.includes(month) &&
    fields.dayOfWeek.includes(dow)
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

function parseField(field: string, min: number, max: number): number[] {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    if (part === "*") {
      for (let i = min; i <= max; i++) values.add(i);
    } else if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      if (isNaN(step) || step < 1) throw new Error(`Invalid step: ${stepStr}`);
      const start = range === "*" ? min : parseInt(range, 10);
      for (let i = start; i <= max; i += step) values.add(i);
    } else if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end)) throw new Error(`Invalid range: ${part}`);
      for (let i = start; i <= end; i++) values.add(i);
    } else {
      const val = parseInt(part, 10);
      if (isNaN(val) || val < min || val > max) throw new Error(`Invalid value: ${part}`);
      values.add(val);
    }
  }
  return [...values].sort((a, b) => a - b);
}

interface CronFields {
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

function parseField(field: string, min: number, max: number): number[] {
  const results = new Set<number>();

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
      for (let i = min; i <= max; i += step) results.add(i);
    } else if (range.includes("-")) {
      const [lo, hi] = range.split("-").map(Number);
      for (let i = lo; i <= hi; i += step) results.add(i);
    } else {
      results.add(parseInt(range, 10));
    }
  }

  return [...results].filter((n) => n >= min && n <= max).sort((a, b) => a - b);
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

export function nextMatch(expression: string, after: Date): Date {
  const d = new Date(after.getTime());
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  for (let i = 0; i < 525600; i++) {
    if (matches(expression, d)) return d;
    d.setMinutes(d.getMinutes() + 1);
  }
  throw new Error("No match found within one year");
}

export function nextN(expression: string, after: Date, count: number): Date[] {
  const results: Date[] = [];
  let cursor = after;
  for (let i = 0; i < count; i++) {
    cursor = nextMatch(expression, cursor);
    results.push(new Date(cursor.getTime()));
  }
  return results;
}

export function describe(expression: string): string {
  const fields = parseCron(expression);
  const parts: string[] = [];

  if (fields.minute.length === 60) parts.push("every minute");
  else if (fields.minute.length === 1) parts.push(`at minute ${fields.minute[0]}`);
  else parts.push(`at minutes ${fields.minute.join(",")}`);

  if (fields.hour.length < 24) {
    if (fields.hour.length === 1) parts.push(`of hour ${fields.hour[0]}`);
    else parts.push(`of hours ${fields.hour.join(",")}`);
  }

  if (fields.dayOfMonth.length < 31) {
    parts.push(`on day ${fields.dayOfMonth.join(",")}`);
  }

  if (fields.month.length < 12) {
    parts.push(`in month ${fields.month.join(",")}`);
  }

  if (fields.dayOfWeek.length < 7) {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    parts.push(`on ${fields.dayOfWeek.map((d) => names[d]).join(",")}`);
  }

  return parts.join(" ");
}

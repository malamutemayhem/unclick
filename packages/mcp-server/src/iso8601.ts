export interface ParsedDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  tzOffsetMinutes: number | null;
}

export interface ParsedDuration {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function parseDate(input: string): ParsedDate {
  const re = /^(\d{4})-?(\d{2})-?(\d{2})(?:[T ](\d{2}):?(\d{2})(?::?(\d{2})(?:\.(\d{1,3}))?)?)?(?:(Z)|([+-])(\d{2}):?(\d{2}))?$/;
  const m = input.match(re);
  if (!m) throw new Error(`Invalid ISO 8601 date: ${input}`);

  const result: ParsedDate = {
    year: parseInt(m[1]),
    month: parseInt(m[2]),
    day: parseInt(m[3]),
    hour: m[4] ? parseInt(m[4]) : 0,
    minute: m[5] ? parseInt(m[5]) : 0,
    second: m[6] ? parseInt(m[6]) : 0,
    millisecond: m[7] ? parseInt(m[7].padEnd(3, "0")) : 0,
    tzOffsetMinutes: null,
  };

  if (m[8] === "Z") {
    result.tzOffsetMinutes = 0;
  } else if (m[9]) {
    const sign = m[9] === "+" ? 1 : -1;
    result.tzOffsetMinutes = sign * (parseInt(m[10]) * 60 + parseInt(m[11]));
  }

  return result;
}

export function parseDuration(input: string): ParsedDuration {
  const re = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;
  const m = input.match(re);
  if (!m) throw new Error(`Invalid ISO 8601 duration: ${input}`);

  return {
    years: m[1] ? parseInt(m[1]) : 0,
    months: m[2] ? parseInt(m[2]) : 0,
    weeks: m[3] ? parseInt(m[3]) : 0,
    days: m[4] ? parseInt(m[4]) : 0,
    hours: m[5] ? parseInt(m[5]) : 0,
    minutes: m[6] ? parseInt(m[6]) : 0,
    seconds: m[7] ? parseFloat(m[7]) : 0,
  };
}

export function formatDate(d: ParsedDate): string {
  const pad = (n: number, w = 2) => String(n).padStart(w, "0");
  let result = `${pad(d.year, 4)}-${pad(d.month)}-${pad(d.day)}`;
  if (d.hour || d.minute || d.second || d.millisecond) {
    result += `T${pad(d.hour)}:${pad(d.minute)}:${pad(d.second)}`;
    if (d.millisecond) result += `.${pad(d.millisecond, 3)}`;
  }
  if (d.tzOffsetMinutes !== null) {
    if (d.tzOffsetMinutes === 0) {
      result += "Z";
    } else {
      const sign = d.tzOffsetMinutes >= 0 ? "+" : "-";
      const abs = Math.abs(d.tzOffsetMinutes);
      result += `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
    }
  }
  return result;
}

export function formatDuration(d: ParsedDuration): string {
  let result = "P";
  if (d.years) result += `${d.years}Y`;
  if (d.months) result += `${d.months}M`;
  if (d.weeks) result += `${d.weeks}W`;
  if (d.days) result += `${d.days}D`;
  const hasTime = d.hours || d.minutes || d.seconds;
  if (hasTime) {
    result += "T";
    if (d.hours) result += `${d.hours}H`;
    if (d.minutes) result += `${d.minutes}M`;
    if (d.seconds) result += `${d.seconds}S`;
  }
  if (result === "P") result = "P0D";
  return result;
}

export function durationToSeconds(d: ParsedDuration): number {
  return (
    d.years * 365.25 * 24 * 3600 +
    d.months * 30.44 * 24 * 3600 +
    d.weeks * 7 * 24 * 3600 +
    d.days * 24 * 3600 +
    d.hours * 3600 +
    d.minutes * 60 +
    d.seconds
  );
}

export function toUnixTimestamp(d: ParsedDate): number {
  const date = new Date(Date.UTC(d.year, d.month - 1, d.day, d.hour, d.minute, d.second, d.millisecond));
  if (d.tzOffsetMinutes !== null && d.tzOffsetMinutes !== 0) {
    date.setMinutes(date.getMinutes() - d.tzOffsetMinutes);
  }
  return date.getTime();
}

export function fromUnixTimestamp(ts: number): ParsedDate {
  const date = new Date(ts);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
    tzOffsetMinutes: 0,
  };
}

export function addDuration(date: ParsedDate, duration: ParsedDuration): ParsedDate {
  const ts = toUnixTimestamp(date);
  const durationMs = durationToSeconds(duration) * 1000;
  return fromUnixTimestamp(ts + durationMs);
}

export function isValid(d: ParsedDate): boolean {
  if (d.month < 1 || d.month > 12) return false;
  if (d.day < 1 || d.day > daysInMonth(d.year, d.month)) return false;
  if (d.hour < 0 || d.hour > 23) return false;
  if (d.minute < 0 || d.minute > 59) return false;
  if (d.second < 0 || d.second > 59) return false;
  return true;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function parseInterval(input: string): { start: ParsedDate; end: ParsedDate | ParsedDuration } {
  const parts = input.split("/");
  if (parts.length !== 2) throw new Error(`Invalid ISO 8601 interval: ${input}`);
  const start = parseDate(parts[0]);
  try {
    return { start, end: parseDate(parts[1]) };
  } catch {
    return { start, end: parseDuration(parts[1]) };
  }
}

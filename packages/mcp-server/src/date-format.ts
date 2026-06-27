export interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

export function parseDateParts(dateStr: string): DateParts | null {
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?)?/);
  if (isoMatch) {
    return {
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: parseInt(isoMatch[3], 10),
      hour: parseInt(isoMatch[4] ?? "0", 10),
      minute: parseInt(isoMatch[5] ?? "0", 10),
      second: parseInt(isoMatch[6] ?? "0", 10),
      millisecond: parseInt((isoMatch[7] ?? "0").padEnd(3, "0"), 10),
    };
  }

  const usMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (usMatch) {
    return {
      year: parseInt(usMatch[3], 10),
      month: parseInt(usMatch[1], 10),
      day: parseInt(usMatch[2], 10),
      hour: 0, minute: 0, second: 0, millisecond: 0,
    };
  }

  return null;
}

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const MONTHS_SHORT = MONTHS.map(m => m.substring(0, 3));
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_SHORT = DAYS.map(d => d.substring(0, 3));

function dayOfWeek(y: number, m: number, d: number): number {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yr = m < 3 ? y - 1 : y;
  return (yr + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) + t[m - 1] + d) % 7;
}

export function formatDate(parts: DateParts, pattern: string): string {
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
  const dow = dayOfWeek(parts.year, parts.month, parts.day);
  const h12 = parts.hour % 12 || 12;
  const ampm = parts.hour < 12 ? "AM" : "PM";

  return pattern
    .replace("YYYY", parts.year.toString())
    .replace("YY", (parts.year % 100).toString().padStart(2, "0"))
    .replace("MMMM", MONTHS[parts.month - 1])
    .replace("MMM", MONTHS_SHORT[parts.month - 1])
    .replace("MM", pad(parts.month))
    .replace("DD", pad(parts.day))
    .replace("dddd", DAYS[dow])
    .replace("ddd", DAYS_SHORT[dow])
    .replace("HH", pad(parts.hour))
    .replace("hh", pad(h12))
    .replace("mm", pad(parts.minute))
    .replace("ss", pad(parts.second))
    .replace("SSS", pad(parts.millisecond, 3))
    .replace("A", ampm);
}

export function toISO(parts: DateParts): string {
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}.${pad(parts.millisecond, 3)}Z`;
}

export function toUnixTimestamp(parts: DateParts): number {
  const days = daysSinceEpoch(parts.year, parts.month, parts.day);
  return days * 86400 + parts.hour * 3600 + parts.minute * 60 + parts.second;
}

function daysSinceEpoch(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) { y--; m += 12; }
  const era = Math.floor(y / 400);
  const yoe = y - era * 400;
  const doy = Math.floor((153 * (m - 3) + 2) / 5) + day - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

export function fromUnixTimestamp(ts: number): DateParts {
  const days = Math.floor(ts / 86400);
  const rem = ts - days * 86400;
  const hour = Math.floor(rem / 3600);
  const minute = Math.floor((rem % 3600) / 60);
  const second = rem % 60;

  let z = days + 719468;
  const era = Math.floor((z >= 0 ? z : z - 146096) / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);
  const year = y + (m <= 2 ? 1 : 0);

  return { year, month: m, day: d, hour, minute, second, millisecond: 0 };
}

export function relativeTime(diffSeconds: number): string {
  const abs = Math.abs(diffSeconds);
  const suffix = diffSeconds < 0 ? "ago" : "from now";
  if (abs < 60) return `${Math.floor(abs)} seconds ${suffix}`;
  if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${suffix}`;
  if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${suffix}`;
  if (abs < 2592000) return `${Math.floor(abs / 86400)} days ${suffix}`;
  if (abs < 31536000) return `${Math.floor(abs / 2592000)} months ${suffix}`;
  return `${Math.floor(abs / 31536000)} years ${suffix}`;
}

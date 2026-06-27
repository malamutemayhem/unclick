export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

export function diffDays(a: Date, b: Date): number {
  const ms = Math.abs(a.getTime() - b.getTime());
  return Math.floor(ms / 86400000);
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function formatRelative(date: Date, now = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const absDiff = Math.abs(diffMs);
  const past = diffMs > 0;
  const suffix = past ? "ago" : "from now";

  if (absDiff < 60000) return "just now";
  if (absDiff < 3600000) { const m = Math.floor(absDiff / 60000); return `${m} minute${m > 1 ? "s" : ""} ${suffix}`; }
  if (absDiff < 86400000) { const h = Math.floor(absDiff / 3600000); return `${h} hour${h > 1 ? "s" : ""} ${suffix}`; }
  if (absDiff < 2592000000) { const d = Math.floor(absDiff / 86400000); return `${d} day${d > 1 ? "s" : ""} ${suffix}`; }
  if (absDiff < 31536000000) { const mo = Math.floor(absDiff / 2592000000); return `${mo} month${mo > 1 ? "s" : ""} ${suffix}`; }
  const y = Math.floor(absDiff / 31536000000);
  return `${y} year${y > 1 ? "s" : ""} ${suffix}`;
}

export function parseISODate(input: string): Date {
  const d = new Date(input);
  if (isNaN(d.getTime())) throw new Error("Invalid date string");
  return d;
}

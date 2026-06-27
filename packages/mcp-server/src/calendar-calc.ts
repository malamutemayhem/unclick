export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month - 1];
}

export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function dayOfWeek(year: number, month: number, day: number): number {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = month < 3 ? year - 1 : year;
  return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[month - 1] + day) % 7;
}

export function dayOfWeekName(dow: number): string {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dow];
}

export function dayOfYear(year: number, month: number, day: number): number {
  let total = 0;
  for (let m = 1; m < month; m++) total += daysInMonth(year, m);
  return total + day;
}

export function weekNumber(year: number, month: number, day: number): number {
  const doy = dayOfYear(year, month, day);
  const jan1dow = dayOfWeek(year, 1, 1);
  return Math.ceil((doy + jan1dow) / 7);
}

export function daysBetween(y1: number, m1: number, d1: number, y2: number, m2: number, d2: number): number {
  return Math.abs(julianDay(y2, m2, d2) - julianDay(y1, m1, d1));
}

export function julianDay(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

export function fromJulianDay(jd: number): { year: number; month: number; day: number } {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

export function addDays(year: number, month: number, day: number, days: number): { year: number; month: number; day: number } {
  return fromJulianDay(julianDay(year, month, day) + days);
}

export function easterDate(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

export function isWeekend(year: number, month: number, day: number): boolean {
  const dow = dayOfWeek(year, month, day);
  return dow === 0 || dow === 6;
}

export function businessDaysBetween(y1: number, m1: number, d1: number, y2: number, m2: number, d2: number): number {
  let count = 0;
  let jd1 = julianDay(y1, m1, d1);
  const jd2 = julianDay(y2, m2, d2);
  const step = jd1 <= jd2 ? 1 : -1;
  while (jd1 !== jd2) {
    jd1 += step;
    const { year, month, day } = fromJulianDay(jd1);
    if (!isWeekend(year, month, day)) count++;
  }
  return count;
}

export function monthName(month: number): string {
  return ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][month - 1];
}

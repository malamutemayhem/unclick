export interface TimezoneInfo {
  name: string;
  abbreviation: string;
  utcOffset: number;
  region: string;
}

export class TimezoneOffset {
  private static readonly ZONES: TimezoneInfo[] = [
    { name: "UTC", abbreviation: "UTC", utcOffset: 0, region: "Universal" },
    { name: "US/Eastern", abbreviation: "EST", utcOffset: -5, region: "Americas" },
    { name: "US/Central", abbreviation: "CST", utcOffset: -6, region: "Americas" },
    { name: "US/Mountain", abbreviation: "MST", utcOffset: -7, region: "Americas" },
    { name: "US/Pacific", abbreviation: "PST", utcOffset: -8, region: "Americas" },
    { name: "US/Alaska", abbreviation: "AKST", utcOffset: -9, region: "Americas" },
    { name: "US/Hawaii", abbreviation: "HST", utcOffset: -10, region: "Americas" },
    { name: "Canada/Atlantic", abbreviation: "AST", utcOffset: -4, region: "Americas" },
    { name: "America/Sao_Paulo", abbreviation: "BRT", utcOffset: -3, region: "Americas" },
    { name: "Europe/London", abbreviation: "GMT", utcOffset: 0, region: "Europe" },
    { name: "Europe/Paris", abbreviation: "CET", utcOffset: 1, region: "Europe" },
    { name: "Europe/Helsinki", abbreviation: "EET", utcOffset: 2, region: "Europe" },
    { name: "Europe/Moscow", abbreviation: "MSK", utcOffset: 3, region: "Europe" },
    { name: "Asia/Dubai", abbreviation: "GST", utcOffset: 4, region: "Asia" },
    { name: "Asia/Kolkata", abbreviation: "IST", utcOffset: 5.5, region: "Asia" },
    { name: "Asia/Bangkok", abbreviation: "ICT", utcOffset: 7, region: "Asia" },
    { name: "Asia/Shanghai", abbreviation: "CST", utcOffset: 8, region: "Asia" },
    { name: "Asia/Tokyo", abbreviation: "JST", utcOffset: 9, region: "Asia" },
    { name: "Australia/Sydney", abbreviation: "AEST", utcOffset: 10, region: "Oceania" },
    { name: "Australia/Adelaide", abbreviation: "ACST", utcOffset: 9.5, region: "Oceania" },
    { name: "Pacific/Auckland", abbreviation: "NZST", utcOffset: 12, region: "Oceania" },
  ];

  static getOffset(timezone: string): number | null {
    const zone = TimezoneOffset.ZONES.find(
      (z) => z.name.toLowerCase() === timezone.toLowerCase() || z.abbreviation.toLowerCase() === timezone.toLowerCase(),
    );
    return zone ? zone.utcOffset : null;
  }

  static convert(hours: number, minutes: number, fromTz: string, toTz: string): { hours: number; minutes: number; dayOffset: number } {
    const fromOffset = TimezoneOffset.getOffset(fromTz);
    const toOffset = TimezoneOffset.getOffset(toTz);
    if (fromOffset === null || toOffset === null) throw new Error("Unknown timezone");

    const diff = toOffset - fromOffset;
    let totalMinutes = hours * 60 + minutes + diff * 60;
    let dayOffset = 0;

    while (totalMinutes < 0) { totalMinutes += 1440; dayOffset--; }
    while (totalMinutes >= 1440) { totalMinutes -= 1440; dayOffset++; }

    return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60, dayOffset };
  }

  static formatOffset(offset: number): string {
    const sign = offset >= 0 ? "+" : "-";
    const abs = Math.abs(offset);
    const h = Math.floor(abs);
    const m = (abs - h) * 60;
    return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  static diffHours(tz1: string, tz2: string): number | null {
    const o1 = TimezoneOffset.getOffset(tz1);
    const o2 = TimezoneOffset.getOffset(tz2);
    if (o1 === null || o2 === null) return null;
    return o2 - o1;
  }

  static list(region?: string): TimezoneInfo[] {
    if (!region) return [...TimezoneOffset.ZONES];
    return TimezoneOffset.ZONES.filter((z) => z.region.toLowerCase() === region.toLowerCase());
  }

  static search(query: string): TimezoneInfo[] {
    const lower = query.toLowerCase();
    return TimezoneOffset.ZONES.filter(
      (z) => z.name.toLowerCase().includes(lower) || z.abbreviation.toLowerCase().includes(lower),
    );
  }

  static regions(): string[] {
    return [...new Set(TimezoneOffset.ZONES.map((z) => z.region))];
  }

  static overlapHours(tz1: string, tz2: string, workStart: number = 9, workEnd: number = 17): number {
    const diff = TimezoneOffset.diffHours(tz1, tz2);
    if (diff === null) return 0;
    const start2 = workStart + diff;
    const end2 = workEnd + diff;
    const overlapStart = Math.max(workStart, start2);
    const overlapEnd = Math.min(workEnd, end2);
    return Math.max(0, overlapEnd - overlapStart);
  }
}

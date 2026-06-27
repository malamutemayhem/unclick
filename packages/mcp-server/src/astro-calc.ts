const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

export function julianDay(year: number, month: number, day: number): number {
  if (month <= 2) { year--; month += 12; }
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

export function julianCentury(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

export function solarMeanLongitude(T: number): number {
  return (280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360;
}

export function solarMeanAnomaly(T: number): number {
  return 357.52911 + T * (35999.05029 - 0.0001537 * T);
}

export function equationOfCenter(T: number): number {
  const M = solarMeanAnomaly(T) * DEG;
  return Math.sin(M) * (1.9146 - T * (0.004817 + 0.000014 * T))
    + Math.sin(2 * M) * (0.019993 - 0.000101 * T)
    + Math.sin(3 * M) * 0.00029;
}

export function solarLongitude(T: number): number {
  return solarMeanLongitude(T) + equationOfCenter(T);
}

export function obliquityOfEcliptic(T: number): number {
  return 23.439291 - 0.0130042 * T;
}

export function solarDeclination(T: number): number {
  const lambda = solarLongitude(T) * DEG;
  const epsilon = obliquityOfEcliptic(T) * DEG;
  return Math.asin(Math.sin(epsilon) * Math.sin(lambda)) * RAD;
}

export function equationOfTime(T: number): number {
  const L0 = solarMeanLongitude(T) * DEG;
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const M = solarMeanAnomaly(T) * DEG;
  const epsilon = obliquityOfEcliptic(T) * DEG;
  const y = Math.tan(epsilon / 2) * Math.tan(epsilon / 2);

  const eot = y * Math.sin(2 * L0)
    - 2 * e * Math.sin(M)
    + 4 * e * y * Math.sin(M) * Math.cos(2 * L0)
    - 0.5 * y * y * Math.sin(4 * L0)
    - 1.25 * e * e * Math.sin(2 * M);

  return eot * RAD * 4;
}

export function solarNoon(longitude: number, jd: number): number {
  const T = julianCentury(jd);
  const eot = equationOfTime(T);
  return 12 - longitude / 15 - eot / 60;
}

export function hourAngle(latDeg: number, declDeg: number, elevation = -0.8333): number {
  const lat = latDeg * DEG;
  const decl = declDeg * DEG;
  const elev = elevation * DEG;
  const cosHA = (Math.sin(elev) - Math.sin(lat) * Math.sin(decl)) / (Math.cos(lat) * Math.cos(decl));
  if (cosHA > 1) return NaN;
  if (cosHA < -1) return NaN;
  return Math.acos(cosHA) * RAD;
}

export function sunrise(latDeg: number, lonDeg: number, year: number, month: number, day: number): number | null {
  const jd = julianDay(year, month, day);
  const T = julianCentury(jd);
  const decl = solarDeclination(T);
  const ha = hourAngle(latDeg, decl);
  if (isNaN(ha)) return null;
  const noon = solarNoon(lonDeg, jd);
  return noon - ha / 15;
}

export function sunset(latDeg: number, lonDeg: number, year: number, month: number, day: number): number | null {
  const jd = julianDay(year, month, day);
  const T = julianCentury(jd);
  const decl = solarDeclination(T);
  const ha = hourAngle(latDeg, decl);
  if (isNaN(ha)) return null;
  const noon = solarNoon(lonDeg, jd);
  return noon + ha / 15;
}

export function dayLength(latDeg: number, lonDeg: number, year: number, month: number, day: number): number | null {
  const sr = sunrise(latDeg, lonDeg, year, month, day);
  const ss = sunset(latDeg, lonDeg, year, month, day);
  if (sr === null || ss === null) return null;
  return ss - sr;
}

export function moonPhase(year: number, month: number, day: number): number {
  const jd = julianDay(year, month, day);
  const daysSinceNew = jd - 2451550.1;
  const phase = ((daysSinceNew % 29.530588853) + 29.530588853) % 29.530588853;
  return phase / 29.530588853;
}

export function moonPhaseName(phase: number): string {
  if (phase < 0.0625) return "New Moon";
  if (phase < 0.1875) return "Waxing Crescent";
  if (phase < 0.3125) return "First Quarter";
  if (phase < 0.4375) return "Waxing Gibbous";
  if (phase < 0.5625) return "Full Moon";
  if (phase < 0.6875) return "Waning Gibbous";
  if (phase < 0.8125) return "Last Quarter";
  if (phase < 0.9375) return "Waning Crescent";
  return "New Moon";
}

export function siderealTime(jd: number, lonDeg: number): number {
  const T = julianCentury(jd);
  const gst = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T) % 360;
  return ((gst + lonDeg) % 360 + 360) % 360;
}

export function formatHoursMinutes(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function angularDistance(ra1: number, dec1: number, ra2: number, dec2: number): number {
  const r1 = ra1 * DEG, d1 = dec1 * DEG, r2 = ra2 * DEG, d2 = dec2 * DEG;
  return Math.acos(Math.sin(d1) * Math.sin(d2) + Math.cos(d1) * Math.cos(d2) * Math.cos(r1 - r2)) * RAD;
}

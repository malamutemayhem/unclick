export type SundialType = "horizontal" | "vertical" | "equatorial" | "analemmatic" | "polar";

export function hourAngle(hour: number): number {
  return parseFloat(((hour - 12) * 15).toFixed(1));
}

export function gnomonAngle(latitudeDeg: number): number {
  return latitudeDeg;
}

export function horizontalHourLine(hourAngleDeg: number, latitudeDeg: number): number {
  const ha = hourAngleDeg * Math.PI / 180;
  const lat = latitudeDeg * Math.PI / 180;
  return parseFloat((Math.atan(Math.sin(lat) * Math.tan(ha)) * 180 / Math.PI).toFixed(2));
}

export function verticalHourLine(hourAngleDeg: number, latitudeDeg: number): number {
  const ha = hourAngleDeg * Math.PI / 180;
  const lat = latitudeDeg * Math.PI / 180;
  return parseFloat((Math.atan(Math.cos(lat) * Math.tan(ha)) * 180 / Math.PI).toFixed(2));
}

export function gnomonHeight(dialRadiusCm: number, latitudeDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  return parseFloat((dialRadiusCm * Math.tan(lat)).toFixed(1));
}

export function equationOfTime(dayOfYear: number): number {
  const b = 2 * Math.PI * (dayOfYear - 81) / 365;
  return parseFloat((9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b)).toFixed(1));
}

export function solarNoon(longitudeDeg: number, timezoneMeridian: number, eotMinutes: number): string {
  const correctionMin = 4 * (timezoneMeridian - longitudeDeg) - eotMinutes;
  const noonMin = 720 + correctionMin;
  const hours = Math.floor(noonMin / 60);
  const mins = Math.round(noonMin % 60);
  return `${hours}:${mins.toString().padStart(2, "0")}`;
}

export function shadowLength(objectHeightM: number, sunElevationDeg: number): number {
  if (sunElevationDeg <= 0) return Infinity;
  const rad = sunElevationDeg * Math.PI / 180;
  return parseFloat((objectHeightM / Math.tan(rad)).toFixed(2));
}

export function sunElevation(latitudeDeg: number, declinationDeg: number, hourAngleDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  const dec = declinationDeg * Math.PI / 180;
  const ha = hourAngleDeg * Math.PI / 180;
  const sinElev = Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(ha);
  return parseFloat((Math.asin(sinElev) * 180 / Math.PI).toFixed(2));
}

export function declination(dayOfYear: number): number {
  return parseFloat((23.45 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365)).toFixed(2));
}

export function daylightHours(latitudeDeg: number, declinationDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  const dec = declinationDeg * Math.PI / 180;
  const cosHa = -Math.tan(lat) * Math.tan(dec);
  if (cosHa > 1) return 0;
  if (cosHa < -1) return 24;
  return parseFloat((2 * Math.acos(cosHa) * 12 / Math.PI).toFixed(1));
}

export function dialSize(readabilityM: number): number {
  return parseFloat((readabilityM * 15).toFixed(0));
}

export function sundialTypes(): SundialType[] {
  return ["horizontal", "vertical", "equatorial", "analemmatic", "polar"];
}

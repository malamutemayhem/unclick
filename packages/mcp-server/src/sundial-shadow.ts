export type ShadowType = "gnomon" | "nodus" | "bifilar" | "analemmatic";

export function shadowLengthCm(gnomonHeightCm: number, sunElevationDeg: number): number {
  if (sunElevationDeg <= 0 || sunElevationDeg >= 90) return 0;
  const rad = sunElevationDeg * Math.PI / 180;
  return parseFloat((gnomonHeightCm / Math.tan(rad)).toFixed(1));
}

export function sunElevation(latitudeDeg: number, declinationDeg: number, hourAngleDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  const dec = declinationDeg * Math.PI / 180;
  const ha = hourAngleDeg * Math.PI / 180;
  const sinAlt = Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(ha);
  return parseFloat((Math.asin(sinAlt) * 180 / Math.PI).toFixed(2));
}

export function solarAzimuth(latitudeDeg: number, declinationDeg: number, hourAngleDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  const dec = declinationDeg * Math.PI / 180;
  const ha = hourAngleDeg * Math.PI / 180;
  const elev = sunElevation(latitudeDeg, declinationDeg, hourAngleDeg) * Math.PI / 180;
  const cosAz = (Math.sin(dec) - Math.sin(lat) * Math.sin(elev)) / (Math.cos(lat) * Math.cos(elev));
  const az = Math.acos(Math.max(-1, Math.min(1, cosAz))) * 180 / Math.PI;
  return parseFloat((hourAngleDeg > 0 ? 360 - az : az).toFixed(2));
}

export function hourAngleFromTime(solarHour: number): number {
  return parseFloat(((solarHour - 12) * 15).toFixed(1));
}

export function solarDeclination(dayOfYear: number): number {
  const rad = (23.45 * Math.PI / 180) * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
  return parseFloat((rad * 180 / Math.PI).toFixed(2));
}

export function daylightHours(latitudeDeg: number, declinationDeg: number): number {
  const lat = latitudeDeg * Math.PI / 180;
  const dec = declinationDeg * Math.PI / 180;
  const cosHa = -Math.tan(lat) * Math.tan(dec);
  if (cosHa <= -1) return 24;
  if (cosHa >= 1) return 0;
  const ha = Math.acos(cosHa);
  return parseFloat((2 * ha * 12 / Math.PI).toFixed(1));
}

export function shadowDirection(azimuthDeg: number): number {
  return parseFloat(((azimuthDeg + 180) % 360).toFixed(1));
}

export function analemmaOffset(dayOfYear: number): number {
  const b = 2 * Math.PI * (dayOfYear - 81) / 365;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  return parseFloat(eot.toFixed(2));
}

export function shadowSpeed(gnomonHeightCm: number): number {
  return parseFloat((gnomonHeightCm * 15 / 60).toFixed(2));
}

export function shadowTypes(): ShadowType[] {
  return ["gnomon", "nodus", "bifilar", "analemmatic"];
}

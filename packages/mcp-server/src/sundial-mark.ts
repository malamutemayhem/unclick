export type DialType = "horizontal" | "vertical" | "equatorial" | "analemmatic" | "polar";

export function gnomonAngle(latitudeDeg: number): number {
  return parseFloat(Math.abs(latitudeDeg).toFixed(1));
}

export function gnomonLength(dialRadiusCm: number, latitudeDeg: number): number {
  const radians = Math.abs(latitudeDeg) * Math.PI / 180;
  return parseFloat((dialRadiusCm / Math.cos(radians)).toFixed(1));
}

export function hourLineAngle(hourFromNoon: number, latitudeDeg: number): number {
  const latRad = Math.abs(latitudeDeg) * Math.PI / 180;
  const hourAngleRad = hourFromNoon * 15 * Math.PI / 180;
  return parseFloat((Math.atan(Math.sin(latRad) * Math.tan(hourAngleRad)) * 180 / Math.PI).toFixed(2));
}

export function dialDiameterCm(readabilityDistanceM: number): number {
  return parseFloat((readabilityDistanceM * 3.5).toFixed(1));
}

export function shadowLengthCm(gnomonHeightCm: number, sunAltitudeDeg: number): number {
  if (sunAltitudeDeg <= 0) return 0;
  const rad = sunAltitudeDeg * Math.PI / 180;
  return parseFloat((gnomonHeightCm / Math.tan(rad)).toFixed(1));
}

export function eotCorrectionMin(dayOfYear: number): number {
  const b = (360 / 365) * (dayOfYear - 81) * Math.PI / 180;
  return parseFloat((9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b)).toFixed(1));
}

export function longitudeCorrectionMin(localLongitude: number, standardMeridian: number): number {
  return parseFloat(((standardMeridian - localLongitude) * 4).toFixed(1));
}

export function dialPlateArea(radiusCm: number): number {
  return parseFloat((Math.PI * radiusCm * radiusCm / 10000).toFixed(3));
}

export function accuracyMinutes(dialType: DialType): number {
  const acc: Record<DialType, number> = {
    horizontal: 5, vertical: 8, equatorial: 3, analemmatic: 10, polar: 4,
  };
  return acc[dialType];
}

export function inscriptionCount(hourMarks: number, minuteMarks: number, monthMarks: number): number {
  return hourMarks + minuteMarks + monthMarks;
}

export function dialTypes(): DialType[] {
  return ["horizontal", "vertical", "equatorial", "analemmatic", "polar"];
}

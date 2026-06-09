export type CompassType = "magnetic" | "gyro" | "solar" | "star" | "gps";

export function trueBearing(magneticBearing: number, declination: number): number {
  return parseFloat((((magneticBearing + declination) % 360 + 360) % 360).toFixed(1));
}

export function magneticBearing(trueBearing: number, declination: number): number {
  return parseFloat((((trueBearing - declination) % 360 + 360) % 360).toFixed(1));
}

export function backBearing(bearing: number): number {
  return parseFloat((((bearing + 180) % 360)).toFixed(1));
}

export function bearingBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const la1 = lat1 * Math.PI / 180;
  const la2 = lat2 * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(la2);
  const x = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dLon);
  const brng = Math.atan2(y, x) * 180 / Math.PI;
  return parseFloat((((brng % 360) + 360) % 360).toFixed(1));
}

export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2));
}

export function distanceNm(km: number): number {
  return parseFloat((km / 1.852).toFixed(2));
}

export function etaMinutes(distanceKm: number, speedKmh: number): number {
  if (speedKmh <= 0) return Infinity;
  return Math.round(distanceKm / speedKmh * 60);
}

export function waypointProgress(distanceTraveled: number, totalDistance: number): number {
  if (totalDistance <= 0) return 0;
  return parseFloat((Math.min(100, distanceTraveled / totalDistance * 100)).toFixed(1));
}

export function crossTrackError(distanceKm: number, bearingError: number): number {
  const rad = bearingError * Math.PI / 180;
  return parseFloat((distanceKm * Math.sin(rad)).toFixed(3));
}

export function compassRose(): string[] {
  return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
}

export function degreesToDms(degrees: number): string {
  const d = Math.floor(Math.abs(degrees));
  const mFloat = (Math.abs(degrees) - d) * 60;
  const m = Math.floor(mFloat);
  const s = parseFloat(((mFloat - m) * 60).toFixed(1));
  return `${d}d ${m}' ${s}"`;
}

export function compassTypes(): CompassType[] {
  return ["magnetic", "gyro", "solar", "star", "gps"];
}

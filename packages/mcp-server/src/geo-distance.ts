const EARTH_RADIUS_KM = 6371;
const EARTH_RADIUS_MI = 3959;

function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

export function haversine(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
  unit: "km" | "mi" = "km"
): number {
  const R = unit === "km" ? EARTH_RADIUS_KM : EARTH_RADIUS_MI;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function bearing(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  const brng = Math.atan2(y, x) * 180 / Math.PI;
  return (brng + 360) % 360;
}

export function midpoint(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): { lat: number; lon: number } {
  const lat1R = toRad(lat1);
  const lon1R = toRad(lon1);
  const lat2R = toRad(lat2);
  const dLon = toRad(lon2 - lon1);

  const bx = Math.cos(lat2R) * Math.cos(dLon);
  const by = Math.cos(lat2R) * Math.sin(dLon);

  const lat = Math.atan2(
    Math.sin(lat1R) + Math.sin(lat2R),
    Math.sqrt((Math.cos(lat1R) + bx) * (Math.cos(lat1R) + bx) + by * by)
  );
  const lon = lon1R + Math.atan2(by, Math.cos(lat1R) + bx);

  return { lat: lat * 180 / Math.PI, lon: lon * 180 / Math.PI };
}

export function isWithinRadius(
  lat: number, lon: number,
  centerLat: number, centerLon: number,
  radiusKm: number
): boolean {
  return haversine(lat, lon, centerLat, centerLon, "km") <= radiusKm;
}

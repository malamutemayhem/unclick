export interface LatLng { lat: number; lng: number }

const EARTH_RADIUS_KM = 6371;

export function haversine(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function bearing(from: LatLng, to: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLng = toRad(to.lng - from.lng);
  const y = Math.sin(dLng) * Math.cos(toRad(to.lat));
  const x = Math.cos(toRad(from.lat)) * Math.sin(toRad(to.lat)) -
    Math.sin(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function midpoint(a: LatLng, b: LatLng): LatLng {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLng = toRad(b.lng - a.lng);
  const bx = Math.cos(toRad(b.lat)) * Math.cos(dLng);
  const by = Math.cos(toRad(b.lat)) * Math.sin(dLng);
  const lat = Math.atan2(
    Math.sin(toRad(a.lat)) + Math.sin(toRad(b.lat)),
    Math.sqrt((Math.cos(toRad(a.lat)) + bx) ** 2 + by ** 2)
  );
  const lng = toRad(a.lng) + Math.atan2(by, Math.cos(toRad(a.lat)) + bx);
  return { lat: toDeg(lat), lng: toDeg(lng) };
}

export function boundingBox(center: LatLng, radiusKm: number): { ne: LatLng; sw: LatLng } {
  const latDelta = (radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI);
  const lngDelta = latDelta / Math.cos((center.lat * Math.PI) / 180);
  return {
    ne: { lat: center.lat + latDelta, lng: center.lng + lngDelta },
    sw: { lat: center.lat - latDelta, lng: center.lng - lngDelta },
  };
}

export function isInBoundingBox(point: LatLng, ne: LatLng, sw: LatLng): boolean {
  return point.lat >= sw.lat && point.lat <= ne.lat &&
    point.lng >= sw.lng && point.lng <= ne.lng;
}

export function toGeoJSON(points: LatLng[]): { type: string; coordinates: number[][] } {
  return {
    type: "LineString",
    coordinates: points.map((p) => [p.lng, p.lat]),
  };
}

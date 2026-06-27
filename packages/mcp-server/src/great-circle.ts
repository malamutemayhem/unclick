export interface GeoPoint {
  lat: number;
  lon: number;
}

const EARTH_RADIUS_KM = 6371;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export class GreatCircle {
  static haversineDistance(a: GeoPoint, b: GeoPoint): number {
    const dLat = (b.lat - a.lat) * DEG_TO_RAD;
    const dLon = (b.lon - a.lon) * DEG_TO_RAD;
    const lat1 = a.lat * DEG_TO_RAD;
    const lat2 = b.lat * DEG_TO_RAD;

    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
  }

  static bearing(from: GeoPoint, to: GeoPoint): number {
    const lat1 = from.lat * DEG_TO_RAD;
    const lat2 = to.lat * DEG_TO_RAD;
    const dLon = (to.lon - from.lon) * DEG_TO_RAD;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return ((Math.atan2(y, x) * RAD_TO_DEG) + 360) % 360;
  }

  static midpoint(a: GeoPoint, b: GeoPoint): GeoPoint {
    const lat1 = a.lat * DEG_TO_RAD;
    const lat2 = b.lat * DEG_TO_RAD;
    const lon1 = a.lon * DEG_TO_RAD;
    const dLon = (b.lon - a.lon) * DEG_TO_RAD;

    const bx = Math.cos(lat2) * Math.cos(dLon);
    const by = Math.cos(lat2) * Math.sin(dLon);
    const lat = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2),
    );
    const lon = lon1 + Math.atan2(by, Math.cos(lat1) + bx);

    return { lat: lat * RAD_TO_DEG, lon: lon * RAD_TO_DEG };
  }

  static destination(start: GeoPoint, bearing: number, distance: number): GeoPoint {
    const lat1 = start.lat * DEG_TO_RAD;
    const lon1 = start.lon * DEG_TO_RAD;
    const brng = bearing * DEG_TO_RAD;
    const d = distance / EARTH_RADIUS_KM;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) +
      Math.cos(lat1) * Math.sin(d) * Math.cos(brng),
    );
    const lon2 =
      lon1 +
      Math.atan2(
        Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(lat2),
      );

    return { lat: lat2 * RAD_TO_DEG, lon: lon2 * RAD_TO_DEG };
  }

  static intermediatePoints(a: GeoPoint, b: GeoPoint, count: number): GeoPoint[] {
    const points: GeoPoint[] = [];
    for (let i = 0; i <= count; i++) {
      const f = i / count;
      const d = GreatCircle.haversineDistance(a, b) / EARTH_RADIUS_KM;
      const lat1 = a.lat * DEG_TO_RAD;
      const lat2 = b.lat * DEG_TO_RAD;
      const lon1 = a.lon * DEG_TO_RAD;
      const lon2 = b.lon * DEG_TO_RAD;

      const sinD = Math.sin(d);
      const A = Math.sin((1 - f) * d) / sinD;
      const B = Math.sin(f * d) / sinD;

      const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
      const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
      const z = A * Math.sin(lat1) + B * Math.sin(lat2);

      points.push({
        lat: Math.atan2(z, Math.sqrt(x * x + y * y)) * RAD_TO_DEG,
        lon: Math.atan2(y, x) * RAD_TO_DEG,
      });
    }
    return points;
  }

  static totalDistance(points: GeoPoint[]): number {
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      total += GreatCircle.haversineDistance(points[i], points[i + 1]);
    }
    return total;
  }

  static isWithinRadius(center: GeoPoint, point: GeoPoint, radiusKm: number): boolean {
    return GreatCircle.haversineDistance(center, point) <= radiusKm;
  }

  static boundingBox(center: GeoPoint, radiusKm: number): { minLat: number; maxLat: number; minLon: number; maxLon: number } {
    const latDelta = (radiusKm / EARTH_RADIUS_KM) * RAD_TO_DEG;
    const lonDelta = latDelta / Math.cos(center.lat * DEG_TO_RAD);
    return {
      minLat: center.lat - latDelta,
      maxLat: center.lat + latDelta,
      minLon: center.lon - lonDelta,
      maxLon: center.lon + lonDelta,
    };
  }
}

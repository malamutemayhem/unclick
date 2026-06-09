export interface Point {
  lat: number;
  lng: number;
}

export interface Circle {
  center: Point;
  radiusKm: number;
}

export interface Polygon {
  vertices: Point[];
}

export interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

function toDeg(rad: number): number {
  return rad * 180 / Math.PI;
}

export function haversineDistance(a: Point, b: Point): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

export function isInsideCircle(point: Point, circle: Circle): boolean {
  return haversineDistance(point, circle.center) <= circle.radiusKm;
}

export function isInsidePolygon(point: Point, polygon: Polygon): boolean {
  const { vertices } = polygon;
  const n = vertices.length;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const vi = vertices[i];
    const vj = vertices[j];
    if ((vi.lat > point.lat) !== (vj.lat > point.lat) &&
        point.lng < (vj.lng - vi.lng) * (point.lat - vi.lat) / (vj.lat - vi.lat) + vi.lng) {
      inside = !inside;
    }
  }
  return inside;
}

export function isInsideBBox(point: Point, bbox: BoundingBox): boolean {
  return point.lat >= bbox.minLat && point.lat <= bbox.maxLat &&
         point.lng >= bbox.minLng && point.lng <= bbox.maxLng;
}

export function polygonBBox(polygon: Polygon): BoundingBox {
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;
  for (const v of polygon.vertices) {
    if (v.lat < minLat) minLat = v.lat;
    if (v.lat > maxLat) maxLat = v.lat;
    if (v.lng < minLng) minLng = v.lng;
    if (v.lng > maxLng) maxLng = v.lng;
  }
  return { minLat, maxLat, minLng, maxLng };
}

export function circleBBox(circle: Circle): BoundingBox {
  const dLat = toDeg(circle.radiusKm / EARTH_RADIUS_KM);
  const dLng = dLat / Math.cos(toRad(circle.center.lat));
  return {
    minLat: circle.center.lat - dLat,
    maxLat: circle.center.lat + dLat,
    minLng: circle.center.lng - dLng,
    maxLng: circle.center.lng + dLng,
  };
}

export function polygonArea(polygon: Polygon): number {
  const { vertices } = polygon;
  const n = vertices.length;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const vi = vertices[i];
    const vj = vertices[j];
    area += toRad(vj.lng - vi.lng) * (2 + Math.sin(toRad(vi.lat)) + Math.sin(toRad(vj.lat)));
  }
  return Math.abs(area * EARTH_RADIUS_KM * EARTH_RADIUS_KM / 2);
}

export function polygonCentroid(polygon: Polygon): Point {
  let latSum = 0;
  let lngSum = 0;
  for (const v of polygon.vertices) {
    latSum += v.lat;
    lngSum += v.lng;
  }
  const n = polygon.vertices.length;
  return { lat: latSum / n, lng: lngSum / n };
}

export function distanceToPolygonEdge(point: Point, polygon: Polygon): number {
  const { vertices } = polygon;
  const n = vertices.length;
  let minDist = Infinity;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const d = distanceToSegment(point, vertices[i], vertices[j]);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

function distanceToSegment(p: Point, a: Point, b: Point): number {
  const ab = haversineDistance(a, b);
  if (ab === 0) return haversineDistance(p, a);
  const ap = haversineDistance(a, p);
  const bp = haversineDistance(b, p);
  if (ap * ap > bp * bp + ab * ab) return bp;
  if (bp * bp > ap * ap + ab * ab) return ap;
  const s = (ap + bp + ab) / 2;
  const area = Math.sqrt(Math.max(0, s * (s - ap) * (s - bp) * (s - ab)));
  return 2 * area / ab;
}

export function bearing(from: Point, to: Point): number {
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function destinationPoint(from: Point, bearingDeg: number, distanceKm: number): Point {
  const d = distanceKm / EARTH_RADIUS_KM;
  const brng = toRad(bearingDeg);
  const lat1 = toRad(from.lat);
  const lng1 = toRad(from.lng);
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
    Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return { lat: toDeg(lat2), lng: toDeg(lng2) };
}

export function filterInsideCircle(points: Point[], circle: Circle): Point[] {
  return points.filter(p => isInsideCircle(p, circle));
}

export function filterInsidePolygon(points: Point[], polygon: Polygon): Point[] {
  return points.filter(p => isInsidePolygon(p, polygon));
}

export function polygonPerimeter(polygon: Polygon): number {
  const { vertices } = polygon;
  let total = 0;
  for (let i = 0; i < vertices.length; i++) {
    const j = (i + 1) % vertices.length;
    total += haversineDistance(vertices[i], vertices[j]);
  }
  return total;
}

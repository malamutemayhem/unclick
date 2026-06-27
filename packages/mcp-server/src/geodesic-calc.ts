export class GeodesicCalc {
  private static readonly EARTH_RADIUS = 6371000;

  static haversine(lat1: number, lon1: number, lat2: number, lon2: number, radius = GeodesicCalc.EARTH_RADIUS): number {
    const toRad = (d: number) => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(radius * c * 10000) / 10000;
  }

  static bearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (d: number) => d * Math.PI / 180;
    const toDeg = (r: number) => r * 180 / Math.PI;
    const dLon = toRad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
    return Math.round(((toDeg(Math.atan2(y, x)) + 360) % 360) * 10000) / 10000;
  }

  static destination(lat: number, lon: number, bearing: number, distance: number, radius = GeodesicCalc.EARTH_RADIUS): { lat: number; lon: number } {
    const toRad = (d: number) => d * Math.PI / 180;
    const toDeg = (r: number) => r * 180 / Math.PI;
    const lat1 = toRad(lat);
    const lon1 = toRad(lon);
    const brng = toRad(bearing);
    const d = distance / radius;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
    );
    const lon2 = lon1 + Math.atan2(
      Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );
    return {
      lat: Math.round(toDeg(lat2) * 10000) / 10000,
      lon: Math.round(toDeg(lon2) * 10000) / 10000,
    };
  }

  static midpoint(lat1: number, lon1: number, lat2: number, lon2: number): { lat: number; lon: number } {
    const toRad = (d: number) => d * Math.PI / 180;
    const toDeg = (r: number) => r * 180 / Math.PI;
    const la1 = toRad(lat1);
    const la2 = toRad(lat2);
    const dLon = toRad(lon2 - lon1);
    const bx = Math.cos(la2) * Math.cos(dLon);
    const by = Math.cos(la2) * Math.sin(dLon);
    const lat3 = Math.atan2(
      Math.sin(la1) + Math.sin(la2),
      Math.sqrt((Math.cos(la1) + bx) ** 2 + by ** 2)
    );
    const lon3 = toRad(lon1) + Math.atan2(by, Math.cos(la1) + bx);
    return {
      lat: Math.round(toDeg(lat3) * 10000) / 10000,
      lon: Math.round(toDeg(lon3) * 10000) / 10000,
    };
  }

  static polygonArea(coords: { lat: number; lon: number }[], radius = GeodesicCalc.EARTH_RADIUS): number {
    const toRad = (d: number) => d * Math.PI / 180;
    let total = 0;
    const n = coords.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const k = (i + 2) % n;
      total += (toRad(coords[k].lon) - toRad(coords[i].lon)) * Math.sin(toRad(coords[j].lat));
    }
    return Math.round(Math.abs(total * radius * radius / 2) * 10000) / 10000;
  }

  static pathLength(coords: { lat: number; lon: number }[]): number {
    let total = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      total += GeodesicCalc.haversine(coords[i].lat, coords[i].lon, coords[i + 1].lat, coords[i + 1].lon);
    }
    return Math.round(total * 10000) / 10000;
  }

  static boundingBox(lat: number, lon: number, distance: number, radius = GeodesicCalc.EARTH_RADIUS): {
    minLat: number; maxLat: number; minLon: number; maxLon: number;
  } {
    const toDeg = (r: number) => r * 180 / Math.PI;
    const toRad = (d: number) => d * Math.PI / 180;
    const angDist = distance / radius;
    const latRad = toRad(lat);
    const minLat = toDeg(latRad - angDist);
    const maxLat = toDeg(latRad + angDist);
    const dLon = toDeg(Math.asin(Math.sin(angDist) / Math.cos(latRad)));
    return {
      minLat: Math.round(minLat * 10000) / 10000,
      maxLat: Math.round(maxLat * 10000) / 10000,
      minLon: Math.round((lon - dLon) * 10000) / 10000,
      maxLon: Math.round((lon + dLon) * 10000) / 10000,
    };
  }
}

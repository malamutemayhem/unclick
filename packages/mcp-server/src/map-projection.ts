export interface Point2D {
  x: number;
  y: number;
}

export interface GeoCoord {
  lat: number;
  lon: number;
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export class MapProjection {
  static mercator(coord: GeoCoord): Point2D {
    const x = coord.lon * DEG2RAD;
    const y = Math.log(Math.tan(Math.PI / 4 + (coord.lat * DEG2RAD) / 2));
    return { x, y };
  }

  static inverseMercator(point: Point2D): GeoCoord {
    const lon = point.x * RAD2DEG;
    const lat = (2 * Math.atan(Math.exp(point.y)) - Math.PI / 2) * RAD2DEG;
    return { lat, lon };
  }

  static equirectangular(coord: GeoCoord): Point2D {
    return { x: coord.lon * DEG2RAD, y: coord.lat * DEG2RAD };
  }

  static inverseEquirectangular(point: Point2D): GeoCoord {
    return { lat: point.y * RAD2DEG, lon: point.x * RAD2DEG };
  }

  static sinusoidal(coord: GeoCoord): Point2D {
    const latRad = coord.lat * DEG2RAD;
    const lonRad = coord.lon * DEG2RAD;
    return { x: lonRad * Math.cos(latRad), y: latRad };
  }

  static mollweide(coord: GeoCoord, iterations = 20): Point2D {
    const latRad = coord.lat * DEG2RAD;
    const lonRad = coord.lon * DEG2RAD;

    let theta = latRad;
    for (let i = 0; i < iterations; i++) {
      const dTheta =
        -(theta + Math.sin(theta) - Math.PI * Math.sin(latRad)) /
        (1 + Math.cos(theta));
      theta += dTheta;
      if (Math.abs(dTheta) < 1e-7) break;
    }
    theta /= 2;

    return {
      x: (2 * Math.SQRT2 * lonRad * Math.cos(theta)) / Math.PI,
      y: Math.SQRT2 * Math.sin(theta),
    };
  }

  static stereographic(coord: GeoCoord, centerLat = 0, centerLon = 0): Point2D {
    const lat = coord.lat * DEG2RAD;
    const lon = coord.lon * DEG2RAD;
    const cLat = centerLat * DEG2RAD;
    const cLon = centerLon * DEG2RAD;
    const dLon = lon - cLon;

    const k =
      2 /
      (1 +
        Math.sin(cLat) * Math.sin(lat) +
        Math.cos(cLat) * Math.cos(lat) * Math.cos(dLon));

    return {
      x: k * Math.cos(lat) * Math.sin(dLon),
      y: k * (Math.cos(cLat) * Math.sin(lat) - Math.sin(cLat) * Math.cos(lat) * Math.cos(dLon)),
    };
  }

  static webMercator(coord: GeoCoord, tileSize = 256, zoom = 0): Point2D {
    const scale = tileSize * Math.pow(2, zoom);
    const x = ((coord.lon + 180) / 360) * scale;
    const latRad = coord.lat * DEG2RAD;
    const y =
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale;
    return { x, y };
  }

  static availableProjections(): string[] {
    return [
      "mercator",
      "equirectangular",
      "sinusoidal",
      "mollweide",
      "stereographic",
      "webMercator",
    ];
  }
}

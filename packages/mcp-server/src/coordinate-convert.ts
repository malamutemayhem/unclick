export interface LatLng {
  lat: number;
  lng: number;
}

export class CoordinateConvert {
  static degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  static decimalToDMS(decimal: number): { degrees: number; minutes: number; seconds: number; direction: string } {
    const abs = Math.abs(decimal);
    const degrees = Math.floor(abs);
    const minutesFull = (abs - degrees) * 60;
    const minutes = Math.floor(minutesFull);
    const seconds = Math.round((minutesFull - minutes) * 60 * 100) / 100;
    return { degrees, minutes, seconds, direction: "" };
  }

  static latToDMS(lat: number): string {
    const dms = CoordinateConvert.decimalToDMS(lat);
    const dir = lat >= 0 ? "N" : "S";
    return `${dms.degrees}d ${dms.minutes}' ${dms.seconds}" ${dir}`;
  }

  static lngToDMS(lng: number): string {
    const dms = CoordinateConvert.decimalToDMS(lng);
    const dir = lng >= 0 ? "E" : "W";
    return `${dms.degrees}d ${dms.minutes}' ${dms.seconds}" ${dir}`;
  }

  static dmsToDecimal(degrees: number, minutes: number, seconds: number, direction: string): number {
    let decimal = degrees + minutes / 60 + seconds / 3600;
    if (direction === "S" || direction === "W") decimal = -decimal;
    return Math.round(decimal * 1000000) / 1000000;
  }

  static haversineDistance(a: LatLng, b: LatLng): number {
    const R = 6371;
    const dLat = CoordinateConvert.degreesToRadians(b.lat - a.lat);
    const dLng = CoordinateConvert.degreesToRadians(b.lng - a.lng);
    const sinLat = Math.sin(dLat / 2);
    const sinLng = Math.sin(dLng / 2);
    const h = sinLat * sinLat +
      Math.cos(CoordinateConvert.degreesToRadians(a.lat)) *
      Math.cos(CoordinateConvert.degreesToRadians(b.lat)) *
      sinLng * sinLng;
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  static bearing(from: LatLng, to: LatLng): number {
    const lat1 = CoordinateConvert.degreesToRadians(from.lat);
    const lat2 = CoordinateConvert.degreesToRadians(to.lat);
    const dLng = CoordinateConvert.degreesToRadians(to.lng - from.lng);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return (CoordinateConvert.radiansToDegrees(Math.atan2(y, x)) + 360) % 360;
  }

  static midpoint(a: LatLng, b: LatLng): LatLng {
    const lat1 = CoordinateConvert.degreesToRadians(a.lat);
    const lat2 = CoordinateConvert.degreesToRadians(b.lat);
    const lng1 = CoordinateConvert.degreesToRadians(a.lng);
    const dLng = CoordinateConvert.degreesToRadians(b.lng - a.lng);
    const bx = Math.cos(lat2) * Math.cos(dLng);
    const by = Math.cos(lat2) * Math.sin(dLng);
    const lat = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) ** 2 + by ** 2));
    const lng = lng1 + Math.atan2(by, Math.cos(lat1) + bx);
    return {
      lat: Math.round(CoordinateConvert.radiansToDegrees(lat) * 1000000) / 1000000,
      lng: Math.round(CoordinateConvert.radiansToDegrees(lng) * 1000000) / 1000000,
    };
  }

  static isValidLatLng(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  static compassDirection(bearing: number): string {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(bearing / 45) % 8];
  }

  static format(coord: LatLng, precision: number = 6): string {
    return `${coord.lat.toFixed(precision)}, ${coord.lng.toFixed(precision)}`;
  }
}

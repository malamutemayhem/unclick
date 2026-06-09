export type Projection = "mercator" | "robinson" | "mollweide" | "equirectangular" | "stereographic";
export type MapScale = "1:5000" | "1:10000" | "1:25000" | "1:50000" | "1:100000" | "1:250000";

export function scaleDenominator(scale: MapScale): number {
  return parseInt(scale.split(":")[1]);
}

export function groundDistanceM(mapDistanceCm: number, scale: MapScale): number {
  return parseFloat((mapDistanceCm * scaleDenominator(scale) / 100).toFixed(1));
}

export function mapDistanceCm(groundDistanceM: number, scale: MapScale): number {
  return parseFloat((groundDistanceM * 100 / scaleDenominator(scale)).toFixed(3));
}

export function contourInterval(scale: MapScale): number {
  const denom = scaleDenominator(scale);
  if (denom <= 10000) return 5;
  if (denom <= 25000) return 10;
  if (denom <= 50000) return 20;
  return 50;
}

export function areaOnMapCm2(areaM2: number, scale: MapScale): number {
  const denom = scaleDenominator(scale);
  return parseFloat((areaM2 * 10000 / (denom * denom)).toFixed(4));
}

export function degreesToDms(decimal: number): { degrees: number; minutes: number; seconds: number } {
  const abs = Math.abs(decimal);
  const degrees = Math.floor(abs);
  const minFloat = (abs - degrees) * 60;
  const minutes = Math.floor(minFloat);
  const seconds = parseFloat(((minFloat - minutes) * 60).toFixed(1));
  return { degrees: decimal < 0 ? -degrees : degrees, minutes, seconds };
}

export function dmsToDegrees(degrees: number, minutes: number, seconds: number): number {
  const sign = degrees < 0 ? -1 : 1;
  return parseFloat((sign * (Math.abs(degrees) + minutes / 60 + seconds / 3600)).toFixed(6));
}

export function utmZone(longitude: number): number {
  return Math.floor((longitude + 180) / 6) + 1;
}

export function gridSquareSize(scale: MapScale): number {
  const denom = scaleDenominator(scale);
  if (denom <= 10000) return 100;
  if (denom <= 25000) return 1000;
  return 5000;
}

export function distortionFactor(latitude: number, projection: Projection): number {
  if (projection === "equirectangular") return 1;
  if (projection === "mercator") {
    const latRad = latitude * Math.PI / 180;
    return parseFloat((1 / Math.cos(latRad)).toFixed(3));
  }
  return 1;
}

export function mapScales(): MapScale[] {
  return ["1:5000", "1:10000", "1:25000", "1:50000", "1:100000", "1:250000"];
}

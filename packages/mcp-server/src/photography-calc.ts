export type ApertureStop = 1.4 | 2 | 2.8 | 4 | 5.6 | 8 | 11 | 16 | 22;

export interface ExposureTriangle {
  aperture: number;
  shutterSpeed: number;
  iso: number;
  ev: number;
}

export function exposureValue(aperture: number, shutterSpeed: number): number {
  return parseFloat((Math.log2(aperture ** 2 / shutterSpeed)).toFixed(1));
}

export function evFromIso(aperture: number, shutterSpeed: number, iso: number): number {
  const ev100 = exposureValue(aperture, shutterSpeed);
  return parseFloat((ev100 + Math.log2(iso / 100)).toFixed(1));
}

export function equivalentExposure(
  currentAperture: number,
  currentShutter: number,
  currentIso: number,
  newAperture: number,
  newIso: number,
): number {
  const ev = currentAperture ** 2 / currentShutter * (100 / currentIso);
  const newShutter = newAperture ** 2 / (ev * (newIso / 100));
  return parseFloat(newShutter.toFixed(4));
}

export function depthOfField(
  focalLength: number,
  aperture: number,
  subjectDistance: number,
  circleOfConfusion: number = 0.03,
): { near: number; far: number; total: number } {
  const h = (focalLength ** 2) / (aperture * circleOfConfusion) + focalLength;
  const near = (subjectDistance * (h - focalLength)) / (h + subjectDistance - 2 * focalLength);
  const far = (subjectDistance * (h - focalLength)) / (h - subjectDistance);
  const n = parseFloat(Math.max(0, near).toFixed(1));
  const f = far > 0 ? parseFloat(far.toFixed(1)) : Infinity;
  return { near: n, far: f, total: parseFloat((f === Infinity ? Infinity : f - n).toFixed(1)) };
}

export function hyperfocalDistance(focalLength: number, aperture: number, circleOfConfusion: number = 0.03): number {
  return parseFloat(((focalLength ** 2) / (aperture * circleOfConfusion) + focalLength).toFixed(1));
}

export function fieldOfView(focalLength: number, sensorWidth: number): number {
  return parseFloat((2 * Math.atan(sensorWidth / (2 * focalLength)) * 180 / Math.PI).toFixed(1));
}

export function cropFactor(sensorDiagonal: number): number {
  return parseFloat((43.27 / sensorDiagonal).toFixed(2));
}

export function equivalentFocalLength(focalLength: number, cropFact: number): number {
  return parseFloat((focalLength * cropFact).toFixed(1));
}

export function sunriseGoldenHour(sunriseHour: number): { start: number; end: number } {
  return { start: sunriseHour, end: parseFloat((sunriseHour + 1).toFixed(1)) };
}

export function sunsetGoldenHour(sunsetHour: number): { start: number; end: number } {
  return { start: parseFloat((sunsetHour - 1).toFixed(1)), end: sunsetHour };
}

export function flashGuideNumber(power: number, iso: number): number {
  return parseFloat((power * Math.sqrt(iso / 100)).toFixed(1));
}

export function flashRange(guideNumber: number, aperture: number): number {
  return parseFloat((guideNumber / aperture).toFixed(1));
}

export function megapixelsFromResolution(width: number, height: number): number {
  return parseFloat((width * height / 1e6).toFixed(1));
}

export function printSize(megapixels: number, dpi: number): { widthInch: number; heightInch: number } {
  const pixels = Math.sqrt(megapixels * 1e6 * (3 / 2));
  const w = pixels / dpi;
  const h = (pixels / 1.5) / dpi;
  return {
    widthInch: parseFloat(w.toFixed(1)),
    heightInch: parseFloat(h.toFixed(1)),
  };
}

export function fileSize(megapixels: number, bitDepth: number, compression: number = 1): number {
  const bytes = megapixels * 1e6 * 3 * (bitDepth / 8) / compression;
  return parseFloat((bytes / (1024 * 1024)).toFixed(1));
}

export function ndFilterStops(filterFactor: number): number {
  return parseFloat(Math.log2(filterFactor).toFixed(1));
}

export function shutterWithND(baseShutter: number, ndStops: number): number {
  return parseFloat((baseShutter * Math.pow(2, ndStops)).toFixed(4));
}

export function ruleOfThirds(width: number, height: number): { x: number[]; y: number[] } {
  return {
    x: [Math.round(width / 3), Math.round(2 * width / 3)],
    y: [Math.round(height / 3), Math.round(2 * height / 3)],
  };
}

export function aspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const d = gcd(width, height);
  return `${width / d}:${height / d}`;
}

export const COMMON_SENSORS: Record<string, { width: number; height: number }> = {
  "full_frame": { width: 36, height: 24 },
  "aps_c_canon": { width: 22.3, height: 14.9 },
  "aps_c_nikon": { width: 23.5, height: 15.7 },
  "micro_four_thirds": { width: 17.3, height: 13 },
  "medium_format": { width: 43.8, height: 32.9 },
  "one_inch": { width: 13.2, height: 8.8 },
};

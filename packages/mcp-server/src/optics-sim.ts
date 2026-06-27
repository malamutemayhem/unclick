export interface Ray {
  x: number;
  y: number;
  angle: number;
}

export interface LensElement {
  type: "converging" | "diverging" | "mirror" | "flat-mirror";
  position: number;
  focalLength: number;
}

export interface ImageResult {
  position: number;
  magnification: number;
  inverted: boolean;
  real: boolean;
}

export function snellsLaw(n1: number, n2: number, thetaIncident: number): number | null {
  const sinRefracted = (n1 / n2) * Math.sin(thetaIncident);
  if (Math.abs(sinRefracted) > 1) return null;
  return Math.asin(sinRefracted);
}

export function criticalAngle(n1: number, n2: number): number | null {
  if (n1 <= n2) return null;
  return Math.asin(n2 / n1);
}

export function thinLensImage(objectDistance: number, focalLength: number): ImageResult {
  const di = 1 / (1 / focalLength - 1 / objectDistance);
  const magnification = -di / objectDistance;

  return {
    position: di,
    magnification: Math.abs(magnification),
    inverted: magnification < 0,
    real: di > 0,
  };
}

export function mirrorImage(objectDistance: number, focalLength: number): ImageResult {
  const di = 1 / (1 / focalLength - 1 / objectDistance);
  const magnification = -di / objectDistance;

  return {
    position: di,
    magnification: Math.abs(magnification),
    inverted: magnification < 0,
    real: di > 0,
  };
}

export function lensmakerEquation(n: number, r1: number, r2: number): number {
  return 1 / ((n - 1) * (1 / r1 - 1 / r2));
}

export function fresnelReflectance(n1: number, n2: number, theta: number): number {
  const cosI = Math.cos(theta);
  const sinT2 = (n1 / n2) ** 2 * (1 - cosI * cosI);
  if (sinT2 > 1) return 1;
  const cosT = Math.sqrt(1 - sinT2);

  const rs = ((n1 * cosI - n2 * cosT) / (n1 * cosI + n2 * cosT)) ** 2;
  const rp = ((n1 * cosT - n2 * cosI) / (n1 * cosT + n2 * cosI)) ** 2;

  return (rs + rp) / 2;
}

export function brewsterAngle(n1: number, n2: number): number {
  return Math.atan(n2 / n1);
}

export function wavelengthToRGB(wavelength: number): { r: number; g: number; b: number } {
  let r = 0, g = 0, b = 0;

  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / 60;
    b = 1;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / 50;
    b = 1;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1;
    b = -(wavelength - 510) / 20;
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / 70;
    g = 1;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1;
    g = -(wavelength - 645) / 65;
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function prismDispersion(n: number, angle: number, wavelength: number): number {
  const cauchyB = 0.00420;
  const nEffective = n + cauchyB / (wavelength / 1000) ** 2;
  return 2 * Math.asin(nEffective * Math.sin(angle / 2)) - angle;
}

export function diffractionMaxima(slitSpacing: number, wavelength: number, maxOrder: number): number[] {
  const angles: number[] = [];
  for (let m = -maxOrder; m <= maxOrder; m++) {
    const sinTheta = (m * wavelength) / slitSpacing;
    if (Math.abs(sinTheta) <= 1) {
      angles.push(Math.asin(sinTheta));
    }
  }
  return angles;
}

export function opticalPower(focalLength: number): number {
  return 1 / focalLength;
}

export function combinedFocalLength(f1: number, f2: number, separation = 0): number {
  return 1 / (1 / f1 + 1 / f2 - separation / (f1 * f2));
}

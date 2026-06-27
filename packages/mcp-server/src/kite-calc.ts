export type KiteShape = "diamond" | "delta" | "box" | "parafoil" | "sled" | "rokkaku";
export type WindCategory = "light" | "moderate" | "strong" | "very_strong";

export function kiteArea(shape: KiteShape, spanCm: number, heightCm: number): number {
  const factors: Record<KiteShape, number> = {
    diamond: 0.5, delta: 0.5, box: 0.8, parafoil: 0.9, sled: 0.6, rokkaku: 0.7,
  };
  return parseFloat((spanCm * heightCm * factors[shape] / 10000).toFixed(2));
}

export function liftForce(areaM2: number, windSpeedMs: number): number {
  const cl = 0.8;
  const rho = 1.225;
  return parseFloat((0.5 * rho * windSpeedMs ** 2 * areaM2 * cl).toFixed(2));
}

export function dragForce(areaM2: number, windSpeedMs: number): number {
  const cd = 0.3;
  const rho = 1.225;
  return parseFloat((0.5 * rho * windSpeedMs ** 2 * areaM2 * cd).toFixed(2));
}

export function lineLength(altitude: number, lineAngleDeg: number): number {
  const rad = lineAngleDeg * Math.PI / 180;
  return parseFloat((altitude / Math.sin(rad)).toFixed(1));
}

export function lineStrength(liftN: number, safetyFactor: number = 3): number {
  return parseFloat((liftN * safetyFactor).toFixed(1));
}

export function windCategory(speedKmh: number): WindCategory {
  if (speedKmh < 12) return "light";
  if (speedKmh < 25) return "moderate";
  if (speedKmh < 40) return "strong";
  return "very_strong";
}

export function beaufortScale(speedKmh: number): number {
  if (speedKmh < 1) return 0;
  if (speedKmh < 6) return 1;
  if (speedKmh < 12) return 2;
  if (speedKmh < 20) return 3;
  if (speedKmh < 29) return 4;
  if (speedKmh < 39) return 5;
  if (speedKmh < 50) return 6;
  if (speedKmh < 62) return 7;
  if (speedKmh < 75) return 8;
  if (speedKmh < 89) return 9;
  if (speedKmh < 103) return 10;
  if (speedKmh < 118) return 11;
  return 12;
}

export function recommendedSize(windSpeedKmh: number): string {
  if (windSpeedKmh < 12) return "large (> 2 m2)";
  if (windSpeedKmh < 25) return "medium (1-2 m2)";
  if (windSpeedKmh < 40) return "small (0.5-1 m2)";
  return "micro (< 0.5 m2)";
}

export function tailLength(kiteHeightCm: number, shape: KiteShape): number {
  const multipliers: Record<KiteShape, number> = {
    diamond: 7, delta: 3, box: 0, parafoil: 0, sled: 5, rokkaku: 4,
  };
  return kiteHeightCm * multipliers[shape];
}

export function bridleAngle(shape: KiteShape): number {
  const angles: Record<KiteShape, number> = {
    diamond: 30, delta: 25, box: 45, parafoil: 0, sled: 35, rokkaku: 28,
  };
  return angles[shape];
}

export function fabricAmount(areaM2: number, panels: number): number {
  const seam = 0.02;
  return parseFloat((areaM2 * (1 + seam * panels)).toFixed(2));
}

export function sparWeight(lengthCm: number, diameterMm: number, material: "carbon" | "fiberglass"): number {
  const density = material === "carbon" ? 0.0016 : 0.0025;
  const radiusCm = diameterMm / 20;
  const volumeCm3 = Math.PI * radiusCm ** 2 * lengthCm;
  return parseFloat((volumeCm3 * density).toFixed(1));
}

export function maxAltitude(lineM: number, angleDeg: number): number {
  const rad = angleDeg * Math.PI / 180;
  return parseFloat((lineM * Math.sin(rad)).toFixed(1));
}

export function costEstimate(areaM2: number, material: "nylon" | "polyester" | "ripstop"): number {
  const pricePerM2: Record<string, number> = { nylon: 15, polyester: 12, ripstop: 20 };
  const frameBase = 25;
  return parseFloat((areaM2 * pricePerM2[material] + frameBase).toFixed(2));
}

export function kiteShapes(): KiteShape[] {
  return ["diamond", "delta", "box", "parafoil", "sled", "rokkaku"];
}

export type GearType = "ring" | "wheel" | "rack";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export function lobes(ringTeeth: number, wheelTeeth: number): number {
  if (wheelTeeth <= 0) return 0;
  const g = gcd(ringTeeth, wheelTeeth);
  return ringTeeth / g;
}

export function petals(ringTeeth: number, wheelTeeth: number): number {
  if (wheelTeeth <= 0) return 0;
  const g = gcd(ringTeeth, wheelTeeth);
  return wheelTeeth / g;
}

export function rotationsToClose(ringTeeth: number, wheelTeeth: number): number {
  if (wheelTeeth <= 0) return 0;
  const g = gcd(ringTeeth, wheelTeeth);
  return wheelTeeth / g;
}

export function penHoleRatio(holeDistance: number, wheelRadius: number): number {
  if (wheelRadius <= 0) return 0;
  return parseFloat((holeDistance / wheelRadius).toFixed(3));
}

export function patternRadius(ringRadius: number, wheelRadius: number, holeDistance: number): number {
  return parseFloat(((ringRadius - wheelRadius) + holeDistance).toFixed(2));
}

export function innerRadius(ringRadius: number, wheelRadius: number, holeDistance: number): number {
  return parseFloat(Math.abs((ringRadius - wheelRadius) - holeDistance).toFixed(2));
}

export function lineLength(ringTeeth: number, wheelTeeth: number, wheelRadius: number, holeDistance: number): number {
  if (wheelTeeth <= 0) return 0;
  const k = wheelTeeth / ringTeeth;
  const rots = rotationsToClose(ringTeeth, wheelTeeth);
  const approx = 2 * Math.PI * wheelRadius * rots * (1 + holeDistance / wheelRadius);
  return parseFloat(approx.toFixed(1));
}

export function symmetryOrder(ringTeeth: number, wheelTeeth: number): number {
  if (wheelTeeth <= 0) return 0;
  return gcd(ringTeeth, wheelTeeth);
}

export function paperSize(ringDiameterMm: number): number {
  return ringDiameterMm + 20;
}

export function penColors(complexity: number): number {
  if (complexity <= 3) return 1;
  if (complexity <= 8) return 2;
  return 3;
}

export function drawingTime(ringTeeth: number, wheelTeeth: number): number {
  const rots = rotationsToClose(ringTeeth, wheelTeeth);
  return parseFloat((rots * 0.5).toFixed(1));
}

export function gearTypes(): GearType[] {
  return ["ring", "wheel", "rack"];
}

export type MirrorShape = "circular" | "square" | "rectangular";

export function mirrorArea(shape: MirrorShape, dim1: number, dim2: number): number {
  if (shape === "circular") {
    return parseFloat((Math.PI * (dim1 / 2) * (dim1 / 2)).toFixed(1));
  }
  if (shape === "square") {
    return parseFloat((dim1 * dim1).toFixed(1));
  }
  return parseFloat((dim1 * dim2).toFixed(1));
}

export function maxRangeKm(mirrorDiameterCm: number, visibility: number): number {
  return parseFloat((mirrorDiameterCm * 0.5 * visibility).toFixed(1));
}

export function flashDurationMs(wordsPerMin: number): number {
  if (wordsPerMin <= 0) return 0;
  return parseFloat(((60000 / wordsPerMin) / 5).toFixed(0));
}

export function sunAngle(latitude: number, hourAngle: number): number {
  const latRad = (latitude * Math.PI) / 180;
  const haRad = (hourAngle * Math.PI) / 180;
  const elev = Math.asin(Math.sin(latRad) * 0.9 + Math.cos(latRad) * Math.cos(haRad) * 0.4);
  return parseFloat(((elev * 180) / Math.PI).toFixed(1));
}

export function reflectedIntensity(solarW: number, reflectivity: number, areaCm2: number): number {
  return parseFloat((solarW * reflectivity * areaCm2 / 10000).toFixed(2));
}

export function morseTimingMs(unit: number): { dot: number; dash: number; gap: number; wordGap: number } {
  return {
    dot: unit,
    dash: unit * 3,
    gap: unit,
    wordGap: unit * 7,
  };
}

export function divergenceAngle(mirrorDiameterCm: number): number {
  return parseFloat((0.53 * (10 / mirrorDiameterCm)).toFixed(2));
}

export function spotDiameterM(rangeKm: number, divergenceDeg: number): number {
  const divergenceRad = (divergenceDeg * Math.PI) / 180;
  return parseFloat((rangeKm * 1000 * Math.tan(divergenceRad)).toFixed(1));
}

export function transmissionRate(wpm: number): number {
  return parseFloat((wpm * 5).toFixed(0));
}

export function sightingAccuracy(rangeKm: number, atmosphericClarity: number): number {
  if (rangeKm <= 0) return 100;
  return parseFloat((100 * atmosphericClarity / (1 + rangeKm * 0.05)).toFixed(1));
}

export function mirrorShapes(): MirrorShape[] {
  return ["circular", "square", "rectangular"];
}

export type PlaneType = "smoothing" | "jack" | "jointer" | "block" | "scrub";

export function soleLengthMm(plane: PlaneType): number {
  const lengths: Record<PlaneType, number> = {
    smoothing: 230, jack: 350, jointer: 560, block: 150, scrub: 250,
  };
  return lengths[plane];
}

export function bladeWidthMm(plane: PlaneType): number {
  const widths: Record<PlaneType, number> = {
    smoothing: 50, jack: 50, jointer: 60, block: 40, scrub: 45,
  };
  return widths[plane];
}

export function bedAngleDeg(plane: PlaneType): number {
  const angles: Record<PlaneType, number> = {
    smoothing: 45, jack: 45, jointer: 45, block: 20, scrub: 45,
  };
  return angles[plane];
}

export function mouthOpeningMm(plane: PlaneType): number {
  const openings: Record<PlaneType, number> = {
    smoothing: 0.3, jack: 0.5, jointer: 0.3, block: 0.4, scrub: 1.5,
  };
  return openings[plane];
}

export function shavingThicknessMm(plane: PlaneType): number {
  const thickness: Record<PlaneType, number> = {
    smoothing: 0.03, jack: 0.1, jointer: 0.05, block: 0.08, scrub: 0.5,
  };
  return thickness[plane];
}

export function sharpeningAngleDeg(plane: PlaneType): number {
  const angles: Record<PlaneType, number> = {
    smoothing: 25, jack: 25, jointer: 25, block: 25, scrub: 30,
  };
  return angles[plane];
}

export function weightKg(plane: PlaneType): number {
  const weights: Record<PlaneType, number> = {
    smoothing: 1.8, jack: 2.2, jointer: 3.2, block: 0.8, scrub: 1.5,
  };
  return weights[plane];
}

export function sharpeningIntervalMinutes(plane: PlaneType): number {
  const intervals: Record<PlaneType, number> = {
    smoothing: 45, jack: 30, jointer: 40, block: 50, scrub: 20,
  };
  return intervals[plane];
}

export function costEstimate(plane: PlaneType): number {
  const costs: Record<PlaneType, number> = {
    smoothing: 300, jack: 250, jointer: 400, block: 150, scrub: 100,
  };
  return costs[plane];
}

export function planeTypes(): PlaneType[] {
  return ["smoothing", "jack", "jointer", "block", "scrub"];
}

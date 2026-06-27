export type WallStyle = "random_rubble" | "coursed_rubble" | "galloway" | "herringbone" | "chequer";

export function wallWidthCm(heightM: number): number {
  return Math.round(heightM * 30 + 40);
}

export function batterAngleDeg(wallStyle: WallStyle): number {
  const angles: Record<WallStyle, number> = {
    random_rubble: 10, coursed_rubble: 8, galloway: 12, herringbone: 8, chequer: 6,
  };
  return angles[wallStyle];
}

export function throughStonesPerM(heightM: number): number {
  return Math.max(1, Math.round(heightM * 2));
}

export function copingStonesPerM(): number {
  return 5;
}

export function tonnesPerMLength(heightM: number, widthCm: number): number {
  return parseFloat((heightM * (widthCm / 100) * 2.5).toFixed(1));
}

export function buildTimeHoursPerM(wallStyle: WallStyle): number {
  const hours: Record<WallStyle, number> = {
    random_rubble: 4, coursed_rubble: 6, galloway: 8, herringbone: 10, chequer: 12,
  };
  return hours[wallStyle];
}

export function stabilityRating(wallStyle: WallStyle): number {
  const ratings: Record<WallStyle, number> = {
    random_rubble: 3, coursed_rubble: 4, galloway: 3, herringbone: 4, chequer: 5,
  };
  return ratings[wallStyle];
}

export function maxHeightM(wallStyle: WallStyle): number {
  const heights: Record<WallStyle, number> = {
    random_rubble: 1.2, coursed_rubble: 1.8, galloway: 1.0, herringbone: 1.5, chequer: 2.0,
  };
  return heights[wallStyle];
}

export function costPerMeterLength(wallStyle: WallStyle): number {
  const costs: Record<WallStyle, number> = {
    random_rubble: 80, coursed_rubble: 120, galloway: 100, herringbone: 150, chequer: 180,
  };
  return costs[wallStyle];
}

export function wallStyles(): WallStyle[] {
  return ["random_rubble", "coursed_rubble", "galloway", "herringbone", "chequer"];
}

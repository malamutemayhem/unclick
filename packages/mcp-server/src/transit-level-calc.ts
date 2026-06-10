export type TransitType = "dumpy" | "tilting" | "automatic" | "digital" | "laser_rotary";

export function magnification(type: TransitType): number {
  const mag: Record<TransitType, number> = {
    dumpy: 20, tilting: 24, automatic: 28, digital: 30, laser_rotary: 0,
  };
  return mag[type];
}

export function accuracyMmPerKm(type: TransitType): number {
  const acc: Record<TransitType, number> = {
    dumpy: 5, tilting: 3, automatic: 1.5, digital: 0.5, laser_rotary: 2,
  };
  return acc[type];
}

export function selfLeveling(type: TransitType): boolean {
  return type === "automatic" || type === "digital" || type === "laser_rotary";
}

export function maxRangeMeters(type: TransitType): number {
  const range: Record<TransitType, number> = {
    dumpy: 100, tilting: 150, automatic: 200, digital: 300, laser_rotary: 500,
  };
  return range[type];
}

export function setupTimeMinutes(type: TransitType): number {
  const time: Record<TransitType, number> = {
    dumpy: 10, tilting: 8, automatic: 5, digital: 3, laser_rotary: 2,
  };
  return time[type];
}

export function weatherResistance(type: TransitType): number {
  const wr: Record<TransitType, number> = {
    dumpy: 9, tilting: 8, automatic: 7, digital: 5, laser_rotary: 4,
  };
  return wr[type];
}

export function batteryRequired(type: TransitType): boolean {
  return type === "digital" || type === "laser_rotary";
}

export function weightKg(type: TransitType): number {
  const w: Record<TransitType, number> = {
    dumpy: 5.5, tilting: 4.8, automatic: 3.2, digital: 2.8, laser_rotary: 3.5,
  };
  return w[type];
}

export function costEstimate(type: TransitType): number {
  const c: Record<TransitType, number> = {
    dumpy: 200, tilting: 350, automatic: 600, digital: 1500, laser_rotary: 800,
  };
  return c[type];
}

export function transitTypes(): TransitType[] {
  return ["dumpy", "tilting", "automatic", "digital", "laser_rotary"];
}

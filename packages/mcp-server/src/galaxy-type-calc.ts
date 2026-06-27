export type GalaxyType = "spiral" | "elliptical" | "lenticular" | "irregular" | "barred_spiral";

export function starCountBillions(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 200, elliptical: 1000, lenticular: 300, irregular: 10, barred_spiral: 150,
  };
  return m[galaxy];
}

export function diameterKpc(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 30, elliptical: 100, lenticular: 25, irregular: 5, barred_spiral: 28,
  };
  return m[galaxy];
}

export function starFormationRate(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 8, elliptical: 1, lenticular: 3, irregular: 9, barred_spiral: 7,
  };
  return m[galaxy];
}

export function darkMatterFraction(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 7, elliptical: 9, lenticular: 8, irregular: 6, barred_spiral: 7,
  };
  return m[galaxy];
}

export function rotationSpeed(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 8, elliptical: 3, lenticular: 6, irregular: 4, barred_spiral: 7,
  };
  return m[galaxy];
}

export function hasSpiral(galaxy: GalaxyType): boolean {
  const m: Record<GalaxyType, boolean> = {
    spiral: true, elliptical: false, lenticular: false, irregular: false, barred_spiral: true,
  };
  return m[galaxy];
}

export function hasCentralBar(galaxy: GalaxyType): boolean {
  const m: Record<GalaxyType, boolean> = {
    spiral: false, elliptical: false, lenticular: false, irregular: false, barred_spiral: true,
  };
  return m[galaxy];
}

export function exampleGalaxy(galaxy: GalaxyType): string {
  const m: Record<GalaxyType, string> = {
    spiral: "milky_way", elliptical: "m87", lenticular: "ngc_3115",
    irregular: "large_magellanic_cloud", barred_spiral: "ngc_1300",
  };
  return m[galaxy];
}

export function abundancePercent(galaxy: GalaxyType): number {
  const m: Record<GalaxyType, number> = {
    spiral: 60, elliptical: 15, lenticular: 15, irregular: 5, barred_spiral: 5,
  };
  return m[galaxy];
}

export function galaxyTypes(): GalaxyType[] {
  return ["spiral", "elliptical", "lenticular", "irregular", "barred_spiral"];
}

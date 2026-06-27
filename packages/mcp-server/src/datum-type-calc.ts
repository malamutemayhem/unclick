export type DatumType = "wgs84" | "nad83" | "nad27" | "etrs89" | "gda2020";

export function globalAdoption(d: DatumType): number {
  const m: Record<DatumType, number> = {
    wgs84: 10, nad83: 6, nad27: 2, etrs89: 5, gda2020: 3,
  };
  return m[d];
}

export function accuracy(d: DatumType): number {
  const m: Record<DatumType, number> = {
    wgs84: 8, nad83: 9, nad27: 4, etrs89: 9, gda2020: 10,
  };
  return m[d];
}

export function tectonicAwareness(d: DatumType): number {
  const m: Record<DatumType, number> = {
    wgs84: 7, nad83: 6, nad27: 1, etrs89: 8, gda2020: 10,
  };
  return m[d];
}

export function gpsNative(d: DatumType): number {
  const m: Record<DatumType, number> = {
    wgs84: 10, nad83: 8, nad27: 2, etrs89: 7, gda2020: 6,
  };
  return m[d];
}

export function legacyUsage(d: DatumType): number {
  const m: Record<DatumType, number> = {
    wgs84: 3, nad83: 5, nad27: 10, etrs89: 2, gda2020: 1,
  };
  return m[d];
}

export function isGeocentric(d: DatumType): boolean {
  const m: Record<DatumType, boolean> = {
    wgs84: true, nad83: true, nad27: false, etrs89: true, gda2020: true,
  };
  return m[d];
}

export function isCurrentStandard(d: DatumType): boolean {
  const m: Record<DatumType, boolean> = {
    wgs84: true, nad83: true, nad27: false, etrs89: true, gda2020: true,
  };
  return m[d];
}

export function coverageRegion(d: DatumType): string {
  const m: Record<DatumType, string> = {
    wgs84: "worldwide", nad83: "north_america",
    nad27: "north_america_legacy", etrs89: "europe",
    gda2020: "australia",
  };
  return m[d];
}

export function ellipsoid(d: DatumType): string {
  const m: Record<DatumType, string> = {
    wgs84: "wgs84_ellipsoid", nad83: "grs80",
    nad27: "clarke_1866", etrs89: "grs80",
    gda2020: "grs80",
  };
  return m[d];
}

export function datumTypes(): DatumType[] {
  return ["wgs84", "nad83", "nad27", "etrs89", "gda2020"];
}

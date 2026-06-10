export type PortolanEra = "early_13c" | "late_13c" | "14c_peak" | "15c_expansion" | "16c_decline";

export function coastlineAccuracyKm(era: PortolanEra): number {
  const a: Record<PortolanEra, number> = {
    early_13c: 50, late_13c: 30, "14c_peak": 10, "15c_expansion": 15, "16c_decline": 20,
  };
  return a[era];
}

export function rhumbLineCount(era: PortolanEra): number {
  const r: Record<PortolanEra, number> = {
    early_13c: 8, late_13c: 16, "14c_peak": 32, "15c_expansion": 32, "16c_decline": 16,
  };
  return r[era];
}

export function portsCatalogued(era: PortolanEra): number {
  const p: Record<PortolanEra, number> = {
    early_13c: 100, late_13c: 300, "14c_peak": 600, "15c_expansion": 800, "16c_decline": 500,
  };
  return p[era];
}

export function vellumSizeCm2(era: PortolanEra): number {
  const s: Record<PortolanEra, number> = {
    early_13c: 3000, late_13c: 5000, "14c_peak": 8000, "15c_expansion": 10000, "16c_decline": 6000,
  };
  return s[era];
}

export function colorPigmentsUsed(era: PortolanEra): number {
  const c: Record<PortolanEra, number> = {
    early_13c: 3, late_13c: 5, "14c_peak": 8, "15c_expansion": 10, "16c_decline": 6,
  };
  return c[era];
}

export function compassRoseIncluded(era: PortolanEra): boolean {
  return era !== "early_13c";
}

export function productionWeeks(era: PortolanEra): number {
  const w: Record<PortolanEra, number> = {
    early_13c: 4, late_13c: 8, "14c_peak": 16, "15c_expansion": 12, "16c_decline": 6,
  };
  return w[era];
}

export function seaCoverageRegions(era: PortolanEra): number {
  const r: Record<PortolanEra, number> = {
    early_13c: 1, late_13c: 2, "14c_peak": 3, "15c_expansion": 5, "16c_decline": 3,
  };
  return r[era];
}

export function estimatedSurvivingCount(era: PortolanEra): number {
  const c: Record<PortolanEra, number> = {
    early_13c: 5, late_13c: 20, "14c_peak": 80, "15c_expansion": 150, "16c_decline": 60,
  };
  return c[era];
}

export function portolanEras(): PortolanEra[] {
  return ["early_13c", "late_13c", "14c_peak", "15c_expansion", "16c_decline"];
}

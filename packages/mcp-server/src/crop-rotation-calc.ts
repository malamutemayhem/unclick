export type CropGroup = "legumes" | "brassicas" | "solanaceae" | "alliums" | "cucurbits";

export function rotationYears(group: CropGroup): number {
  const r: Record<CropGroup, number> = {
    legumes: 3, brassicas: 4, solanaceae: 4, alliums: 2, cucurbits: 3,
  };
  return r[group];
}

export function nitrogenEffect(group: CropGroup): number {
  const n: Record<CropGroup, number> = {
    legumes: 10, brassicas: -5, solanaceae: -7, alliums: -2, cucurbits: -4,
  };
  return n[group];
}

export function soilStructureImpact(group: CropGroup): number {
  const s: Record<CropGroup, number> = {
    legumes: 8, brassicas: 5, solanaceae: 3, alliums: 6, cucurbits: 4,
  };
  return s[group];
}

export function pestBreakBenefit(group: CropGroup): number {
  const p: Record<CropGroup, number> = {
    legumes: 6, brassicas: 8, solanaceae: 9, alliums: 7, cucurbits: 7,
  };
  return p[group];
}

export function followsWell(group: CropGroup): string {
  const f: Record<CropGroup, string> = {
    legumes: "brassicas", brassicas: "alliums", solanaceae: "legumes",
    alliums: "cucurbits", cucurbits: "solanaceae",
  };
  return f[group];
}

export function heavyFeeder(group: CropGroup): boolean {
  const h: Record<CropGroup, boolean> = {
    legumes: false, brassicas: true, solanaceae: true, alliums: false, cucurbits: true,
  };
  return h[group];
}

export function diseaseRiskWithout(group: CropGroup): number {
  const d: Record<CropGroup, number> = {
    legumes: 4, brassicas: 8, solanaceae: 9, alliums: 5, cucurbits: 7,
  };
  return d[group];
}

export function yieldBoostPercent(group: CropGroup): number {
  const y: Record<CropGroup, number> = {
    legumes: 10, brassicas: 20, solanaceae: 25, alliums: 12, cucurbits: 18,
  };
  return y[group];
}

export function coverCropCompat(group: CropGroup): number {
  const c: Record<CropGroup, number> = {
    legumes: 9, brassicas: 6, solanaceae: 5, alliums: 7, cucurbits: 4,
  };
  return c[group];
}

export function cropGroups(): CropGroup[] {
  return ["legumes", "brassicas", "solanaceae", "alliums", "cucurbits"];
}

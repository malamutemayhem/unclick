export type SpearfishMethod = "polespear" | "hawaiian_sling" | "band_gun" | "pneumatic_gun" | "free_dive_knife";

export function rangeMeters(method: SpearfishMethod): number {
  const r: Record<SpearfishMethod, number> = {
    polespear: 2, hawaiian_sling: 3, band_gun: 5, pneumatic_gun: 4, free_dive_knife: 0.5,
  };
  return r[method];
}

export function accuracyRating(method: SpearfishMethod): number {
  const a: Record<SpearfishMethod, number> = {
    polespear: 5, hawaiian_sling: 6, band_gun: 9, pneumatic_gun: 8, free_dive_knife: 3,
  };
  return a[method];
}

export function powerRating(method: SpearfishMethod): number {
  const p: Record<SpearfishMethod, number> = {
    polespear: 4, hawaiian_sling: 5, band_gun: 8, pneumatic_gun: 9, free_dive_knife: 2,
  };
  return p[method];
}

export function reloadTimeSeconds(method: SpearfishMethod): number {
  const r: Record<SpearfishMethod, number> = {
    polespear: 3, hawaiian_sling: 5, band_gun: 15, pneumatic_gun: 8, free_dive_knife: 1,
  };
  return r[method];
}

export function depthRatingMeters(method: SpearfishMethod): number {
  const d: Record<SpearfishMethod, number> = {
    polespear: 20, hawaiian_sling: 15, band_gun: 30, pneumatic_gun: 25, free_dive_knife: 10,
  };
  return d[method];
}

export function silentOperation(method: SpearfishMethod): boolean {
  return method === "polespear" || method === "free_dive_knife";
}

export function maintenanceLevel(method: SpearfishMethod): number {
  const m: Record<SpearfishMethod, number> = {
    polespear: 2, hawaiian_sling: 3, band_gun: 6, pneumatic_gun: 8, free_dive_knife: 1,
  };
  return m[method];
}

export function beginnerFriendly(method: SpearfishMethod): boolean {
  return method === "polespear" || method === "hawaiian_sling";
}

export function costEstimate(method: SpearfishMethod): number {
  const c: Record<SpearfishMethod, number> = {
    polespear: 50, hawaiian_sling: 80, band_gun: 400, pneumatic_gun: 600, free_dive_knife: 30,
  };
  return c[method];
}

export function spearfishMethods(): SpearfishMethod[] {
  return ["polespear", "hawaiian_sling", "band_gun", "pneumatic_gun", "free_dive_knife"];
}

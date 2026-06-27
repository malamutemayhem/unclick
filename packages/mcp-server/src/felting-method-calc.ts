export type FeltingMethod = "wet_felting" | "needle_felting" | "nuno_felting" | "cobweb_felting" | "resist_felting";

export function shrinkagePercent(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 35, needle_felting: 5, nuno_felting: 25, cobweb_felting: 40, resist_felting: 30,
  };
  return m[method];
}

export function timeMinutes(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 60, needle_felting: 120, nuno_felting: 90, cobweb_felting: 45, resist_felting: 75,
  };
  return m[method];
}

export function densityResult(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 8, needle_felting: 6, nuno_felting: 5, cobweb_felting: 3, resist_felting: 7,
  };
  return m[method];
}

export function detailPrecision(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 4, needle_felting: 9, nuno_felting: 6, cobweb_felting: 3, resist_felting: 5,
  };
  return m[method];
}

export function waterRequired(method: FeltingMethod): boolean {
  const m: Record<FeltingMethod, boolean> = {
    wet_felting: true, needle_felting: false, nuno_felting: true, cobweb_felting: true, resist_felting: true,
  };
  return m[method];
}

export function sculptural(method: FeltingMethod): boolean {
  const m: Record<FeltingMethod, boolean> = {
    wet_felting: false, needle_felting: true, nuno_felting: false, cobweb_felting: false, resist_felting: true,
  };
  return m[method];
}

export function bestFiber(method: FeltingMethod): string {
  const m: Record<FeltingMethod, string> = {
    wet_felting: "merino", needle_felting: "corriedale", nuno_felting: "merino",
    cobweb_felting: "merino", resist_felting: "romney",
  };
  return m[method];
}

export function beginnerFriendly(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 8, needle_felting: 7, nuno_felting: 5, cobweb_felting: 4, resist_felting: 6,
  };
  return m[method];
}

export function costEstimate(method: FeltingMethod): number {
  const m: Record<FeltingMethod, number> = {
    wet_felting: 15, needle_felting: 25, nuno_felting: 30, cobweb_felting: 20, resist_felting: 22,
  };
  return m[method];
}

export function feltingMethods(): FeltingMethod[] {
  return ["wet_felting", "needle_felting", "nuno_felting", "cobweb_felting", "resist_felting"];
}

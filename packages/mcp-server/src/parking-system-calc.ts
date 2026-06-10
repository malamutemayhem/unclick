export type ParkingSystem = "surface_lot" | "multistory" | "automated" | "underground" | "street_metered";

export function capacityPerAcre(p: ParkingSystem): number {
  const m: Record<ParkingSystem, number> = {
    surface_lot: 3, multistory: 8, automated: 10, underground: 7, street_metered: 2,
  };
  return m[p];
}

export function constructionCost(p: ParkingSystem): number {
  const m: Record<ParkingSystem, number> = {
    surface_lot: 2, multistory: 7, automated: 10, underground: 9, street_metered: 1,
  };
  return m[p];
}

export function userConvenience(p: ParkingSystem): number {
  const m: Record<ParkingSystem, number> = {
    surface_lot: 8, multistory: 6, automated: 9, underground: 5, street_metered: 7,
  };
  return m[p];
}

export function retrievalTime(p: ParkingSystem): number {
  const m: Record<ParkingSystem, number> = {
    surface_lot: 2, multistory: 5, automated: 7, underground: 6, street_metered: 1,
  };
  return m[p];
}

export function securityLevel(p: ParkingSystem): number {
  const m: Record<ParkingSystem, number> = {
    surface_lot: 3, multistory: 6, automated: 10, underground: 8, street_metered: 2,
  };
  return m[p];
}

export function requiresAttendant(p: ParkingSystem): boolean {
  const m: Record<ParkingSystem, boolean> = {
    surface_lot: false, multistory: false, automated: false, underground: false, street_metered: false,
  };
  return m[p];
}

export function weatherProtected(p: ParkingSystem): boolean {
  const m: Record<ParkingSystem, boolean> = {
    surface_lot: false, multistory: true, automated: true, underground: true, street_metered: false,
  };
  return m[p];
}

export function revenueModel(p: ParkingSystem): string {
  const m: Record<ParkingSystem, string> = {
    surface_lot: "flat_rate_daily", multistory: "hourly_validated",
    automated: "per_use_subscription", underground: "monthly_lease",
    street_metered: "coin_app_meter",
  };
  return m[p];
}

export function bestLocation(p: ParkingSystem): string {
  const m: Record<ParkingSystem, string> = {
    surface_lot: "suburban_retail", multistory: "urban_commercial",
    automated: "dense_downtown", underground: "high_value_development",
    street_metered: "mixed_use_corridor",
  };
  return m[p];
}

export function parkingSystems(): ParkingSystem[] {
  return ["surface_lot", "multistory", "automated", "underground", "street_metered"];
}

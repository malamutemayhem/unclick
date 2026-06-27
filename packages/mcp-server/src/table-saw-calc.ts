export type TableSawType = "jobsite_portable" | "contractor_stand" | "cabinet_stationary" | "hybrid_mid" | "benchtop_mini";

export function cuttingCapacity(t: TableSawType): number {
  const m: Record<TableSawType, number> = {
    jobsite_portable: 5, contractor_stand: 7, cabinet_stationary: 10, hybrid_mid: 8, benchtop_mini: 3,
  };
  return m[t];
}

export function cutAccuracy(t: TableSawType): number {
  const m: Record<TableSawType, number> = {
    jobsite_portable: 5, contractor_stand: 7, cabinet_stationary: 10, hybrid_mid: 8, benchtop_mini: 4,
  };
  return m[t];
}

export function dustCollection(t: TableSawType): number {
  const m: Record<TableSawType, number> = {
    jobsite_portable: 3, contractor_stand: 5, cabinet_stationary: 10, hybrid_mid: 8, benchtop_mini: 2,
  };
  return m[t];
}

export function portabilityScore(t: TableSawType): number {
  const m: Record<TableSawType, number> = {
    jobsite_portable: 10, contractor_stand: 5, cabinet_stationary: 1, hybrid_mid: 3, benchtop_mini: 9,
  };
  return m[t];
}

export function sawCost(t: TableSawType): number {
  const m: Record<TableSawType, number> = {
    jobsite_portable: 4, contractor_stand: 6, cabinet_stationary: 10, hybrid_mid: 7, benchtop_mini: 2,
  };
  return m[t];
}

export function rivenKnife(t: TableSawType): boolean {
  const m: Record<TableSawType, boolean> = {
    jobsite_portable: true, contractor_stand: true, cabinet_stationary: true, hybrid_mid: true, benchtop_mini: false,
  };
  return m[t];
}

export function dadoCapble(t: TableSawType): boolean {
  const m: Record<TableSawType, boolean> = {
    jobsite_portable: false, contractor_stand: true, cabinet_stationary: true, hybrid_mid: true, benchtop_mini: false,
  };
  return m[t];
}

export function fenceType(t: TableSawType): string {
  const m: Record<TableSawType, string> = {
    jobsite_portable: "rack_pinion_compact", contractor_stand: "t_square_aluminum",
    cabinet_stationary: "biesemeyer_precision_rail", hybrid_mid: "t_square_locking",
    benchtop_mini: "stamped_steel_basic",
  };
  return m[t];
}

export function bestShop(t: TableSawType): string {
  const m: Record<TableSawType, string> = {
    jobsite_portable: "construction_site_framing", contractor_stand: "garage_workshop_general",
    cabinet_stationary: "dedicated_fine_woodworking", hybrid_mid: "home_shop_space_limited",
    benchtop_mini: "apartment_small_project",
  };
  return m[t];
}

export function tableSaws(): TableSawType[] {
  return ["jobsite_portable", "contractor_stand", "cabinet_stationary", "hybrid_mid", "benchtop_mini"];
}

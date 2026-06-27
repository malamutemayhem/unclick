export type RudderType = "spade" | "skeg_hung" | "full_keel" | "balanced" | "transom_hung";

export function turningResponse(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 10, skeg_hung: 6, full_keel: 3, balanced: 9, transom_hung: 7,
  };
  return m[r];
}

export function protectionLevel(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 2, skeg_hung: 8, full_keel: 10, balanced: 4, transom_hung: 5,
  };
  return m[r];
}

export function helmBalance(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 6, skeg_hung: 7, full_keel: 5, balanced: 10, transom_hung: 4,
  };
  return m[r];
}

export function structuralStrength(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 4, skeg_hung: 9, full_keel: 10, balanced: 5, transom_hung: 6,
  };
  return m[r];
}

export function maintenanceAccess(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 5, skeg_hung: 4, full_keel: 3, balanced: 6, transom_hung: 10,
  };
  return m[r];
}

export function freeStanding(r: RudderType): boolean {
  const m: Record<RudderType, boolean> = {
    spade: true, skeg_hung: false, full_keel: false, balanced: true, transom_hung: false,
  };
  return m[r];
}

export function bluewater(r: RudderType): boolean {
  const m: Record<RudderType, boolean> = {
    spade: false, skeg_hung: true, full_keel: true, balanced: false, transom_hung: false,
  };
  return m[r];
}

export function bestBoatType(r: RudderType): string {
  const m: Record<RudderType, string> = {
    spade: "racing_yacht", skeg_hung: "cruiser", full_keel: "bluewater_cruiser",
    balanced: "performance_cruiser", transom_hung: "dinghy",
  };
  return m[r];
}

export function dragCoefficient(r: RudderType): number {
  const m: Record<RudderType, number> = {
    spade: 3, skeg_hung: 5, full_keel: 8, balanced: 4, transom_hung: 6,
  };
  return m[r];
}

export function rudderTypes(): RudderType[] {
  return ["spade", "skeg_hung", "full_keel", "balanced", "transom_hung"];
}

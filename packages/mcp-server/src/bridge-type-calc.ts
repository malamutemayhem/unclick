export type BridgeType = "beam" | "arch" | "suspension" | "cable_stayed" | "truss";

export function maxSpanM(b: BridgeType): number {
  const m: Record<BridgeType, number> = {
    beam: 80, arch: 300, suspension: 2000, cable_stayed: 1100, truss: 150,
  };
  return m[b];
}

export function constructionCost(b: BridgeType): number {
  const m: Record<BridgeType, number> = {
    beam: 2, arch: 7, suspension: 10, cable_stayed: 8, truss: 4,
  };
  return m[b];
}

export function maintenanceEffort(b: BridgeType): number {
  const m: Record<BridgeType, number> = {
    beam: 3, arch: 4, suspension: 8, cable_stayed: 7, truss: 5,
  };
  return m[b];
}

export function aestheticScore(b: BridgeType): number {
  const m: Record<BridgeType, number> = {
    beam: 3, arch: 9, suspension: 10, cable_stayed: 8, truss: 5,
  };
  return m[b];
}

export function loadCapacity(b: BridgeType): number {
  const m: Record<BridgeType, number> = {
    beam: 6, arch: 9, suspension: 7, cable_stayed: 8, truss: 10,
  };
  return m[b];
}

export function requiresCables(b: BridgeType): boolean {
  const m: Record<BridgeType, boolean> = {
    beam: false, arch: false, suspension: true, cable_stayed: true, truss: false,
  };
  return m[b];
}

export function selfSupporting(b: BridgeType): boolean {
  const m: Record<BridgeType, boolean> = {
    beam: true, arch: true, suspension: false, cable_stayed: false, truss: true,
  };
  return m[b];
}

export function famousExample(b: BridgeType): string {
  const m: Record<BridgeType, string> = {
    beam: "lake_pontchartrain", arch: "sydney_harbour",
    suspension: "golden_gate", cable_stayed: "millau_viaduct",
    truss: "quebec_bridge",
  };
  return m[b];
}

export function primaryMaterial(b: BridgeType): string {
  const m: Record<BridgeType, string> = {
    beam: "prestressed_concrete", arch: "stone_or_concrete",
    suspension: "steel_cables", cable_stayed: "steel_concrete_hybrid",
    truss: "structural_steel",
  };
  return m[b];
}

export function bridgeTypes(): BridgeType[] {
  return ["beam", "arch", "suspension", "cable_stayed", "truss"];
}

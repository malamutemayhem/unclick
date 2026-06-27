export type ColumnOrder = "doric" | "ionic" | "corinthian" | "tuscan" | "composite";

export function heightDiameterRatio(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 6, ionic: 8, corinthian: 10, tuscan: 7, composite: 10,
  };
  return m[order];
}

export function decorativeComplexity(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 2, ionic: 5, corinthian: 9, tuscan: 1, composite: 10,
  };
  return m[order];
}

export function loadBearing(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 9, ionic: 7, corinthian: 6, tuscan: 8, composite: 6,
  };
  return m[order];
}

export function capitalHeight(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 3, ionic: 5, corinthian: 8, tuscan: 2, composite: 9,
  };
  return m[order];
}

export function flutingCount(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 20, ionic: 24, corinthian: 24, tuscan: 0, composite: 24,
  };
  return m[order];
}

export function hasBase(order: ColumnOrder): boolean {
  const m: Record<ColumnOrder, boolean> = {
    doric: false, ionic: true, corinthian: true, tuscan: true, composite: true,
  };
  return m[order];
}

export function hasVolutes(order: ColumnOrder): boolean {
  const m: Record<ColumnOrder, boolean> = {
    doric: false, ionic: true, corinthian: false, tuscan: false, composite: true,
  };
  return m[order];
}

export function bestBuilding(order: ColumnOrder): string {
  const m: Record<ColumnOrder, string> = {
    doric: "temple", ionic: "library", corinthian: "palace",
    tuscan: "military", composite: "triumphal_arch",
  };
  return m[order];
}

export function carvingCost(order: ColumnOrder): number {
  const m: Record<ColumnOrder, number> = {
    doric: 500, ionic: 1000, corinthian: 2500, tuscan: 300, composite: 3000,
  };
  return m[order];
}

export function columnOrders(): ColumnOrder[] {
  return ["doric", "ionic", "corinthian", "tuscan", "composite"];
}

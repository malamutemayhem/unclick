export type FiberOpticConnector = "sc" | "lc" | "st" | "mpo" | "fc";

export function insertionLoss(c: FiberOpticConnector): number {
  const m: Record<FiberOpticConnector, number> = {
    sc: 3, lc: 2, st: 4, mpo: 5, fc: 3,
  };
  return m[c];
}

export function densityScore(c: FiberOpticConnector): number {
  const m: Record<FiberOpticConnector, number> = {
    sc: 5, lc: 10, st: 3, mpo: 9, fc: 4,
  };
  return m[c];
}

export function durabilityRating(c: FiberOpticConnector): number {
  const m: Record<FiberOpticConnector, number> = {
    sc: 8, lc: 7, st: 6, mpo: 5, fc: 9,
  };
  return m[c];
}

export function installEase(c: FiberOpticConnector): number {
  const m: Record<FiberOpticConnector, number> = {
    sc: 9, lc: 7, st: 6, mpo: 4, fc: 5,
  };
  return m[c];
}

export function costPerUnit(c: FiberOpticConnector): number {
  const m: Record<FiberOpticConnector, number> = {
    sc: 4, lc: 5, st: 3, mpo: 9, fc: 6,
  };
  return m[c];
}

export function pushPull(c: FiberOpticConnector): boolean {
  const m: Record<FiberOpticConnector, boolean> = {
    sc: true, lc: true, st: false, mpo: true, fc: false,
  };
  return m[c];
}

export function multipleFilaments(c: FiberOpticConnector): boolean {
  const m: Record<FiberOpticConnector, boolean> = {
    sc: false, lc: false, st: false, mpo: true, fc: false,
  };
  return m[c];
}

export function ferruleMaterial(c: FiberOpticConnector): string {
  const m: Record<FiberOpticConnector, string> = {
    sc: "ceramic_zirconia", lc: "ceramic_zirconia",
    st: "ceramic_bayonet", mpo: "mt_ferrule_array",
    fc: "ceramic_threaded",
  };
  return m[c];
}

export function primaryApplication(c: FiberOpticConnector): string {
  const m: Record<FiberOpticConnector, string> = {
    sc: "ftth_passive_optical", lc: "data_center_sfp",
    st: "legacy_multimode", mpo: "high_density_backbone",
    fc: "precision_test_equipment",
  };
  return m[c];
}

export function fiberOpticConnectors(): FiberOpticConnector[] {
  return ["sc", "lc", "st", "mpo", "fc"];
}

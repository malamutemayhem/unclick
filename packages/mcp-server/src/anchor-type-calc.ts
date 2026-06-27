export type AnchorType = "fluke" | "plow" | "mushroom" | "grapnel" | "bruce";

export function holdingPower(anchor: AnchorType): number {
  const m: Record<AnchorType, number> = {
    fluke: 7, plow: 9, mushroom: 6, grapnel: 4, bruce: 8,
  };
  return m[anchor];
}

export function setReliability(anchor: AnchorType): number {
  const m: Record<AnchorType, number> = {
    fluke: 6, plow: 9, mushroom: 5, grapnel: 3, bruce: 8,
  };
  return m[anchor];
}

export function weightKg(anchor: AnchorType): number {
  const m: Record<AnchorType, number> = {
    fluke: 8, plow: 15, mushroom: 20, grapnel: 5, bruce: 12,
  };
  return m[anchor];
}

export function storageEase(anchor: AnchorType): number {
  const m: Record<AnchorType, number> = {
    fluke: 9, plow: 4, mushroom: 3, grapnel: 7, bruce: 5,
  };
  return m[anchor];
}

export function bottomSuitability(anchor: AnchorType): string {
  const m: Record<AnchorType, string> = {
    fluke: "sand_mud", plow: "mixed", mushroom: "soft_mud",
    grapnel: "rocky", bruce: "varied",
  };
  return m[anchor];
}

export function resetCapable(anchor: AnchorType): boolean {
  const m: Record<AnchorType, boolean> = {
    fluke: false, plow: true, mushroom: false, grapnel: true, bruce: true,
  };
  return m[anchor];
}

export function foldable(anchor: AnchorType): boolean {
  const m: Record<AnchorType, boolean> = {
    fluke: true, plow: false, mushroom: false, grapnel: true, bruce: false,
  };
  return m[anchor];
}

export function bestBoatSize(anchor: AnchorType): string {
  const m: Record<AnchorType, string> = {
    fluke: "small_boat", plow: "cruiser", mushroom: "mooring",
    grapnel: "dinghy", bruce: "mid_range",
  };
  return m[anchor];
}

export function costEstimate(anchor: AnchorType): number {
  const m: Record<AnchorType, number> = {
    fluke: 50, plow: 200, mushroom: 80, grapnel: 30, bruce: 150,
  };
  return m[anchor];
}

export function anchorTypes(): AnchorType[] {
  return ["fluke", "plow", "mushroom", "grapnel", "bruce"];
}

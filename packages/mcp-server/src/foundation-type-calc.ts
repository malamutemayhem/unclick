export type FoundationType = "strip" | "pad" | "raft" | "pile" | "caisson";

export function depthMeters(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 1, pad: 1.5, raft: 0.5, pile: 20, caisson: 30,
  };
  return m[found];
}

export function loadCapacityKn(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 200, pad: 500, raft: 800, pile: 2000, caisson: 5000,
  };
  return m[found];
}

export function soilTolerance(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 4, pad: 5, raft: 8, pile: 9, caisson: 10,
  };
  return m[found];
}

export function settlementControl(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 4, pad: 5, raft: 9, pile: 8, caisson: 9,
  };
  return m[found];
}

export function excavationVolume(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 3, pad: 4, raft: 7, pile: 2, caisson: 5,
  };
  return m[found];
}

export function waterTableSafe(found: FoundationType): boolean {
  const m: Record<FoundationType, boolean> = {
    strip: false, pad: false, raft: true, pile: true, caisson: true,
  };
  return m[found];
}

export function heavyEquipmentNeeded(found: FoundationType): boolean {
  const m: Record<FoundationType, boolean> = {
    strip: false, pad: false, raft: false, pile: true, caisson: true,
  };
  return m[found];
}

export function bestStructure(found: FoundationType): string {
  const m: Record<FoundationType, string> = {
    strip: "house_wall", pad: "column_footing", raft: "soft_soil_building",
    pile: "skyscraper", caisson: "bridge_pier",
  };
  return m[found];
}

export function costPerUnit(found: FoundationType): number {
  const m: Record<FoundationType, number> = {
    strip: 100, pad: 300, raft: 150, pile: 2000, caisson: 5000,
  };
  return m[found];
}

export function foundationTypes(): FoundationType[] {
  return ["strip", "pad", "raft", "pile", "caisson"];
}

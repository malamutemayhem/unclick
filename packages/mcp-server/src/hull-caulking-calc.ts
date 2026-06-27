export type HullCaulking = "oakum" | "cotton" | "marine_sealant" | "pitch_tar" | "epoxy_fill";

export function waterproofRating(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 7, cotton: 5, marine_sealant: 9, pitch_tar: 8, epoxy_fill: 10,
  };
  return m[caulking];
}

export function flexibilityRating(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 7, cotton: 8, marine_sealant: 9, pitch_tar: 4, epoxy_fill: 2,
  };
  return m[caulking];
}

export function applicationDifficulty(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 7, cotton: 5, marine_sealant: 3, pitch_tar: 6, epoxy_fill: 4,
  };
  return m[caulking];
}

export function durabilityYears(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 10, cotton: 5, marine_sealant: 15, pitch_tar: 8, epoxy_fill: 20,
  };
  return m[caulking];
}

export function repairability(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 8, cotton: 9, marine_sealant: 6, pitch_tar: 7, epoxy_fill: 3,
  };
  return m[caulking];
}

export function traditional(caulking: HullCaulking): boolean {
  const m: Record<HullCaulking, boolean> = {
    oakum: true, cotton: true, marine_sealant: false, pitch_tar: true, epoxy_fill: false,
  };
  return m[caulking];
}

export function heatRequired(caulking: HullCaulking): boolean {
  const m: Record<HullCaulking, boolean> = {
    oakum: false, cotton: false, marine_sealant: false, pitch_tar: true, epoxy_fill: false,
  };
  return m[caulking];
}

export function bestHullType(caulking: HullCaulking): string {
  const m: Record<HullCaulking, string> = {
    oakum: "plank_on_frame", cotton: "carvel_planked", marine_sealant: "fiberglass",
    pitch_tar: "wooden_deck", epoxy_fill: "composite",
  };
  return m[caulking];
}

export function costPerMeter(caulking: HullCaulking): number {
  const m: Record<HullCaulking, number> = {
    oakum: 8, cotton: 5, marine_sealant: 15, pitch_tar: 6, epoxy_fill: 20,
  };
  return m[caulking];
}

export function hullCaulkings(): HullCaulking[] {
  return ["oakum", "cotton", "marine_sealant", "pitch_tar", "epoxy_fill"];
}

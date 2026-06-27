export type BoltRopeType =
  | "manila_rope_standard"
  | "polyester_rope_modern"
  | "wire_rope_luff"
  | "dyneema_core_light"
  | "cotton_rope_soft";

const specs: Record<BoltRopeType, {
  gripHold: number; stretchLow: number; durability: number;
  sewEase: number; cost: number; synthetic: boolean; wireCore: boolean;
  fiberType: string; use: string;
}> = {
  manila_rope_standard: {
    gripHold: 85, stretchLow: 72, durability: 70,
    sewEase: 88, cost: 8, synthetic: false, wireCore: false,
    fiberType: "natural_manila_hemp", use: "traditional_luff_rope",
  },
  polyester_rope_modern: {
    gripHold: 82, stretchLow: 88, durability: 90,
    sewEase: 80, cost: 15, synthetic: true, wireCore: false,
    fiberType: "braided_polyester", use: "modern_sail_bolt",
  },
  wire_rope_luff: {
    gripHold: 78, stretchLow: 95, durability: 85,
    sewEase: 60, cost: 25, synthetic: false, wireCore: true,
    fiberType: "stainless_wire_core", use: "headsail_luff_wire",
  },
  dyneema_core_light: {
    gripHold: 80, stretchLow: 92, durability: 88,
    sewEase: 70, cost: 35, synthetic: true, wireCore: false,
    fiberType: "hmpe_dyneema_core", use: "racing_sail_bolt",
  },
  cotton_rope_soft: {
    gripHold: 88, stretchLow: 65, durability: 60,
    sewEase: 92, cost: 6, synthetic: false, wireCore: false,
    fiberType: "soft_cotton_braid", use: "soft_cover_bolt",
  },
};

export function gripHold(t: BoltRopeType): number { return specs[t].gripHold; }
export function stretchLow(t: BoltRopeType): number { return specs[t].stretchLow; }
export function durability(t: BoltRopeType): number { return specs[t].durability; }
export function sewEase(t: BoltRopeType): number { return specs[t].sewEase; }
export function ropeCost(t: BoltRopeType): number { return specs[t].cost; }
export function synthetic(t: BoltRopeType): boolean { return specs[t].synthetic; }
export function wireCore(t: BoltRopeType): boolean { return specs[t].wireCore; }
export function fiberType(t: BoltRopeType): string { return specs[t].fiberType; }
export function bestUse(t: BoltRopeType): string { return specs[t].use; }
export function boltRopes(): BoltRopeType[] { return Object.keys(specs) as BoltRopeType[]; }

export type SpringTieType =
  | "hog_ring_clip"
  | "spring_twine_hand"
  | "zig_zag_clip_fast"
  | "nylon_zip_tie"
  | "metal_s_clip";

const specs: Record<SpringTieType, {
  holdSecure: number; speedAttach: number; adjustable: number;
  durability: number; cost: number; reusable: boolean; forSinuous: boolean;
  clipStyle: string; use: string;
}> = {
  hog_ring_clip: {
    holdSecure: 92, speedAttach: 85, adjustable: 60,
    durability: 90, cost: 5, reusable: false, forSinuous: true,
    clipStyle: "crimped_ring_clip", use: "sinuous_spring_attach",
  },
  spring_twine_hand: {
    holdSecure: 85, speedAttach: 65, adjustable: 88,
    durability: 75, cost: 3, reusable: false, forSinuous: false,
    clipStyle: "knotted_twine_loop", use: "coil_spring_tie_down",
  },
  zig_zag_clip_fast: {
    holdSecure: 88, speedAttach: 92, adjustable: 70,
    durability: 85, cost: 6, reusable: false, forSinuous: true,
    clipStyle: "zigzag_wire_clip", use: "quick_zigzag_attach",
  },
  nylon_zip_tie: {
    holdSecure: 78, speedAttach: 95, adjustable: 65,
    durability: 70, cost: 2, reusable: false, forSinuous: false,
    clipStyle: "ratchet_nylon_strap", use: "temporary_hold_secure",
  },
  metal_s_clip: {
    holdSecure: 90, speedAttach: 80, adjustable: 82,
    durability: 92, cost: 4, reusable: true, forSinuous: true,
    clipStyle: "bent_wire_s_hook", use: "reusable_spring_link",
  },
};

export function holdSecure(t: SpringTieType): number { return specs[t].holdSecure; }
export function speedAttach(t: SpringTieType): number { return specs[t].speedAttach; }
export function adjustable(t: SpringTieType): number { return specs[t].adjustable; }
export function durability(t: SpringTieType): number { return specs[t].durability; }
export function tieCost(t: SpringTieType): number { return specs[t].cost; }
export function reusable(t: SpringTieType): boolean { return specs[t].reusable; }
export function forSinuous(t: SpringTieType): boolean { return specs[t].forSinuous; }
export function clipStyle(t: SpringTieType): string { return specs[t].clipStyle; }
export function bestUse(t: SpringTieType): string { return specs[t].use; }
export function springTies(): SpringTieType[] { return Object.keys(specs) as SpringTieType[]; }

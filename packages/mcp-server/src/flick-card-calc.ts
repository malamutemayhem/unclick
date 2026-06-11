export type FlickCardType =
  | "fine_tooth_soft"
  | "medium_tooth_general"
  | "coarse_tooth_heavy"
  | "cotton_card_special"
  | "curved_back_ergonomic";

const specs: Record<FlickCardType, {
  openFiber: number; alignStraight: number; speedCard: number;
  fiberRange: number; cost: number; curved: boolean; forCotton: boolean;
  toothPitch: string; use: string;
}> = {
  fine_tooth_soft: {
    openFiber: 85, alignStraight: 90, speedCard: 78,
    fiberRange: 75, cost: 15, curved: false, forCotton: false,
    toothPitch: "fine_close_pitch", use: "fine_fiber_prep",
  },
  medium_tooth_general: {
    openFiber: 82, alignStraight: 85, speedCard: 85,
    fiberRange: 88, cost: 12, curved: false, forCotton: false,
    toothPitch: "medium_even_pitch", use: "general_fiber_flick",
  },
  coarse_tooth_heavy: {
    openFiber: 92, alignStraight: 78, speedCard: 90,
    fiberRange: 82, cost: 14, curved: false, forCotton: false,
    toothPitch: "coarse_wide_pitch", use: "heavy_fleece_open",
  },
  cotton_card_special: {
    openFiber: 88, alignStraight: 82, speedCard: 80,
    fiberRange: 70, cost: 18, curved: false, forCotton: true,
    toothPitch: "extra_fine_pitch", use: "cotton_fiber_prep",
  },
  curved_back_ergonomic: {
    openFiber: 82, alignStraight: 85, speedCard: 82,
    fiberRange: 85, cost: 20, curved: true, forCotton: false,
    toothPitch: "medium_curved_pitch", use: "comfort_long_session",
  },
};

export function openFiber(t: FlickCardType): number { return specs[t].openFiber; }
export function alignStraight(t: FlickCardType): number { return specs[t].alignStraight; }
export function speedCard(t: FlickCardType): number { return specs[t].speedCard; }
export function fiberRange(t: FlickCardType): number { return specs[t].fiberRange; }
export function cardCost(t: FlickCardType): number { return specs[t].cost; }
export function curved(t: FlickCardType): boolean { return specs[t].curved; }
export function forCotton(t: FlickCardType): boolean { return specs[t].forCotton; }
export function toothPitch(t: FlickCardType): string { return specs[t].toothPitch; }
export function bestUse(t: FlickCardType): string { return specs[t].use; }
export function flickCards(): FlickCardType[] { return Object.keys(specs) as FlickCardType[]; }

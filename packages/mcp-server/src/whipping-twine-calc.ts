// Whipping twine calculator - rigging whipping twine tools

export type WhippingTwineType =
  | "waxed_polyester_standard"
  | "nylon_smooth_slick"
  | "linen_traditional_natural"
  | "dyneema_strong_thin"
  | "cotton_soft_temporary";

const TWINE_DATA: Record<
  WhippingTwineType,
  {
    holdGrip: number;
    abrasionResist: number;
    knotSecure: number;
    flexibility: number;
    cost: number;
    waxed: boolean;
    synthetic: boolean;
    fiberType: string;
    bestUse: string;
  }
> = {
  waxed_polyester_standard: {
    holdGrip: 9,
    abrasionResist: 8,
    knotSecure: 9,
    flexibility: 7,
    cost: 3,
    waxed: true,
    synthetic: true,
    fiberType: "polyester_wax_coat",
    bestUse: "general_rope_whip",
  },
  nylon_smooth_slick: {
    holdGrip: 7,
    abrasionResist: 8,
    knotSecure: 7,
    flexibility: 9,
    cost: 3,
    waxed: false,
    synthetic: true,
    fiberType: "nylon_monofilament",
    bestUse: "smooth_finish_whip",
  },
  linen_traditional_natural: {
    holdGrip: 8,
    abrasionResist: 6,
    knotSecure: 8,
    flexibility: 8,
    cost: 4,
    waxed: false,
    synthetic: false,
    fiberType: "linen_natural_fiber",
    bestUse: "traditional_hemp_whip",
  },
  dyneema_strong_thin: {
    holdGrip: 9,
    abrasionResist: 10,
    knotSecure: 8,
    flexibility: 7,
    cost: 7,
    waxed: false,
    synthetic: true,
    fiberType: "uhmwpe_high_mod",
    bestUse: "high_load_whip",
  },
  cotton_soft_temporary: {
    holdGrip: 5,
    abrasionResist: 4,
    knotSecure: 6,
    flexibility: 10,
    cost: 2,
    waxed: false,
    synthetic: false,
    fiberType: "cotton_soft_twist",
    bestUse: "temporary_soft_whip",
  },
};

export function holdGrip(type: WhippingTwineType): number {
  return TWINE_DATA[type].holdGrip;
}
export function abrasionResist(type: WhippingTwineType): number {
  return TWINE_DATA[type].abrasionResist;
}
export function knotSecure(type: WhippingTwineType): number {
  return TWINE_DATA[type].knotSecure;
}
export function flexibility(type: WhippingTwineType): number {
  return TWINE_DATA[type].flexibility;
}
export function twineCost(type: WhippingTwineType): number {
  return TWINE_DATA[type].cost;
}
export function waxed(type: WhippingTwineType): boolean {
  return TWINE_DATA[type].waxed;
}
export function synthetic(type: WhippingTwineType): boolean {
  return TWINE_DATA[type].synthetic;
}
export function fiberType(type: WhippingTwineType): string {
  return TWINE_DATA[type].fiberType;
}
export function bestUse(type: WhippingTwineType): string {
  return TWINE_DATA[type].bestUse;
}
export function whippingTwines(): WhippingTwineType[] {
  return Object.keys(TWINE_DATA) as WhippingTwineType[];
}

// Leather lace calculator - leatherworking lacing/braiding tools

export type LeatherLaceType =
  | "kangaroo_round_thin"
  | "cowhide_flat_wide"
  | "deerskin_soft_suede"
  | "latigo_oil_tan"
  | "synthetic_poly_cord";

const LACE_DATA: Record<
  LeatherLaceType,
  {
    tensileStrength: number;
    braidEase: number;
    softness: number;
    durability: number;
    cost: number;
    stretchResist: boolean;
    forBraiding: boolean;
    hideSource: string;
    bestUse: string;
  }
> = {
  kangaroo_round_thin: {
    tensileStrength: 10,
    braidEase: 8,
    softness: 7,
    durability: 9,
    cost: 9,
    stretchResist: true,
    forBraiding: true,
    hideSource: "kangaroo_vegetable_tan",
    bestUse: "premium_braid_work",
  },
  cowhide_flat_wide: {
    tensileStrength: 7,
    braidEase: 6,
    softness: 5,
    durability: 8,
    cost: 4,
    stretchResist: false,
    forBraiding: false,
    hideSource: "cowhide_chrome_tan",
    bestUse: "general_lacing_stitch",
  },
  deerskin_soft_suede: {
    tensileStrength: 5,
    braidEase: 9,
    softness: 10,
    durability: 4,
    cost: 6,
    stretchResist: false,
    forBraiding: true,
    hideSource: "deer_brain_tan",
    bestUse: "soft_wrap_fringe",
  },
  latigo_oil_tan: {
    tensileStrength: 8,
    braidEase: 5,
    softness: 6,
    durability: 9,
    cost: 5,
    stretchResist: true,
    forBraiding: false,
    hideSource: "latigo_oil_chrome",
    bestUse: "heavy_duty_lace",
  },
  synthetic_poly_cord: {
    tensileStrength: 7,
    braidEase: 7,
    softness: 4,
    durability: 7,
    cost: 2,
    stretchResist: true,
    forBraiding: true,
    hideSource: "polyester_waxed_cord",
    bestUse: "practice_budget_lace",
  },
};

export function tensileStrength(type: LeatherLaceType): number {
  return LACE_DATA[type].tensileStrength;
}
export function braidEase(type: LeatherLaceType): number {
  return LACE_DATA[type].braidEase;
}
export function softness(type: LeatherLaceType): number {
  return LACE_DATA[type].softness;
}
export function durability(type: LeatherLaceType): number {
  return LACE_DATA[type].durability;
}
export function laceCost(type: LeatherLaceType): number {
  return LACE_DATA[type].cost;
}
export function stretchResist(type: LeatherLaceType): boolean {
  return LACE_DATA[type].stretchResist;
}
export function forBraiding(type: LeatherLaceType): boolean {
  return LACE_DATA[type].forBraiding;
}
export function hideSource(type: LeatherLaceType): string {
  return LACE_DATA[type].hideSource;
}
export function bestUse(type: LeatherLaceType): string {
  return LACE_DATA[type].bestUse;
}
export function leatherLaces(): LeatherLaceType[] {
  return Object.keys(LACE_DATA) as LeatherLaceType[];
}

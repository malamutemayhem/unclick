// Bisque stilt calculator - pottery kiln firing support tools

export type BisqueStiltType =
  | "three_point_wire"
  | "star_stilt_flat"
  | "post_prop_column"
  | "bead_rack_hang"
  | "cookie_disc_flat";

const STILT_DATA: Record<
  BisqueStiltType,
  {
    markFree: number;
    heatResist: number;
    stabilityHold: number;
    reuseLife: number;
    cost: number;
    reusable: boolean;
    forGlaze: boolean;
    contactType: string;
    bestUse: string;
  }
> = {
  three_point_wire: {
    markFree: 9,
    heatResist: 8,
    stabilityHold: 7,
    reuseLife: 7,
    cost: 3,
    reusable: true,
    forGlaze: true,
    contactType: "wire_point_touch",
    bestUse: "glazed_plate_fire",
  },
  star_stilt_flat: {
    markFree: 8,
    heatResist: 8,
    stabilityHold: 9,
    reuseLife: 8,
    cost: 3,
    reusable: true,
    forGlaze: true,
    contactType: "star_point_spread",
    bestUse: "flat_tile_fire",
  },
  post_prop_column: {
    markFree: 6,
    heatResist: 10,
    stabilityHold: 10,
    reuseLife: 10,
    cost: 4,
    reusable: true,
    forGlaze: false,
    contactType: "flat_column_press",
    bestUse: "shelf_stack_support",
  },
  bead_rack_hang: {
    markFree: 10,
    heatResist: 7,
    stabilityHold: 6,
    reuseLife: 6,
    cost: 5,
    reusable: true,
    forGlaze: true,
    contactType: "wire_hang_thread",
    bestUse: "bead_pendant_fire",
  },
  cookie_disc_flat: {
    markFree: 7,
    heatResist: 9,
    stabilityHold: 8,
    reuseLife: 9,
    cost: 2,
    reusable: true,
    forGlaze: false,
    contactType: "flat_disc_base",
    bestUse: "drip_catch_base",
  },
};

export function markFree(type: BisqueStiltType): number {
  return STILT_DATA[type].markFree;
}
export function heatResist(type: BisqueStiltType): number {
  return STILT_DATA[type].heatResist;
}
export function stabilityHold(type: BisqueStiltType): number {
  return STILT_DATA[type].stabilityHold;
}
export function reuseLife(type: BisqueStiltType): number {
  return STILT_DATA[type].reuseLife;
}
export function stiltCost(type: BisqueStiltType): number {
  return STILT_DATA[type].cost;
}
export function reusable(type: BisqueStiltType): boolean {
  return STILT_DATA[type].reusable;
}
export function forGlaze(type: BisqueStiltType): boolean {
  return STILT_DATA[type].forGlaze;
}
export function contactType(type: BisqueStiltType): string {
  return STILT_DATA[type].contactType;
}
export function bestUse(type: BisqueStiltType): string {
  return STILT_DATA[type].bestUse;
}
export function bisqueStilts(): BisqueStiltType[] {
  return Object.keys(STILT_DATA) as BisqueStiltType[];
}

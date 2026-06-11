// Distaff hold calculator - spinning fiber holder tools

export type DistaffHoldType =
  | "floor_distaff_tall"
  | "belt_distaff_waist"
  | "wheel_mount_arm"
  | "lantern_cage_wrap"
  | "russian_paddle_flat";

const DISTAFF_DATA: Record<
  DistaffHoldType,
  {
    fiberHold: number;
    draftEase: number;
    fiberCapacity: number;
    portability: number;
    cost: number;
    freestanding: boolean;
    forFlax: boolean;
    mountStyle: string;
    bestUse: string;
  }
> = {
  floor_distaff_tall: {
    fiberHold: 9,
    draftEase: 8,
    fiberCapacity: 10,
    portability: 3,
    cost: 5,
    freestanding: true,
    forFlax: true,
    mountStyle: "floor_stand_tall",
    bestUse: "flax_linen_spin",
  },
  belt_distaff_waist: {
    fiberHold: 7,
    draftEase: 9,
    fiberCapacity: 5,
    portability: 10,
    cost: 3,
    freestanding: false,
    forFlax: false,
    mountStyle: "belt_tuck_waist",
    bestUse: "portable_spin_walk",
  },
  wheel_mount_arm: {
    fiberHold: 8,
    draftEase: 8,
    fiberCapacity: 7,
    portability: 4,
    cost: 4,
    freestanding: false,
    forFlax: true,
    mountStyle: "wheel_clamp_arm",
    bestUse: "wheel_flax_spin",
  },
  lantern_cage_wrap: {
    fiberHold: 8,
    draftEase: 7,
    fiberCapacity: 8,
    portability: 5,
    cost: 6,
    freestanding: true,
    forFlax: false,
    mountStyle: "cage_wrap_lantern",
    bestUse: "wool_roving_hold",
  },
  russian_paddle_flat: {
    fiberHold: 7,
    draftEase: 8,
    fiberCapacity: 6,
    portability: 8,
    cost: 4,
    freestanding: false,
    forFlax: false,
    mountStyle: "flat_paddle_board",
    bestUse: "spindle_draft_hold",
  },
};

export function fiberHold(type: DistaffHoldType): number {
  return DISTAFF_DATA[type].fiberHold;
}
export function draftEase(type: DistaffHoldType): number {
  return DISTAFF_DATA[type].draftEase;
}
export function fiberCapacity(type: DistaffHoldType): number {
  return DISTAFF_DATA[type].fiberCapacity;
}
export function portability(type: DistaffHoldType): number {
  return DISTAFF_DATA[type].portability;
}
export function distaffCost(type: DistaffHoldType): number {
  return DISTAFF_DATA[type].cost;
}
export function freestanding(type: DistaffHoldType): boolean {
  return DISTAFF_DATA[type].freestanding;
}
export function forFlax(type: DistaffHoldType): boolean {
  return DISTAFF_DATA[type].forFlax;
}
export function mountStyle(type: DistaffHoldType): string {
  return DISTAFF_DATA[type].mountStyle;
}
export function bestUse(type: DistaffHoldType): string {
  return DISTAFF_DATA[type].bestUse;
}
export function distaffHolds(): DistaffHoldType[] {
  return Object.keys(DISTAFF_DATA) as DistaffHoldType[];
}

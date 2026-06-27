// Shooting board veneer calculator - veneer edge trimming tools

export type ShootingBoardVeneerType =
  | "flat_bed_standard"
  | "angled_miter_joint"
  | "long_bed_strip"
  | "adjustable_fence_set"
  | "mini_block_trim";

const SHOOTING_DATA: Record<
  ShootingBoardVeneerType,
  {
    edgeStraight: number;
    anglePrecision: number;
    setupSpeed: number;
    lengthRange: number;
    cost: number;
    adjustable: boolean;
    forMiter: boolean;
    bedStyle: string;
    bestUse: string;
  }
> = {
  flat_bed_standard: {
    edgeStraight: 9,
    anglePrecision: 7,
    setupSpeed: 8,
    lengthRange: 7,
    cost: 4,
    adjustable: false,
    forMiter: false,
    bedStyle: "flat_plane_bed",
    bestUse: "straight_edge_shoot",
  },
  angled_miter_joint: {
    edgeStraight: 7,
    anglePrecision: 10,
    setupSpeed: 6,
    lengthRange: 5,
    cost: 6,
    adjustable: true,
    forMiter: true,
    bedStyle: "angled_fence_bed",
    bestUse: "miter_joint_veneer",
  },
  long_bed_strip: {
    edgeStraight: 9,
    anglePrecision: 7,
    setupSpeed: 7,
    lengthRange: 10,
    cost: 5,
    adjustable: false,
    forMiter: false,
    bedStyle: "extended_long_bed",
    bestUse: "long_strip_edge",
  },
  adjustable_fence_set: {
    edgeStraight: 8,
    anglePrecision: 9,
    setupSpeed: 7,
    lengthRange: 7,
    cost: 7,
    adjustable: true,
    forMiter: false,
    bedStyle: "sliding_fence_bed",
    bestUse: "variable_angle_trim",
  },
  mini_block_trim: {
    edgeStraight: 7,
    anglePrecision: 6,
    setupSpeed: 10,
    lengthRange: 4,
    cost: 3,
    adjustable: false,
    forMiter: false,
    bedStyle: "mini_block_bed",
    bestUse: "small_piece_trim",
  },
};

export function edgeStraight(type: ShootingBoardVeneerType): number {
  return SHOOTING_DATA[type].edgeStraight;
}
export function anglePrecision(type: ShootingBoardVeneerType): number {
  return SHOOTING_DATA[type].anglePrecision;
}
export function setupSpeed(type: ShootingBoardVeneerType): number {
  return SHOOTING_DATA[type].setupSpeed;
}
export function lengthRange(type: ShootingBoardVeneerType): number {
  return SHOOTING_DATA[type].lengthRange;
}
export function shootingCost(type: ShootingBoardVeneerType): number {
  return SHOOTING_DATA[type].cost;
}
export function adjustable(type: ShootingBoardVeneerType): boolean {
  return SHOOTING_DATA[type].adjustable;
}
export function forMiter(type: ShootingBoardVeneerType): boolean {
  return SHOOTING_DATA[type].forMiter;
}
export function bedStyle(type: ShootingBoardVeneerType): string {
  return SHOOTING_DATA[type].bedStyle;
}
export function bestUse(type: ShootingBoardVeneerType): string {
  return SHOOTING_DATA[type].bestUse;
}
export function shootingBoardVeneers(): ShootingBoardVeneerType[] {
  return Object.keys(SHOOTING_DATA) as ShootingBoardVeneerType[];
}

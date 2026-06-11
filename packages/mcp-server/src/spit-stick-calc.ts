// Spit stick calculator - engraving work holding tools

export type SpitStickType =
  | "shellac_mount_heat"
  | "pitch_block_press"
  | "vise_clamp_jaw"
  | "ring_clamp_hold"
  | "engraver_ball_rotate";

const SPIT_DATA: Record<
  SpitStickType,
  {
    holdFirm: number;
    rotateEase: number;
    setupSpeed: number;
    pieceRange: number;
    cost: number;
    rotatable: boolean;
    forSmall: boolean;
    mountMethod: string;
    bestUse: string;
  }
> = {
  shellac_mount_heat: {
    holdFirm: 9,
    rotateEase: 5,
    setupSpeed: 5,
    pieceRange: 8,
    cost: 3,
    rotatable: false,
    forSmall: false,
    mountMethod: "shellac_heat_bond",
    bestUse: "flat_plate_mount",
  },
  pitch_block_press: {
    holdFirm: 8,
    rotateEase: 4,
    setupSpeed: 6,
    pieceRange: 9,
    cost: 3,
    rotatable: false,
    forSmall: false,
    mountMethod: "pitch_press_embed",
    bestUse: "irregular_shape_hold",
  },
  vise_clamp_jaw: {
    holdFirm: 10,
    rotateEase: 3,
    setupSpeed: 8,
    pieceRange: 7,
    cost: 5,
    rotatable: false,
    forSmall: false,
    mountMethod: "jaw_clamp_squeeze",
    bestUse: "quick_clamp_hold",
  },
  ring_clamp_hold: {
    holdFirm: 7,
    rotateEase: 8,
    setupSpeed: 9,
    pieceRange: 4,
    cost: 3,
    rotatable: true,
    forSmall: true,
    mountMethod: "wedge_ring_grip",
    bestUse: "ring_band_engrave",
  },
  engraver_ball_rotate: {
    holdFirm: 9,
    rotateEase: 10,
    setupSpeed: 7,
    pieceRange: 6,
    cost: 8,
    rotatable: true,
    forSmall: true,
    mountMethod: "ball_socket_rotate",
    bestUse: "precision_rotate_engrave",
  },
};

export function holdFirm(type: SpitStickType): number {
  return SPIT_DATA[type].holdFirm;
}
export function rotateEase(type: SpitStickType): number {
  return SPIT_DATA[type].rotateEase;
}
export function setupSpeed(type: SpitStickType): number {
  return SPIT_DATA[type].setupSpeed;
}
export function pieceRange(type: SpitStickType): number {
  return SPIT_DATA[type].pieceRange;
}
export function spitCost(type: SpitStickType): number {
  return SPIT_DATA[type].cost;
}
export function rotatable(type: SpitStickType): boolean {
  return SPIT_DATA[type].rotatable;
}
export function forSmall(type: SpitStickType): boolean {
  return SPIT_DATA[type].forSmall;
}
export function mountMethod(type: SpitStickType): string {
  return SPIT_DATA[type].mountMethod;
}
export function bestUse(type: SpitStickType): string {
  return SPIT_DATA[type].bestUse;
}
export function spitSticks(): SpitStickType[] {
  return Object.keys(SPIT_DATA) as SpitStickType[];
}

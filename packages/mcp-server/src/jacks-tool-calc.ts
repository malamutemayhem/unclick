// Jacks tool calculator - glassblowing shaping/forming jacks tools

export type JacksToolType =
  | "straight_blade_pair"
  | "diamond_shears_cut"
  | "parrot_beak_curve"
  | "tweezers_fine_grab"
  | "battledore_paddle_flat";

const JACKS_DATA: Record<
  JacksToolType,
  {
    shapeControl: number;
    cutAbility: number;
    heatResist: number;
    springReturn: number;
    cost: number;
    forCutting: boolean;
    curved: boolean;
    bladeStyle: string;
    bestUse: string;
  }
> = {
  straight_blade_pair: {
    shapeControl: 9,
    cutAbility: 4,
    heatResist: 8,
    springReturn: 8,
    cost: 5,
    forCutting: false,
    curved: false,
    bladeStyle: "flat_parallel_blade",
    bestUse: "neck_constrict_form",
  },
  diamond_shears_cut: {
    shapeControl: 5,
    cutAbility: 10,
    heatResist: 7,
    springReturn: 7,
    cost: 6,
    forCutting: true,
    curved: false,
    bladeStyle: "diamond_cross_edge",
    bestUse: "hot_glass_shear",
  },
  parrot_beak_curve: {
    shapeControl: 7,
    cutAbility: 3,
    heatResist: 8,
    springReturn: 7,
    cost: 7,
    forCutting: false,
    curved: true,
    bladeStyle: "curved_beak_tip",
    bestUse: "round_lip_form",
  },
  tweezers_fine_grab: {
    shapeControl: 8,
    cutAbility: 2,
    heatResist: 6,
    springReturn: 9,
    cost: 4,
    forCutting: false,
    curved: false,
    bladeStyle: "fine_point_tip",
    bestUse: "detail_pull_pinch",
  },
  battledore_paddle_flat: {
    shapeControl: 8,
    cutAbility: 1,
    heatResist: 9,
    springReturn: 5,
    cost: 5,
    forCutting: false,
    curved: false,
    bladeStyle: "flat_paddle_face",
    bestUse: "flat_surface_press",
  },
};

export function shapeControl(type: JacksToolType): number {
  return JACKS_DATA[type].shapeControl;
}
export function cutAbility(type: JacksToolType): number {
  return JACKS_DATA[type].cutAbility;
}
export function heatResist(type: JacksToolType): number {
  return JACKS_DATA[type].heatResist;
}
export function springReturn(type: JacksToolType): number {
  return JACKS_DATA[type].springReturn;
}
export function jacksCost(type: JacksToolType): number {
  return JACKS_DATA[type].cost;
}
export function forCutting(type: JacksToolType): boolean {
  return JACKS_DATA[type].forCutting;
}
export function curvedBlade(type: JacksToolType): boolean {
  return JACKS_DATA[type].curved;
}
export function bladeStyle(type: JacksToolType): string {
  return JACKS_DATA[type].bladeStyle;
}
export function bestUse(type: JacksToolType): string {
  return JACKS_DATA[type].bestUse;
}
export function jacksTools(): JacksToolType[] {
  return Object.keys(JACKS_DATA) as JacksToolType[];
}

// Jacks glass calculator - glassblowing shaping jack tools

export type JacksGlassType =
  | "straight_blade_standard"
  | "curved_blade_bowl"
  | "diamond_shear_cut"
  | "tweezers_fine_detail"
  | "paddle_flat_press";

const JACKS_DATA: Record<
  JacksGlassType,
  {
    shapeControl: number;
    heatResist: number;
    reachDepth: number;
    detailFine: number;
    cost: number;
    forCutting: boolean;
    forDetail: boolean;
    bladeStyle: string;
    bestUse: string;
  }
> = {
  straight_blade_standard: {
    shapeControl: 8,
    heatResist: 8,
    reachDepth: 8,
    detailFine: 6,
    cost: 4,
    forCutting: false,
    forDetail: false,
    bladeStyle: "straight_flat_blade",
    bestUse: "general_neck_shape",
  },
  curved_blade_bowl: {
    shapeControl: 9,
    heatResist: 8,
    reachDepth: 7,
    detailFine: 7,
    cost: 5,
    forCutting: false,
    forDetail: false,
    bladeStyle: "curved_bowl_blade",
    bestUse: "bowl_lip_form",
  },
  diamond_shear_cut: {
    shapeControl: 7,
    heatResist: 7,
    reachDepth: 6,
    detailFine: 5,
    cost: 6,
    forCutting: true,
    forDetail: false,
    bladeStyle: "diamond_edge_shear",
    bestUse: "hot_glass_cut",
  },
  tweezers_fine_detail: {
    shapeControl: 7,
    heatResist: 6,
    reachDepth: 5,
    detailFine: 10,
    cost: 5,
    forCutting: false,
    forDetail: true,
    bladeStyle: "fine_point_tweezer",
    bestUse: "detail_pull_shape",
  },
  paddle_flat_press: {
    shapeControl: 8,
    heatResist: 9,
    reachDepth: 4,
    detailFine: 4,
    cost: 3,
    forCutting: false,
    forDetail: false,
    bladeStyle: "flat_wood_paddle",
    bestUse: "flat_surface_press",
  },
};

export function shapeControl(type: JacksGlassType): number {
  return JACKS_DATA[type].shapeControl;
}
export function heatResist(type: JacksGlassType): number {
  return JACKS_DATA[type].heatResist;
}
export function reachDepth(type: JacksGlassType): number {
  return JACKS_DATA[type].reachDepth;
}
export function detailFine(type: JacksGlassType): number {
  return JACKS_DATA[type].detailFine;
}
export function jacksCost(type: JacksGlassType): number {
  return JACKS_DATA[type].cost;
}
export function forCutting(type: JacksGlassType): boolean {
  return JACKS_DATA[type].forCutting;
}
export function forDetail(type: JacksGlassType): boolean {
  return JACKS_DATA[type].forDetail;
}
export function bladeStyle(type: JacksGlassType): string {
  return JACKS_DATA[type].bladeStyle;
}
export function bestUse(type: JacksGlassType): string {
  return JACKS_DATA[type].bestUse;
}
export function jacksGlasses(): JacksGlassType[] {
  return Object.keys(JACKS_DATA) as JacksGlassType[];
}

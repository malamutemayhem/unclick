// Diamond shear calculator - glassblowing cutting shear tools

export type DiamondShearType =
  | "straight_cut_standard"
  | "curved_trim_bowl"
  | "heavy_duty_thick"
  | "spring_return_fast"
  | "offset_handle_reach";

const SHEAR_DATA: Record<
  DiamondShearType,
  {
    cutClean: number;
    heatResist: number;
    controlGrip: number;
    bladeLife: number;
    cost: number;
    springReturn: boolean;
    forThick: boolean;
    bladeAngle: string;
    bestUse: string;
  }
> = {
  straight_cut_standard: {
    cutClean: 8,
    heatResist: 8,
    controlGrip: 8,
    bladeLife: 8,
    cost: 5,
    springReturn: false,
    forThick: false,
    bladeAngle: "straight_45_degree",
    bestUse: "general_hot_cut",
  },
  curved_trim_bowl: {
    cutClean: 9,
    heatResist: 8,
    controlGrip: 8,
    bladeLife: 7,
    cost: 6,
    springReturn: false,
    forThick: false,
    bladeAngle: "curved_follow_edge",
    bestUse: "bowl_rim_trim",
  },
  heavy_duty_thick: {
    cutClean: 7,
    heatResist: 10,
    controlGrip: 7,
    bladeLife: 10,
    cost: 7,
    springReturn: false,
    forThick: true,
    bladeAngle: "heavy_blunt_edge",
    bestUse: "thick_wall_cut",
  },
  spring_return_fast: {
    cutClean: 8,
    heatResist: 7,
    controlGrip: 9,
    bladeLife: 7,
    cost: 6,
    springReturn: true,
    forThick: false,
    bladeAngle: "spring_assist_edge",
    bestUse: "rapid_trim_work",
  },
  offset_handle_reach: {
    cutClean: 8,
    heatResist: 8,
    controlGrip: 9,
    bladeLife: 8,
    cost: 7,
    springReturn: false,
    forThick: false,
    bladeAngle: "offset_reach_edge",
    bestUse: "deep_vessel_trim",
  },
};

export function cutClean(type: DiamondShearType): number {
  return SHEAR_DATA[type].cutClean;
}
export function heatResist(type: DiamondShearType): number {
  return SHEAR_DATA[type].heatResist;
}
export function controlGrip(type: DiamondShearType): number {
  return SHEAR_DATA[type].controlGrip;
}
export function bladeLife(type: DiamondShearType): number {
  return SHEAR_DATA[type].bladeLife;
}
export function shearCost(type: DiamondShearType): number {
  return SHEAR_DATA[type].cost;
}
export function springReturn(type: DiamondShearType): boolean {
  return SHEAR_DATA[type].springReturn;
}
export function forThick(type: DiamondShearType): boolean {
  return SHEAR_DATA[type].forThick;
}
export function bladeAngle(type: DiamondShearType): string {
  return SHEAR_DATA[type].bladeAngle;
}
export function bestUse(type: DiamondShearType): string {
  return SHEAR_DATA[type].bestUse;
}
export function diamondShears(): DiamondShearType[] {
  return Object.keys(SHEAR_DATA) as DiamondShearType[];
}

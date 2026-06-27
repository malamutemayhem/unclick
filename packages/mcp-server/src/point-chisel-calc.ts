// Point chisel calculator - stone masonry roughing/point chisels

export type PointChiselType =
  | "carbide_tip_hard"
  | "hand_forged_steel"
  | "pneumatic_air_drive"
  | "star_drill_multi"
  | "bull_point_heavy";

const POINT_DATA: Record<
  PointChiselType,
  {
    breakForce: number;
    tipLife: number;
    controlAim: number;
    speedRemove: number;
    cost: number;
    powered: boolean;
    forGranite: boolean;
    pointAngle: string;
    bestUse: string;
  }
> = {
  carbide_tip_hard: {
    breakForce: 8,
    tipLife: 10,
    controlAim: 8,
    speedRemove: 7,
    cost: 7,
    powered: false,
    forGranite: true,
    pointAngle: "sixty_degree_carbide",
    bestUse: "hard_stone_rough",
  },
  hand_forged_steel: {
    breakForce: 7,
    tipLife: 7,
    controlAim: 9,
    speedRemove: 6,
    cost: 5,
    powered: false,
    forGranite: false,
    pointAngle: "forged_taper_point",
    bestUse: "limestone_shape",
  },
  pneumatic_air_drive: {
    breakForce: 10,
    tipLife: 8,
    controlAim: 5,
    speedRemove: 10,
    cost: 9,
    powered: true,
    forGranite: true,
    pointAngle: "rapid_strike_point",
    bestUse: "bulk_stone_remove",
  },
  star_drill_multi: {
    breakForce: 9,
    tipLife: 8,
    controlAim: 7,
    speedRemove: 8,
    cost: 6,
    powered: false,
    forGranite: true,
    pointAngle: "four_point_star",
    bestUse: "hole_drill_stone",
  },
  bull_point_heavy: {
    breakForce: 10,
    tipLife: 6,
    controlAim: 6,
    speedRemove: 9,
    cost: 4,
    powered: false,
    forGranite: false,
    pointAngle: "blunt_bull_nose",
    bestUse: "heavy_rubble_break",
  },
};

export function breakForce(type: PointChiselType): number {
  return POINT_DATA[type].breakForce;
}
export function tipLife(type: PointChiselType): number {
  return POINT_DATA[type].tipLife;
}
export function controlAim(type: PointChiselType): number {
  return POINT_DATA[type].controlAim;
}
export function speedRemove(type: PointChiselType): number {
  return POINT_DATA[type].speedRemove;
}
export function pointCost(type: PointChiselType): number {
  return POINT_DATA[type].cost;
}
export function powered(type: PointChiselType): boolean {
  return POINT_DATA[type].powered;
}
export function forGranite(type: PointChiselType): boolean {
  return POINT_DATA[type].forGranite;
}
export function pointAngle(type: PointChiselType): string {
  return POINT_DATA[type].pointAngle;
}
export function bestUse(type: PointChiselType): string {
  return POINT_DATA[type].bestUse;
}
export function pointChisels(): PointChiselType[] {
  return Object.keys(POINT_DATA) as PointChiselType[];
}

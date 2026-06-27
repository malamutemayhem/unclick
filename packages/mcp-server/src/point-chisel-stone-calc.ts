// Point chisel stone calculator - stone masonry point chisel tools

export type PointChiselStoneType =
  | "hand_point_standard"
  | "pneumatic_point_power"
  | "carbide_tip_hard"
  | "narrow_point_detail"
  | "wide_point_rough";

const CHISEL_DATA: Record<
  PointChiselStoneType,
  {
    breakForce: number;
    controlAim: number;
    tipLife: number;
    stoneRange: number;
    cost: number;
    powered: boolean;
    forHard: boolean;
    tipShape: string;
    bestUse: string;
  }
> = {
  hand_point_standard: {
    breakForce: 7,
    controlAim: 9,
    tipLife: 7,
    stoneRange: 8,
    cost: 3,
    powered: false,
    forHard: false,
    tipShape: "standard_point",
    bestUse: "general_stone_rough",
  },
  pneumatic_point_power: {
    breakForce: 10,
    controlAim: 6,
    tipLife: 7,
    stoneRange: 9,
    cost: 8,
    powered: true,
    forHard: true,
    tipShape: "powered_point",
    bestUse: "fast_heavy_break",
  },
  carbide_tip_hard: {
    breakForce: 9,
    controlAim: 8,
    tipLife: 10,
    stoneRange: 10,
    cost: 7,
    powered: false,
    forHard: true,
    tipShape: "carbide_insert",
    bestUse: "granite_hard_stone",
  },
  narrow_point_detail: {
    breakForce: 5,
    controlAim: 10,
    tipLife: 6,
    stoneRange: 5,
    cost: 4,
    powered: false,
    forHard: false,
    tipShape: "narrow_fine_point",
    bestUse: "detail_line_work",
  },
  wide_point_rough: {
    breakForce: 8,
    controlAim: 7,
    tipLife: 8,
    stoneRange: 7,
    cost: 3,
    powered: false,
    forHard: false,
    tipShape: "wide_blunt_point",
    bestUse: "bulk_waste_remove",
  },
};

export function breakForce(type: PointChiselStoneType): number {
  return CHISEL_DATA[type].breakForce;
}
export function controlAim(type: PointChiselStoneType): number {
  return CHISEL_DATA[type].controlAim;
}
export function tipLife(type: PointChiselStoneType): number {
  return CHISEL_DATA[type].tipLife;
}
export function stoneRange(type: PointChiselStoneType): number {
  return CHISEL_DATA[type].stoneRange;
}
export function chiselCost(type: PointChiselStoneType): number {
  return CHISEL_DATA[type].cost;
}
export function powered(type: PointChiselStoneType): boolean {
  return CHISEL_DATA[type].powered;
}
export function forHard(type: PointChiselStoneType): boolean {
  return CHISEL_DATA[type].forHard;
}
export function tipShape(type: PointChiselStoneType): string {
  return CHISEL_DATA[type].tipShape;
}
export function bestUse(type: PointChiselStoneType): string {
  return CHISEL_DATA[type].bestUse;
}
export function pointChiselStones(): PointChiselStoneType[] {
  return Object.keys(CHISEL_DATA) as PointChiselStoneType[];
}

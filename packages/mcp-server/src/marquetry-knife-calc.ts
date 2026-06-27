// Marquetry knife calculator - veneer cutting knife tools

export type MarquetryKnifeType =
  | "scalpel_blade_fine"
  | "swivel_blade_curve"
  | "straight_blade_cut"
  | "hook_blade_pull"
  | "heated_blade_melt";

const KNIFE_DATA: Record<
  MarquetryKnifeType,
  {
    cutPrecision: number;
    curveFollow: number;
    bladeLife: number;
    controlGrip: number;
    cost: number;
    swivel: boolean;
    forCurve: boolean;
    bladeType: string;
    bestUse: string;
  }
> = {
  scalpel_blade_fine: {
    cutPrecision: 10,
    curveFollow: 6,
    bladeLife: 5,
    controlGrip: 8,
    cost: 3,
    swivel: false,
    forCurve: false,
    bladeType: "disposable_scalpel",
    bestUse: "fine_straight_cut",
  },
  swivel_blade_curve: {
    cutPrecision: 8,
    curveFollow: 10,
    bladeLife: 7,
    controlGrip: 7,
    cost: 6,
    swivel: true,
    forCurve: true,
    bladeType: "swivel_pivot_blade",
    bestUse: "tight_curve_follow",
  },
  straight_blade_cut: {
    cutPrecision: 8,
    curveFollow: 4,
    bladeLife: 8,
    controlGrip: 9,
    cost: 4,
    swivel: false,
    forCurve: false,
    bladeType: "fixed_straight_edge",
    bestUse: "long_straight_cut",
  },
  hook_blade_pull: {
    cutPrecision: 7,
    curveFollow: 7,
    bladeLife: 7,
    controlGrip: 8,
    cost: 4,
    swivel: false,
    forCurve: false,
    bladeType: "hook_pull_edge",
    bestUse: "veneer_strip_pull",
  },
  heated_blade_melt: {
    cutPrecision: 7,
    curveFollow: 5,
    bladeLife: 9,
    controlGrip: 7,
    cost: 7,
    swivel: false,
    forCurve: false,
    bladeType: "heated_electric_edge",
    bestUse: "synthetic_veneer_cut",
  },
};

export function cutPrecision(type: MarquetryKnifeType): number {
  return KNIFE_DATA[type].cutPrecision;
}
export function curveFollow(type: MarquetryKnifeType): number {
  return KNIFE_DATA[type].curveFollow;
}
export function bladeLife(type: MarquetryKnifeType): number {
  return KNIFE_DATA[type].bladeLife;
}
export function controlGrip(type: MarquetryKnifeType): number {
  return KNIFE_DATA[type].controlGrip;
}
export function knifeCost(type: MarquetryKnifeType): number {
  return KNIFE_DATA[type].cost;
}
export function swivel(type: MarquetryKnifeType): boolean {
  return KNIFE_DATA[type].swivel;
}
export function forCurve(type: MarquetryKnifeType): boolean {
  return KNIFE_DATA[type].forCurve;
}
export function bladeType(type: MarquetryKnifeType): string {
  return KNIFE_DATA[type].bladeType;
}
export function bestUse(type: MarquetryKnifeType): string {
  return KNIFE_DATA[type].bestUse;
}
export function marquetryKnives(): MarquetryKnifeType[] {
  return Object.keys(KNIFE_DATA) as MarquetryKnifeType[];
}

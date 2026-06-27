// Twibill calculator - green woodworking double-bladed mortising axes

export type TwibillType =
  | "standard_double_blade"
  | "heavy_mortise_chop"
  | "light_trim_finish"
  | "offset_handle_angled"
  | "broad_face_hewing";

const TWIBILL_DATA: Record<
  TwibillType,
  {
    chopForce: number;
    mortiseClean: number;
    controlAccuracy: number;
    edgeRetention: number;
    cost: number;
    doubleBlade: boolean;
    forMortise: boolean;
    handleStyle: string;
    bestUse: string;
  }
> = {
  standard_double_blade: {
    chopForce: 8,
    mortiseClean: 8,
    controlAccuracy: 7,
    edgeRetention: 7,
    cost: 6,
    doubleBlade: true,
    forMortise: true,
    handleStyle: "straight_ash_long",
    bestUse: "general_mortise_chop",
  },
  heavy_mortise_chop: {
    chopForce: 10,
    mortiseClean: 7,
    controlAccuracy: 6,
    edgeRetention: 8,
    cost: 7,
    doubleBlade: true,
    forMortise: true,
    handleStyle: "heavy_hickory_thick",
    bestUse: "deep_mortise_cut",
  },
  light_trim_finish: {
    chopForce: 5,
    mortiseClean: 9,
    controlAccuracy: 9,
    edgeRetention: 7,
    cost: 5,
    doubleBlade: true,
    forMortise: false,
    handleStyle: "slim_birch_light",
    bestUse: "mortise_wall_trim",
  },
  offset_handle_angled: {
    chopForce: 7,
    mortiseClean: 8,
    controlAccuracy: 8,
    edgeRetention: 7,
    cost: 8,
    doubleBlade: true,
    forMortise: true,
    handleStyle: "angled_offset_grip",
    bestUse: "corner_joint_access",
  },
  broad_face_hewing: {
    chopForce: 9,
    mortiseClean: 6,
    controlAccuracy: 7,
    edgeRetention: 9,
    cost: 7,
    doubleBlade: false,
    forMortise: false,
    handleStyle: "curved_hewing_shaft",
    bestUse: "face_hew_flatten",
  },
};

export function chopForce(type: TwibillType): number {
  return TWIBILL_DATA[type].chopForce;
}
export function mortiseClean(type: TwibillType): number {
  return TWIBILL_DATA[type].mortiseClean;
}
export function controlAccuracy(type: TwibillType): number {
  return TWIBILL_DATA[type].controlAccuracy;
}
export function edgeRetention(type: TwibillType): number {
  return TWIBILL_DATA[type].edgeRetention;
}
export function twibillCost(type: TwibillType): number {
  return TWIBILL_DATA[type].cost;
}
export function doubleBlade(type: TwibillType): boolean {
  return TWIBILL_DATA[type].doubleBlade;
}
export function forMortise(type: TwibillType): boolean {
  return TWIBILL_DATA[type].forMortise;
}
export function handleStyle(type: TwibillType): string {
  return TWIBILL_DATA[type].handleStyle;
}
export function bestUse(type: TwibillType): string {
  return TWIBILL_DATA[type].bestUse;
}
export function twibills(): TwibillType[] {
  return Object.keys(TWIBILL_DATA) as TwibillType[];
}

// Shearing hook calculator - thatching trim/shearing tools

export type ShearingHookType =
  | "curved_blade_sweep"
  | "straight_blade_chop"
  | "serrated_edge_saw"
  | "double_handle_shear"
  | "electric_trim_motor";

const SHEARING_DATA: Record<
  ShearingHookType,
  {
    cutClean: number;
    speedTrim: number;
    controlAngle: number;
    edgeRetain: number;
    cost: number;
    powered: boolean;
    forRidge: boolean;
    bladeStyle: string;
    bestUse: string;
  }
> = {
  curved_blade_sweep: {
    cutClean: 9,
    speedTrim: 7,
    controlAngle: 9,
    edgeRetain: 7,
    cost: 5,
    powered: false,
    forRidge: false,
    bladeStyle: "curved_sweep_arc",
    bestUse: "eave_line_trim",
  },
  straight_blade_chop: {
    cutClean: 7,
    speedTrim: 8,
    controlAngle: 7,
    edgeRetain: 8,
    cost: 4,
    powered: false,
    forRidge: false,
    bladeStyle: "straight_flat_chop",
    bestUse: "bulk_straw_trim",
  },
  serrated_edge_saw: {
    cutClean: 6,
    speedTrim: 9,
    controlAngle: 6,
    edgeRetain: 9,
    cost: 5,
    powered: false,
    forRidge: true,
    bladeStyle: "serrated_saw_teeth",
    bestUse: "ridge_cap_shape",
  },
  double_handle_shear: {
    cutClean: 8,
    speedTrim: 8,
    controlAngle: 8,
    edgeRetain: 7,
    cost: 6,
    powered: false,
    forRidge: false,
    bladeStyle: "scissor_double_grip",
    bestUse: "precision_edge_cut",
  },
  electric_trim_motor: {
    cutClean: 7,
    speedTrim: 10,
    controlAngle: 5,
    edgeRetain: 6,
    cost: 9,
    powered: true,
    forRidge: true,
    bladeStyle: "oscillating_blade_bar",
    bestUse: "large_roof_rapid",
  },
};

export function cutClean(type: ShearingHookType): number {
  return SHEARING_DATA[type].cutClean;
}
export function speedTrim(type: ShearingHookType): number {
  return SHEARING_DATA[type].speedTrim;
}
export function controlAngle(type: ShearingHookType): number {
  return SHEARING_DATA[type].controlAngle;
}
export function edgeRetain(type: ShearingHookType): number {
  return SHEARING_DATA[type].edgeRetain;
}
export function shearingCost(type: ShearingHookType): number {
  return SHEARING_DATA[type].cost;
}
export function powered(type: ShearingHookType): boolean {
  return SHEARING_DATA[type].powered;
}
export function forRidge(type: ShearingHookType): boolean {
  return SHEARING_DATA[type].forRidge;
}
export function bladeStyle(type: ShearingHookType): string {
  return SHEARING_DATA[type].bladeStyle;
}
export function bestUse(type: ShearingHookType): string {
  return SHEARING_DATA[type].bestUse;
}
export function shearingHooks(): ShearingHookType[] {
  return Object.keys(SHEARING_DATA) as ShearingHookType[];
}

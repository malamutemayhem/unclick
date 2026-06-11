export type MachiningOp =
  | "cnc_turning_lathe"
  | "cnc_milling_3axis"
  | "edm_wire_spark"
  | "grinding_surface_flat"
  | "five_axis_simultaneous";

const DATA: Record<MachiningOp, {
  precision: number; speed: number; surfaceFinish: number;
  complexity: number; moCost: number; hardMaterial: boolean;
  forPrototype: boolean; cutting: string; bestUse: string;
}> = {
  cnc_turning_lathe: {
    precision: 7, speed: 9, surfaceFinish: 7,
    complexity: 4, moCost: 2, hardMaterial: false,
    forPrototype: true, cutting: "single_point_tool_rotate",
    bestUse: "shaft_bushing_cylindrical_part",
  },
  cnc_milling_3axis: {
    precision: 8, speed: 7, surfaceFinish: 8,
    complexity: 7, moCost: 3, hardMaterial: false,
    forPrototype: true, cutting: "rotating_multi_flute_end",
    bestUse: "prismatic_pocket_flat_feature",
  },
  edm_wire_spark: {
    precision: 10, speed: 2, surfaceFinish: 9,
    complexity: 9, moCost: 4, hardMaterial: true,
    forPrototype: false, cutting: "electrical_discharge_erosion",
    bestUse: "injection_mold_cavity_hardened",
  },
  grinding_surface_flat: {
    precision: 10, speed: 5, surfaceFinish: 10,
    complexity: 3, moCost: 3, hardMaterial: true,
    forPrototype: false, cutting: "abrasive_wheel_micro_chip",
    bestUse: "gauge_block_precision_flat",
  },
  five_axis_simultaneous: {
    precision: 9, speed: 6, surfaceFinish: 9,
    complexity: 10, moCost: 5, hardMaterial: false,
    forPrototype: true, cutting: "ball_nose_contour_follow",
    bestUse: "impeller_blade_freeform_surface",
  },
};

const get = (t: MachiningOp) => DATA[t];

export const precision = (t: MachiningOp) => get(t).precision;
export const speed = (t: MachiningOp) => get(t).speed;
export const surfaceFinish = (t: MachiningOp) => get(t).surfaceFinish;
export const complexity = (t: MachiningOp) => get(t).complexity;
export const moCost = (t: MachiningOp) => get(t).moCost;
export const hardMaterial = (t: MachiningOp) => get(t).hardMaterial;
export const forPrototype = (t: MachiningOp) => get(t).forPrototype;
export const cutting = (t: MachiningOp) => get(t).cutting;
export const bestUse = (t: MachiningOp) => get(t).bestUse;
export const machiningOps = (): MachiningOp[] => Object.keys(DATA) as MachiningOp[];

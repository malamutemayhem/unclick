export type EdmMachineType =
  | "wire_edm_cnc"
  | "sinker_ram_die"
  | "hole_drill_edm"
  | "micro_edm_precision"
  | "wire_submerged_flush";

interface EdmMachineData {
  precision: number;
  speed: number;
  surfaceFinish: number;
  complexity: number;
  emCost: number;
  noForce: boolean;
  forHardened: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<EdmMachineType, EdmMachineData> = {
  wire_edm_cnc: {
    precision: 9, speed: 7, surfaceFinish: 8, complexity: 9, emCost: 7,
    noForce: true, forHardened: true,
    electrode: "brass_wire_0_25mm_continuous",
    bestUse: "stamping_die_extrusion_profile",
  },
  sinker_ram_die: {
    precision: 8, speed: 5, surfaceFinish: 9, complexity: 10, emCost: 8,
    noForce: true, forHardened: true,
    electrode: "graphite_copper_shaped_electrode",
    bestUse: "injection_mold_cavity_detail",
  },
  hole_drill_edm: {
    precision: 7, speed: 8, surfaceFinish: 6, complexity: 4, emCost: 5,
    noForce: true, forHardened: true,
    electrode: "tubular_brass_rotating_electrode",
    bestUse: "cooling_hole_turbine_blade",
  },
  micro_edm_precision: {
    precision: 10, speed: 3, surfaceFinish: 10, complexity: 8, emCost: 10,
    noForce: true, forHardened: true,
    electrode: "tungsten_wire_50_micron",
    bestUse: "micro_mold_medical_implant",
  },
  wire_submerged_flush: {
    precision: 9, speed: 8, surfaceFinish: 8, complexity: 8, emCost: 8,
    noForce: true, forHardened: true,
    electrode: "coated_wire_submerged_dielectric",
    bestUse: "thick_plate_aerospace_component",
  },
};

function get(t: EdmMachineType): EdmMachineData {
  return DATA[t];
}

export const precision = (t: EdmMachineType) => get(t).precision;
export const speed = (t: EdmMachineType) => get(t).speed;
export const surfaceFinish = (t: EdmMachineType) => get(t).surfaceFinish;
export const complexity = (t: EdmMachineType) => get(t).complexity;
export const emCost = (t: EdmMachineType) => get(t).emCost;
export const noForce = (t: EdmMachineType) => get(t).noForce;
export const forHardened = (t: EdmMachineType) => get(t).forHardened;
export const electrode = (t: EdmMachineType) => get(t).electrode;
export const bestUse = (t: EdmMachineType) => get(t).bestUse;
export const edmMachineTypes = (): EdmMachineType[] =>
  Object.keys(DATA) as EdmMachineType[];

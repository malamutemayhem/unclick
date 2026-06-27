export type MemsActuator =
  | "electrostatic_comb"
  | "piezoelectric_pzt"
  | "thermal_bimorph"
  | "electromagnetic_coil"
  | "shape_memory_alloy";

const DATA: Record<MemsActuator, {
  force: number; displacement: number; speed: number;
  powerDraw: number; actuatorCost: number; linear: boolean;
  forOptical: boolean; mechanism: string; bestUse: string;
}> = {
  electrostatic_comb: {
    force: 3, displacement: 4, speed: 10,
    powerDraw: 2, actuatorCost: 5, linear: true,
    forOptical: true, mechanism: "parallel_plate_comb",
    bestUse: "mems_mirror_scanner",
  },
  piezoelectric_pzt: {
    force: 8, displacement: 5, speed: 9,
    powerDraw: 4, actuatorCost: 7, linear: true,
    forOptical: true, mechanism: "d31_bending_mode",
    bestUse: "inkjet_printhead_nozzle",
  },
  thermal_bimorph: {
    force: 6, displacement: 8, speed: 3,
    powerDraw: 8, actuatorCost: 3, linear: false,
    forOptical: false, mechanism: "differential_expansion",
    bestUse: "microvalve_flow_control",
  },
  electromagnetic_coil: {
    force: 9, displacement: 9, speed: 7,
    powerDraw: 9, actuatorCost: 6, linear: true,
    forOptical: false, mechanism: "lorentz_force_coil",
    bestUse: "haptic_feedback_motor",
  },
  shape_memory_alloy: {
    force: 10, displacement: 10, speed: 2,
    powerDraw: 7, actuatorCost: 8, linear: false,
    forOptical: false, mechanism: "martensite_transform",
    bestUse: "surgical_micro_gripper",
  },
};

const get = (t: MemsActuator) => DATA[t];

export const force = (t: MemsActuator) => get(t).force;
export const displacement = (t: MemsActuator) => get(t).displacement;
export const speed = (t: MemsActuator) => get(t).speed;
export const powerDraw = (t: MemsActuator) => get(t).powerDraw;
export const actuatorCost = (t: MemsActuator) => get(t).actuatorCost;
export const linear = (t: MemsActuator) => get(t).linear;
export const forOptical = (t: MemsActuator) => get(t).forOptical;
export const mechanism = (t: MemsActuator) => get(t).mechanism;
export const bestUse = (t: MemsActuator) => get(t).bestUse;
export const memsActuators = (): MemsActuator[] => Object.keys(DATA) as MemsActuator[];

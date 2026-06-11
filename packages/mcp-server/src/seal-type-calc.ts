export type SealType =
  | "oring_static_groove"
  | "lip_seal_radial_shaft"
  | "mechanical_face_rotary"
  | "gasket_spiral_wound"
  | "labyrinth_non_contact";

const DATA: Record<SealType, {
  pressure: number; speed: number; life: number;
  friction: number; slCost: number; contactFree: boolean;
  forHighTemp: boolean; material: string; bestUse: string;
}> = {
  oring_static_groove: {
    pressure: 8, speed: 3, life: 7,
    friction: 6, slCost: 1, contactFree: false,
    forHighTemp: false, material: "nitrile_buna_n_rubber",
    bestUse: "hydraulic_fitting_static_seal",
  },
  lip_seal_radial_shaft: {
    pressure: 5, speed: 7, life: 6,
    friction: 5, slCost: 1, contactFree: false,
    forHighTemp: false, material: "ptfe_lip_spring_loaded",
    bestUse: "gearbox_shaft_oil_retention",
  },
  mechanical_face_rotary: {
    pressure: 9, speed: 9, life: 8,
    friction: 7, slCost: 4, contactFree: false,
    forHighTemp: true, material: "silicon_carbide_carbon_face",
    bestUse: "pump_impeller_shaft_seal",
  },
  gasket_spiral_wound: {
    pressure: 10, speed: 1, life: 9,
    friction: 3, slCost: 3, contactFree: false,
    forHighTemp: true, material: "stainless_graphite_spiral",
    bestUse: "flange_joint_high_pressure_pipe",
  },
  labyrinth_non_contact: {
    pressure: 4, speed: 10, life: 10,
    friction: 10, slCost: 2, contactFree: true,
    forHighTemp: true, material: "aluminum_bronze_grooved_ring",
    bestUse: "turbine_shaft_bearing_isolator",
  },
};

const get = (t: SealType) => DATA[t];

export const pressure = (t: SealType) => get(t).pressure;
export const speed = (t: SealType) => get(t).speed;
export const life = (t: SealType) => get(t).life;
export const friction = (t: SealType) => get(t).friction;
export const slCost = (t: SealType) => get(t).slCost;
export const contactFree = (t: SealType) => get(t).contactFree;
export const forHighTemp = (t: SealType) => get(t).forHighTemp;
export const material = (t: SealType) => get(t).material;
export const bestUse = (t: SealType) => get(t).bestUse;
export const sealTypes = (): SealType[] => Object.keys(DATA) as SealType[];

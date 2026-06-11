export type SpringType =
  | "compression_coil_helical"
  | "extension_coil_hook"
  | "torsion_coil_leg"
  | "leaf_flat_cantilever"
  | "belleville_disc_washer";

const DATA: Record<SpringType, {
  loadCapacity: number; deflection: number; fatigue: number;
  compactness: number; spCost: number; stackable: boolean;
  forVibration: boolean; material: string; bestUse: string;
}> = {
  compression_coil_helical: {
    loadCapacity: 7, deflection: 8, fatigue: 8,
    compactness: 5, spCost: 1, stackable: false,
    forVibration: true, material: "chrome_vanadium_wire",
    bestUse: "valve_return_suspension_bump",
  },
  extension_coil_hook: {
    loadCapacity: 6, deflection: 9, fatigue: 7,
    compactness: 4, spCost: 1, stackable: false,
    forVibration: false, material: "music_wire_carbon_steel",
    bestUse: "garage_door_counterbalance",
  },
  torsion_coil_leg: {
    loadCapacity: 5, deflection: 7, fatigue: 8,
    compactness: 6, spCost: 2, stackable: false,
    forVibration: false, material: "stainless_steel_302",
    bestUse: "clothespin_hinge_return_torque",
  },
  leaf_flat_cantilever: {
    loadCapacity: 9, deflection: 5, fatigue: 6,
    compactness: 8, spCost: 2, stackable: true,
    forVibration: true, material: "silicon_manganese_steel",
    bestUse: "truck_suspension_axle_support",
  },
  belleville_disc_washer: {
    loadCapacity: 10, deflection: 3, fatigue: 9,
    compactness: 10, spCost: 3, stackable: true,
    forVibration: true, material: "inconel_718_high_temp",
    bestUse: "bolt_preload_thermal_compensate",
  },
};

const get = (t: SpringType) => DATA[t];

export const loadCapacity = (t: SpringType) => get(t).loadCapacity;
export const deflection = (t: SpringType) => get(t).deflection;
export const fatigue = (t: SpringType) => get(t).fatigue;
export const compactness = (t: SpringType) => get(t).compactness;
export const spCost = (t: SpringType) => get(t).spCost;
export const stackable = (t: SpringType) => get(t).stackable;
export const forVibration = (t: SpringType) => get(t).forVibration;
export const material = (t: SpringType) => get(t).material;
export const bestUse = (t: SpringType) => get(t).bestUse;
export const springTypes = (): SpringType[] => Object.keys(DATA) as SpringType[];
